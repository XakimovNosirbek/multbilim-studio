import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati — MultBilim",
  description: "MultBilim saytida cookie, anonim analitika va maxfiylik tanlovlari haqida ma’lumot.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page" id="top">
      <SiteHeader />
      <header className="privacy-page-hero section-shell">
        <p className="kicker"><span /> Shaffoflik va nazorat</p>
        <h1>Maxfiylik siyosati.</h1>
        <p>Ushbu demo siyosat MultBilim saytining amaldagi texnik ishlashini tushuntiradi. Kompaniyaning yuridik rekvizitlari berilgach, yakuniy huquqiy matn bilan almashtiriladi.</p>
      </header>
      <div className="privacy-page-content section-shell">
        <section><span>01</span><div><h2>Nimalarni saqlaymiz?</h2><p>Tema va maxfiylik tanlovi qurilmangizda saqlanadi. Analitikaga rozilik bersangiz, anonim identifikator, tashrif vaqti, ochilgan sahifa, tashrif manbasining domeni, brauzer tili, vaqt mintaqasi va qurilma turi saqlanadi.</p></div></section>
        <section><span>02</span><div><h2>Nimalarni saqlamaymiz?</h2><p>Ism, telefon, email, aniq manzil, reklama profili yoki IP manzil analitika bazasiga yozilmaydi. Aloqa formasidagi ma’lumot faqat siz xabar yuborishni tanlasangiz ishlatiladi.</p></div></section>
        <section><span>03</span><div><h2>Nima uchun?</h2><p>Qaysi loyihalar ko‘proq qiziqish uyg‘otayotganini, sayt qaysi qurilmalarda ochilayotganini va sahifalar qanday ishlatilayotganini umumiy statistika orqali tushunish uchun.</p></div></section>
        <section><span>04</span><div><h2>Saqlash muddati</h2><p>Tashrif yozuvlari 13 oy, aloqa formasi orqali yuborilgan brief ma’lumotlari esa ko‘pi bilan 12 oy saqlanadi. Maxfiylik tanlovi 6 oydan keyin qayta so‘raladi.</p></div></section>
        <section><span>05</span><div><h2>Tanlovingiz</h2><p>Analitika boshlanishidan oldin qabul yoki rad etishingiz mumkin. Footerdagi “Maxfiylik tanlovlari” orqali rozilikni istalgan vaqtda qaytarib olishingiz mumkin. “Kuzatilmasin” brauzer signali ham hurmat qilinadi.</p><button className="button button-primary" type="button" data-privacy-open>Maxfiylik tanlovlarini ochish</button></div></section>
        <section><span>06</span><div><h2>Bog‘lanish</h2><p>Maxfiylik yoki ma’lumotlarni o‘chirish bo‘yicha murojaatni bosh sahifadagi aloqa bo‘limi orqali brief ko‘rinishida tayyorlash mumkin.</p></div></section>
      </div>
      <SiteFooter />
    </main>
  );
}
