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
  { title: "3D ishlab chiqarish", tools: "Maya · Blender · Houdini", image: "/media/projects/megavoylar/gallery-2.jpg", text: "Modellashtirishdan rig va final animatsiyagacha nazorat qilinadigan pipeline." },
  { title: "Realtime previz", tools: "Unreal Engine · Animatik", image: "/media/projects/zij/gallery-3.jpg", text: "Kamera, yorug‘lik va sahna ritmini ishlab chiqarishdan oldin sinab ko‘ramiz." },
  { title: "2D va konsept", tools: "Photoshop · Storyboard Pro", image: "/media/projects/ikki-dunyo/gallery-2.jpg", text: "Har bir olam uchun rang, shakl, qahramon va vizual dramaturgiya tili." },
  { title: "Post va ovoz", tools: "After Effects · Resolve · Pro Tools", image: "/media/projects/alpomish/gallery-3.jpg", text: "Kompoziting, rang, effekt va ovozni bitta yakuniy hissiyotga birlashtiramiz." },
];

const team = [
  { name: "Aziza Karimova", role: "Creative producer", image: "/media/team/aziza.jpg" },
  { name: "Sardor Rahimov", role: "Animation director", image: "/media/team/sardor.jpg" },
  { name: "Madina Usmonova", role: "Character artist", image: "/media/team/madina.jpg" },
  { name: "Kamol Nurmatov", role: "Technical director", image: "/media/team/kamol.jpg" },
];

const jobs = [
  { area: "Animatsiya", title: "3D animator", meta: "Toshkent · To‘liq kun · 2+ yil tajriba" },
  { area: "Dizayn", title: "Fon rassomi", meta: "Toshkent yoki masofadan · To‘liq kun" },
  { area: "Hikoya", title: "Storibord rassomi", meta: "Loyiha asosida · Kuchli portfolio" },
  { area: "Ovoz", title: "Ovoz dizayneri", meta: "Toshkent · Yarim kun" },
  { area: "Amaliyot", title: "Yozgi amaliyot dasturi", meta: "Talabalar uchun 3 oy · Demo e’lon" },
];

const faqs = [
  ["Loyihalar qaysi bosqichda?", "Saytdagi loyihalar konsept, vizual ishlab chiqish va serial bibliyasi bosqichlarida. Aniq ishlab chiqarish holati real ma’lumotlar kelgach yangilanadi."],
  ["Buyurtma rolik narxi qanday hisoblanadi?", "Narx davomiylik, uslub, personajlar soni, texnika, til versiyalari va muddatga qarab hisoblanadi. Qisqa briefdan keyin diapazon beramiz."],
  ["Qanday texnikada ishlaysiz?", "2D, 3D va realtime previzni loyiha ehtiyojiga qarab birlashtiramiz. Asosiy pipeline Maya, Blender, Unreal Engine, Adobe va DaVinci vositalariga tayangan."],
  ["Serialni telekanalda ko‘rsatish mumkinmi?", "Ha. Litsenziya hududi, muddati, til versiyasi va platformalar soni bo‘yicha alohida kelishuv tayyorlanadi."],
  ["Koproduksiyaga ochiqmisiz?", "Ha. Mahalliy va xalqaro studiyalar bilan rivojlantirish, ishlab chiqarish, servis va distribusiya hamkorliklarini ko‘rib chiqamiz."],
  ["Amaliyotga qanday kirish mumkin?", "Portfolio yoki 60–90 soniyalik showreel, qisqa motivatsion xat va qiziqayotgan yo‘nalishingizni karyera emailiga yuboring."],
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
            <a className="button button-primary" href="#projects">Olamlarni kashf eting <span>↓</span></a>
            <a className="button button-ghost hero-watch" href="#watch"><span className="play-dot">▶</span> Pastda tomosha qiling</a>
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
          <p className="section-note">Har bir kartani oching: loyiha hikoyasi, qahramonlari va PDFdan olingan konsept materiallari alohida sahifada joylashgan.</p>
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

      <AnimatedStats />

      <section className="watch-section section-shell" id="watch">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Hozir efirda</p><h2>Hikoyalar harakatda.</h2></div>
          <p>Videoni bosing — YouTube’ga o‘tmasdan shu sahifaning o‘zida tomosha qilasiz.</p>
        </div>
        <VideoGallery />
      </section>

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
          <p>Biz zamonaviy texnologiya bilan o‘zbek madaniyati, bolalar ta’limi va universal insoniy qadriyatlarni bir kadrda uchrashtiramiz.</p>
          <div className="proof-stats"><div><strong>06</strong><span>Original olam</span></div><div><strong>02</strong><span>Efirda loyiha</span></div><div><strong>∞</strong><span>Yangi g‘oya</span></div></div>
        </div>
      </section>

      <section className="team section-shell" id="team">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Studio odamlari</p><h2>Olamlarni odamlar yaratadi.</h2></div>
          <p>Quyidagi ism va portretlar demo uchun qo‘yilgan. Keyinchalik haqiqiy MultBilim jamoasi bilan almashtiriladi.</p>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article className="team-card" key={member.name}>
              <div className="team-photo"><img src={member.image} alt={`${member.name} — demo portret`} loading="lazy" /><span>Demo portret</span></div>
              <div><span>0{index + 1}</span><h3>{member.name}</h3><p>{member.role}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="careers section-shell" id="careers">
        <div className="wide-section-head scroll-reveal">
          <div><p className="kicker"><span /> Karyera</p><h2>Biz bilan birga ulg‘aying.</h2></div>
          <p>Vakansiyalar hozircha namunaviy. Portfolio va fikrlash usuli tajriba yillaridan ham muhimroq.</p>
        </div>
        <div className="job-list">
          {jobs.map((job) => (
            <a href={`mailto:karyera@multbilim.uz?subject=${encodeURIComponent(job.title)}`} key={job.title}>
              <span>{job.area}</span><div><h3>{job.title}</h3><p>{job.meta}</p></div><b>Ariza yuborish ↗</b>
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
              <div><span>Umumiy</span><a href="mailto:hello@multbilim.uz">hello@multbilim.uz</a></div>
              <div><span>Buyurtma va koproduksiya</span><a href="mailto:loyiha@multbilim.uz">loyiha@multbilim.uz</a></div>
              <div><span>Karyera</span><a href="mailto:karyera@multbilim.uz">karyera@multbilim.uz</a></div>
              <div><span>Studio</span><p>Toshkent shahri<br />Dushanba–Juma · 09:00–18:00</p></div>
              <small>Kontaktlar hozircha demo. Real manzillar berilgach yangilanadi.</small>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
