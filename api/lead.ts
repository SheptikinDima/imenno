import type { VercelRequest, VercelResponse } from "@vercel/node";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
  comment?: unknown;
  consent?: unknown;
  company?: unknown;
};

type ValidationErrors = Partial<
  Record<"name" | "phone" | "email" | "website" | "comment" | "consent", string>
>;

type RateRecord = {
  count: number;
  resetAt: number;
};

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;
const memoryRateLimit = new Map<string, RateRecord>();

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getIp(request: VercelRequest) {
  const forwarded = request.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown";
}

async function checkDistributedRateLimit(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = `lead-rate:${ip}`;
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, WINDOW_SECONDS]
    ])
  });

  if (!response.ok) return null;
  const result = (await response.json()) as Array<{ result?: number }>;
  const count = Number(result[0]?.result || 0);
  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
    resetAt: Date.now() + WINDOW_SECONDS * 1000
  };
}

function checkMemoryRateLimit(ip: string) {
  const now = Date.now();
  const current = memoryRateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + WINDOW_SECONDS * 1000 };
    memoryRateLimit.set(ip, next);
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: next.resetAt
    };
  }

  current.count += 1;
  memoryRateLimit.set(ip, current);
  return {
    allowed: current.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - current.count),
    resetAt: current.resetAt
  };
}

async function rateLimit(ip: string) {
  try {
    return (await checkDistributedRateLimit(ip)) || checkMemoryRateLimit(ip);
  } catch {
    return checkMemoryRateLimit(ip);
  }
}

function validate(payload: LeadPayload) {
  const name = text(payload.name, 80);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 160).toLowerCase();
  const website = text(payload.website, 240);
  const comment = text(payload.comment, 1200);
  const errors: ValidationErrors = {};
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2) errors.name = "Укажите имя";
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Проверьте номер телефона";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Проверьте e-mail";
  }
  if (website) {
    try {
      new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    } catch {
      errors.website = "Укажите корректный адрес сайта";
    }
  }
  if (comment.length > 1200) {
    errors.comment = "Комментарий слишком длинный";
  }
  if (payload.consent !== true) {
    errors.consent = "Нужно согласие на обработку данных";
  }

  return {
    errors,
    lead: { name, phone, email, website, comment }
  };
}

function isAllowedOrigin(request: VercelRequest) {
  const allowed = process.env.ALLOWED_ORIGINS?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (!allowed?.length) return true;

  const origin = request.headers.origin;
  return typeof origin === "string" && allowed.includes(origin);
}

async function sendToWebhook(lead: ReturnType<typeof validate>["lead"], ip: string) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "imenno-website",
      createdAt: new Date().toISOString(),
      ip,
      ...lead
    })
  });

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }
  return true;
}

async function sendWithResend(lead: ReturnType<typeof validate>["lead"]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `Новая заявка: ${lead.name}`,
      text: [
        `Имя: ${lead.name}`,
        `Телефон: ${lead.phone}`,
        `E-mail: ${lead.email}`,
        `Сайт: ${lead.website || "не указан"}`,
        "",
        lead.comment || "Без комментария"
      ].join("\n")
    })
  });

  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}`);
  }
  return true;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Метод не разрешен" });
  }

  if (!isAllowedOrigin(request)) {
    return response.status(403).json({ ok: false, message: "Источник запроса запрещен" });
  }

  const contentLength = Number(request.headers["content-length"] || 0);
  if (contentLength > 20_000) {
    return response.status(413).json({ ok: false, message: "Запрос слишком большой" });
  }

  const payload = (request.body || {}) as LeadPayload;

  if (text(payload.company, 200)) {
    return response.status(200).json({ ok: true });
  }

  const ip = getIp(request);
  const limit = await rateLimit(ip);
  response.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
  response.setHeader("X-RateLimit-Remaining", String(limit.remaining));
  response.setHeader("X-RateLimit-Reset", String(Math.ceil(limit.resetAt / 1000)));

  if (!limit.allowed) {
    return response.status(429).json({
      ok: false,
      message: "Слишком много заявок. Попробуйте немного позже."
    });
  }

  const { errors, lead } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return response.status(400).json({
      ok: false,
      message: "Проверьте данные формы",
      errors
    });
  }

  try {
    const results = await Promise.all([
      sendToWebhook(lead, ip),
      sendWithResend(lead)
    ]);
    const delivered = results.some(Boolean);

    if (!delivered) {
      console.info("Lead accepted without delivery provider", {
        ...lead,
        ip,
        createdAt: new Date().toISOString()
      });
    }

    return response.status(200).json({ ok: true, delivered });
  } catch (error) {
    console.error("Lead delivery failed", error);
    return response.status(502).json({
      ok: false,
      message: "Не удалось передать заявку. Напишите нам на info@imenno.store."
    });
  }
}
