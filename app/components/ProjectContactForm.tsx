"use client";

import { FormEvent, useState } from "react";

export function ProjectContactForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const topic = String(data.get("topic") ?? "");
    const details = String(data.get("details") ?? "");
    try {
      setMessage("Brief yuborilmoqda…");
      const response = await fetch("/api/briefs", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, email, company, topic, details }) });
      if (!response.ok) throw new Error("Brief yuborilmadi");
      form.reset();
      setMessage("Brief qabul qilindi. Studio jamoasi siz bilan bog‘lanadi.");
    } catch {
      setMessage("Hozir yuborib bo‘lmadi. Iltimos, birozdan keyin qayta urinib ko‘ring.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Ism va familiya</span>
        <input name="name" autoComplete="name" required placeholder="Ismingiz" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required placeholder="siz@kompaniya.uz" />
      </label>
      <label>
        <span>Kompaniya</span>
        <input name="company" autoComplete="organization" placeholder="Ixtiyoriy" />
      </label>
      <label>
        <span>Mavzu</span>
        <select name="topic" defaultValue="Buyurtma animatsiya">
          <option>Buyurtma animatsiya</option>
          <option>Koproduksiya</option>
          <option>Litsenziya</option>
          <option>Ta’limiy loyiha</option>
          <option>Karyera</option>
        </select>
      </label>
      <label className="contact-form-message">
        <span>Loyiha haqida</span>
        <textarea name="details" required rows={5} placeholder="Qisqa tavsif, taxminiy davomiylik va muddat…" />
      </label>
      <div className="contact-form-action">
        <button className="button button-primary" type="submit">Briefni tayyorlash <span>↗</span></button>
        <p aria-live="polite">{message || "Brief xavfsiz saqlanadi va administratorga yetkaziladi."}</p>
      </div>
    </form>
  );
}
