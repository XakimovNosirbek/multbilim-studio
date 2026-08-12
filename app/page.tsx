const projects = [
  {
    title: "Alpomish",
    eyebrow: "Epik fantastika",
    image: "/media/alpomish.jpg",
    description:
      "Qadimiy doston ruhi, zamonaviy qahramonlik va katta ekran uchun yaratilgan milliy olam.",
    meta: "To‘liq metrajli · Ishlab chiqilmoqda",
    className: "project-card--wide",
  },
  {
    title: "Ikki Dunyo",
    eyebrow: "Musiqiy fantasy",
    image: "/media/ikki-dunyo.jpg",
    description:
      "Tarix va bugunni musiqa, sirli portal va bir taqdir orqali bog‘laydigan sarguzasht.",
    meta: "Serial konsepti · 12 qism",
    className: "project-card--tall",
  },
  {
    title: "Zij",
    eyebrow: "Ilmiy sarguzasht",
    image: "/media/zij.jpg",
    description:
      "Ulug‘bek merosi, kosmos va yosh ixtirochilarning kelajak sari sayohati.",
    meta: "Animatsion serial · Rivojlanishda",
    className: "",
  },
  {
    title: "Meva-Cheva",
    eyebrow: "Maktabgacha yoshdagilar uchun",
    image: "/media/meva-cheva.jpg",
    description:
      "Quvnoq meva va sabzavotlar bolalarga do‘stlik, tartib va foydali odatlarni o‘rgatadi.",
    meta: "3D serial · 4–8 yosh",
    className: "",
  },
  {
    title: "Megavoylar",
    eyebrow: "Texnologik ta’lim",
    image: "/media/megavoylar.jpg",
    description:
      "Raqamli xavfsizlik va texnologiyani sarguzashtga aylantirgan yangi avlod qahramonlari.",
    meta: "Ta’limiy serial · Konsept",
    className: "",
  },
  {
    title: "Sehrli Qalpoqcha",
    eyebrow: "Maktab sarguzashti",
    image: "/media/sehrli-qalpoqcha.jpg",
    description:
      "Orzu, bilim va jasorat haqida zamonaviy o‘zbek maktabida kechadigan sehrli hikoya.",
    meta: "3D serial · Ishlab chiqilmoqda",
    className: "project-card--wide",
  },
];

const videos = [
  {
    title: "Bek va Lola — Badantarbiya 2",
    channel: "Bek va Lola",
    image: "https://i.ytimg.com/vi/BQy49Y12YDo/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=BQy49Y12YDo",
  },
  {
    title: "Bek va Lola — Toza qo‘llar",
    channel: "Bek va Lola",
    image: "https://i.ytimg.com/vi/g7Km27hLJ5E/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=g7Km27hLJ5E",
  },
  {
    title: "Chip-chip jo‘jalarim",
    channel: "Yashil makon",
    image: "https://i.ytimg.com/vi/-Huu9yfBlsU/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=-Huu9yfBlsU",
  },
];

