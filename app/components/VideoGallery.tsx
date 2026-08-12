"use client";

import { useEffect, useState } from "react";

const channels = [
  {
    name: "Bek va Lola",
    description: "Gigiyena, sog‘lom odatlar va kundalik foydali ko‘nikmalarni quvnoq hikoyalarga aylantiradigan oilaviy loyiha.",
    url: "https://www.youtube.com/@BekvaLola",
    stats: ["37,3 mln ko‘rish", "15+ epizod", "2 yil efirda"],
    videos: [
      { id: "BQy49Y12YDo", title: "Badantarbiya 2" },
      { id: "g7Km27hLJ5E", title: "Toza qo‘llar" },
    ],
  },
  {
    name: "Yashil makon",
    description: "Tabiat, suv va energiyani asrashni bolalar tushunadigan sodda, rang-barang sarguzashtlarda o‘rgatadi.",
    url: "https://www.youtube.com/@yashilmakonuz",
    stats: ["3,2 mln+ ko‘rish", "15+ epizod", "2025 boshlangan"],
    videos: [
      { id: "t7yvEtXFJqE", title: "Yashil makonga aylantiraylik" },
      { id: "qbRTnc2G6uA", title: "Batareyalar zararlimi?" },
      { id: "-Huu9yfBlsU", title: "Chip-chip jo‘jalarim" },
    ],
  },
];

type ActiveVideo = { id: string; title: string; channel: string } | null;

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  return (
    <>
      <div className="channel-stack">
        {channels.map((channel) => (
          <section className="channel-showcase" key={channel.name}>
            <div className="channel-heading">
              <div>
                <p className="channel-label">YouTube original</p>
                <h3>{channel.name}</h3>
                <p>{channel.description}</p>
              </div>
              <div className="channel-stats">
                <small>Demo statistika</small>
                {channel.stats.map((stat) => <span key={stat}>{stat}</span>)}
              </div>
            </div>
            <div className="video-grid video-grid--channel">
              {channel.videos.map((video, index) => (
                <button
                  className="video-card"
                  type="button"
                  onClick={() => setActiveVideo({ ...video, channel: channel.name })}
                  key={video.id}
                  aria-label={`${video.title} videosini shu sahifada ko‘rish`}
                >
                  <div className="video-visual">
                    <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} alt="" loading="lazy" />
                    <span className="video-play">▶</span>
                    <span className="video-count">0{index + 1}</span>
                  </div>
                  <div className="video-info">
                    <span>{channel.name}</span>
                    <h4>{video.title}</h4>
                  </div>
                </button>
              ))}
              <a className="channel-more" href={channel.url} target="_blank" rel="noreferrer">
                <span>Barcha videolar</span><b>↗</b>
              </a>
            </div>
          </section>
        ))}
      </div>

      {activeVideo && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${activeVideo.title} video player`}>
          <button className="video-modal-backdrop" type="button" onClick={() => setActiveVideo(null)} aria-label="Video oynasini yopish" />
          <div className="video-modal-panel">
            <div className="video-modal-header">
              <div><span>{activeVideo.channel}</span><h3>{activeVideo.title}</h3></div>
              <button type="button" onClick={() => setActiveVideo(null)} aria-label="Videoni yopish">×</button>
            </div>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
