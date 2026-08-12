"use client";

import { useEffect, useRef, useState } from "react";

const channels = [
  {
    name: "Bek va Lola",
    description: "Gigiyena, sog‘lom odatlar va kundalik foydali ko‘nikmalarni quvnoq hikoyalarga aylantiradigan oilaviy loyiha.",
    stats: ["Oilaviy format", "Qisqa epizodlar", "O‘zbek tilida"],
    videos: [
      { id: "BQy49Y12YDo", title: "Badantarbiya 2" },
      { id: "g7Km27hLJ5E", title: "Toza qo‘llar" },
    ],
  },
  {
    name: "Yashil makon",
    description: "Tabiat, suv va energiyani asrashni bolalar tushunadigan sodda, rang-barang sarguzashtlarda o‘rgatadi.",
    stats: ["Ekota’lim", "Bolalar uchun", "O‘zbek tilida"],
    videos: [
      { id: "t7yvEtXFJqE", title: "Yashil makonga aylantiraylik" },
      { id: "qbRTnc2G6uA", title: "Batareyalar zararlimi?" },
      { id: "-Huu9yfBlsU", title: "Chip-chip jo‘jalarim" },
    ],
  },
];

function ChannelShowcase({ channel }: { channel: (typeof channels)[number] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const activeVideo = channel.videos[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isVisible || isPaused || reduceMotion || channel.videos.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % channel.videos.length),
      16000,
    );
    return () => window.clearInterval(timer);
  }, [channel.videos.length, isPaused, isVisible]);

  function selectVideo(index: number) {
    setActiveIndex(index);
    setIsPaused(true);
  }

  return (
    <section
      className="channel-showcase steam-showcase"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
    >
      <div className="channel-heading">
        <div>
          <p className="channel-label">YouTube original</p>
          <h3>{channel.name}</h3>
          <p>{channel.description}</p>
        </div>
        <div className="channel-stats">
          <small>Loyiha formati</small>
          {channel.stats.map((stat) => <span key={stat}>{stat}</span>)}
        </div>
      </div>

      <div className="steam-stage">
        <div className="steam-player">
          {isVisible ? (
            <iframe
              key={activeVideo.id}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1`}
              title={`${channel.name} — ${activeVideo.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <img src={`https://i.ytimg.com/vi/${activeVideo.id}/maxresdefault.jpg`} alt="" loading="lazy" />
          )}
          <div className="steam-player-caption">
            <span>Hozir namoyishda</span>
            <strong>{activeVideo.title}</strong>
          </div>
        </div>

        <aside className="steam-details">
          <div>
            <span className="steam-kicker">MultBilim taqdim etadi</span>
            <h4>{activeVideo.title}</h4>
            <p>{channel.description}</p>
          </div>
          <div className="steam-stills" aria-label={`${channel.name} video tanlovi`}>
            {channel.videos.map((video, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                type="button"
                key={video.id}
                onClick={() => selectVideo(index)}
                aria-label={`${video.title} videosini ko‘rsatish`}
                aria-pressed={index === activeIndex}
              >
                <img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" loading="lazy" />
                <span>{video.title}</span>
              </button>
            ))}
          </div>
          <div className="steam-format">
            {channel.stats.map((stat) => <span key={stat}>{stat}</span>)}
          </div>
          <p className="steam-hint">Video ovozsiz boshlanadi. Ovoz va to‘liq ekran boshqaruvi videoning o‘zida.</p>
        </aside>
        <div className="steam-dots" aria-hidden="true">
          {channel.videos.map((video, index) => <i className={index === activeIndex ? "is-active" : ""} key={video.id} />)}
        </div>
      </div>
    </section>
  );
}

export function VideoGallery() {
  return <div className="channel-stack">{channels.map((channel) => <ChannelShowcase channel={channel} key={channel.name} />)}</div>;
}
