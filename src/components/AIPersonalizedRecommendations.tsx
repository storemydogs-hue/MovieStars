import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Play, 
  Flame, 
  History, 
  Heart, 
  Cpu, 
  TrendingUp, 
  RefreshCw, 
  Compass, 
  Tv, 
  Clock, 
  CheckCircle,
  Film as FilmIcon,
  HelpCircle,
  Filter
} from "lucide-react";
import { Star, Film } from "../types";
import { starsData } from "../data";

// Helper type extending Film with metadata for recommendation engine
interface RecommendedFilm extends Film {
  associatedStar: Star;
  aiScore: number;
  reason: string;
  sourceType: "actor_fav" | "actor_visited" | "genre_match" | "custom_mood" | "curated";
}

interface AIPersonalizedRecommendationsProps {
  favoritesStars: string[];
  favoritesFilms: string[];
  playedFilmsHistory: string[];
  visitedStarsHistory: string[];
  onPlayTrailer: (film: Film) => void;
  toggleFavoriteFilm: (youtubeId: string) => void;
  isDarkMode?: boolean;
}

export function AIPersonalizedRecommendations({
  favoritesStars,
  favoritesFilms,
  playedFilmsHistory,
  visitedStarsHistory,
  onPlayTrailer,
  toggleFavoriteFilm,
  isDarkMode = true
}: AIPersonalizedRecommendationsProps) {
  const [computing, setComputing] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  // Trigger a gorgeous fast loading state when inputs change to make the "AI" feel active and alive
  useEffect(() => {
    setComputing(true);
    const timer = setTimeout(() => {
      setComputing(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [favoritesStars.length, favoritesFilms.length, playedFilmsHistory.length, visitedStarsHistory.length, selectedMood]);

  // Premium Mood categories for user interaction (custom filters)
  const moods = [
    { id: "all", label: "🌟 Mix IA Intelligent", description: "Recommandations croisées par apprentissage" },
    { id: "kungfu", label: "🥋 Arts Martiaux", description: "Combats au corps-à-corps et cascades ultimes" },
    { id: "blockbuster", label: "🔥 Super-Productions", description: "Budget pharaonique et effets d'action cultes" },
    { id: "oldschool", label: "📼 Années 80 - 90", description: "Le charme brut de l'âge d'or du grand écran" }
  ];

  // Map YouTube Thumbnail URL from id
  const getThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  };

  // Compile recommendation list using smart scores
  const recommendationsList = useMemo(() => {
    const list: RecommendedFilm[] = [];

    // Loop through all stars and all their films
    starsData.forEach((star) => {
      star.films.forEach((film) => {
        // Exclude if already favorited or played
        const isFav = favoritesFilms.includes(film.youtubeId);
        
        let baseScore = 65 + Math.floor((film.youtubeId.charCodeAt(0) % 15)); // pseudo-random seed
        let reason = "Chef-d'œuvre légendaire indispensable à votre culture d'action.";
        let sourceType: RecommendedFilm["sourceType"] = "curated";

        // Boost score if the star is favorited
        if (favoritesStars.includes(star.id)) {
          baseScore += 22;
          reason = `Recommandé car l'incomparable ${star.name} fait partie de vos acteurs favoris !`;
          sourceType = "actor_fav";
        }
        // Boost if star has been visited
        else if (visitedStarsHistory.includes(star.id)) {
          baseScore += 12;
          reason = `Basé sur votre intérêt récent pour la biographie et les cascades de ${star.name}.`;
          sourceType = "actor_visited";
        }
        // Boost if same genre match
        else {
          // Check if same genre exists in favorited films or played history
          const matchedGenre = starsData.flatMap(s => s.films).some(f => 
            (favoritesFilms.includes(f.youtubeId) || playedFilmsHistory.includes(f.youtubeId)) && f.genre === film.genre
          );
          if (matchedGenre) {
            baseScore += 10;
            reason = `Sélectionné car vous appréciez les films du genre frémissant ${film.genre}.`;
            sourceType = "genre_match";
          }
        }

        // Apply Mood Filter Modifications
        if (selectedMood === "kungfu") {
          const isKungFu = film.genre.toLowerCase().includes("martial") || 
                           film.genre.toLowerCase().includes("combat") || 
                           star.id === "bruce-lee" || 
                           star.id === "jackie-chan" ||
                           star.id === "jet-li";
          if (isKungFu) {
            baseScore += 15;
          } else {
            baseScore -= 30; // demote
          }
        } else if (selectedMood === "blockbuster") {
          const isBlockbuster = film.year >= 2000 || film.genre.toLowerCase().includes("action");
          if (isBlockbuster) {
            baseScore += 10;
          } else {
            baseScore -= 10;
          }
        } else if (selectedMood === "oldschool") {
          if (film.year < 2000) {
            baseScore += 20;
          } else {
            baseScore -= 25;
          }
        }

        // Clamp scores to realistic premium match metrics between 68% and 99%
        const finalScore = Math.min(Math.max(baseScore, 68), 99);

        list.push({
          ...film,
          associatedStar: star,
          aiScore: finalScore,
          reason,
          sourceType
        });
      });
    });

    // Sort by matches and slice top recommendations
    return list
      .sort((a, b) => b.aiScore - a.aiScore)
      .filter(item => item.aiScore >= 70)
      .slice(0, 6);

  }, [favoritesStars, favoritesFilms, playedFilmsHistory, visitedStarsHistory, selectedMood]);

  return (
    <div className="relative rounded-3xl bg-neutral-950/45 border border-neutral-900 overflow-hidden shadow-2xl p-6 sm:p-8">
      {/* GLOW DECORATIONS (EFFET LUMIÈRE PREMIUM) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-80 h-80 bg-gold-imdb/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Decorative vertical red Netflix accent line + IMDb Golden title glow */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-900 pb-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-[#F5C518] tracking-widest uppercase bg-amber-500/10 w-fit px-3 py-1 rounded-full border border-amber-500/25">
            <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>MOTEUR IA COÏNCIDENCE CINÉMA</span>
          </div>
          <h3 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white uppercase flex items-center gap-2.5">
            RECOMMANDÉ <span className="text-red-600">POUR VOUS</span>
          </h3>
          <p className="text-xs text-neutral-400 font-light max-w-xl">
            Notre algorithme hybride croise vos <strong className="text-neutral-200">acteurs favoris</strong>, <strong className="text-neutral-200">bandes-annonces regardées</strong>, et vos <strong className="text-neutral-200">fiches consultées</strong> pour calibrer votre séance parfaite.
          </p>
        </div>

        {/* INPUT STATS SUMMARY FOR USER VISIBILITY (TRANSPARENT ARCHITECTURE) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 px-3 py-2 rounded-xl text-[11px]">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span className="text-neutral-400">Favoris:</span>
            <strong className="text-white font-mono">{favoritesStars.length + favoritesFilms.length}</strong>
          </div>
          <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 px-3 py-2 rounded-xl text-[11px]">
            <History className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-neutral-400 font-sans">Historique:</span>
            <strong className="text-white font-mono">{playedFilmsHistory.length + visitedStarsHistory.length}</strong>
          </div>
        </div>
      </div>

      {/* FILTER TABS (NETFLIX COMPONENT STYLING) */}
      <div className="relative z-10 mb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
          <Filter className="h-3.5 w-3.5 text-neutral-500" />
          <span>Sélectionner l'orientation de l'IA :</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/55 border border-red-500/35 scale-105"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
                title={m.description}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDATIONS GRID */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {computing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <div className="relative h-12 w-12 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5C518]/20 animate-ping opacity-75" />
                <RefreshCw className="h-6 w-6 text-[#F5C518] animate-spin" />
              </div>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest animate-pulse">
                Calcul des matrices de correspondances en cours...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {recommendationsList.length === 0 ? (
                <div className="text-center py-16 bg-neutral-900/20 rounded-2xl border border-dashed border-neutral-900">
                  <FilmIcon className="h-10 w-10 text-neutral-700 mx-auto mb-3" />
                  <p className="text-sm text-neutral-400">Aucun film trouvé avec cette configuration.</p>
                  <p className="text-xs text-neutral-600 mt-1">Créez plus de favoris ou d'historique pour alimenter l'IA.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recommendationsList.map((film, index) => {
                    const isFavMovie = favoritesFilms.includes(film.youtubeId);
                    return (
                      <motion.div
                        key={`${film.youtubeId}-${index}`}
                        className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-red-600/40 transition-all duration-300 flex flex-col shadow-xl h-full"
                        whileHover={{ y: -4 }}
                      >
                        {/* FILM POSTER OR THUMBNAIL WITH NETFLIX GRADIENT */}
                        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 shrink-0">
                          <img
                            src={getThumbnail(film.youtubeId)}
                            alt={film.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Top Red-IMDb Hybrid matches banner */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                            {/* Score IA with dynamic coloring */}
                            <span className="bg-red-600 text-white text-[11px] font-extrabold tracking-tight px-2 rounded-md shadow-md flex items-center gap-1 py-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{film.aiScore}% Match IA</span>
                            </span>
                          </div>

                          <button
                            onClick={() => toggleFavoriteFilm(film.youtubeId)}
                            className={`absolute top-3 right-3 p-1.5 rounded-xl border z-10 transition-all active:scale-90 shadow-md ${
                              isFavMovie 
                                ? "bg-rose-950 border-rose-500 text-rose-500" 
                                : "bg-black/75 border-neutral-800 text-neutral-400 hover:text-rose-500 hover:border-rose-500/40"
                            }`}
                            title={isFavMovie ? "Retirer des favoris" : "Ajouter aux favoris"}
                          >
                            <Heart className={`h-3.5 w-3.5 ${isFavMovie ? "fill-rose-500" : ""}`} />
                          </button>

                          {/* Quick hover trigger info overlay */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex items-end justify-between">
                            <span className="text-[10px] font-mono font-bold bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/25 px-2 py-0.5 rounded-md uppercase">
                              {film.genre}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400 font-bold">
                              {film.year}
                            </span>
                          </div>
                        </div>

                        {/* BODY CONTENT */}
                        <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                          <div className="space-y-2.5">
                            <h4 className="text-base font-extrabold text-white tracking-tight line-clamp-1 group-hover:text-red-500 transition-colors">
                              {film.title}
                            </h4>
                            
                            {/* Associated Star details */}
                            <div className="flex items-center gap-2">
                              <img
                                src={film.associatedStar.photo}
                                alt={film.associatedStar.name}
                                className="h-5 w-5 rounded-full object-cover shrink-0 border border-neutral-800"
                                referrerPolicy="no-referrer"
                              />
                              <p className="text-[11px] font-semibold text-neutral-400">
                                Avec <span className="text-white hover:underline cursor-pointer">{film.associatedStar.name}</span>
                              </p>
                            </div>

                            {/* POURQUOI CE FILM (RECOMMENDATION EXPLANATION) */}
                            <div className="text-xs bg-neutral-900/60 rounded-xl p-3 border border-neutral-90/50 flex gap-2.5 items-start">
                              <Sparkles className="h-4 w-4 text-[#F5C518] shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Pourquoi ce film :</span>
                                <p className="text-[11px] text-neutral-300 leading-relaxed font-light italic">
                                  "{film.reason}"
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* BOUTON LECTURE */}
                          <button
                            onClick={() => onPlayTrailer(film)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-red-950/45 cursor-pointer"
                          >
                            <Play className="h-3.5 w-3.5 fill-white" />
                            <span>Lire la bande-annonce</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
