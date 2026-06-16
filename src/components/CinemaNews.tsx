import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  Eye, 
  X, 
  Share2, 
  ThumbsUp, 
  RefreshCw, 
  BookOpen, 
  Play, 
  Sparkles,
  Info
} from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  category: "Sortie" | "Bande-annonce" | "Box Office" | "Casting";
  date: string;
  image: string;
  summary: string;
  fullArticle: string;
  source: string;
  readTime: string;
  hypeScore: number; // Out of 10
  views: string;
  likes: number;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-gladiator-ii",
    title: "Gladiator II : La vengeance de Lucius enflamme le Box Office mondial",
    category: "Box Office",
    date: "16 Juin 2026",
    image: "/images/news_gladiator_two.jpg",
    summary: "Le chef-d'œuvre de Ridley Scott explose tous les records avec une ouverture historique de 150M$. Les critiques saluent des scènes de combat de gladiateurs spectaculaires.",
    fullArticle: "Vingt-quatre ans après l'immense triomphe du premier opus multi-oscarisé, le réalisateur légendaire Ridley Scott revient dans l'arène romaine avec une suite pharaonique. Dans Gladiator II, nous suivons le destin tragique de Lucius, désormais adulte, contraint de combattre au sein du Colisée après que sa patrie ait été conquise par les empereurs tyranniques qui gouvernent Rome d'une main de fer. Les premiers chiffres du box-office mondial dépassent toutes les espérances du studio avec plus de 150 millions de dollars de recettes récoltés dès son premier week-end d'exploitation.\n\nMené par un casting étincelant incluant Paul Mescal, Pedro Pascal et un Denzel Washington impérial et manipulateur, le film propose des affrontements navals et des combats de fauves d'une férocité rarement égalée à l'écran. Une expérience cinématographique brute et viscérale à vivre absolument en salle IMAX.",
    source: "AlloCiné Presse",
    readTime: "3 min",
    hypeScore: 9.8,
    views: "245 K",
    likes: 18400
  },
  {
    id: "news-dune-three",
    title: "Dune Part III : Denis Villeneuve commence le tournage du Messie",
    category: "Casting",
    date: "15 Juin 2026",
    image: "/images/news_dune_three.jpg",
    summary: "Le troisième opus de la saga de science-fiction entre officiellement en phase de pré-production. Timothée Chalamet promet une conclusion monumentale.",
    fullArticle: "Le réalisateur visionnaire québécois Denis Villeneuve a officiellement donné le coup d'envoi de la pré-production de Dune: Le Messie (Dune Part III), l'adaptation cinématographique du deuxième roman culte de Frank Herbert. Cette suite directe explorera les conséquences dévastatrices de la montée au pouvoir de Paul Atréides en tant qu'empereur de l'univers connu et messie des Fremen.\n\n'Ce sera le projet le plus sombre, mais aussi le plus intime et mystique de toute la trilogie', a confié le cinéaste lors d'une conférence exclusive à Los Angeles. Les acteurs principaux Timothée Chalamet, Zendaya et Florence Pugh feront leur retour triomphal sous le soleil de plomb d'Arrakis. La production annonce des visuels cosmiques encore plus impressionnants conçus à l'aide de nouvelles caméras de pointe, promettant d'ancrer définitivement cette trilogie au Panthéon de la science-fiction moderne.",
    source: "Cinéma Hebdo",
    readTime: "4 min",
    hypeScore: 9.9,
    views: "189 K",
    likes: 15300
  },
  {
    id: "news-avatar-four",
    title: "Avatar 4 : Des visuels exclusifs dévoilés par James Cameron",
    category: "Bande-annonce",
    date: "14 Juin 2026",
    image: "/images/news_avatar_four.jpg",
    summary: "De nouvelles frontières de Pandora s'ouvrent avec des océans bioluminescents et un tout nouveau clan volcanique féroce. Une révolution technologique.",
    fullArticle: "James Cameron continue de repousser les limites technologiques de la planète Pandora. Lors d'un congrès de cinéma à Tokyo, le réalisateur milliardaire a dévoilé en exclusivité les premières maquettes et captures de rendu d'Avatar 4. Le public a pu admirer de somptueux panoramas bioluminescents d'un océan souterrain inconnu ainsi que les visuels des 'Peuple des Cendres', un clan Na'vi volcanique agressif dirigé par l'actrice mythique Oona Chaplin.\n\nCe nouvel opus se concentrera sur l'escalade de la guerre entre les colons humains toujours plus destructeurs et les peuples natifs décidés à sauvegarder l'équilibre de leur écosystème. Cameron promet des avancées inédites en matière de capture de mouvements aquatiques et de synthèse d'effets visuels photo-réalistes, redéfinissant à nouveau tout ce que nous pensions possible en matière de relief 3D stéréoscopique.",
    source: "Écran Large",
    readTime: "3 min",
    hypeScore: 9.5,
    views: "134 K",
    likes: 11200
  },
  {
    id: "news-matrix-reborn",
    title: "Matrix Reborn : Keanu Reeves confirme son retour légendaire",
    category: "Casting",
    date: "12 Juin 2026",
    image: "/images/news_matrix_reborn.jpg",
    summary: "Des rumeurs confirmées par la production indiquent que l'acteur réenfile son costume noir emblématique sous une direction totalement inédite.",
    fullArticle: "Contre toute attente, la Warner Bros. a officialisé le développement secret de 'Matrix Reborn', un nouvel opus autonome se déroulant plusieurs siècles après la fin de la rébellion originelle. Keanu Reeves a signé un accord exclusif pour incarner une nouvelle itération holographique de Neo au sein d'une simulation matricielle reconstituée.\n\nLe script est confié à un jeune réalisateur montant de la scène indépendante de science-fiction, sous la supervision attentive de Lana Wachowski. 'Nous voulons revenir au mystère philosophique brutal et au cyberpunk pur qui ont fait le succès du premier film de 1999', indique le communiqué officiel. Les chorégraphies de combats au corps à corps feront la part belle aux arts martiaux traditionnels combinés à des effets numériques de distorsion temporelle révolutionnaires, promettant une expérience cinétique inoubliable.",
    source: "Hollywood Reporter",
    readTime: "3 min",
    hypeScore: 9.2,
    views: "112 K",
    likes: 9800
  },
  {
    id: "news-mission-nine",
    title: "Mission Impossible 9 : Tom Cruise prépare la cascade la plus folle de sa carrière",
    category: "Sortie",
    date: "10 Juin 2026",
    image: "/images/news_mission_nine.jpg",
    summary: "Suspendu à une altitude de 8000 mètres en chute libre sans parachute de secours. Tom Cruise repousse à nouveau toutes les limites physiques.",
    fullArticle: "Rien ne semble pouvoir arrêter l'infatigable star Tom Cruise qui s'apprête, à plus de 60 ans, à accomplir la cascade en prise de vue réelle la plus périlleuse de l'histoire moderne du divertissement. Pour le tournage des scènes d'ouverture de Mission Impossible 9, l'acteur va effectuer une séquence de chute libre à très haute altitude en étant suspendu à l'aile d'un avion cargo militaire volant à plus de 450 km/h, sans l'aide d'un parachute de sécurité traditionnel visible.\n\nL'acteur s'est entraîné de manière intensive pendant plus d'un an avec les forces spéciales de parachutisme pour maîtriser la gestion des courants d'air glaciaux de la haute atmosphère. Un dévouement physique absolu qui renforce l'aura héroïque de l'acteur et continue de captiver l'admiration du public planétaire tout entier.",
    source: "Action Force",
    readTime: "4 min",
    hypeScore: 10.0,
    views: "310 K",
    likes: 29500
  },
  {
    id: "news-batman-two",
    title: "The Batman Part II : Le Joker de Barry Keoghan prend de l'ampleur",
    category: "Casting",
    date: "08 Juin 2026",
    image: "/images/news_batman_two.jpg",
    summary: "Le réalisateur Matt Reeves révèle d'importants détails sur l'antagoniste principal de cette suite, promettant une atmosphère encore plus sombre.",
    fullArticle: "Le réalisateur acclamé Matt Reeves a partagé de précieuses révélations quant à l'intrigue criminelle qui attend le protecteur de Gotham incarné par Robert Pattinson dans 'The Batman Part II'. Alors que le Sphinx (Riddler) croupit désormais dans les sous-sols obscurs de l'Asile d'Arkham, une ombre terrifiante s'apprête à s'étendre sur les syndicats criminels de la ville.\n\nC'est l'inquiétant Joker, interprété de manière hautement glaçante par l'acteur Barry Keoghan, qui orchestrera les fils d'un complot machiavélique de déstabilisation politique et sociale. Son look défiguré et sa voix grinçante s'annoncent d'une radicalité absolue, ancrant solidement ce polar fantastique dans un réalisme urbain sombre et violent proche de l'âge d'or des films de détective noirs américains.",
    source: "Gotham Herald",
    readTime: "3 min",
    hypeScore: 9.7,
    views: "167 K",
    likes: 12900
  }
];

