import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="MultBilim bosh sahifasi">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-word brand-word--mult" data-text="MULT">MULT</span>
          <span className="brand-word brand-word--bilim" data-text="BiLiM">BiLiM</span>
        </span>
        <span className="brand-studio">Animation studio</span>
      </Link>

      <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
        <Link href="/#projects">Loyihalar</Link>
        <Link href="/#services">Xizmatlar</Link>
        <Link href="/#technology">Texnologiya</Link>
        <Link href="/#team">Jamoa</Link>
        <Link href="/#careers">Karyera</Link>
        <Link href="/#watch">Tomosha</Link>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <Link className="header-cta" href="/#contact">
          Bog‘lanish <span>↗</span>
        </Link>
      </div>

      <details className="mobile-menu">
        <summary aria-label="Menyuni ochish">Menyu</summary>
        <nav aria-label="Mobil navigatsiya">
          <Link href="/#projects">Loyihalar</Link>
          <Link href="/#studio">Studio</Link>
          <Link href="/#services">Xizmatlar</Link>
          <Link href="/#technology">Texnologiya</Link>
          <Link href="/#team">Jamoa</Link>
          <Link href="/#careers">Karyera</Link>
          <Link href="/#faq">Savollar</Link>
          <Link href="/#watch">Tomosha</Link>
          <Link href="/#contact">Bog‘lanish</Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand">
        <span className="brand-mark brand-mark--footer" aria-label="MultBilim">
          <span className="brand-word brand-word--mult" data-text="MULT">MULT</span>
          <span className="brand-word brand-word--bilim" data-text="BiLiM">BiLiM</span>
        </span>
        <p>O‘zbekistonda yaratilgan olamlar. Dunyo uchun hikoyalar.</p>
      </div>
      <div className="footer-links footer-links--expanded">
        <div>
          <span>Navigatsiya</span>
          <Link href="/#projects">Loyihalar</Link>
          <Link href="/#studio">Studio</Link>
          <Link href="/#services">Xizmatlar</Link>
          <Link href="/#technology">Texnologiya</Link>
        </div>
        <div>
          <span>Tomosha</span>
          <a href="https://www.youtube.com/@BekvaLola" target="_blank" rel="noreferrer">Bek va Lola ↗</a>
          <a href="https://www.youtube.com/@yashilmakonuz" target="_blank" rel="noreferrer">Yashil makon ↗</a>
        </div>
        <div>
          <span>Studio</span>
          <Link href="/#team">Jamoa</Link>
          <Link href="/#careers">Karyera</Link>
          <Link href="/#faq">Savollar</Link>
        </div>
        <div>
          <span>Aloqa</span>
          <a href="mailto:hello@multbilim.uz">Hamkorlik</a>
          <a href="mailto:loyiha@multbilim.uz">Buyurtma</a>
          <Link href="/#contact">Aloqa</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MultBilim Studio</span>
        <span>Toshkent, O‘zbekiston</span>
        <a href="#top">Yuqoriga ↑</a>
      </div>
    </footer>
  );
}
