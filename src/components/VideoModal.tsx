import React, { useEffect } from "react";
import { Film } from "../types";
import { X, Clock, Film as FilmIcon, Shield } from "lucide-react";

interface VideoModalProps {
  film: Film;
  onClose: () => void;
}

export function VideoModal({ film, onClose }: VideoModalProps) {
  // Listen to Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in"
    >
      {/* Container holding the video */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the video panel
        className="w-full max-w-5xl flex flex-col items-stretch space-y-4"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between text-white border-b border-neutral-900 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#000000] bg-gold-imdb border border-gold-light/25 px-2 py-0.5 rounded font-mono">
                LECTEUR HD
              </span>
              {film.duration && (
                <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                  <Clock className="h-3 w-3 text-gold-imdb" />
                  <span>{film.duration}</span>
                </span>
              )}
            </div>
            <h3 className="font-bebas text-3xl md:text-4xl tracking-wide leading-none text-white">
              {film.title} <span className="text-neutral-500 font-sans text-xl ml-2 font-normal">({film.year})</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-850 hover:text-gold-imdb text-neutral-400 transition-colors border border-neutral-800 cursor-pointer shadow-lg"
            title="Fermer la vidéo (Echap)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Embed IFrame with strict 16:9 aspect ratio */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-850 bg-neutral-950 shadow-[0_20px_50px_rgba(245,197,24,0.08)]">
          <iframe
            src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${film.title} Trailer`}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info/Footer strip beneath video */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs py-2 px-3 rounded-lg bg-neutral-950 border border-neutral-900 text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span>Genre : <strong className="text-neutral-200">{film.genre}</strong></span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
            <Shield className="h-3 w-3 text-neutral-600" />
            <span>Astuce : pressez <strong>Echap</strong> ou cliquez dehors pour fermer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
