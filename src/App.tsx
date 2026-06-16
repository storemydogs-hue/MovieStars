import React, { useState, useMemo, useEffect } from "react";
import { starsData } from "./data";
import { Star, Film } from "./types";
import { StarCard } from "./components/StarCard";
import { StarDetail } from "./components/StarDetail";
import { VideoModal } from "./components/VideoModal";
import { CinemaNews } from "./components/CinemaNews";
import { PremiumHero } from "./components/PremiumHero";
import { CinemaNavbar } from "./components/CinemaNavbar";
import { CinemaFooter } from "./components/CinemaFooter";
import { AIPersonalizedRecommendations } from "./components/AIPersonalizedRecommendations";
import { CollectionsTab } from "./components/CollectionsTab";
import { Search, Film as FilmIcon, Sparkles, Award, Play, Clapperboard, RotateCcw } from "lucide-react";

export default function App() {
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrailer, setActiveTrailer] = useState<Film | null>(null);
  const [currentTab, setCurrentTab] = useState("accueil");

  // Cinema Theme State (Mode Sombre / Mode Éclairé)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("cinema_theme_dark");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Keep theme state linked to HTML class / body attributes
  useEffect(() => {
    try {
      localStorage.setItem("cinema_theme_dark", JSON.stringify(isDarkMode));
    } catch (e) {
      console.error(e);
    }

    if (isDarkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [isDarkMode]);


  // Persistent favorite actors and films via localStorage
  const [favoritesStars, setFavoritesStars] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fav_movie_stars");
      return saved ? JSON.parse(saved) : ["bruce-lee"];
    } catch {
      return ["bruce-lee"];
    }
  });

  const [favoritesFilms, setFavoritesFilms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fav_movie_films");
      return saved ? JSON.parse(saved) : ["RW6BqtVoIqI"];
    } catch {
      return ["RW6BqtVoIqI"];
    }
  });

  // Sync back to local storage
  useEffect(() => {
    try {
      localStorage.setItem("fav_movie_stars", JSON.stringify(favoritesStars));
    } catch (e) {
      console.error(e);
    }
  }, [favoritesStars]);

  useEffect(() => {
    try {
      localStorage.setItem("fav_movie_films", JSON.stringify(favoritesFilms));
    } catch (e) {
      console.error(e);
    }
  }, [favoritesFilms]);

  const toggleFavoriteStar = (starId: string) => {
    setFavoritesStars((prev) => 
      prev.includes(starId) ? prev.filter((id) => id !== starId) : [...prev, starId]
    );
  };

  const toggleFavoriteFilm = (youtubeId: string) => {
    setFavoritesFilms((prev) => 
      prev.includes(youtubeId) ? prev.filter((id) => id !== youtubeId) : [...prev, youtubeId]
    );
  };

  // User Played and Visited histories
  const [playedFilmsHistory, setPlayedFilmsHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("played_films_history");
      return saved ? JSON.parse(saved) : ["RW6BqtVoIqI"];
    } catch {
      return ["RW6BqtVoIqI"];
    }
  });

  const [visitedStarsHistory, setVisitedStarsHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("visited_stars_history");
      return saved ? JSON.parse(saved) : ["bruce-lee"];
    } catch {
      return ["bruce-lee"];
    }
  });

  // Sync histories back to local storage
  useEffect(() => {
    try {
      localStorage.setItem("played_films_history", JSON.stringify(playedFilmsHistory));
    } catch (e) {
      console.error(e);
    }
  }, [playedFilmsHistory]);

  useEffect(() => {
    try {
      localStorage.setItem("visited_stars_history", JSON.stringify(visitedStarsHistory));
    } catch (e) {
      console.error(e);
    }
  }, [visitedStarsHistory]);

  // Wrapper triggers which capture history
  const handleSelectStar = (starId: string | null) => {
    setSelectedStarId(starId);
    if (starId) {
      setVisitedStarsHistory((prev) => 
        prev.includes(starId) ? prev : [starId, ...prev].slice(0, 15)
      );
    }
  };

  const handlePlayTrailer = (film: Film) => {
    setActiveTrailer(film);
    if (film && film.youtubeId) {
      setPlayedFilmsHistory((prev) => 
        prev.includes(film.youtubeId) ? prev : [film.youtubeId, ...prev].slice(0, 15)
      );
    }
  };

  // Find the selected star object
  const selectedStar = useMemo(() => {
    return starsData.find((s) => s.id === selectedStarId) || null;
  }, [selectedStarId]);

  // Combined smart filter (searches Actor name, Nationality, Film title, Genre)
  const filteredStars = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return starsData;

    return starsData.filter((star) => {
      const matchName = star.name.toLowerCase().includes(query);
      const matchNationality = star.nationality.toLowerCase().includes(query);
      const matchFilm = star.films.some(
        (f) =>
          f.title.toLowerCase().includes(query) ||
          f.genre.toLowerCase().includes(query)
      );
      return matchName || matchNationality || matchFilm;
    });
  }, [searchQuery]);

  // Calculate total trailer counts to show in standard UI summary
  const totalFilmCount = useMemo(() => {
    return starsData.reduce((acc, curr) => acc + curr.films.length, 0);
  }, []);

  return (
    <div id="app-root-container" className={`min-h-screen transition-all duration-300 ${isDarkMode ? "bg-[#0A0A0F] text-white" : "bg-[#F3F4F6] text-neutral-900"} flex flex-col selection:bg-gold-imdb selection:text-neutral-950 font-sans`}>
      {/* Decorative Golden Ambient Orb background spots */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60vh] right-[10%] w-[400px] h-[400px] bg-gold-imdb/5 rounded-full blur-[100px] pointer-events-none" />

      {/* CINEMA NAVBAR WITH MODERN DESIGN & GLASSMORPHISM */}
      <CinemaNavbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectStar={handleSelectStar}
        onPlayTrailer={handlePlayTrailer}
        favoritesStars={favoritesStars}
        toggleFavoriteStar={toggleFavoriteStar}
        favoritesFilms={favoritesFilms}
        toggleFavoriteFilm={toggleFavoriteFilm}
      />

      {/* MAIN LAYOUT GATE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {selectedStar ? (
          /* SINGLE STAR PROFILE PAGE */
          <StarDetail
            star={selectedStar}
            onBack={() => {
              handleSelectStar(null);
              setCurrentTab("accueil");
            }}
            onPlayTrailer={(film) => handlePlayTrailer(film)}
            favoritesStars={favoritesStars}
            toggleFavoriteStar={toggleFavoriteStar}
            favoritesFilms={favoritesFilms}
            toggleFavoriteFilm={toggleFavoriteFilm}
          />
        ) : currentTab === "collections" ? (
          /* COLLECTIONS PREMIUM ARTICLES HUB */
          <CollectionsTab
            onSelectStar={handleSelectStar}
            onPlayTrailer={handlePlayTrailer}
            setCurrentTab={setCurrentTab}
          />
        ) : (
          /* HOME SCREEN - STARS INDEX && CARDS GRID */
          <div className="space-y-10">
            
            {/* Curated Hero Intro Section replaced with PremiumHero */}
            <PremiumHero
              onExploreClick={() => {
                const el = document.getElementById("popular-actors-list");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onTrailersClick={() => {
                const el = document.getElementById("movie-news-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onPlaySpotlight={() => {
                // Find Jackie Chan's 'the Foreigner' movie in starsData if exists, or play default structure
                const targetFilm = {
                  title: "the Foreigner",
                  year: 2017,
                  genre: "Thriller Action",
                  youtubeId: "th6w3CpFKRc",
                  duration: "1h 53m",
                  poster: "/images/the_foreigner.jpg"
                };
                handlePlayTrailer(targetFilm);
              }}
            />

            {!searchQuery && <CinemaNews />}

            {/* SECTION: RECOMMANDÉ POUR VOUS (IA CINEMA ALGORITHM - NETFLIX + IMDB DESIGN) */}
            {!searchQuery && (
              <AIPersonalizedRecommendations
                favoritesStars={favoritesStars}
                favoritesFilms={favoritesFilms}
                playedFilmsHistory={playedFilmsHistory}
                visitedStarsHistory={visitedStarsHistory}
                onPlayTrailer={handlePlayTrailer}
                toggleFavoriteFilm={toggleFavoriteFilm}
                isDarkMode={isDarkMode}
              />
            )}

            {/* SECTION: ACTEURS POPULAIRES */}
            {!searchQuery && (
              <div id="popular-actors-list" className="space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
                  <div className="h-6 w-1 bg-gold-imdb rounded-full" />
                  <h3 className="font-bebas text-3xl tracking-wide text-white uppercase flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold-imdb animate-pulse" />
                    Acteurs populaires
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {starsData.map((star) => (
                    <div key={star.id} className="group relative rounded-xl overflow-hidden bg-neutral-900/40 border border-neutral-800/80 hover:border-gold-imdb/55 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col h-[380px]">
                      {/* Actor Photo */}
                      <div className="relative h-2/3 w-full overflow-hidden bg-neutral-950">
                        <img 
                          src={star.photo} 
                          alt={star.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-90" />
                        
                        {/* Nationality Badge */}
                        <span className="absolute top-3 left-3 bg-neutral-950/90 text-[10px] font-bold uppercase tracking-wider text-gold-imdb border border-neutral-800 px-2.5 py-1 rounded">
                          {star.nationality}
                        </span>
                      </div>

                      {/* Actor Info */}
                      <div className="p-4 flex flex-col flex-1 justify-between bg-gradient-to-b from-neutral-900/60 to-neutral-950">
                        <div>
                          <h4 className="text-xl font-bold font-sans text-white group-hover:text-gold-imdb transition-colors truncate">
                            {star.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1 font-mono">
                            {star.career}
                          </p>
                        </div>

                        {/* "Voir les films" Button */}
                        <button 
                          onClick={() => {
                            handleSelectStar(star.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="w-full mt-3 bg-neutral-950 border border-gold-imdb/30 text-gold-imdb hover:bg-gold-imdb hover:text-neutral-950 transition-all duration-300 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <FilmIcon className="h-3.5 w-3.5" />
                          Voir les films
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grids / List results header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-gold-imdb rounded-full" />
                <h3 className="font-bebas text-3xl tracking-wide text-white">
                  {searchQuery ? `Résultats de recherche (${filteredStars.length})` : "Galerie des Célébrités"}
                </h3>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-gold-imdb bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Réinitialiser la recherche</span>
                </button>
              )}
            </div>

            {/* Stars Grid Display */}
            {filteredStars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                {filteredStars.map((star, idx) => (
                  <StarCard
                    key={star.id}
                    star={star}
                    index={idx}
                    isFeatured={!searchQuery && star.id === "bruce-lee"}
                    isFavorite={favoritesStars.includes(star.id)}
                    onToggleFavorite={() => toggleFavoriteStar(star.id)}
                    onClick={() => {
                      handleSelectStar(star.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            ) : (
              /* No matching results state */
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-neutral-900 bg-neutral-950/25">
                <RotateCcw className="h-10 w-10 text-neutral-600 mb-4 animate-spin-slow" />
                <h4 className="text-lg font-bold text-neutral-200">Aucun résultat trouvé</h4>
                <p className="text-neutral-500 text-xs mt-2 max-w-sm px-4">
                  Nous n'avons trouvé aucune star, aucun film ou genre correspondant pour la recherche "<strong className="text-neutral-300">{searchQuery}</strong>". Essayer d'utiliser un autre terme.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 rounded-lg bg-gold-imdb text-neutral-950 px-4 py-2 text-xs font-bold transition-all hover:bg-gold-light cursor-pointer shadow-lg shadow-gold-imdb/10"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* PREMIUM ULTRA-CINEMATIC FOOTER WITH INTEGRATED MODALS AND REAL LIGHT MODE TOGGLE */}
      <CinemaFooter
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSelectStar={handleSelectStar}
        onPlayTrailer={handlePlayTrailer}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* FULLSCREEN OVERLAY VIDEO MODAL */}
      {activeTrailer && (
        <VideoModal
          film={activeTrailer}
          onClose={() => setActiveTrailer(null)}
        />
      )}
    </div>
  );
}
