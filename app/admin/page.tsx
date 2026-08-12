import type { CSSProperties, Metadata } from "react";
import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { getAnalyticsDashboard } from "../../db/analytics-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin dashboard — MultBilim",
  description: "MultBilim saytining maxfiy anonim analitika paneli.",
  robots: { index: false, follow: false },
};

const pageNames: Record<string, string> = {
  "/": "Bosh sahifa",
  "/privacy": "Maxfiylik siyosati",
  "/projects/alpomish": "Alpomish",
  "/projects/ikki-dunyo": "Ikki dunyo",
  "/projects/zij": "Zij",
  "/projects/megavoylar": "Megavoylar",
  "/projects/sehrli-dalponcha": "Sehrli dalponcha",
  "/projects/meva-cheva": "Meva-cheva",
};

const deviceNames: Record<string, string> = {
  desktop: "Kompyuter",
  mobile: "Telefon",
  tablet: "Planshet",
  unknown: "Noma’lum",
};

const deviceIcons: Record<string, string> = {
  desktop: "▱",
  mobile: "▯",
  tablet: "▭",
  unknown: "·",
};

function pageName(path: string) {
  return pageNames[path] ?? path;
}

function sourceName(source: string) {
  if (source === "internal") return "Sayt ichidan";
  if (source === "To‘g‘ridan-to‘g‘ri") return source;
  try {
    return new URL(source).hostname.replace(/^www\./, "");
  } catch {
    return source;
  }
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("uz-UZ", { maximumFractionDigits }).format(value);
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  }).format(timestamp);
}

