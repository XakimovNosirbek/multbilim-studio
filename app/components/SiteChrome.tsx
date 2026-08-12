import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/#top" aria-label="MultBilim bosh sahifasi">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-word brand-word--mult" data-text="MULT">MULT</span>
          <span className="brand-word brand-word--bilim" data-text="BiLiM">BiLiM</span>
        </span>
        <span className="brand-studio">Animation studio</span>
      </a>

      <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
        <a href="/#projects">Loyihalar</a>
        <a href="/#services">Xizmatlar</a>
        <a href="/#technology">Texnologiya</a>
        <a href="/#team">Jamoa</a>
        <a href="/#careers">Karyera</a>
        <a href="/#watch">Tomosha</a>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <a className="header-cta" href="/#contact">
          Bog‘lanish <span>↗</span>
        </a>
      </div>

      <details className="mobile-menu">
        <summary aria-label="Menyuni ochish">Menyu</summary>
        <nav aria-label="Mobil navigatsiya">
          <a href="/#projects">Loyihalar</a>
          <a href="/#studio">Studio</a>
          <a href="/#services">Xizmatlar</a>
          <a href="/#technology">Texnologiya</a>
          <a href="/#team">Jamoa</a>
          <a href="/#careers">Karyera</a>
          <a href="/#faq">Savollar</a>
          <a href="/#watch">Tomosha</a>
          <a href="/#contact">Bog‘lanish</a>
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
          <a href="/#projects">Loyihalar</a>
          <a href="/#studio">Studio</a>
          <a href="/#services">Xizmatlar</a>
          <a href="/#technology">Texnologiya</a>
        </div>
        <div>
          <span>Tomosha</span>
          <a href="https://www.youtube.com/@BekvaLola" target="_blank" rel="noreferrer">Bek va Lola ↗</a>
          <a href="https://www.youtube.com/@yashilmakonuz" target="_blank" rel="noreferrer">Yashil makon ↗</a>
        </div>
        <div>
          <span>Studio</span>
          <a href="/#team">Jamoa</a>
          <a href="/#careers">Karyera</a>
          <a href="/#faq">Savollar</a>
        </div>
        <div>
          <span>Aloqa</span>
          <a href="mailto:hello@multbilim.uz">Hamkorlik</a>
          <a href="mailto:loyiha@multbilim.uz">Buyurtma</a>
          <a href="/#contact">Aloqa</a>
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
