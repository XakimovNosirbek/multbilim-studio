import { AnimatedStats } from "./components/AnimatedStats";
import { ProjectContactForm } from "./components/ProjectContactForm";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { VideoGallery } from "./components/VideoGallery";
import { projects } from "./data/projects";

const services = [
  { number: "01", title: "Serial ishlab chiqarish", text: "Bibliya, personaj dizayni, pilot va epizodlar — telekanal hamda platformalar uchun to‘liq sikl.", image: "/media/alpomish.jpg" },
  { number: "02", title: "Ta’limiy animatsiya", text: "Vazirliklar, nashriyotlar va tashkilotlar uchun bolaga tushunarli ijtimoiy-ta’limiy kontent.", image: "/media/zij.jpg" },
  { number: "03", title: "Brend roliklari", text: "15–60 soniyalik cinematic reklama, tushuntiruvchi animatsiya va kampaniya vizuallari.", image: "/media/megavoylar.jpg" },
  { number: "04", title: "Ovoz va musiqa", text: "Dublyaj, ovoz dizayni, original qo‘shiqlar va final miks — bitta ijodiy tizimda.", image: "/media/meva-cheva.jpg" },
  { number: "05", title: "Lokalizatsiya", text: "O‘zbek, rus, ingliz va qoraqalpoq tillarida dublyaj, subtitr va matnli grafika.", image: "/media/ikki-dunyo.jpg" },
];

const process = [
  { number: "01", title: "Ssenariy", text: "G‘oyani dramatik hikoya va aniq ishlab chiqarish rejasiga aylantiramiz.", image: "/media/projects/ikki-dunyo/gallery-1.jpg" },
  { number: "02", title: "Storibord", text: "Har kadr, kamera va personaj harakatini oldindan chizamiz.", image: "/media/projects/alpomish/gallery-3.jpg" },
  { number: "03", title: "Animatik", text: "Tasvir, vaqt, dialog va musiqani birinchi marta birlashtiramiz.", image: "/media/projects/zij/gallery-4.jpg" },
  { number: "04", title: "Animatsiya", text: "Model, rig, fon, yorug‘lik va qahramon harakati jonlanadi.", image: "/media/projects/megavoylar/gallery-2.jpg" },
  { number: "05", title: "Post", text: "Rang, effekt, ovoz miksi va yakuniy sifat nazorati bajariladi.", image: "/media/projects/meva-cheva/gallery-4.jpg" },
];

const technologies = [
  { title: "Vizual ishlab chiqarish", tools: "Konsept · 2D/3D · Realtime previz", image: "/media/projects/megavoylar/gallery-2.jpg", text: "Olam va personaj dizaynidan model, rig, animatsiya, yorug‘lik va final kadrgacha yagona vizual yo‘nalish." },
  { title: "Post va ovoz", tools: "Kompoziting · Rang · Ovoz dizayni", image: "/media/projects/alpomish/gallery-3.jpg", text: "Tasvir, effekt, musiqa, dublyaj va final miksni hikoyaning bitta yakuniy hissiyotiga birlashtiramiz." },
];

const disciplines = [
  { name: "Hikoya va rejissura", role: "Ssenariy · Storibord · Animatik", image: "/media/projects/ikki-dunyo/gallery-1.jpg" },
  { name: "Dizayn va olam", role: "Konsept · Personaj · Fon", image: "/media/projects/alpomish/gallery-3.jpg" },
  { name: "Animatsiya", role: "Model · Rig · 2D/3D harakat", image: "/media/projects/megavoylar/gallery-2.jpg" },
  { name: "Post va ovoz", role: "Kompoziting · Rang · Final miks", image: "/media/projects/zij/gallery-4.jpg" },
];

const jobs = [
  { area: "Ijodkorlar", title: "Portfolio qabul qilamiz", meta: "Animatsiya, konsept-art, storibord va post-production yo‘nalishlari" },
  { area: "Studiyalar", title: "Koproduksiya hamkorligi", meta: "Rivojlantirish, ishlab chiqarish va lokalizatsiya bo‘yicha hamkorlik" },
  { area: "Tashkilotlar", title: "Buyurtma loyiha", meta: "Ta’limiy serial, ijtimoiy rolik va brend hikoyalari" },
];

