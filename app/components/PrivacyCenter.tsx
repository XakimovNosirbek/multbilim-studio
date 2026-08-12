"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "multbilim-privacy-v1";
const VISITOR_KEY = "multbilim-anonymous-visitor";
const CONSENT_VERSION = "2026-08";
const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

type StoredChoice = {
  analytics: boolean;
  updatedAt: number;
  expiresAt: number;
  version: string;
};

function privacySignalEnabled() {
  const browserNavigator = navigator as Navigator & { globalPrivacyControl?: boolean };
  return browserNavigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

function readChoice(): StoredChoice | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null") as StoredChoice | null;
    if (!parsed || parsed.version !== CONSENT_VERSION || parsed.expiresAt <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function getReferrerOrigin() {
  if (!document.referrer) return null;
  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? "internal" : referrer.origin;
  } catch {
    return null;
  }
}

function getDeviceType() {
  if (window.innerWidth < 700) return "mobile";
  if (window.innerWidth < 1050) return "tablet";
  return "desktop";
}

function getDevicePlatform() {
  const ua = navigator.userAgent;
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "iPad";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Boshqa";
}

export function PrivacyCenter() {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const trackedPath = useRef("");
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const signal = privacySignalEnabled();
      const saved = readChoice();
      setPrivacySignal(signal);
      setAnalyticsEnabled(Boolean(saved?.analytics) && !signal);
      setShowBanner(!saved);
      setReady(true);
    });

    const openSettings = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-privacy-open]")) setShowSettings(true);
    };
    document.addEventListener("click", openSettings);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("click", openSettings);
    };
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSettings(false);
    };
    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [showSettings]);

  useEffect(() => {
    if (isAdmin || !ready || !analyticsEnabled || privacySignal || trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    let visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, visitorId);
    }

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        visitorId,
        path: pathname,
        referrerOrigin: getReferrerOrigin(),
        language: navigator.language,
        deviceType: getDeviceType(),
        devicePlatform: getDevicePlatform(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        consentVersion: CONSENT_VERSION,
      }),
    }).catch(() => undefined);
  }, [analyticsEnabled, isAdmin, pathname, privacySignal, ready]);

  const saveChoice = (analytics: boolean) => {
    const accepted = analytics && !privacySignal;
    const choice: StoredChoice = {
      analytics: accepted,
      updatedAt: Date.now(),
      expiresAt: Date.now() + SIX_MONTHS_MS,
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    if (!accepted) localStorage.removeItem(VISITOR_KEY);
    trackedPath.current = "";
    setAnalyticsEnabled(accepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!ready || isAdmin) return null;

  return (
    <>
      {showBanner && (
        <aside className="privacy-banner" aria-label="Cookie va maxfiylik tanlovlari">
          <div>
            <p className="privacy-eyebrow">Maxfiylik sizning nazoratingizda</p>
            <h2>Cookie va anonim statistika</h2>
            <p>Sayt ishlashi uchun zarur xotiradan foydalanamiz. Tashrif statistikasi faqat siz ruxsat berganingizdan keyin yig‘iladi.</p>
          </div>
          <div className="privacy-banner-actions">
            <button type="button" className="button button-primary" onClick={() => saveChoice(true)} disabled={privacySignal}>Qabul qilish</button>
            <button type="button" className="button button-ghost" onClick={() => saveChoice(false)}>Rad etish</button>
            <button type="button" className="privacy-text-button" onClick={() => setShowSettings(true)}>Sozlash</button>
          </div>
          {privacySignal && <small>Brauzeringizdagi “Kuzatilmasin” tanlovi hurmat qilindi — analitika o‘chiq.</small>}
        </aside>
      )}

      {showSettings && (
        <div className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
          <div className="privacy-modal-panel">
            <div className="privacy-modal-head">
              <div><p className="privacy-eyebrow">Your Privacy Choices</p><h2 id="privacy-title">Maxfiylik tanlovlari</h2></div>
              <button type="button" onClick={() => setShowSettings(false)} aria-label="Maxfiylik oynasini yopish">×</button>
            </div>
            <p className="privacy-lead">Majburiy bo‘lmagan kuzatuvni istalgan vaqtda yoqishingiz yoki o‘chirishingiz mumkin.</p>
            <div className="privacy-option">
              <div><strong>Zarur xotira</strong><p>Tema va maxfiylik tanlovingizni eslab qoladi. Saytning asosiy ishlashi uchun kerak.</p></div>
              <span>Doimo faol</span>
            </div>
            <div className="privacy-option">
              <div><label htmlFor="privacy-analytics"><strong>Anonim analitika</strong></label><p>Tashrif vaqti, sahifa, manba, til va qurilma turini saqlaydi. IP manzil saqlanmaydi.</p></div>
              <input id="privacy-analytics" type="checkbox" checked={analyticsEnabled} disabled={privacySignal} onChange={(event) => setAnalyticsEnabled(event.target.checked)} />
            </div>
            {privacySignal && <p className="privacy-signal-note">Brauzeringiz kuzatuvni cheklashni so‘ragani uchun analitika o‘chirilgan.</p>}
            <div className="privacy-modal-actions">
              <button type="button" className="button button-primary" onClick={() => saveChoice(analyticsEnabled)}>Tanlovni saqlash</button>
              <button type="button" className="button button-ghost" onClick={() => saveChoice(false)}>Barchasini rad etish</button>
            </div>
            <a className="privacy-policy-link" href="/privacy">Maxfiylik siyosatini o‘qish →</a>
          </div>
        </div>
      )}
    </>
  );
}
