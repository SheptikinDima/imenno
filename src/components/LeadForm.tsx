import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
};

export function LeadForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    company: ""
  });

  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentError, setIsConsentError] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormMessage("");

    if (!isConsentChecked) {
      setIsConsentError(true);
      setFormMessage("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    setIsConsentError(false);

    if (!form.name.trim() || !form.phone.trim()) {
      setFormMessage("Заполните имя и телефон.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          page: window.location.href,
          referrer: document.referrer
        })
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Ошибка отправки");
      }

      setForm({
        name: "",
        phone: "",
        email: "",
        company: ""
      });

      setIsConsentChecked(false);
      setFormMessage("Заявка отправлена. Мы скоро свяжемся с вами.");
    } catch {
      setFormMessage("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Имя</span>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          autoComplete="name"
          required
        />
      </label>

      <label className="form-field">
        <span>Телефон</span>
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          autoComplete="tel"
          required
        />
      </label>

      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          autoComplete="email"
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        <span>Компания</span>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Отправить"}
      </button>

      <label className={`policy ${isConsentError ? "policy-error" : ""}`}>
        <input
          className="policy-input"
          type="checkbox"
          checked={isConsentChecked}
          onChange={(event) => {
            setIsConsentChecked(event.target.checked);

            if (event.target.checked) {
              setIsConsentError(false);
            }
          }}
        />

        <span className="policy-check" />

        <span className="policy-text">
  Нажимая кнопку, вы соглашаетесь с{" "}
  <a href="#privacy">политикой конфиденциальности</a>
</span>
      </label>

      {formMessage && (
        <div
          className={`form-message ${
            formMessage.includes("отправлена") ? "success" : "error"
          }`}
        >
          {formMessage}
        </div>
      )}
    </form>
  );
}