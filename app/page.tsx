import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { VideoGallery } from "./components/VideoGallery";
import { projects } from "./data/projects";

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
      <SiteHeader />

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
          <h1 className="animated-title">
            <span className="soft-word soft-word--one">O‘zbekistonda</span>{" "}
            <span className="soft-word soft-word--two">yaratilgan</span>{" "}
            <em className="soft-word soft-word--three">olamlar.</em>
          </h1>
          <p className="hero-copy">
            Mahalliy ruh, dunyo darajasidagi animatsiya. Biz bolalar va oilalar
            sevib qoladigan qahramonlarni yaratamiz.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Olamlarni kashf eting <span>↓</span>
            </a>
            <a className="button button-ghost hero-watch" href="#watch">
              <span className="play-dot">▶</span> Pastda tomosha qiling
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
            Animatsiya — bu chizish emas. Bu <em className="soft-word">vaqtni boshqarish.</em>
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
            Har bir kartani oching: loyiha hikoyasi, qahramonlari va qo‘shimcha
            konsept materiallari alohida sahifada joylashgan.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <Link
              className={`project-card ${project.className}`}
              href={`/projects/${project.slug}`}
              key={project.slug}
              aria-label={`${project.title} loyihasini ochish`}
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
                  <span className="project-open">Loyihani ochish <b>↗</b></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="watch section-shell" id="watch">
        <div className="watch-heading">
          <p className="kicker"><span /> Hozir efirda</p>
          <h2>Hikoyalar harakatda.</h2>
          <p className="watch-note">Videoni bosing — shu sahifaning o‘zida ochiladi.</p>
          <a href="https://www.youtube.com/@BekvaLola" target="_blank" rel="noreferrer">
            YouTube kanali <span>↗</span>
          </a>
        </div>
        <VideoGallery />
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

      <SiteFooter />
    </main>
  );
}