const services = [
  {
    number: "01",
    title: "Original olamlar",
    text: "G‘oyadan pilotgacha: hikoya olami, personajlar, vizual til va to‘liq ishlab chiqarish.",
  },
  {
    number: "02",
    title: "Buyurtma animatsiya",
    text: "Brendlar, platformalar va tashkilotlar uchun cinematic rolik va seriallar.",
  },
  {
    number: "03",
    title: "Ta’limiy kontent",
    text: "Murakkab mavzularni bolalar sevib ko‘radigan sodda va ta’sirli hikoyalarga aylantiramiz.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="MultBilim bosh sahifasi">
          <span className="brand-crop">
            <img src="/media/multbilim-logo.png" alt="MultBilim" />
          </span>
          <span className="brand-studio">Animation studio</span>
        </a>

        <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
          <a href="#projects">Loyihalar</a>
          <a href="#studio">Studio</a>
          <a href="#services">Xizmatlar</a>
          <a href="#watch">Tomosha</a>
        </nav>

        <a className="header-cta" href="#contact">
          Bog‘lanish <span>↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Menyuni ochish">Menyu</summary>
          <nav aria-label="Mobil navigatsiya">
            <a href="#projects">Loyihalar</a>
            <a href="#studio">Studio</a>
            <a href="#services">Xizmatlar</a>
            <a href="#watch">Tomosha</a>
            <a href="#contact">Bog‘lanish</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/media/alpomish.jpg"
          alt="Alpomish animatsion loyihasi qahramonlari"
          fetchPriority="high"
        />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content">
          <p className="kicker"><span /> Toshkent · O‘zbekiston</p>
          <h1>
            O‘zbekistonda yaratilgan <em>olamlar.</em>
          </h1>
          <p className="hero-copy">
            Mahalliy ruh, dunyo darajasidagi animatsiya. Biz bolalar va oilalar
            sevib qoladigan qahramonlarni yaratamiz.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Olamlarni kashf eting <span>↓</span>
            </a>
            <a
              className="button button-ghost"
              href="https://www.youtube.com/@BekvaLola"
              target="_blank"
              rel="noreferrer"
            >
              <span className="play-dot">▶</span> Showreel
            </a>
          </div>
        </div>

        <div className="hero-index">
          <span>MB / 01</span>
          <span className="hero-index-line" />
          <span>ALPOMISH</span>
        </div>
        <p className="hero-scroll">Pastga aylantiring <span>↓</span></p>
      </section>

      <section className="intro section-shell" id="studio">
        <div className="section-label">
          <span>Studio manifesti</span>
          <span>24 FPS</span>
        </div>
        <div className="intro-layout">
          <h2>
            Animatsiya — bu chizish emas. Bu <em>vaqtni boshqarish.</em>
          </h2>
          <div className="intro-copy">
            <p>
              MultBilim — O‘zbekiston hikoyalari, ilm-fan va bolalik tasavvurini
              zamonaviy animatsiya tilida birlashtiradigan studio.
            </p>
            <p>
              Har bir loyiha alohida vizual olam. Har bir qahramon esa bola bilan
              birga ulg‘ayish uchun yaratiladi.
            </p>
          </div>
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <div className="section-heading">
          <div>
            <p className="kicker"><span /> Tanlangan loyihalar</p>
            <h2>Bir studio. Olti xil olam.</h2>
          </div>
          <p className="section-note">
            Milliy eposdan raqamli kelajakkacha — har bir loyiha o‘z ovozi,
            ranglari va qahramonlariga ega.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card ${project.className}`}
              key={project.title}
            >
              <img src={project.image} alt={`${project.title} loyihasi`} loading="lazy" />
              <div className="project-shade" />
              <span className="project-number">0{index + 1}</span>
              <div className="project-content">
                <p>{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <span className="project-meta">{project.meta}</span>
                <div className="project-reveal">
                  <p>{project.description}</p>
                  <a href="#contact" aria-label={`${project.title} haqida suhbatlashish`}>
                    Loyihani muhokama qilish <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="watch section-shell" id="watch">
        <div className="watch-heading">
          <p className="kicker"><span /> Hozir efirda</p>
          <h2>Hikoyalar harakatda.</h2>
          <a
            href="https://www.youtube.com/@BekvaLola"
            target="_blank"
            rel="noreferrer"
          >
            YouTube kanali <span>↗</span>
          </a>
        </div>

        <div className="video-grid">
          {videos.map((video, index) => (
            <a
              className={`video-card ${index === 0 ? "video-card--featured" : ""}`}
              href={video.href}
              target="_blank"
              rel="noreferrer"
              key={video.title}
            >
              <div className="video-visual">
                <img src={video.image} alt="" loading="lazy" />
                <span className="video-play">▶</span>
                <span className="video-count">0{index + 1}</span>
              </div>
              <div className="video-info">
                <span>{video.channel}</span>
                <h3>{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="services section-shell" id="services">
        <div className="section-heading">
          <div>
            <p className="kicker"><span /> Nimalar qilamiz</p>
            <h2>G‘oyadan ekrangacha.</h2>
          </div>
          <p className="section-note">
            Rejissura, dizayn, animatsiya, ovoz va post-ishlab chiqarish — bitta
            ijodiy tizimda.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <span className="service-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="proof">
        <div className="proof-image">
          <img src="/media/zij.jpg" alt="Zij animatsion loyihasidan kadr" loading="lazy" />
        </div>
        <div className="proof-content">
          <p className="kicker"><span /> MultBilim haqida</p>
          <h2>Mahalliy ildiz. Cheksiz tasavvur.</h2>
          <p>
            Biz zamonaviy texnologiya bilan o‘zbek madaniyati, bolalar ta’limi va
            universal insoniy qadriyatlarni bir kadrda uchrashtiramiz.
          </p>
          <div className="proof-stats">
            <div><strong>06</strong><span>Original olam</span></div>
            <div><strong>02</strong><span>Efirda loyiha</span></div>
            <div><strong>∞</strong><span>Yangi g‘oya</span></div>
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <p className="kicker"><span /> Keyingi loyiha</p>
        <h2>Yangi olamni birga yaratamiz.</h2>
        <p>
          Hamkorlik, koproduksiya yoki buyurtma animatsiya uchun biz bilan
          bog‘laning.
        </p>
        <a className="contact-link" href="mailto:hello@multbilim.uz">
          hello@multbilim.uz <span>↗</span>
        </a>
      </section>

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
            <a href="#projects">Loyihalar</a>
            <a href="#studio">Studio</a>
            <a href="#services">Xizmatlar</a>
          </div>
          <div>
            <span>Tomosha</span>
            <a href="https://www.youtube.com/@BekvaLola" target="_blank" rel="noreferrer">Bek va Lola ↗</a>
            <a href="https://www.youtube.com/@yashilmakonuz" target="_blank" rel="noreferrer">Yashil makon ↗</a>
          </div>
          <div>
            <span>Studio</span>
            <a href="#contact">Hamkorlik</a>
            <a href="#contact">Karyera</a>
            <a href="#contact">Aloqa</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MultBilim Studio</span>
          <span>Toshkent, O‘zbekiston</span>
          <a href="#top">Yuqoriga ↑</a>
        </div>
      </footer>
    </main>
  );
}
