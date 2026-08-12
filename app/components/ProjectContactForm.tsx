"use client";

import { FormEvent, useState } from "react";

export function ProjectContactForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const topic = String(data.get("topic") ?? "");
    const details = String(data.get("details") ?? "");
    const brief = `MULTBILIM — LOYIHA BRIEFI\n\nIsm: ${name}\nEmail: ${email}\nKompaniya: ${company || "—"}\nYo‘nalish: ${topic}\n\nLoyiha haqida:\n${details}`;

    try {
      await navigator.clipboard.writeText(brief);
      setMessage("Brief nusxalandi. Uni studiyaning rasmiy kontaktiga yuborishingiz mumkin.");
    } catch {
      setMessage("Brief tayyor. Matnni belgilang va studiyaning rasmiy kontaktiga yuboring.");
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
        <p aria-live="polite">{message || "Ma’lumotlar brief ko‘rinishida nusxalanadi."}</p>
      </div>
    </form>
  );
}
