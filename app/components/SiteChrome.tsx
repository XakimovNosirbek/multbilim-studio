import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="MultBilim bosh sahifasi">
        <span className="brand-crop">
          <img src="/media/multbilim-logo.png" alt="MultBilim" />
        </span>
        <span className="brand-studio">Animation studio</span>
      </Link>

      <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
        <Link href="/#projects">Loyihalar</Link>
        <Link href="/#studio">Studio</Link>
        <Link href="/#services">Xizmatlar</Link>
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
        <span className="brand-crop brand-crop--footer">
          <img src="/media/multbilim-logo.png" alt="MultBilim" />
        </span>
        <p>O‘zbekistonda yaratilgan olamlar. Dunyo uchun hikoyalar.</p>
      </div>
      <div className="footer-links">
        <div>
          <span>Navigatsiya</span>
          <Link href="/#projects">Loyihalar</Link>
          <Link href="/#studio">Studio</Link>
          <Link href="/#services">Xizmatlar</Link>
        </div>
        <div>
          <span>Tomosha</span>
          <a href="https://www.youtube.com/@BekvaLola" target="_blank" rel="noreferrer">Bek va Lola ↗</a>
          <a href="https://www.youtube.com/@yashilmakonuz" target="_blank" rel="noreferrer">Yashil makon ↗</a>
        </div>
        <div>
          <span>Studio</span>
          <Link href="/#contact">Hamkorlik</Link>
          <Link href="/#contact">Karyera</Link>
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
