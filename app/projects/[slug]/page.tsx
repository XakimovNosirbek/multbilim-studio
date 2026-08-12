import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getProject, projects } from "../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — MultBilim`,
    description: project.logline,
    openGraph: {
      title: `${project.title} — MultBilim`,
      description: project.logline,
      images: [{ url: project.image, alt: `${project.title} loyihasi` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const projectStyle = {
    "--project-accent": project.accent,
    "--project-accent-soft": project.accentSoft,
  } as CSSProperties;

  return (
    <main className="project-page" style={projectStyle}>
      <SiteHeader />

      <section className="project-hero">
        <img src={project.image} alt={`${project.title} animatsion loyihasi`} />
        <div className="project-hero-shade" />
        <div className="project-hero-content section-shell">
          <a className="project-back" href="/#projects">← Barcha loyihalar</a>
          <p className="kicker"><span /> {project.eyebrow}</p>
          <h1 className="soft-word">{project.title}</h1>
          <p className="project-logline">{project.logline}</p>
          <div className="project-quick-meta">
            <span>{project.format}</span>
            <span>{project.audience}</span>
            <span>{project.stage}</span>
          </div>
        </div>
        <a className="project-scroll" href="#story">Loyihani o‘rganish <span>↓</span></a>
      </section>

      <section className="project-story section-shell" id="story">
        <div className="project-story-heading">
          <p className="kicker"><span /> Hikoya olami</p>
          <h2>Bir g‘oyadan butun bir <em>olamga.</em></h2>
        </div>
        <div className="project-story-copy">
          {project.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <dl className="project-facts">
          <div><dt>Format</dt><dd>{project.format}</dd></div>
          <div><dt>Auditoriya</dt><dd>{project.audience}</dd></div>
          <div><dt>Janr</dt><dd>{project.genre}</dd></div>
          <div><dt>Bosqich</dt><dd>{project.stage}</dd></div>
        </dl>
      </section>

      <section className="project-gallery section-shell">
        <div className="project-section-title">
          <p className="kicker"><span /> Konsept va qahramonlar</p>
          <h2>Vizual izlanishlar.</h2>
          <p>MultBilim ijodiy materiallari asosidagi loyiha kayfiyati va personaj yo‘nalishlari.</p>
        </div>
        <div className="gallery-grid">
          {project.gallery.map((image, galleryIndex) => (
            <figure key={image} className={`gallery-item gallery-item--${galleryIndex + 1}`}>
              <img src={image} alt={`${project.title}: konsept materiali ${galleryIndex + 1}`} loading="lazy" />
              <figcaption>Konsept / 0{galleryIndex + 1}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="project-values section-shell">
        <div>
          <p className="kicker"><span /> Asosiy qadriyatlar</p>
          <h2>Tomoshabinda qoladigan tuyg‘ular.</h2>
        </div>
        <ol>
          {project.values.map((value, valueIndex) => (
            <li key={value}><span>0{valueIndex + 1}</span>{value}</li>
          ))}
        </ol>
      </section>

      <nav className="project-switcher" aria-label="Boshqa loyihalar">
        <a href={`/projects/${previous.slug}`}>
          <span>← Oldingi loyiha</span>
          <strong>{previous.title}</strong>
        </a>
        <a href={`/projects/${next.slug}`}>
          <span>Keyingi loyiha →</span>
          <strong>{next.title}</strong>
        </a>
      </nav>

      <section className="project-cta section-shell">
        <p className="kicker"><span /> Hamkorlik</p>
        <h2>Bu olamning keyingi bosqichini birga yarataylik.</h2>
        <a className="button button-primary" href="/#contact">Loyihani muhokama qilish <span>↗</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
