"use client";

import { useCallback, useEffect, useState } from "react";

declare global { interface Window { Telegram?: { WebApp?: { initData: string; ready(): void; expand(): void; setHeaderColor(color: string): void; setBackgroundColor(color: string): void; HapticFeedback?: { impactOccurred(style: string): void } } } } }

type DashboardData = {
  user: { first_name?: string; last_name?: string; username?: string };
  analytics: {
    generatedAt: number;
    totals: { visits: number; visitors: number; todayVisits: number; todayVisitors: number; lastHourVisits: number; last15MinuteVisits: number; pagesPerVisitor: number };
    daily: Array<{ day: string; visits: number; visitors: number }>;
    pages: Array<{ label: string; count: number; percentage: number }>;
    platforms: Array<{ label: string; count: number; percentage: number }>;
  };
  briefs: { total: number; unread: number; recent: Array<Record<string, string | number | null>> };
};

const number = (value: number) => new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 1 }).format(value);

export function TelegramDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [days, setDays] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (period: number) => {
    setLoading(true); setError("");
    const initData = window.Telegram?.WebApp?.initData ?? "";
    if (!initData) { setError("Mini App’ni MultBilim Telegram botidan oching."); setLoading(false); return; }
    const response = await fetch("/api/telegram/dashboard", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ initData, days: period }) });
    const result = await response.json() as DashboardData & { error?: string };
    if (!response.ok) setError(result.error ?? "Ma’lumot yuklanmadi"); else setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?61";
    script.async = true;
    script.onload = () => { const app = window.Telegram?.WebApp; app?.ready(); app?.expand(); app?.setHeaderColor("#080d17"); app?.setBackgroundColor("#080d17"); void load(days); };
    document.head.appendChild(script);
    return () => script.remove();
  }, [days, load]);

  function changePeriod(period: number) { setDays(period); window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light"); void load(period); }
  const max = Math.max(...(data?.analytics.daily.map((item) => item.visits) ?? [1]), 1);

  return (
    <main className="tg-app">
      <header className="tg-header"><div className="tg-logo"><b>MULT</b><b>BiLiM</b></div><div><span>STUDIO CONTROL</span><strong>{data ? `Salom, ${data.user.first_name ?? "Admin"}` : "Telegram Admin"}</strong></div><button onClick={() => load(days)} aria-label="Yangilash">↻</button></header>
      <nav className="tg-period" aria-label="Hisobot davri">{[1, 7, 30].map((period) => <button className={days === period ? "is-active" : ""} key={period} onClick={() => changePeriod(period)}>{period === 1 ? "Bugun" : `${period} kun`}</button>)}</nav>
      {loading && <div className="tg-state"><i /><p>Ma’lumotlar yuklanmoqda…</p></div>}
      {error && <div className="tg-state tg-state--error"><strong>!</strong><p>{error}</p></div>}
      {data && !loading && <>
        <section className="tg-live"><div><i /> Jonli holat</div><span>{new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tashkent" }).format(data.analytics.generatedAt)}</span></section>
        <section className="tg-metrics">
          <article><span>Oxirgi 15 daqiqa</span><strong>{number(data.analytics.totals.last15MinuteVisits)}</strong><small>ko‘rish</small></article>
          <article><span>Oxirgi 60 daqiqa</span><strong>{number(data.analytics.totals.lastHourVisits)}</strong><small>ko‘rish</small></article>
          <article><span>Davr bo‘yicha</span><strong>{number(data.analytics.totals.visits)}</strong><small>jami ko‘rish</small></article>
          <article><span>Noyob auditoriya</span><strong>{number(data.analytics.totals.visitors)}</strong><small>tashrifchi</small></article>
        </section>
        <section className="tg-panel"><header><div><span>FAOLLIK</span><h2>Kunlik dinamika</h2></div><b>{days} kun</b></header><div className="tg-chart">{data.analytics.daily.map((item) => <div key={item.day} title={`${item.day}: ${item.visits}`}><i style={{ height: `${Math.max(item.visits / max * 100, item.visits ? 8 : 2)}%` }} /><span>{new Date(`${item.day}T00:00:00Z`).getUTCDate()}</span></div>)}</div></section>
        <section className="tg-panel"><header><div><span>KONTENT</span><h2>Eng mashhur sahifalar</h2></div></header><div className="tg-ranking">{data.analytics.pages.slice(0, 6).map((item, index) => <div key={item.label}><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{item.label === "/" ? "Bosh sahifa" : item.label.replace("/projects/", "")}</strong><i><em style={{ width: `${item.percentage}%` }} /></i></span><small>{item.count}</small></div>)}</div></section>
        <section className="tg-panel"><header><div><span>QURILMALAR</span><h2>Platformalar</h2></div></header><div className="tg-platforms">{data.analytics.platforms.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.percentage}%</strong><small>{item.label === "iPhone" ? "Model Apple tomonidan yashirilgan" : `${item.count} tashrif`}</small></div>)}</div></section>
        <section className="tg-panel"><header><div><span>ALOQA</span><h2>Loyiha brieflari</h2></div><b className="tg-unread">{data.briefs.unread} yangi</b></header><div className="tg-briefs">{data.briefs.recent.map((brief) => <article key={String(brief.id)}><span>{String(brief.topic)}</span><strong>{String(brief.name)}</strong><small>{String(brief.company || brief.email)}</small></article>)}</div></section>
        <footer className="tg-footer">MultBilim Studio · Himoyalangan admin maydoni</footer>
      </>}
    </main>
  );
}
