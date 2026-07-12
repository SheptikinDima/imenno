import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { google } from "googleapis";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  page?: string;
  referrer?: string;
  company?: string;
};

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  page?: string;
  referrer?: string;
  company?: string;
};

const cleanString = (value: unknown, maxLength = 500) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const getBody = (req: any): LeadBody => {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      throw new Error("Некорректный JSON в теле запроса");
    }
  }

  return {};
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
    const body = getBody(req);

    const name = cleanString(body.name, 120);
    const phone = cleanString(body.phone, 80);
    const email = cleanString(body.email, 160);
    const page = cleanString(body.page, 500);
    const referrer = cleanString(body.referrer, 500);
    const company = cleanString(body.company, 120);

    // Honeypot-защита от ботов.
    // Если скрытое поле заполнено — просто делаем вид, что всё успешно.
    if (company) {
      return res.status(200).json({ ok: true });
    }

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        message: "Заполните имя и телефон."
      });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetTab = process.env.GOOGLE_SHEET_TAB || "Лист1";
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!sheetId || !serviceAccountEmail || !privateKey) {
      return res.status(500).json({
        ok: false,
        message: "Google Sheets не настроен."
      });
    }

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({
      version: "v4",
      auth
    });

    const createdAt = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow"
    });

    const userAgent = cleanString(req.headers["user-agent"], 300);

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetTab}!A:H`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            createdAt,
            name,
            phone,
            email,
            page,
            referrer,
            userAgent,
            "site"
          ]
        ]
      }
    });

    return res.status(200).json({
      ok: true
    });
  } catch (error: any) {
  console.error("Lead form error:", error);

  return res.status(500).json({
    ok: false,
    message: error?.message || "Неизвестная ошибка Google Sheets",
    code: error?.code || null,
    status: error?.status || null,
    errors: error?.errors || null
  });
}
}