const faqs = [
  ["Loyihani nimadan boshlaymiz?", "Qisqa g‘oya, maqsadli auditoriya va taxminiy davomiylik yetarli. Dastlabki suhbatdan so‘ng format, uslub, bosqichlar va ishlab chiqarish hajmini birga aniqlaymiz."],
  ["Narx qanday shakllanadi?", "Byudjet davomiylik, texnika, personajlar soni, murakkablik, til versiyalari va muddatga bog‘liq. Briefdan keyin ish hajmi va taxminiy diapazon tayyorlanadi."],
  ["Qaysi formatlarda ishlaysiz?", "Original serial va filmlardan tashqari ta’limiy kontent, ijtimoiy rolik, brend animatsiyasi, lokalizatsiya, ovoz va post-production yo‘nalishlarini birlashtiramiz."],
  ["Koproduksiyaga ochiqmisiz?", "Ha. Mahalliy va xalqaro hamkorlar bilan loyiha rivojlantirish, ishlab chiqarish servisi, lokalizatsiya hamda distribusiya formatlarini ko‘rib chiqamiz."],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <img className="hero-image" src="/media/alpomish.jpg" alt="Alpomish animatsion loyihasi qahramonlari" fetchPriority="high" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker"><span /> Toshkent · O‘zbekiston</p>
          <h1 className="animated-title">
            <span className="soft-word soft-word--one">O‘zbekistonda</span>{" "}
            <span className="soft-word soft-word--two">yaratilgan</span>{" "}
            <em className="soft-word soft-word--three">olamlar.</em>
          </h1>
          <p className="hero-copy">Mahalliy ruh, dunyo darajasidagi animatsiya. Biz bolalar va oilalar sevib qoladigan qahramonlarni yaratamiz.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#watch"><span className="play-dot" aria-hidden="true" /> Ishlarni tomosha qiling</a>
            <a className="button button-ghost hero-watch" href="#projects">Loyihalarni kashf eting <span>↓</span></a>
          </div>
        </div>
        <div className="hero-index"><span>MB / 01</span><span className="hero-index-line" /><span>ALPOMISH</span></div>
        <p className="hero-scroll">Pastga aylantiring <span>↓</span></p>
      </section>

      <section className="intro section-shell scroll-reveal" id="studio">
        <div className="section-label"><span>Studio manifesti</span><span>24 FPS</span></div>
        <div className="intro-layout">
          <h2>Animatsiya — bu chizish emas. Bu <em className="soft-word">vaqtni boshqarish.</em></h2>
          <div className="intro-copy">
            <p>MultBilim — O‘zbekiston hikoyalari, ilm-fan va bolalik tasavvurini zamonaviy animatsiya tilida birlashtiradigan studio.</p>
            <p>Har bir loyiha alohida vizual olam. Har bir qahramon esa bola bilan birga ulg‘ayish uchun yaratiladi.</p>
          </div>
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <div className="section-heading scroll-reveal">
          <div><p className="kicker"><span /> Tanlangan loyihalar</p><h2>Bir studio. Olti xil olam.</h2></div>
          <p className="section-note">Original filmlar va seriallar: har bir loyiha uchun alohida hikoya, vizual yo‘nalish va konsept galereyasi.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a className={`project-card ${project.className}`} href={`/projects/${project.slug}`} key={project.slug} aria-label={`${project.title} loyihasini ochish`}>
              <img src={project.image} alt={`${project.title} loyihasi`} loading="lazy" />
              <div className="project-shade" /><span className="project-number">0{index + 1}</span>
              <div className="project-content">
                <p>{project.eyebrow}</p><h3>{project.title}</h3><span className="project-meta">{project.meta}</span>
                <div className="project-reveal"><p>{project.description}</p><span className="project-open">Loyihani ochish <b>↗</b></span></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="watch-section section-shell" id="watch">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Hozir efirda</p><h2>Hikoyalar harakatda.</h2></div>
          <p>Videoni bosing — YouTube’ga o‘tmasdan shu sahifaning o‘zida tomosha qilasiz.</p>
        </div>
        <VideoGallery />
      </section>

      <AnimatedStats />

      <section className="services section-shell" id="services">
        <div className="section-heading scroll-reveal">
          <div><p className="kicker"><span /> Nimalar qilamiz</p><h2>G‘oyadan ekrangacha.</h2></div>
          <p className="section-note">Rejissura, dizayn, animatsiya, ovoz va post-ishlab chiqarish — bitta ijodiy tizimda.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <img className="service-visual" src={service.image} alt={`${service.title} uchun MultBilim vizuali`} loading="lazy" />
              <span>{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="service-arrow">↗</span>
            </article>
          ))}
        </div>
        <div className="process-block scroll-reveal">
          <div className="process-heading"><p className="kicker"><span /> Qanday ishlaymiz</p><h2>Besh bosqich. Bitta sifat.</h2></div>
          <ol className="process-grid">
            {process.map((item) => <li key={item.number}><strong>{item.number}</strong><div className="process-visual"><img src={item.image} alt={`${item.title} bosqichi vizuali`} loading="lazy" /></div><h3>{item.title}</h3><p>{item.text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="technology-section" id="technology">
        <div className="section-shell">
          <div className="wide-section-head scroll-reveal">
            <div><p className="kicker"><span /> Texnologiyalar</p><h2>San’at va texnika bir kadrda.</h2></div>
            <p>Vosita maqsad emas. Hikoya uchun eng to‘g‘ri pipeline’ni tanlab, har bosqichni bir-biriga bog‘laymiz.</p>
          </div>
          <div className="technology-grid">
            {technologies.map((technology, index) => (
              <article className="technology-card" key={technology.title}>
                <img src={technology.image} alt={`${technology.title} jarayonidan demo vizual`} loading="lazy" />
                <div className="technology-overlay" />
                <span>0{index + 1}</span>
                <div><p>{technology.tools}</p><h3>{technology.title}</h3><small>{technology.text}</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proof-image"><img src="/media/zij.jpg" alt="Zij animatsion loyihasidan kadr" loading="lazy" /></div>
        <div className="proof-content scroll-reveal">
          <p className="kicker"><span /> MultBilim haqida</p><h2>Mahalliy ildiz. Cheksiz tasavvur.</h2>
          <p>O‘zbek dostonlari, ilm-fan, ekologiya va bolalik tasavvuri — zamonaviy animatsiya tilida birlashadigan turli olamlar uchun asos.</p>
          <div className="proof-stats"><div><strong>06</strong><span>Original konsept</span></div><div><strong>02</strong><span>Ta’limiy yo‘nalish</span></div><div><strong>05</strong><span>Ishlab chiqarish bosqichi</span></div></div>
        </div>
      </section>

      <section className="team section-shell" id="team">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Studio odamlari</p><h2>Olamlarni odamlar yaratadi.</h2></div>
          <p>Har bir loyiha hikoya, tasvir, harakat va ovozni birlashtiradigan ko‘p yo‘nalishli ijodiy tizimda yaratiladi.</p>
        </div>
        <div className="team-grid">
          {disciplines.map((member, index) => (
            <article className="team-card" key={member.name}>
              <div className="team-photo"><img src={member.image} alt={`${member.name} yo‘nalishidan loyiha vizuali`} loading="lazy" /><span>Ijodiy yo‘nalish</span></div>
              <div><span>0{index + 1}</span><h3>{member.name}</h3><p>{member.role}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="careers section-shell" id="careers">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Hamkorlik</p><h2>Birga katta olamlar yaratamiz.</h2></div>
          <p>Yaxshi portfolio, aniq g‘oya va hamkorlikka ochiq yondashuv — suhbatni boshlash uchun yetarli.</p>
        </div>
        <div className="job-list">
          {jobs.map((job) => (
            <a href="#contact" key={job.title}>
              <span>{job.area}</span><div><h3>{job.title}</h3><p>{job.meta}</p></div><b>Suhbatni boshlash ↘</b>
            </a>
          ))}
        </div>
      </section>

      <section className="faq section-shell" id="faq">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Savol va javob</p><h2>Ko‘p beriladigan savollar.</h2></div>
          <p>Eng ko‘p so‘raladigan mavzular. Javobni ochish uchun savol ustiga bosing.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{question}</span><b>+</b></summary><p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-project" id="contact">
        <div className="section-shell">
          <div className="contact-project-heading scroll-reveal">
            <p className="kicker"><span /> Aloqa</p><h2>Loyihangizni gaplashamiz.</h2>
            <p>Qisqa tavsif va taxminiy davomiylik yetarli. Keyingi savollarni birga aniqlaymiz.</p>
          </div>
          <div className="contact-project-grid">
            <ProjectContactForm />
            <aside className="contact-aside">
              <div><span>Buyurtma</span><p>Serial · Rolik · Ta’limiy kontent</p></div>
              <div><span>Hamkorlik</span><p>Koproduksiya · Litsenziya · Servis</p></div>
              <div><span>Portfolio</span><p>Animatsiya · Dizayn · Hikoya · Ovoz</p></div>
              <div><span>Studiya</span><p>Toshkent, O‘zbekiston</p></div>
              <small>Briefni forma orqali tayyorlang. Taqdimotdan keyin studiyaning rasmiy aloqa kanali bilan davom etamiz.</small>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
