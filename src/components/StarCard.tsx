import React, { useState } from "react";
import { Star } from "../types";
import { Film, Globe, Calendar, Quote, Sparkles, Heart } from "lucide-react";

interface StarCardProps {
  key?: React.Key;
  star: Star;
  onClick: () => void;
  index: number;
  isFeatured?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const STAR_QUOTES: Record<string, string> = {
  "bruce-lee": "La connaissance donne le pouvoir, mais le caractère donne le respect.",
  "jackie-chan": "Je ne veux pas être le prochain Bruce Lee, je veux être le premier Jackie Chan.",
  "tom-cruise": "Je crois aux grands écrans et aux expériences cinématographiques spectaculaires.",
  "brad-pitt": "Le cinéma est une suite de moments de pure magie.",
  "denzel-washington": "Faites ce que vous devez faire pour pouvoir faire ce que vous voulez faire.",
  "robert-de-niro": "Vous ne saurez jamais si vous n'essayez pas.",
  "jason-statham": "Si vous allez faire quelque chose, faites-le avec style."
};

export function StarCard({ 
  star, 
  onClick, 
  index, 
  isFeatured = false,
  isFavorite = false,
  onToggleFavorite
}: StarCardProps) {
  const [imgError, setImgError] = useState(false);

  // Get initials for initials-overlay background pattern
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(star.name);

  if (isFeatured) {
    return (
      <div
        onClick={onClick}
        style={{ animationDelay: `${index * 80}ms` }}
        className="fade-in star-card lg:col-span-2 lg:row-span-2 rounded-2xl flex flex-col justify-between p-6 sm:p-8 group border-2 border-gold-imdb hover:shadow-[0_8px_30px_rgb(245,197,24,0.25)] relative overflow-hidden cursor-pointer"
      >
        {/* Subtle decorative gold gradient spotlight */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-gold-imdb to-transparent transition-opacity duration-300 group-hover:opacity-30" />

        {/* Hero image preview absolute on right layout or background styled overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-35 md:opacity-50 pointer-events-none overflow-hidden mask-gradient">
          {!imgError ? (
            <img
              src={star.photo}
              alt={star.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#12121A] to-[#12121A] md:via-[#12121A]/80 md:to-[#12121A]" />
        </div>

        {/* Content Box */}
        <div className="z-10 flex flex-col h-full justify-between gap-6">
          {/* Top category bar */}
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-imdb text-black text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
              <Sparkles className="h-3 w-3 fill-current" />
              Légende Vedette
            </span>
            <div className="flex items-center gap-3">
              <span className="text-gold-imdb text-xs font-bold font-mono tracking-widest">{star.films.length} FILMS</span>
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(e);
                  }}
                  className={`p-2 rounded-full backdrop-blur border shadow transition-all active:scale-90 ${
                    isFavorite
                      ? "bg-rose-950/90 border-rose-500/40 text-rose-500"
                      : "bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-rose-500 hover:border-rose-500/30"
                  }`}
                  title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500" : ""}`} />
                </button>
              )}
            </div>
          </div>

          {/* Middle quote / name block */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-7xl display-font font-black leading-none text-white tracking-tight group-hover:text-gold-imdb transition-colors">
              {star.name}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-serif italic max-w-md leading-relaxed">
              "{STAR_QUOTES[star.id] || "Acteur iconique et inimitable du cinéma d'action."}"
            </p>
          </div>

          {/* Bottom quick statistics bento block */}
          <div className="flex flex-wrap gap-4 sm:gap-8 border-t border-white/10 pt-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Films</span>
              <span className="text-xl sm:text-2xl font-bold text-gold-imdb font-mono">{star.films.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Actif</span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-100 font-mono">{star.career.replace("Présent", "Pr.")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest">Origine</span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-100 font-mono">
                {star.nationality.split(" / ")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Massive watermark background overlay */}
        <div className="initials-overlay text-[8rem] sm:text-[14rem] select-none text-white opacity-[0.03] sm:opacity-[0.05]">
          {initials}
        </div>
      </div>
    );
  }

  // Classic modular Bento Box layout
  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="fade-in star-card rounded-xl p-5 flex flex-col justify-between group h-[220px] transition-all duration-300 relative overflow-hidden cursor-pointer"
    >
      {/* Absolute image container with high transparency/gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-40 pointer-events-none overflow-hidden">
        {!imgError ? (
          <img
            src={star.photo}
            alt={star.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12121A] via-[#12121A]/20 to-transparent" />
      </div>

      <div className="flex justify-between items-start z-10 w-full animate-fade-in">
        {/* Colorful gradient fallback emblem */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center font-bold font-mono text-base border border-white/10 text-gold-imdb shrink-0">
          {initials}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#F5C518] text-xs font-bold font-mono bg-neutral-950/80 px-2 py-1 rounded border border-neutral-800">
            {star.films.length} FILMS
          </span>
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(e);
              }}
              className={`p-1.5 rounded-full backdrop-blur border shadow transition-all active:scale-95 ${
                isFavorite
                  ? "bg-rose-950/95 border-rose-500/40 text-rose-500"
                  : "bg-neutral-950/90 border-neutral-800 text-neutral-400 hover:text-rose-500 hover:border-rose-500/30"
              }`}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-500" : ""}`} />
            </button>
          )}
        </div>
      </div>

      <div className="z-10 mt-auto">
        <h3 className="text-2xl display-font text-white transition-colors duration-300 group-hover:text-gold-imdb leading-tight">
          {star.name}
        </h3>
        <p className="text-[10px] uppercase text-gray-400 tracking-widest mt-1 font-mono">
          {star.nationality} • {star.career}
        </p>
      </div>

      {/* Decorative arrow overlay */}
      <div className="absolute bottom-5 right-5 p-2 bg-gold-imdb/10 rounded-full border border-gold-imdb/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 z-20">
        <svg className="w-4 h-4 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Initials Watermark Background */}
      <div className="initials-overlay text-7xl select-none text-white opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300">
        {initials}
      </div>
    </div>
  );
}