function shortDay(day: string) {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${day}T00:00:00Z`));
}

function Trend({ value }: { value: number | null }) {
  if (value === null) return <span className="admin-trend admin-trend--new">Yangi ma’lumot</span>;
  const positive = value >= 0;
  return (
    <span className={`admin-trend ${positive ? "admin-trend--up" : "admin-trend--down"}`}>
      {positive ? "↗" : "↘"} {positive ? "+" : ""}{value}%
    </span>
  );
}

function EmptyMessage({ children }: { children: React.ReactNode }) {
  return <div className="admin-empty"><span>◇</span><p>{children}</p></div>;
}

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  const runtimeEnv = env as typeof env & { MULTBILIM_ADMIN_EMAILS?: string };
  const allowedEmails = (runtimeEnv.MULTBILIM_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (!allowedEmails.includes(user.email.toLowerCase())) notFound();

  const analytics = await getAnalyticsDashboard(30);
  const maxDaily = Math.max(...analytics.daily.map((day) => day.visits), 1);
  const deviceTotal = analytics.devices.reduce((sum, item) => sum + item.count, 0);
  const donutParts = analytics.devices.map((item, index) => {
    const start = analytics.devices
      .slice(0, index)
      .reduce((sum, previousItem) => sum + previousItem.percentage, 0);
    const end = start + item.percentage;
    const colors = ["#6ea8ff", "#ffc928", "#72dfb3", "#a88cff", "#fb7185"];
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  });
  const donutStyle = {
    "--admin-donut": donutParts.length
      ? `conic-gradient(${donutParts.join(", ")})`
      : "conic-gradient(rgba(255,255,255,.08) 0 100%)",
  } as CSSProperties;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin" aria-label="MultBilim admin bosh sahifasi">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-word brand-word--mult" data-text="MULT">MULT</span>
            <span className="brand-word brand-word--bilim" data-text="BiLiM">BiLiM</span>
          </span>
          <span><strong>Studio</strong><small>Admin panel</small></span>
        </a>

        <nav className="admin-nav" aria-label="Admin navigatsiyasi">
          <a className="is-active" href="#overview"><span>⌂</span> Umumiy</a>
          <a href="#traffic"><span>⌁</span> Tashriflar</a>
          <a href="#content"><span>▤</span> Kontent</a>
          <a href="#audience"><span>◉</span> Auditoriya</a>
          <a href="#recent"><span>◷</span> So‘nggi faollik</a>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-privacy-status"><span /> Analitika rozilik asosida</div>
          <a href="/" target="_blank">Saytni ochish <span>↗</span></a>
          <a href="/privacy" target="_blank">Maxfiylik siyosati <span>↗</span></a>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p>MultBilim / Analitika</p>
            <h1>Dashboard</h1>
          </div>
          <div className="admin-top-actions">
            <a className="admin-refresh" href="/admin" aria-label="Statistikani yangilash">↻ <span>Yangilash</span></a>
            <div className="admin-profile">
              <span>{user.displayName.slice(0, 1).toUpperCase()}</span>
              <div><strong>{user.fullName ?? "Administrator"}</strong><small>{user.email}</small></div>
            </div>
            <a className="admin-signout" href={chatGPTSignOutPath("/")}>Chiqish</a>
          </div>
        </header>

        <div className="admin-content" id="overview">
          <div className="admin-page-heading">
            <div><p className="admin-eyebrow">Jonli ko‘rsatkichlar</p><h2>Sayt holati</h2><p>Faqat tashrifchi rozilik berganidan keyingi anonim ma’lumotlar.</p></div>
            <div className="admin-range"><span>Oxirgi 30 kun</span><small>{formatDate(analytics.generatedAt)} da yangilandi</small></div>
          </div>

          <section className="admin-metrics" aria-label="Asosiy ko‘rsatkichlar">
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">⌁</span><Trend value={analytics.totals.visitTrend} /></div>
              <strong>{formatNumber(analytics.totals.visits)}</strong>
              <p>Sahifa ko‘rishlari</p><small>Oldingi 30 kunga nisbatan</small>
            </article>
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">◎</span><Trend value={analytics.totals.visitorTrend} /></div>
              <strong>{formatNumber(analytics.totals.visitors)}</strong>
              <p>Noyob tashrifchilar</p><small>Anonim qurilma identifikatori bo‘yicha</small>
            </article>
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">◷</span><span className="admin-metric-live"><i /> Bugun</span></div>
              <strong>{formatNumber(analytics.totals.todayVisits)}</strong>
              <p>Bugungi ko‘rishlar</p><small>{formatNumber(analytics.totals.todayVisitors)} noyob tashrifchi</small>
            </article>
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">↳</span><span className="admin-metric-neutral">O‘rtacha</span></div>
              <strong>{formatNumber(analytics.totals.pagesPerVisitor, 1)}</strong>
              <p>Sahifa / tashrifchi</p><small>Kontentga qiziqish chuqurligi</small>
            </article>
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">◷</span><span className="admin-metric-live"><i /> 60 daqiqa</span></div>
              <strong>{formatNumber(analytics.totals.lastHourVisits)}</strong>
              <p>Oxirgi soat</p><small>Har daqiqada yangilanadigan davr</small>
            </article>
            <article>
              <div className="admin-metric-head"><span className="admin-metric-icon">·</span><span className="admin-metric-live"><i /> 15 daqiqa</span></div>
              <strong>{formatNumber(analytics.totals.last15MinuteVisits)}</strong>
              <p>Hozirgi faollik</p><small>Oxirgi 15 daqiqadagi ko‘rishlar</small>
            </article>
          </section>

          <section className="admin-dashboard-grid" id="traffic">
            <article className="admin-panel admin-panel--wide">
              <div className="admin-panel-head"><div><p className="admin-eyebrow">Tashriflar dinamikasi</p><h3>Kunlik faollik</h3></div><div className="admin-legend"><span><i className="is-blue" /> Ko‘rishlar</span><span><i className="is-yellow" /> Tashrifchilar</span></div></div>
              <div className="admin-chart">
                <div className="admin-chart-guides" aria-hidden="true"><i /><i /><i /><i /></div>
                <div className="admin-bars">
                  {analytics.daily.map((day, index) => (
                    <div className="admin-bar-day" key={day.day} title={`${shortDay(day.day)}: ${day.visits} ko‘rish, ${day.visitors} tashrifchi`}>
                      <div className="admin-bar-track">
                        <span className="admin-bar-visits" style={{ "--bar-height": `${Math.max((day.visits / maxDaily) * 100, day.visits ? 5 : 0)}%` } as CSSProperties} />
                        <span className="admin-bar-visitors" style={{ "--bar-height": `${Math.max((day.visitors / maxDaily) * 100, day.visitors ? 4 : 0)}%` } as CSSProperties} />
                      </div>
                      {(index % 5 === 0 || index === analytics.daily.length - 1) && <small>{shortDay(day.day)}</small>}
                    </div>
                  ))}
                </div>
              </div>
              {analytics.totals.visits === 0 && <p className="admin-chart-note">Rozilik bergan birinchi tashrifdan keyin grafik avtomatik shakllanadi.</p>}
            </article>

            <article className="admin-panel admin-device-panel" id="audience">
              <div className="admin-panel-head"><div><p className="admin-eyebrow">Auditoriya</p><h3>Qurilmalar</h3></div></div>
              {deviceTotal > 0 ? (
                <div className="admin-device-content">
                  <div className="admin-donut" style={donutStyle}><div><strong>{formatNumber(deviceTotal)}</strong><span>tashrif</span></div></div>
                  <div className="admin-device-list">
                    {analytics.devices.map((item, index) => (
                      <div key={item.label}><span><i className={`admin-color-${index % 5}`} />{deviceIcons[item.label] ?? "·"} {deviceNames[item.label] ?? item.label}</span><strong>{item.percentage}%</strong></div>
                    ))}
                    {analytics.platforms.map((item, index) => (
                      <div key={item.label}><span><i className={`admin-color-${(index + 2) % 5}`} />{item.label}</span><strong>{item.percentage}%</strong></div>
                    ))}
                  </div>
                </div>
              ) : <EmptyMessage>Qurilma statistikasi hozircha yo‘q.</EmptyMessage>}
            </article>
          </section>

          <section className="admin-dashboard-grid" id="content">
            <article className="admin-panel">
              <div className="admin-panel-head"><div><p className="admin-eyebrow">Kontent samarasi</p><h3>Eng ko‘p ochilgan sahifalar</h3></div><span className="admin-panel-total">{formatNumber(analytics.totals.visits)} jami</span></div>
              {analytics.pages.length ? <div className="admin-ranking">
                {analytics.pages.map((item, index) => (
                  <div className="admin-ranking-row" key={item.label}>
                    <span className="admin-rank">{String(index + 1).padStart(2, "0")}</span>
                    <div><strong>{pageName(item.label)}</strong><small>{item.label}</small><i><b style={{ width: `${item.percentage}%` }} /></i></div>
                    <span><strong>{formatNumber(item.count)}</strong><small>{item.percentage}%</small></span>
                  </div>
                ))}
              </div> : <EmptyMessage>Sahifa statistikasi birinchi tashrifdan keyin chiqadi.</EmptyMessage>}
            </article>

            <article className="admin-panel">
              <div className="admin-panel-head"><div><p className="admin-eyebrow">Kelib chiqish</p><h3>Tashrif manbalari</h3></div></div>
              {analytics.sources.length ? <div className="admin-source-list">
                {analytics.sources.map((item) => (
                  <div key={item.label}><span><i />{sourceName(item.label)}</span><div><b style={{ width: `${item.percentage}%` }} /></div><strong>{item.count}<small>{item.percentage}%</small></strong></div>
                ))}
              </div> : <EmptyMessage>Tashrif manbalari hozircha aniqlanmagan.</EmptyMessage>}
            </article>
          </section>

          <section className="admin-panel admin-recent" id="recent">
            <div className="admin-panel-head"><div><p className="admin-eyebrow">So‘nggi faollik</p><h3>Oxirgi anonim tashriflar</h3></div><span className="admin-secure-badge">● IP saqlanmaydi</span></div>
            {analytics.recent.length ? (
              <div className="admin-table-wrap"><table><thead><tr><th>Vaqt</th><th>Sahifa</th><th>Manba</th><th>Qurilma</th><th>Til</th><th>Vaqt mintaqasi</th></tr></thead><tbody>
                {analytics.recent.map((visit) => <tr key={visit.id}><td>{formatDate(visit.visitedAt)}</td><td><strong>{pageName(visit.path)}</strong><small>{visit.path}</small></td><td>{sourceName(visit.source)}</td><td><span className="admin-device-pill">{deviceIcons[visit.device] ?? "·"} {deviceNames[visit.device] ?? visit.device}</span></td><td>{visit.language}</td><td>{visit.timezone}</td></tr>)}
              </tbody></table></div>
            ) : <EmptyMessage>Hali anonim tashrif yozuvi yo‘q. Rozilik berilgan tashriflar shu yerda ko‘rinadi.</EmptyMessage>}
          </section>

          <footer className="admin-footer"><span>MultBilim Studio Analytics</span><span>13 oylik maxfiy saqlash siyosati · D1 baza · Rozilik asosida</span></footer>
        </div>
      </section>
    </main>
  );
}
