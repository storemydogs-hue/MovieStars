import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, 
  User, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Layers, 
  Home, 
  Sparkles, 
  Flame, 
  Compass, 
  Play, 
  Clock, 
  ChevronRight, 
  Info,
  RotateCcw
} from "lucide-react";
import { Star, Film as FilmType } from "../types";
import { starsData } from "../data";

interface CinemaNavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectStar: (starId: string | null) => void;
  onPlayTrailer: (film: FilmType) => void;
  favoritesStars: string[];
  toggleFavoriteStar: (starId: string) => void;
  favoritesFilms: string[];
  toggleFavoriteFilm: (youtubeId: string) => void;
}

export function CinemaNavbar({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  onSelectStar,
  onPlayTrailer,
  favoritesStars,
  toggleFavoriteStar,
  favoritesFilms,
  toggleFavoriteFilm
}: CinemaNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);

  // Monitor scroll height to trigger clean responsive shrinking + glassmorphism opacity updates
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper lists for curated collections layout
  const collections = [
    {
      id: "martial-arts",
      title: "Arts Martiaux & Sagesse",
      description: "Les plus grands combats de sabres, poings fermés et cascades infatigables",
      icon: <Sparkles className="h-4 w-4 text-[#F5C518]" />,
      actors: ["bruce-lee", "jackie-chan"]
    },
    {
      id: "adrenaline-pure",
      title: "Adrénaline & Heist Brutal",
      description: "Des courses-poursuites intenses et des braquages de haute voltige",
      icon: <Flame className="h-4 w-4 text-red-500" />,
      actors: ["jason-statham", "tom-cruise"]
    },
    {
      id: "cult-classics",
      title: "Piliers de Légende & Oscars",
      description: "Chefs-d'œuvre psychologiques et thrillers militaires d'anthologie",
      icon: <Layers className="h-4 w-4 text-blue-400" />,
      actors: ["robert-de-niro", "denzel-washington", "brad-pitt"]
    }
  ];

  // Helper data getters
  const listFavoriteStars = starsData.filter(star => favoritesStars.includes(star.id));
  
  const allFilms = starsData.reduce<FilmType[]>((acc, star) => {
    star.films.forEach(film => {
      if (!acc.some(f => f.youtubeId === film.youtubeId)) {
        acc.push(film);
      }
    });
    return acc;
  }, []);

  const listFavoriteFilms = allFilms.filter(film => favoritesFilms.includes(film.youtubeId));

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setShowCollectionsDropdown(false);
    setShowFavoritesDropdown(false);

    // Reset simple views or trigger page scrolls
    if (tabId === "accueil") {
      onSelectStar(null);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tabId === "acteurs") {
      onSelectStar(null);
      const el = document.getElementById("popular-actors-list") || document.getElementById("movie-news-section");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else if (tabId === "films") {
      onSelectStar(null);
      const el = document.getElementById("movie-news-section");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else if (tabId === "collections") {
      onSelectStar(null);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tabId === "favoris") {
      setShowFavoritesDropdown(prev => !prev);
      setShowCollectionsDropdown(false);
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled 
            ? "py-3 bg-[#050505]/95 backdrop-blur-md border-neutral-900/90 shadow-[0_5px_20px_rgba(0,0,0,0.8)]" 
            : "py-5 bg-gradient-to-b from-black/95 to-black/60 backdrop-blur-sm border-transparent"
        }`}
      >
        <div id="navigation-bar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-12">
            
            {/* 1. BRAND LOGO SECTION */}
            <div
              onClick={() => handleTabClick("accueil")}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-950 border border-gold-imdb/25 shadow-md shadow-gold-imdb/5 overflow-hidden transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <img src="/Movie.png" alt="Movie Stars" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-bebas text-2xl lg:text-3xl tracking-wider text-white group-hover:text-gold-imdb transition-colors block">
                  MOVIE <span className="text-[#F5C518]">STARS</span>
                </span>
                <p className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 -mt-1 leading-none font-mono">
                  Légendes Cinéma
                </p>
              </div>
            </div>

            {/* 2. DESKTOP NAVIGATION TABS */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-950/65 rounded-full border border-neutral-900 p-1">
              {/* ACCUEIL */}
              <button
                onClick={() => handleTabClick("accueil")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentTab === "accueil"
                    ? "bg-red-600 text-white shadow-md shadow-red-900/35"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Home className="h-3.5 w-3.5" />
                <span>Accueil</span>
              </button>

              {/* FILMS */}
              <button
                onClick={() => handleTabClick("films")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentTab === "films"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Film className="h-3.5 w-3.5 text-[#F5C518]" />
                <span>Films</span>
              </button>

              {/* ACTEURS */}
              <button
                onClick={() => handleTabClick("acteurs")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentTab === "acteurs"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Acteurs</span>
              </button>

              {/* COLLECTIONS LINK WITH DROPDOWN */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowCollectionsDropdown(true)}
                onMouseLeave={() => setShowCollectionsDropdown(false)}
              >
                <button
                  onClick={() => handleTabClick("collections")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentTab === "collections"
                      ? "bg-red-600 text-white shadow-md shadow-red-900/35"
                      : "text-neutral-400 hover:text-white border border-transparent"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-amber-500" />
                  <span>Collections</span>
                </button>

                {/* POPUP DROPDOWN MENU */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="rounded-2xl border border-neutral-900 bg-[#050505]/95 backdrop-blur-md p-2 shadow-[0_10px_30px_rgba(0,0,0,0.9)] space-y-1 overflow-hidden">
                    <a
                      href="/film-complet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      film complet
                    </a>

                    <a
                      href="/film-streaming-gratuit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      film streaming gratuit
                    </a>

                    <a
                      href="/films-et-acteurs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      films et acteurs
                    </a>

                    <a
                      href="/films-gratuits"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      films gratuits
                    </a>

                    <a
                      href="/films-hd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      films hd
                    </a>

                    <a
                      href="/film-youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      film youtube
                    </a>

                    <a
                      href="/top-films"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      top films
                    </a>

                    <a
                      href="/films-action"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      films action
                    </a>

                    <a
                      href="/movie-stars"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-900 hover:text-amber-500 transition-colors text-xs font-bold font-mono"
                    >
                      movie stars
                    </a>
                  </div>
                </div>
              </div>

              {/* FAVORIS WITH GORGEOUS FLOATING DOT */}
              <div className="relative">
                <button
                  onClick={() => handleTabClick("favoris")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    showFavoritesDropdown
                      ? "bg-red-950/40 text-red-400 border border-red-800/40"
                      : "text-neutral-400 hover:text-white border border-transparent"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  <span>Favoris</span>
                  {(favoritesStars.length > 0 || favoritesFilms.length > 0) && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border border-[#050505] flex items-center justify-center text-[8px] font-bold text-white leading-none">
                      {favoritesStars.length + favoritesFilms.length}
                    </span>
                  )}
                </button>
              </div>
            </nav>

            {/* 3. INTEGRATED SEARCH INPUT */}
            <div className="relative max-w-[200px] sm:max-w-xs w-full hidden md:block group">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#F5C518] transition-colors">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Rechercher une star, un film..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950/90 border border-neutral-900 group-hover:border-neutral-800 text-xs rounded-full py-2.5 pl-9 pr-8 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#F5C518]/50 focus:border-[#F5C518] transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-xs text-neutral-500 hover:text-[#F5C518]"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </div>

            {/* HAMBURGER TOGGLE BUTTON FOR MOBILE SCREEN */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 bg-neutral-950 rounded-xl border border-neutral-900/80 text-white cursor-pointer active:scale-95"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 4. CURATED COLLECTIONS MOVED DIRECTLY TO THE COLLECTIONS LINK TAB PAGE */}

        {/* 5. GORGEOUS DROP DOWN FOR PERSISTENT FAVORIS LIST */}
        <AnimatePresence>
          {showFavoritesDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute left-1/2 -translate-x-[80%] sm:-translate-x-[60%] mt-3 w-[290px] sm:w-[350px] bg-[#07070B] border border-neutral-800/80 rounded-2xl p-4 shadow-2xl z-50 text-left max-h-[460px] overflow-y-auto scrollbar-none"
            >
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="font-bebas text-lg uppercase tracking-wider text-white">MA PLAYLIST FAVORIS</span>
                </div>
                <span className="text-[9px] font-mono font-semibold bg-red-950 text-red-400 px-2 py-0.5 rounded-full border border-red-900/40">
                  {listFavoriteStars.length + listFavoriteFilms.length} ÉLÉMENTS
                </span>
              </div>

              {/* EMPTY STATE */}
              {listFavoriteStars.length === 0 && listFavoriteFilms.length === 0 && (
                <div className="py-8 text-center px-2">
                  <Heart className="h-7 w-7 text-neutral-700 mx-auto mb-2.5" />
                  <p className="text-xs text-neutral-400 font-sans">
                    Aucun favori enregistré pour le moment.
                  </p>
                  <p className="text-[10px] text-neutral-600 mt-1 font-sans">
                    Cliquez sur l'icône coeur sur les profils des acteurs ou sur les films pour les épingler ici !
                  </p>
                </div>
              )}

              {/* LIST FAVORITE STARS */}
              {listFavoriteStars.length > 0 && (
                <div className="space-y-2 mb-4">
                  <span className="text-[9px] font-black tracking-widest text-[#F5C518] uppercase block">ACTEURS FAVORIS ({listFavoriteStars.length})</span>
                  <div className="space-y-1.5">
                    {listFavoriteStars.map(star => (
                      <div 
                        key={star.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-900 hover:border-neutral-800"
                      >
                        <div 
                          className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          onClick={() => {
                            onSelectStar(star.id);
                            setShowFavoritesDropdown(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <img src={star.photo} alt={star.name} className="h-6 w-6 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                          <span className="text-xs font-bold text-neutral-200 hover:text-white truncate block">{star.name}</span>
                        </div>
                        <button
                          onClick={() => toggleFavoriteStar(star.id)}
                          className="text-neutral-500 hover:text-rose-500 p-1 cursor-pointer"
                          title="Retirer des favoris"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST FAVORITE FILMS */}
              {listFavoriteFilms.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[9px] font-black tracking-widest text-red-500 uppercase block">BANDES-ANNONCES ({listFavoriteFilms.length})</span>
                  <div className="space-y-1.5">
                    {listFavoriteFilms.map(film => (
                      <div 
                        key={film.youtubeId}
                        className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-900 hover:border-neutral-800"
                      >
                        <div 
                          className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          onClick={() => {
                            onPlayTrailer(film);
                            setShowFavoritesDropdown(false);
                          }}
                        >
                          <div className="h-6 w-10 bg-neutral-900 rounded overflow-hidden shrink-0 relative flex items-center justify-center">
                            <img src={film.poster || `https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`} alt={film.title} className="h-full w-full object-cover" />
                            <Play className="h-2 w-2 text-white fill-white absolute" />
                          </div>
                          <span className="text-xs font-bold text-neutral-200 hover:text-white truncate block">{film.title}</span>
                        </div>
                        <button
                          onClick={() => toggleFavoriteFilm(film.youtubeId)}
                          className="text-neutral-500 hover:text-rose-500 p-1 cursor-pointer"
                          title="Retirer des favoris"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 6. MOBILE NAVIGATION PANEL (Sliding height element) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden sticky top-16 z-40 bg-[#050505] border-b border-neutral-900 p-4 space-y-4 shadow-2xl mr-auto ml-auto max-w-7xl font-sans"
          >
            {/* Integrated Search Input for mobile */}
            <div className="relative w-full group">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Rechercher une star, un film..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 text-xs rounded-xl py-3 pl-10 pr-8 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all font-mono"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-xs text-neutral-500 hover:text-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            {/* Mobile Tab Links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTabClick("accueil")}
                className={`py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors font-mono ${
                  currentTab === "accueil"
                    ? "bg-red-600 text-white"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900/60"
                }`}
              >
                Accueil
              </button>

              <button
                onClick={() => handleTabClick("films")}
                className={`py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors font-mono ${
                  currentTab === "films"
                    ? "bg-red-600 text-white"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900/60"
                }`}
              >
                Films
              </button>

              <button
                onClick={() => handleTabClick("acteurs")}
                className={`py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors font-mono ${
                  currentTab === "acteurs"
                    ? "bg-red-600 text-white"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900/60"
                }`}
              >
                Acteurs
              </button>

              <div className="col-span-2 space-y-2 border border-neutral-900 bg-neutral-950/40 p-3 rounded-xl mt-1">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500 uppercase px-1">
                  <span>Collections</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <a
                    href="/film-complet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    film complet
                  </a>
                  <a
                    href="/film-streaming-gratuit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-[#050505] hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    film streaming gratuit
                  </a>
                  <a
                    href="/films-et-acteurs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    films et acteurs
                  </a>
                  <a
                    href="/films-gratuits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    films gratuits
                  </a>
                  <a
                    href="/films-hd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-[#050505] hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    films hd
                  </a>
                  <a
                    href="/film-youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    film youtube
                  </a>
                  <a
                    href="/top-films"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-[#050505] hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    top films
                  </a>
                  <a
                    href="/films-action"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    films action
                  </a>
                  <a
                    href="/movie-stars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-[#050505] hover:bg-neutral-900 border border-neutral-900 text-[11px] font-mono font-bold text-neutral-300 rounded-lg hover:text-white truncate px-1"
                  >
                    movie stars
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTabClick("favoris")}
              className={`w-full py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-colors ${
                showFavoritesDropdown
                  ? "bg-red-950/40 text-red-400 border border-red-800/40"
                  : "bg-neutral-950 text-neutral-300 border border-neutral-900/60"
              }`}
            >
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span>Voir mes Favoris ({favoritesStars.length + favoritesFilms.length})</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
