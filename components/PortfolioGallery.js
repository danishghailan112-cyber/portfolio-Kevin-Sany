"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";
import { photos, videos } from "@/lib/data";

const PHOTO_INITIAL = 6;
const VIDEO_INITIAL = 8;

export default function PortfolioGallery() {
  const [tab, setTab] = useState("photo"); // "photo" | "video"
  const [format, setFormat] = useState("horizontal"); // "horizontal" | "vertical"
  const [photoLimit, setPhotoLimit] = useState(PHOTO_INITIAL);
  const [videoLimit, setVideoLimit] = useState(VIDEO_INITIAL);
  const [lightbox, setLightbox] = useState(null); // { type, index } | null

  // Videos are filtered by the current format so the toggle actually swaps
  // between the photographer's horizontally- and vertically-shot projects.
  const formatVideos = videos.filter((v) => v.orientation === format);

  const visiblePhotos = photos.slice(0, photoLimit);
  const visibleVideos = formatVideos.slice(0, videoLimit);

  const closeLightbox = () => setLightbox(null);
  const showPhotoAt = (index) => setLightbox({ type: "photo", index });
  const showVideoAt = (index) => setLightbox({ type: "video", index });

  // Reset video pagination when switching formats so the count matches the
  // new list rather than carrying over a limit from the other orientation.
  const switchFormat = () => {
    setFormat((f) => (f === "horizontal" ? "vertical" : "horizontal"));
    setVideoLimit(VIDEO_INITIAL);
  };

  const stepPhoto = (delta) => {
    setLightbox((cur) => {
      if (!cur || cur.type !== "photo") return cur;
      const next = (cur.index + delta + photos.length) % photos.length;
      return { type: "photo", index: next };
    });
  };

  const stepVideo = (delta) => {
    setLightbox((cur) => {
      if (!cur || cur.type !== "video") return cur;
      const next = (cur.index + delta + formatVideos.length) % formatVideos.length;
      return { type: "video", index: next };
    });
  };

  return (
    <section id="portfolio" className="scroll-mt-[65px] mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
      {/* Heading + tab switch */}
      <Reveal from="bottom" className="flex flex-col items-center text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
          {tab === "photo" ? "Photographer" : "Videographer"}
        </h1>

        <div className="mt-6 inline-flex items-center rounded-full border border-white/25 p-1">
          {[
            { key: "photo", label: "Photographer" },
            { key: "video", label: "Videographer" },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setTab(opt.key)}
              className="relative rounded-full px-5 py-2 text-sm font-medium sm:px-6"
            >
              {tab === opt.key && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  tab === opt.key ? "text-black" : "text-white/70"
                }`}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        {tab === "video" && (
          <button
            type="button"
            onClick={switchFormat}
            className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white sm:text-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded border border-white/40">
              <Image
                src="/icons/smartphone-white.png"
                alt=""
                width={12}
                height={12}
                className={`transition-transform duration-300 ${
                  format === "horizontal" ? "rotate-0" : "rotate-90"
                }`}
              />
            </span>
            Tap for {format === "horizontal" ? "Vertical" : "Horizontal"} Format
          </button>
        )}
      </Reveal>

      {/* Photographer grid */}
      {tab === "photo" && (
        <>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {visiblePhotos.map((photo, i) => (
              <Reveal
                key={photo.id}
                from="bottom"
                delay={(i % 3) * 0.08}
                amount={0.15}
              >
                <button
                  type="button"
                  onClick={() => showPhotoAt(i)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-[var(--color-bg-soft)]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-sm font-semibold text-white">
                      {photo.title}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          {photoLimit < photos.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setPhotoLimit(photos.length)}
                className="text-sm font-medium text-white/50 underline underline-offset-4 transition-colors hover:text-white"
              >
                see more
              </button>
            </div>
          )}
        </>
      )}

      {/* Videographer grid */}
      {tab === "video" && (
        <>
          <div
            key={format}
            className={`mt-10 grid gap-4 sm:gap-5 ${
              format === "horizontal"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {visibleVideos.map((video, i) => (
              <Reveal
                key={video.id}
                from="bottom"
                delay={(i % 8) * 0.06}
                amount={0.1}
              >
                <button
                  type="button"
                  onClick={() => showVideoAt(i)}
                  className={`group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-[var(--color-bg-soft)] ${
                    format === "horizontal" ? "aspect-video" : "aspect-[9/16]"
                  }`}
                >
                  {video.poster ? (
                    <Image
                      src={video.poster}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-black px-4 text-center">
                      <span className="font-[family-name:var(--font-display)] text-base font-semibold text-white/80 sm:text-lg">
                        {video.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 truncate text-left text-xs font-medium text-white/90 sm:text-sm">
                    {video.title}
                  </span>
                  {video.meta && (
                    <span className="absolute right-3 top-3 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white/80">
                      {video.meta}
                    </span>
                  )}
                </button>
              </Reveal>
            ))}
          </div>

          {videoLimit < formatVideos.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVideoLimit(formatVideos.length)}
                className="text-sm font-medium text-white/50 underline underline-offset-4 transition-colors hover:text-white"
              >
                see more
              </button>
            </div>
          )}
        </>
      )}

      {/* Photo lightbox */}
      <Lightbox
        open={lightbox?.type === "photo"}
        onClose={closeLightbox}
        label="Photo preview"
      >
        {lightbox?.type === "photo" && (
          <div className="flex flex-col items-center">
            <div className="relative flex max-h-[75vh] w-full items-center justify-center">
              <button
                type="button"
                onClick={() => stepPhoto(-1)}
                aria-label="Previous photo"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:border-white sm:-left-14"
              >
                ‹
              </button>
              <div className="relative max-h-[75vh] w-full overflow-hidden rounded-2xl border border-white/15">
                <Image
                  src={photos[lightbox.index].src}
                  alt={photos[lightbox.index].title}
                  width={1600}
                  height={1000}
                  className="max-h-[75vh] w-full object-contain"
                  priority
                />
              </div>
              <button
                type="button"
                onClick={() => stepPhoto(1)}
                aria-label="Next photo"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:border-white sm:-right-14"
              >
                ›
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-white">
                {photos[lightbox.index].title}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {photos[lightbox.index].caption} · {photos[lightbox.index].meta}
              </p>
            </div>
          </div>
        )}
      </Lightbox>

      {/* Video lightbox */}
      <Lightbox
        open={lightbox?.type === "video"}
        onClose={closeLightbox}
        label="Video player"
      >
        {lightbox?.type === "video" && (
          <VideoLightboxContent
            video={formatVideos[lightbox.index]}
            format={format}
            onPrev={() => stepVideo(-1)}
            onNext={() => stepVideo(1)}
          />
        )}
      </Lightbox>
    </section>
  );
}

function VideoLightboxContent({ video, format, onPrev, onNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (video?.type === "local" && videoRef.current) {
      // Best-effort autoplay with sound — this runs as a direct result of
      // the user's click that opened the lightbox.
      videoRef.current.play?.().catch(() => {
        /* Autoplay-with-sound was blocked; the visible controls let the
           user start playback with one more click. */
      });
    }
  }, [video]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex w-full items-center justify-center">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous video"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:border-white sm:-left-14"
        >
          ‹
        </button>

        {video.type === "youtube" ? (
          <div
            className={`relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black ${
              format === "vertical" ? "mx-auto max-w-xs aspect-[9/16]" : "aspect-video"
            }`}
          >
            <iframe
              key={video.youtubeId}
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : (
          <div className="flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black">
            <video
              key={video.src}
              ref={videoRef}
              src={video.src}
              poster={video.poster || undefined}
              controls
              playsInline
              autoPlay
              className="max-h-[75vh] w-auto max-w-full"
            />
          </div>
        )}

        <button
          type="button"
          onClick={onNext}
          aria-label="Next video"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/40 p-2 text-white transition-colors hover:border-white sm:-right-14"
        >
          ›
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-white">{video.title}</p>
        {(video.caption || video.meta) && (
          <p className="mt-1 text-xs text-white/50">
            {[video.caption, video.meta].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
