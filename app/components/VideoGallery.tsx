"use client";

import { useEffect, useState } from "react";

const videos = [
  {
    id: "BQy49Y12YDo",
    title: "Bek va Lola — Badantarbiya 2",
    channel: "Bek va Lola",
    image: "https://i.ytimg.com/vi/BQy49Y12YDo/maxresdefault.jpg",
  },
  {
    id: "g7Km27hLJ5E",
    title: "Bek va Lola — Toza qo‘llar",
    channel: "Bek va Lola",
    image: "https://i.ytimg.com/vi/g7Km27hLJ5E/maxresdefault.jpg",
  },
  {
    id: "-Huu9yfBlsU",
    title: "Chip-chip jo‘jalarim",
    channel: "Yashil makon",
    image: "https://i.ytimg.com/vi/-Huu9yfBlsU/maxresdefault.jpg",
  },
];

export function VideoGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = videos.find((video) => video.id === activeId);

  useEffect(() => {
    if (!activeId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeId]);

  return (
    <>
      <div className="video-grid">
        {videos.map((video, index) => (
          <button
            className={`video-card ${index === 0 ? "video-card--featured" : ""}`}
            type="button"
            onClick={() => setActiveId(video.id)}
            key={video.id}
            aria-label={`${video.title} videosini shu sahifada ko‘rish`}
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
          </button>
        ))}
      </div>

      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} video player`}
        >
          <button
            className="video-modal-backdrop"
            type="button"
            onClick={() => setActiveId(null)}
            aria-label="Video oynasini yopish"
          />
          <div className="video-modal-panel">
            <div className="video-modal-header">
              <div>
                <span>{activeVideo.channel}</span>
                <h3>{activeVideo.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveId(null)} aria-label="Videoni yopish">×</button>
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
