import { FormEvent, useState } from "react";

export function LeadForm() {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentError, setIsConsentError] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConsentChecked) {
      setIsConsentError(true);
      setFormMessage("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    setIsConsentError(false);
    setFormMessage("Заявка отправлена.");
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Имя</span>
        <input type="text" name="name" placeholder="Имя" />
      </label>

      <label className="form-field">
        <span>Телефон</span>
        <input type="tel" name="phone" placeholder="Телефон" />
      </label>

      <label className="form-field">
        <span>E-mail</span>
        <input type="email" name="email" placeholder="E-mail" />
      </label>

      <button type="submit">Отправить заявку</button>

      <label className={`policy ${isConsentError ? "policy-error" : ""}`}>
        <input
          className="policy-input"
          type="checkbox"
          checked={isConsentChecked}
          onChange={(event) => {
            setIsConsentChecked(event.target.checked);

            if (event.target.checked) {
              setIsConsentError(false);
              setFormMessage("");
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
        <div className={`form-message ${isConsentError ? "error" : "success"}`}>
          {formMessage}
        </div>
      )}

      <label className="honeypot">
        <span>Не заполняйте это поле</span>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </form>
  );
}