export function CinemaNews() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const dragScrollLeft = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Auto-scrolling interval logic
  useEffect(() => {
    if (!autoplayActive || selectedArticle) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const el = carouselRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      
      if (el.scrollLeft >= maxScroll - 5) {
        // Smooth snap back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Slide by about one card width
        const cardWidth = el.querySelector(".news-card")?.clientWidth || 300;
        el.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [autoplayActive, selectedArticle]);

  // Handle scroll tracking & progress indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    
    const progress = (el.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);

    // Calculate active slide index
    const cardWidth = el.querySelector(".news-card")?.clientWidth || 300;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveItemIndex(Math.min(index, news.length - 1));
  };

  // Nav arrow controls
  const slidePrev = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cardWidth = el.querySelector(".news-card")?.clientWidth || 300;
    el.scrollBy({ left: -(cardWidth + 16), behavior: "smooth" });
    setAutoplayActive(false);
  };

  const slideNext = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cardWidth = el.querySelector(".news-card")?.clientWidth || 300;
    el.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
    setAutoplayActive(false);
  };

  // Manual touch-swipe and drag support
  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
    setAutoplayActive(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5; // multiplier for speed
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
    setAutoplayActive(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  // Live simulation feed refresh action
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setAutoplayActive(false);
    
    // Simulate a network reload and dynamically update metrics slightly for immersion
    setTimeout(() => {
      setNews(prev => 
        prev.map(item => ({
          ...item,
          views: `${parseFloat(item.views.split(" ")[0]) + Math.floor(Math.random() * 5) + 1} K`,
          likes: item.likes + Math.floor(Math.random() * 15) + 2
        }))
      );
      setIsRefreshing(false);
    }, 1200);
  };

  // Styled helper for News category colors (Netflix or IMDb look)
  const getCategoryTheme = (category: string) => {
    switch(category) {
      case "Box Office": 
        return { 
          bg: "bg-red-950/80 border-red-500/30 text-red-400", 
          glow: "shadow-red-900/30",
          iconColor: "text-red-500" 
        };
      case "Casting": 
        return { 
          bg: "bg-amber-950/80 border-amber-500/30 text-amber-400", 
          glow: "shadow-amber-900/10",
          iconColor: "text-amber-500" 
        };
      case "Bande-annonce": 
        return { 
          bg: "bg-blue-950/80 border-blue-500/30 text-blue-400", 
          glow: "shadow-blue-900/10",
          iconColor: "text-blue-500"
        };
      case "Sortie": 
        return { 
          bg: "bg-emerald-950/80 border-emerald-500/30 text-emerald-400", 
          glow: "shadow-emerald-900/10",
          iconColor: "text-emerald-500"
        };
      default: 
        return { 
          bg: "bg-neutral-900 border-neutral-700 text-neutral-300", 
          glow: "shadow-transparent",
          iconColor: "text-white"
        };
    }
  };

  return (
    <div id="movie-news-section" className="space-y-8 bg-gradient-to-b from-[#0A0A0F] to-[#050508] border border-neutral-900/80 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Red & Gold neon glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/3 rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-red-600 rounded-full animate-pulse" />
            <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">INFO CHAUDE DU JOUR</span>
            <div className="flex items-center gap-1 text-gold-imdb text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-imdb/10 border border-gold-imdb/25 font-sans">
              <Sparkles className="h-3 w-3 animate-spin-slow text-gold-imdb" />
              <span>PREMIUM BANNER</span>
            </div>
          </div>
          
          <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white uppercase flex items-center gap-2 mt-1">
            🔥 ACTUALITÉS CINÉMA
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans italic">
            Les dernières sorties et nouveautés du grand écran
          </p>
        </div>

        {/* CONTROLS AREA */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {/* Refresh simulated action */}
          <button
            onClick={handleRefreshFeed}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg px-3 py-2 transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 font-mono"
            title="Simuler un rafraîchissement d'actualités"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin text-gold-imdb" : "text-neutral-400"}`} />
            <span>{isRefreshing ? "ACTUALISATION..." : "RAFRAÎCHIR"}</span>
          </button>

          {/* Autoplay Play/Pause */}
          <button
            onClick={() => setAutoplayActive(!autoplayActive)}
            className={`text-[11px] font-bold rounded-lg px-3 py-2 border transition-all cursor-pointer font-mono ${
              autoplayActive 
                ? "bg-red-950/35 border-red-800/40 text-red-400 hover:bg-neutral-950 hover:border-neutral-800" 
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {autoplayActive ? "● AUTO PAUSE" : "▷ AUTO PLAY"}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 bg-neutral-950 rounded-lg p-1 border border-neutral-900">
            <button
              onClick={slidePrev}
              className="p-1 px-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors active:scale-95"
              title="Précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="w-px h-3 bg-neutral-800" />
            <button
              onClick={slideNext}
              className="p-1 px-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors active:scale-95"
              title="Suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SCROLL CAROUSEL */}
      <div className="relative group">
        {/* Shadow overlays for edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none md:block hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none md:block hidden" />

        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUpOrLeave}
          className="flex gap-4 overflow-x-auto scrollbar-none py-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {news.map((item, idx) => {
            const isActive = idx === activeItemIndex;
            const theme = getCategoryTheme(item.category);
            
            return (
              <div
                key={item.id}
                className={`news-card flex-none w-[285px] sm:w-[320px] rounded-xl bg-neutral-950/65 backdrop-blur-md border hover:border-red-600/50 shadow-lg ${theme.glow} ${
                  isActive ? "border-amber-500/40 ring-1 ring-amber-500/10 scale-[1.01]" : "border-neutral-900"
                } transition-all duration-300 overflow-hidden flex flex-col group/card`}
              >
                {/* News Thumbnail Image with category overlay */}
                <div className="relative h-40 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110 pointer-events-none"
                  />
                  
                  {/* Visual overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent opacity-90" />
                  
                  {/* Category badging */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur border shadow-md ${theme.bg}`}>
                    {item.category}
                  </span>

                  {/* Hot meter score */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight text-white animate-pulse">
                    <Flame className="h-3 w-3 fill-white" />
                    <span>HYPE: {item.hypeScore}/10</span>
                  </div>
                </div>

                {/* News Description */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Timestamp + views */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 tracking-wider">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3 text-gold-imdb" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Eye className="h-3 w-3 text-red-500" />
                        {item.views} vues
                      </span>
                    </div>

                    {/* News Subject Title */}
                    <h4 className="text-white font-sans text-sm font-bold leading-snug group-hover/card:text-gold-imdb transition-colors line-clamp-2 h-10">
                      {item.title}
                    </h4>

                    {/* Summary text */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2 h-9 text-ellipsis overflow-hidden">
                      {item.summary}
                    </p>
                  </div>

                  {/* READ LINK ACTION */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(item);
                    }}
                    className="w-full mt-2 cursor-pointer bg-neutral-950 border border-neutral-800 group-hover/card:border-red-600/40 text-neutral-200 hover:text-white group-hover/card:bg-red-600 group-hover/card:text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-inner"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Lire l'article</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SCROLLING PROGRESS BAR */}
      <div className="space-y-2 mt-4">
        <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 flex items-center">
          <div 
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-gold-imdb rounded-full transition-all duration-150 relative"
            style={{ width: `${scrollProgress || 10}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-glow" />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-[9px] font-semibold text-neutral-600 tracking-widest uppercase">
          <span>DEBUT DE L'ACTU</span>
          <span className="text-neutral-500 font-mono">PAGE {activeItemIndex + 1} SUR {news.length}</span>
          <span>COMPLET</span>
        </div>
      </div>

      {/* FULL-SCALE POPUP MODAL (IMMERSIVE CINEMATIC GLASSMORPHISM) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Immersive modal card with custom scroll progress inside */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-[#09090D] border border-neutral-800/80 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header image banner widget */}
              <div className="relative h-60 sm:h-72 w-full bg-neutral-900 flex-shrink-0">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-transparent to-black/60" />

                {/* Close Button element */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-black/75 hover:bg-red-600 text-white transition-colors cursor-pointer active:scale-95 shadow border border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Left Category Indicator */}
                <span className="absolute bottom-4 left-6 text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-red-600 text-white rounded border border-red-500/20 shadow-lg shadow-red-900/30">
                  {selectedArticle.category}
                </span>

                {/* Read Time Info */}
                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 text-xs text-neutral-300 font-bold bg-[#09090D]/80 backdrop-blur border border-neutral-800 px-3 py-1 rounded">
                  <Clock className="h-3.5 w-3.5 text-gold-imdb" />
                  <span>{selectedArticle.readTime} de lecture</span>
                </div>
              </div>

              {/* Scrolling Article Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 font-sans">
                
                {/* Meta details bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-b border-neutral-900 pb-4 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-red-500" />
                    {selectedArticle.date}
                  </span>
                  <span className="text-neutral-800">|</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-gold-imdb" />
                    {selectedArticle.views} vues
                  </span>
                  <span className="text-neutral-800">|</span>
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                    Source : {selectedArticle.source}
                  </span>
                </div>

                {/* Big Article Headline */}
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white leading-tight tracking-tight hover:text-gold-imdb transition-colors">
                  {selectedArticle.title}
                </h3>

                {/* Full editorial paragraph contents */}
                <div className="text-sm sm:text-base text-neutral-300 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {selectedArticle.fullArticle}
                </div>

                {/* Detailed metrics box (Netflix style HUD layout) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-neutral-900">
                  
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900 text-center">
                    <span className="block text-[10px] text-neutral-500 uppercase font-bold tracking-widest">IMDb HYPE LEVEL</span>
                    <span className="text-lg font-bebas text-gold-imdb mt-0.5 block tracking-wider">
                      ★ {selectedArticle.hypeScore} / 10
                    </span>
                  </div>

                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900 text-center">
                    <span className="block text-[10px] text-neutral-500 uppercase font-bold tracking-widest">LÉGATE CONFIANCE</span>
                    <span className="text-lg font-bebas text-white mt-0.5 block tracking-wider uppercase">
                      98% CERTIFIÉ
                    </span>
                  </div>

                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-900 text-center col-span-2 sm:col-span-1">
                    <span className="block text-[10px] text-neutral-500 uppercase font-bold tracking-widest">INTENSITÉ REEL</span>
                    <span className="text-lg font-bebas text-red-500 mt-0.5 block tracking-wider uppercase">
                      TRÈS ÉLEVÉE
                    </span>
                  </div>

                </div>

                {/* Footer Interactions */}
                <div className="flex items-center justify-between gap-4 pt-4 text-xs">
                  {/* Simulated like triggers */}
                  <button
                    onClick={() => {
                      setNews(prev => 
                        prev.map(n => n.id === selectedArticle.id ? { ...n, likes: n.likes + 1 } : n)
                      );
                      setSelectedArticle(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
                    }}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-rose-500 transition-colors font-bold cursor-pointer font-mono bg-neutral-950 border border-neutral-900 rounded-lg px-4 py-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>LOUER L'ARTICLE ({selectedArticle.likes.toLocaleString()})</span>
                  </button>

                  <button 
                    onClick={() => {
                      const shareText = `Découvrez cette actualité cinéma fantastique: ${selectedArticle.title}`;
                      if (navigator.share) {
                        navigator.share({ title: selectedArticle.title, text: shareText, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
                        alert("Lien de l'article copié avec succès !");
                      }
                    }}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer font-mono font-bold bg-neutral-950 border border-neutral-900 rounded-lg px-4 py-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>PARTAGER</span>
                  </button>
                </div>

              </div>

              {/* Sticky bottom close footer */}
              <div className="bg-[#050508] p-4 border-t border-neutral-900 text-center flex-shrink-0">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2 bg-red-600 font-bebas hover:bg-red-700 text-white rounded-lg text-sm tracking-wider cursor-pointer transition-colors"
                >
                  FERMER L'ACTUALITÉ
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
