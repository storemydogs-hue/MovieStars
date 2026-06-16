import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Compass, Film, Sparkles, Flame, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { starsData } from "../data";

interface PremiumHeroProps {
  onExploreClick: () => void;
  onTrailersClick: () => void;
  onPlaySpotlight: () => void;
}

const HERO_BACKGROUNDS = [
  {
    image: "/images/the_foreigner.jpg",
    title: "The Foreigner",
    star: "Jackie Chan",
    year: "2017",
    color: "from-red-600/30"
  },
  {
    image: "/images/inglourious_basterds.jpg",
    title: "Inglourious Basterds",
    star: "Brad Pitt",
    year: "2009",
    color: "from-amber-500/30"
  },
  {
    image: "/images/the_mummy_return.jpg",
    title: "La Momie",
    star: "Tom Cruise",
    year: "2017",
    color: "from-blue-600/30"
  },
  {
    image: "/images/crank.jpg",
    title: "Crank",
    star: "Jason Statham",
    year: "2006",
    color: "from-rose-600/30"
  }
];

export function PremiumHero({ onExploreClick, onTrailersClick, onPlaySpotlight }: PremiumHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHoveringBtn, setIsHoveringBtn] = useState<string | null>(null);

  // Auto-rotate backgrounds for a dynamic cinema atmosphere
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Parallax effect calculated based on cursor offset
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Get percentage offset from center (-0.5 to 0.5)
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setMouseCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNextBg = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
  };

  const handlePrevBg = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_BACKGROUNDS.length) % HERO_BACKGROUNDS.length);
  };

  const activeBg = HERO_BACKGROUNDS[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div 
      id="premium-cinema-hero" 
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505] rounded-3xl border border-neutral-900/90 shadow-2xl px-4 sm:px-6 lg:px-12 py-12 mb-10 select-none group"
    >
      {/* 1. PARALLAX KEN BURNS BACKGROUND IMAGE UNDERLAY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ 
              opacity: 1, 
              scale: 1.05,
              x: mouseCoords.x * -25, // Parallax translation offset
              y: mouseCoords.y * -25
            }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 12, ease: "easeOut" }, // Constant slow zooming
              x: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.6, ease: "easeOut" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeBg.image}
              alt={activeBg.title}
              className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic shading layers: Bottom black hole, central neon radial, and top-to-bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
        <div className="absolute inset-0 bg-radial-gradient-cinematic from-transparent via-black/35 to-[#050505]" />
        
        {/* Colorful cinematic neon glow changing dynamically with selection */}
        <div className={`absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t ${activeBg.color} to-transparent opacity-20 blur-3xl transition-all duration-1000`} />
      </div>

      {/* 2. MANUAL HERO SLIDESHOW NAVIGATION (Subtle visual pill) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-full p-1.5 shadow-lg">
        <button
          onClick={handlePrevBg}
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          title="Bande-annonce précédente"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-neutral-400 px-1">
          {currentIndex + 1} / {HERO_BACKGROUNDS.length}
        </span>
        <button
          onClick={handleNextBg}
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          title="Bande-annonce suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Background Active Movie Badge (Netflix style HUD info) */}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/75 backdrop-blur border border-neutral-800/60 px-3.5 py-1.5 rounded-full text-[10px] text-neutral-300 font-mono">
        <span className="h-2 w-2 rounded-full bg-[#F5C518] animate-pulse" />
        <span>SPOTLIGHT : </span>
        <strong className="text-white font-bold">{activeBg.title}</strong>
        <span className="text-neutral-500">({activeBg.year})</span>
      </div>

      {/* 3. HERO CONTENT CONTAINER WITH FADE-UP ANIMATIONS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl text-center md:text-left space-y-6 md:space-y-8"
      >
        {/* Category high quality tag */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 rounded-full bg-red-950/40 border border-red-500/20 px-4 py-1.5 text-xs text-red-400 backdrop-blur-md shadow-lg shadow-red-900/10 mx-auto md:mx-0">
          <Sparkles className="h-3.5 w-3.5 animate-spin-slow text-[#F5C518]" />
          <span className="font-mono font-bold tracking-wider uppercase text-[10px]">PREMIUM CINEMA EXPERT</span>
        </motion.div>

        {/* Grand Title: MOVIE STARS with golden glowing accents */}
        <div className="space-y-2">
          <motion.h1 
            variants={itemVariants}
            className="font-bebas text-6xl sm:text-8xl md:text-9xl text-white tracking-wider leading-none text-shadow-cinematic select-none"
          >
            MOVIE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] via-[#FFD700] to-red-500 font-extrabold filter drop-shadow-[0_4px_12px_rgba(245,197,24,0.3)]">STARS</span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-red-600 to-[#F5C518] rounded-full mx-auto md:mx-0 shadow-md shadow-red-500/30"
          />
        </div>

        {/* Immersive Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans"
        >
          L'univers légendaire des monstres sacrés du cinéma d'action. Explorez leurs carrières pharaoniques, étudiez leurs statistiques d'arène authentiques et visionnez les bandes-annonces restaurées en haute définition intégrale.
        </motion.p>

        {/* Action button triggers with hover premium glow */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2"
        >
          {/* Button 1: Explorer les films */}
          <button
            onClick={onExploreClick}
            onMouseEnter={() => setIsHoveringBtn("explore")}
            onMouseLeave={() => setIsHoveringBtn(null)}
            className="w-full sm:w-auto relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-95 shadow-lg shadow-red-900/30 font-mono hover:shadow-[0_0_25px_rgba(220,38,38,0.45)]"
          >
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Explorer les films</span>
          </button>

          {/* Button 2: Voir les bandes-annonces */}
          <button
            onClick={onTrailersClick}
            onMouseEnter={() => setIsHoveringBtn("trailers")}
            onMouseLeave={() => setIsHoveringBtn(null)}
            className="w-full sm:w-auto cursor-pointer rounded-xl bg-neutral-950/85 hover:bg-neutral-900/90 border border-neutral-800 hover:border-[#F5C518]/50 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-95 shadow-md shadow-black/85 font-mono"
          >
            <Play className="h-4 w-4 text-[#F5C518] fill-[#F5C518]" />
            <span>Actualités & Bandes-annonces</span>
          </button>

          {/* Button 3: Random Spotlight trigger */}
          <button
            onClick={onPlaySpotlight}
            className="w-full sm:w-auto cursor-pointer rounded-xl bg-transparent border border-white/5 hover:border-white/10 hover:bg-white/5 text-[10px] text-neutral-400 hover:text-white font-bold font-mono tracking-widest uppercase px-5 py-4 flex items-center justify-center gap-1.5 transition-all"
            title="Lancer la bande-annonce vedette actuellement sélectionnée"
          >
            <Film className="h-3.5 w-3.5 text-neutral-500 text-center" />
            <span>VOIR {activeBg.title} ({activeBg.year})</span>
          </button>
        </motion.div>

        {/* 4. EXCLUSIVE LIVE HUB COUNTERS DETAIL */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl pt-6 border-t border-neutral-900/70"
        >
          <div className="flex items-center gap-3 bg-[#0A0A0F]/70 backdrop-blur rounded-xl p-3 border border-neutral-900/80 hover:border-red-600/20 transition-all group/stat">
            <div className="h-8 w-8 rounded-lg bg-red-950/60 flex items-center justify-center text-red-500 font-bold text-lg select-all">
              7
            </div>
            <div>
              <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">MONSTRES</span>
              <span className="text-[11px] font-bold text-neutral-300">Acteurs Sacrés</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0A0A0F]/70 backdrop-blur rounded-xl p-3 border border-neutral-900/80 hover:border-[#F5C518]/20 transition-all group/stat">
            <div className="h-8 w-8 rounded-lg bg-amber-950/60 flex items-center justify-center text-[#F5C518] font-bold text-lg select-all">
              35
            </div>
            <div>
              <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">TRAILERS</span>
              <span className="text-[11px] font-bold text-neutral-300">Restauration HD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0A0A0F]/70 backdrop-blur rounded-xl p-3 border border-neutral-900/80 hover:border-green-600/20 transition-all col-span-2 sm:col-span-1 group/stat">
            <div className="h-8 w-8 rounded-lg bg-green-950/40 flex items-center justify-center text-green-500 font-bold select-all">
              ✓
            </div>
            <div>
              <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">LATENCE</span>
              <span className="text-[11px] font-bold text-emerald-400">100% Fluide</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
