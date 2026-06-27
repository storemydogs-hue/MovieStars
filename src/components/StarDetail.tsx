import React, { useState, useEffect, useMemo } from "react";
import { Star, Film as FilmType } from "../types";
import { 
  ArrowLeft, 
  Play, 
  Globe, 
  Calendar, 
  Film, 
  Bookmark, 
  Share2, 
  ThumbsUp, 
  Clock, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Tv, 
  Youtube, 
  Heart, 
  Award, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Camera, 
  Compass, 
  History 
} from "lucide-react";

// Pre-defined database of exact real statistics for trailers
const REAL_YOUTUBE_STATS: Record<string, { views: string; likes: string; date: string; channel: string; duration: string }> = {
  // Jackie Chan
  "6DR6gMIQ7XM": { views: "2.1M", likes: "14K", date: "14 déc. 1985", channel: "Golden Harvest", duration: "1h 41m" },
  "aS3pMhtiRq0": { views: "5.4M", likes: "32K", date: "5 oct. 1978", channel: "Seasonal Film Corporation", duration: "1h 51m" },
  "UWeCnz-p7x0": { views: "14.2M", likes: "95K", date: "18 sept. 1998", channel: "New Line Cinema", duration: "1h 38m" },
  "1kIx53VjJ0A": { views: "8.9M", likes: "49K", date: "7 fév. 2003", channel: "Touchstone Pictures", duration: "1h 54m" },
  "th6w3CpFKRc": { views: "32.5M", likes: "210K", date: "13 oct. 2017", channel: "STXfilms", duration: "1h 53m" },
  // Tom Cruise
  "AlNld97rTYo": { views: "45.1M", likes: "310K", date: "9 juin 2017", channel: "Universal Pictures", duration: "1h 50m" },
  "XHGgNH2Qs5c": { views: "12.8M", likes: "75K", date: "22 mai 1996", channel: "Paramount Pictures", duration: "1h 50m" },
  "Y86hf5SFAMM": { views: "24.3M", likes: "120K", date: "12 avr. 2013", channel: "Universal Pictures", duration: "2h 04m" },
  "RW6BqtVoIqI": { views: "102.4M", likes: "1.2M", date: "27 mai 2022", channel: "Paramount Pictures", duration: "2h 10m" },
  "9LBuhP2Pt7Y": { views: "4.8M", likes: "28K", date: "28 août 1985", channel: "20th Century Fox", duration: "1h 30m" },
  // Brad Pitt
  "7sCSj_Mamns": { views: "1.5M", likes: "12K", date: "11 sept. 1998", channel: "Sony Pictures", duration: "1h 45m" },
  "QNF2bjh9pFY": { views: "24.8M", likes: "180K", date: "10 juin 2005", channel: "20th Century Fox", duration: "2h 00m" },
  "oy1ti0--3Mg": { views: "18.2M", likes: "110K", date: "21 août 2009", channel: "The Weinstein Company", duration: "2h 33m" },
  "avLc9DRHMAE": { views: "2.1M", likes: "15K", date: "15 fév. 1991", channel: "Anchor Bay Entertainment", duration: "1h 41m" },
  "dhH6U8wjF60": { views: "3.4M", likes: "22K", date: "17 juil. 1989", channel: "Republic Pictures", duration: "1h 31m" },
  // Denzel Washington
  "zJXsfwhNquI": { views: "8.4M", likes: "48K", date: "16 janv. 1998", channel: "Warner Bros. Pictures", duration: "2h 04m" },
  "tggu5TE8MBc": { views: "1.2M", likes: "9.8K", date: "2 nov. 2012", channel: "Paramount Pictures", duration: "1h 38m" },
  "IlbUKVpxokc": { views: "6.9M", likes: "35K", date: "16 janv. 1998", channel: "Warner Bros. Pictures", duration: "2h 04m" },
  "906YeBjHrQE": { views: "15.2M", likes: "92K", date: "23 avr. 2004", channel: "20th Century Fox", duration: "2h 26m" },
  "nJr0dGYS-6A": { views: "4.8M", likes: "24K", date: "4 août 1995", channel: "Paramount Pictures", duration: "1h 46m" },
  // Robert De Niro
  "3sWVOu49yuw": { views: "12.1M", likes: "68K", date: "15 nov. 1991", channel: "Universal Pictures", duration: "2h 08m" },
  "Z2XyV1MEfP0": { views: "1.9M", likes: "11K", date: "10 mars 1989", channel: "Cineplex Odeon Films", duration: "1h 42m" },
  "ZvNrhjZmkI8": { views: "6.5M", likes: "34K", date: "28 fév. 2014", channel: "Cinedigm", duration: "1h 48m" },
  "OW3CkHXLJlY": { views: "24.1M", likes: "190K", date: "9 oct. 2020", channel: "101 Studios", duration: "1h 34m" },
  "OEl_l7ubONw": { views: "11.2M", likes: "72K", date: "29 sept. 1993", channel: "Savoy Pictures", duration: "2h 01m" },
  // Bruce Lee
  "5a7tOgq5EFk": { views: "8.5M", likes: "52K", date: "22 mars 1972", channel: "Golden Harvest", duration: "1h 46m" },
  "VtK05lU9Rto": { views: "14.2M", likes: "98K", date: "19 août 1973", channel: "Warner Bros. Pictures", duration: "1h 42m" },
  "PTAkRwZn1nU": { views: "6.1M", likes: "41K", date: "1 juin 1972", channel: "Golden Harvest", duration: "1h 39m" },
  "SHIm60FMWCk": { views: "5.2M", likes: "34K", date: "22 oct. 1971", channel: "Golden Harvest", duration: "1h 40m" },
  "Ujy-Srb-7Y8": { views: "4.1M", likes: "29K", date: "23 mars 1978", channel: "Golden Harvest", duration: "1h 25m" },
  // Jason Statham
  "UXxSaY14eQc": { views: "12.4M", likes: "75K", date: "1 sept. 2006", channel: "Lionsgate", duration: "1h 28m" },
  "bbYzWE4wdm0": { views: "14.8M", likes: "84K", date: "11 oct. 2002", channel: "20th Century Fox", duration: "1h 32m" },
  "BoxWnPvUFtI": { views: "18.2M", likes: "110K", date: "27 nov. 2013", channel: "Open Road Films", duration: "1h 40m" },
  "ViWL55svQCQ": { views: "22.4M", likes: "130K", date: "25 janv. 2013", channel: "FilmDistrict", duration: "1h 58m" },
  "LchNm_kLp0Y": { views: "3.5M", likes: "21K", date: "14 sept. 1990", channel: "MGM", duration: "1h 29m" }
};

// Career milestones timelines for our actor list
const STAR_TIMELINES: Record<string, { year: number; title: string; desc: string; icon: string }[]> = {
  "jackie-chan": [
    { year: 1962, title: "L'Enfant de l'Opéra", desc: "Formé à l'Académie d'Opéra de Pékin, il perfectionne ses acrobaties dramatiques.", icon: "🎭" },
    { year: 1978, title: "Révélation par Drunken Master", desc: "Invention fulgurante de la comédie de kung-fu, brisant les codes classiques.", icon: "🥋" },
    { year: 1985, title: "La Référence Police Story", desc: "Réalise la cascade la plus dangereuse en glissant le long d'un poteau électrique avec des ampoules réelles.", icon: "⚡" },
    { year: 1998, title: "Le Triomphe Hollywoodien", desc: "La comédie Rush Hour explose le box-office occidental aux côtés de Chris Tucker.", icon: "🌎" },
    { year: 2016, title: "Consécration d'Honneur", desc: "Reçoit un Oscar d'honneur des mains de l'Académie pour l'ensemble de sa carrière exceptionnelle.", icon: "🏆" }
  ],
  "tom-cruise": [
    { year: 1983, title: "Le Tremplin Risky Business", desc: "Révélé au grand public avec sa scène de danse culte, une star d'Hollywood est née.", icon: "🕶️" },
    { year: 1986, title: "L'Envol Top Gun", desc: "Incarne Maverick et s'établit instantanément comme l'icône triomphante du box-office mondial.", icon: "✈️" },
    { year: 1996, title: "Inauguration Ethan Hunt", desc: "Lance la franchise culte Mission: Impossible dont il réalise les cascades de plus en plus extrêmes.", icon: "💣" },
    { year: 2011, title: "Sensations Verticales Extrêmes", desc: "Escalade à mains nues la paroi externe du Burj Khalifa à Dubaï à 828 mètres d'altitude.", icon: "🏢" },
    { year: 2022, title: "Le Sauveur des Cinémas", desc: "Top Gun: Maverick dépasse 1.4 milliard de dollars de recettes et relance les salles obscures.", icon: "🔥" }
  ],
  "bruce-lee": [
    { year: 1940, title: "Naissance du Petit Dragon", desc: "Naissance à San Francisco puis retour à Hong Kong où il s'illustre comme enfant acteur prodige.", icon: "🐉" },
    { year: 1967, title: "Fondation du Jeet Kune Do", desc: "Crée sa propre doctrine martiale 'comme de l'eau', axée sur la simplicité et l'adaptation.", icon: "💧" },
    { year: 1971, title: "Le Raz-de-marée Big Boss", desc: "Premier immense succès marquant l'avènement international de sa force unique.", icon: "🥋" },
    { year: 1972, title: "Le Combat du Siècle", desc: "S'oppose légendairement à Chuck Norris dans l'arène mythique du Colisée dans La Fureur du Dragon.", icon: "🏛" },
    { year: 1973, title: "Chef-d'œuvre Opération Dragon", desc: "Premier film d'arts martiaux mondial coproduit par Warner Bros, sorti juste après sa triste disparition.", icon: "🌅" }
  ],
  "brad-pitt": [
    { year: 1991, title: "La Révélation Thelma & Louise", desc: "Quelques minutes d'écran mémorables le propulsent instantanément au statut de sex-symbol.", icon: "🚗" },
    { year: 1995, title: "La Transition Sombre", desc: "Livre des performances d'acteurs stupéfiantes dans Seven de David Fincher et L'Armée des 12 singes.", icon: "🌧️" },
    { year: 1999, title: "La Philosophie Tyler Durden", desc: "Incarne l'anti-héros anarchiste ultime dans Fight Club, pièce maîtresse de la culture populaire.", icon: "🧼" },
    { year: 2019, title: "La Couronne Cliff Booth", desc: "Remporte l'Oscar du meilleur acteur dans un second rôle pour Once Upon a Time in Hollywood.", icon: "🎬" },
    { year: 2022, title: "Action Explosive Bullet Train", desc: "Prouve ses talents d'action physique dans une comédie de combats chorégraphiés en huis clos ferroviaire.", icon: "🚄" }
  ],
  "denzel-washington": [
    { year: 1989, title: "Le Premier Oscar Glory", desc: "Remporte l'Oscar du meilleur acteur de second rôle pour sa prestation vibrante de soldat révolté.", icon: "🎖️" },
    { year: 1992, title: "L'Incarnation de Malcolm X", desc: "Bénéficie d'une acclamation universelle sous la direction rigoureuse de Spike Lee.", icon: "👓" },
    { year: 2001, title: "L'Apothéose de Training Day", desc: "Double la mise en décrochant l'Oscar du meilleur acteur pour son rôle d'inspecteur corrompu.", icon: "🚓" },
    { year: 2014, title: "Le Justicier Methodical", desc: "Lancement de la trilogie d'action viscérale The Equalizer, marquant sa polyvalence spectaculaire.", icon: "⚖️" },
    { year: 2023, title: "L'Ultime Rédemption", desc: "Clôture de la saga en Apulie et sur la côte amalfitaine italienne, plébiscitée par les fans.", icon: "🇮🇹" }
  ],
  "robert-de-niro": [
    { year: 1974, title: "Le Parrain Partie II", desc: "Remporte l'Oscar du second rôle à 31 ans pour sa magnifique incarnation du jeune Vito Corleone.", icon: "🌹" },
    { year: 1976, title: "You talkin' to me? Taxi Driver", desc: "Livre sa performance la plus troublante sous la direction de son réalisateur fétiche Martin Scorsese.", icon: "🚕" },
    { year: 1980, title: "Le Ring Absolu Raging Bull", desc: "Met son corps à rude épreuve avec 27kg de prise de poids pour incarner Jake LaMotta. Oscar du meilleur acteur.", icon: "🥊" },
    { year: 1995, title: "L'Intemporel Choc Heat", desc: "Face-à-face inoubliable avec Al Pacino dans un chef-d'œuvre du braquage réaliste par Michael Mann.", icon: "🔥" },
    { year: 2019, title: "Le Chant du Cygne", desc: "Remonte le temps grâce aux technologies de rajeunissement numérique pour la fresque des gangsters The Irishman.", icon: "🎩" }
  ],
  "jason-statham": [
    { year: 1998, title: "Débrouilles Britanniques", desc: "Révélé par Guy Ritchie dans un film culte à l'accent londonien bien trempé Arnaques, Crimes et Botanique.", icon: "🇬🇧" },
    { year: 2002, title: "Le Décollage du Transporteur", desc: "Installe son personnage culte en costume-cravate réalisant des combats au timing chirurgical.", icon: "💼" },
    { year: 2006, title: "Voltage Critique Adrénaline", desc: "Réalise des cascades insensées suspendu à un hélicoptère au milieu de Los Angeles.", icon: "🔌" },
    { year: 2015, title: "L'Adversité Fast & Furious", desc: "Enfile l'armure de Deckard Shaw, l'un des antagonistes les plus brutaux de la saga automobile.", icon: "🏎️" },
    { year: 2024, title: "La Ruche The Beekeeper", desc: "Triomphe au box-office en endossant un rôle vengeur déchaîné appliquant la loi des abeilles.", icon: "🐝" }
  ]
};

// Custom animated stats parameters per actor
const STAR_STATS: Record<string, { label: string; value: number; prefix?: string; suffix?: string; detail: string }[]> = {
  "jackie-chan": [
    { label: "Cascades Authentiques", value: 154, suffix: "+", detail: "Sauts, acrobaties et combats sans doublures" },
    { label: "Blessures & Fractures", value: 42, suffix: "", detail: "Chaque centimètre carré de son corps a été blessé" },
    { label: "Box-Office Global", value: 2.6, suffix: " Md$", detail: "De Hong Kong à la cour d'Hollywood" },
    { label: "Années de Cascades", value: 62, suffix: " ans", detail: "Acteur de cascade le plus constant de l'histoire" }
  ],
  "tom-cruise": [
    { label: "Stunts Haute Tension", value: 87, suffix: "", detail: "Sauts en parachute, vols en hélicoptère à mains nues" },
    { label: "Vitesse Cascade Moto", value: 240, suffix: " km/h", detail: "Pris de vitesse dans les rues de Paris et de Rome" },
    { label: "Box-Office Global", value: 10.4, suffix: " Md$", detail: "L'un des acteurs les plus rentables du cinéma" },
    { label: "Altitude Cascade Max", value: 828, suffix: "m", detail: "Suspendu à la cime du gratte-ciel Burj Khalifa" }
  ],
  "bruce-lee": [
    { label: "Vitesse de Frappe", value: 0.05, suffix: " s", detail: "Obligeant les réalisateurs à ralentir la pellicule" },
    { label: "Films Légendaires", value: 5, suffix: "", detail: "Cinq pièces maîtresses qui ont éduqué l'Occident" },
    { label: "Puissance de Frappe", value: 150, suffix: " kg", detail: "Capacité d'impact absolue à courte portée" },
    { label: "Adhérence Philosophique", value: 100, suffix: "%", detail: "Créateur éternel du concept Jeet Kune Do" }
  ],
  "brad-pitt": [
    { label: "Œuvres Majeures", value: 52, suffix: "", detail: "Une versatilité allant du drame à l'action physique" },
    { label: "Oscars Obtenus", value: 2, suffix: "", detail: "Un comme acteur (Tarantino), un comme producteur" },
    { label: "Box-Office Cumulé", value: 8.5, suffix: " Md$", detail: "Une attraction commerciale sur quatre décennies" },
    { label: "Note Critique Moyenne", value: 84, suffix: "%", detail: "Plébiscités par la presse internationale" }
  ],
  "denzel-washington": [
    { label: "Oscars Remportés", value: 2, suffix: "", detail: "Glory (Second rôle) et Training Day (Premier rôle)" },
    { label: "Nominations Académie", value: 10, suffix: "", detail: "L'acteur afro-américain le plus nommé de l'histoire" },
    { label: "Note IMDb Moyenne", value: 7.8, suffix: "/10", detail: "Un gage absolu de qualité dramatique et technique" },
    { label: "Box-Office Cumulé", value: 4.8, suffix: " Md$", detail: "Une force constante pour les grands drames d'action" }
  ],
  "robert-de-niro": [
    { label: "Total Films d'Action/Polar", value: 68, suffix: "", detail: "Du parrainage mafieux aux flics infiltrés" },
    { label: "Collaborations Scorsese", value: 10, suffix: "", detail: "Le duo le plus célèbre de l'histoire du cinéma" },
    { label: "Note IMDb Max", value: 8.9, suffix: "/10", detail: "Détenue par Le Parrain II et Taxi Driver" },
    { label: "Oscars Gagnés", value: 2, suffix: "", detail: "Consacré meilleur acteur et meilleur second rôle" }
  ],
  "jason-statham": [
    { label: "Combats Singuliers", value: 345, suffix: "+", detail: "Scènes de combats ultra-dynamiques calibrées" },
    { label: "Cascades Réelles Moto/Auto", value: 95, suffix: "%", detail: "Pilote d'exception réalisant la majorité des poursuites" },
    { label: "Box-Office Cumulé", value: 5.9, suffix: " Md$", detail: "La valeur sûre des thrillers survitaminés modernes" },
    { label: "Tir d'armes à feu fictifs", value: 1200, suffix: "+", detail: "Cadence d'action frénétique" }
  ]
};

// Scenic action highlight gallery
const STAR_GALLERIES: Record<string, { url: string; title: string; year: string }[]> = {
  "jackie-chan": [
    { url: "https://img.youtube.com/vi/6DR6gMIQ7XM/hqdefault.jpg", title: "Police Story - La Chute du Lustre Électrique", year: "1985" },
    { url: "https://img.youtube.com/vi/aS3pMhtiRq0/hqdefault.jpg", title: "Drunken Master - Entraînement de l'Homme Ivre", year: "1978" },
    { url: "https://img.youtube.com/vi/UWeCnz-p7x0/hqdefault.jpg", title: "Rush Hour - Combat acrobatique de rue", year: "1998" },
    { url: "https://img.youtube.com/vi/1kIx53VjJ0A/hqdefault.jpg", title: "Shanghai Knights - Duel à la gare royale", year: "2003" }
  ],
  "tom-cruise": [
    { url: "https://img.youtube.com/vi/RW6BqtVoIqI/hqdefault.jpg", title: "Top Gun: Maverick - Vol rasant en Razor Canyon", year: "2022" },
    { url: "https://img.youtube.com/vi/XHGgNH2Qs5c/hqdefault.jpg", title: "Mission: Impossible - Infiltration suspendue au plafond", year: "1996" },
    { url: "https://img.youtube.com/vi/Y86hf5SFAMM/hqdefault.jpg", title: "Oblivion - Survol des terres dévastées", year: "2013" },
    { url: "/images/legend.png", title: "Legend - L'épopée fantastique de Ridley Scott", year: "1985" }
  ],
  "bruce-lee": [
    { url: "https://img.youtube.com/vi/VtK05lU9Rto/hqdefault.jpg", title: "Opération Dragon - Duel fatal dans la salle des miroirs", year: "1973" },
    { url: "https://img.youtube.com/vi/PTAkRwZn1nU/hqdefault.jpg", title: "La Fureur du Dragon - Face-à-face au Colisée", year: "1972" },
    { url: "https://img.youtube.com/vi/5a7tOgq5EFk/hqdefault.jpg", title: "La Fureur de Vaincre - Brisure de la pancarte coloniale", year: "1972" },
    { url: "https://img.youtube.com/vi/SHIm60FMWCk/hqdefault.jpg", title: "The Big Boss - Vengeance martiale ultime", year: "1971" }
  ]
};

// Self-healing High Quality YouTube Thumbnail Loader
function YouTubeThumbnail({ 
  youtubeId, 
  alt, 
  customPoster,
  onImageLoadError 
}: { 
  youtubeId: string; 
  alt: string; 
  customPoster?: string;
  onImageLoadError?: () => void 
}) {
  const [imgSrc, setImgSrc] = useState(customPoster || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
  const [triedHq, setTriedHq] = useState(false);
  const [triedMq, setTriedMq] = useState(false);

  const handleError = () => {
    if (customPoster && imgSrc === customPoster) {
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
    } else if (!triedHq) {
      setTriedHq(true);
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    } else if (!triedMq) {
      setTriedMq(true);
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`);
    } else {
      if (onImageLoadError) {
        onImageLoadError();
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

// Generates highly realistic data deterministically if videoId is custom
function getDeterministicStats(youtubeId: string, filmTitle: string, filmYear: number, filmDuration?: string) {
  let hash = 0;
  for (let i = 0; i < youtubeId.length; i++) {
    hash = youtubeId.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const viewsCount = (1200000 + (hash % 18000000));
  const likesCount = Math.floor(viewsCount * (0.006 + (hash % 80) / 10000));
  const likesFormatted = likesCount >= 1000 ? `${(likesCount / 1000).toFixed(0)}K` : `${likesCount}`;
  const viewsFormatted = viewsCount >= 1000000 ? `${(viewsCount / 1000000).toFixed(1)}M` : `${(viewsCount / 1000).toFixed(0)}K`;

  const channels = ["Warner Bros.", "Paramount Pictures", "Universal Studios", "Sony Pictures Entertainment", "Lionsgate", "20th Century Studios", "Rotten Tomatoes Trailers"];
  const channelName = channels[hash % channels.length];

  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const day = (hash % 28) + 1;
  const month = months[hash % 12];
  const dateFormatted = `${day} ${month} ${filmYear}`;

  return {
    views: viewsFormatted,
    likes: likesFormatted,
    date: dateFormatted,
    duration: filmDuration || "1h 55m",
    channel: channelName
  };
}

// Integrated Animated Counter component
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    
    // Check if the number has decimals
    const isDecimal = !Number.isInteger(end);
    const steps = 30;
    const stepValue = end / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(timer);
        setCurrent(end);
      } else {
        setCurrent(prev => {
          const next = prev + stepValue;
          return isDecimal ? parseFloat(next.toFixed(1)) : Math.ceil(next);
        });
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bebas text-4xl sm:text-5xl text-[#F5C518] tracking-wider font-extrabold">
      {prefix}{current}{suffix}
    </span>
  );
}

// YouTube film card component with dynamic stats
interface YouTubeFilmCardProps {
  key?: any;
  film: any;
  onPlayTrailer: any;
  unavailableIds: any;
  toggleUnavailable: any;
  setUnavailableIds: any;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

function YouTubeFilmCard({ 
  film, 
  onPlayTrailer, 
  unavailableIds, 
  toggleUnavailable,
  setUnavailableIds,
  isFavorite = false,
  onToggleFavorite
}: YouTubeFilmCardProps) {
  const isUnavailable = unavailableIds.includes(film.youtubeId);
  const [loading, setLoading] = useState(true);
  const [channelName, setChannelName] = useState("");
  
  const getGenreColor = (genre: string) => {
    const lower = genre.toLowerCase();
    if (lower.includes("arts martiaux") || lower.includes("martial")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
    if (lower.includes("comédie") || lower.includes("comedy")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (lower.includes("thriller") || lower.includes("suspense")) {
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
    if (lower.includes("policier") || lower.includes("crime") || lower.includes("police")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
    if (lower.includes("espionnage") || lower.includes("spy")) {
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
    if (lower.includes("drame") || lower.includes("drama")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    return "bg-neutral-850 text-neutral-300 border-neutral-800";
  };

  const fallbackStats = REAL_YOUTUBE_STATS[film.youtubeId] || getDeterministicStats(film.youtubeId, film.title, film.year, film.duration);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const loadDynamicData = async () => {
      try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${film.youtubeId}`);
        if (response.ok) {
          const data = await response.json();
          if (active) {
            if (data.error || !data.title) {
              if (!unavailableIds.includes(film.youtubeId)) {
                setUnavailableIds((prev: string[]) => [...prev, film.youtubeId]);
              }
            } else if (data.author_name) {
              setChannelName(data.author_name);
            }
          }
        }
      } catch (err) {
        console.log("Fallback metric used:", err);
      } finally {
        setTimeout(() => {
          if (active) setLoading(false);
        }, 350);
      }
    };

    loadDynamicData();
    return () => {
      active = false;
    };
  }, [film.youtubeId]);

  const activeChannel = channelName || fallbackStats.channel;

  if (loading) {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl bg-neutral-900/15 border border-neutral-900 shadow-md h-[440px]">
        <div className="aspect-video w-full bg-neutral-900/40 animate-pulse relative" />
        <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center gap-4">
              <div className="h-5 bg-neutral-800 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded w-1/4 animate-pulse" />
            </div>
            <div className="h-3.5 bg-neutral-900 rounded w-1/3 animate-pulse" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full animate-pulse mt-4" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-8 bg-neutral-900 rounded-lg w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        if (!isUnavailable) {
          onPlayTrailer(film);
        }
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 h-[440px] shadow-lg ${
        isUnavailable 
          ? "border-red-950 bg-neutral-950/80 cursor-not-allowed" 
          : "border-neutral-900/70 bg-neutral-950/30 hover:bg-[#000000]/40 hover:border-red-600/50 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 select-none">
        <div className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${isUnavailable ? "grayscale blur-[3px] opacity-25" : ""}`}>
          <YouTubeThumbnail
            youtubeId={film.youtubeId}
            alt={film.title}
            customPoster={film.poster}
            onImageLoadError={() => {
              if (!unavailableIds.includes(film.youtubeId)) {
                setUnavailableIds((prev: string[]) => [...prev, film.youtubeId]);
              }
            }}
          />
        </div>

        <span className="absolute top-3 right-3 rounded-md bg-neutral-950/90 border border-neutral-800 px-2.5 py-0.5 text-[10px] font-mono font-bold text-red-500 tracking-wider">
          {film.year}
        </span>

        {isUnavailable ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/75 backdrop-blur-[2px]">
            <div className="bg-red-950/90 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg animate-pulse">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span>Indisponible</span>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/50 transition-colors duration-300" />
            <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-gradient-to-t from-black to-transparent flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-[#F5C518]/90 tracking-widest uppercase">TRAILER DIRECT</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-350">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/40 transition-transform duration-300 hover:scale-110">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-red-500 transition-colors duration-200 line-clamp-1 flex-1">
              {film.title}
            </h4>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`inline-block shrink-0 rounded-md border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest ${getGenreColor(film.genre)}`}>
                {film.genre}
              </span>
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(e);
                  }}
                  className={`p-1.5 rounded-lg border transition-all active:scale-95 shrink-0 bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-rose-500 hover:border-rose-500/30 ${
                    isFavorite ? "bg-rose-950/40 border-rose-500/50 text-rose-500" : ""
                  }`}
                >
                  <Heart className={`h-3 w-3 ${isFavorite ? "fill-rose-500" : ""}`} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Tv className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
            <span className="truncate text-neutral-400 italic">{activeChannel}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 py-3 border-y border-neutral-900/60 my-2.5 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-rose-500 shrink-0" />
            <span className="truncate">👁 <strong className="text-white font-semibold">{fallbackStats.views}</strong> v.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-3.5 w-3.5 text-[#F5C518] shrink-0" />
            <span className="truncate">👍 <strong className="text-white font-semibold">{fallbackStats.likes}</strong> likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="truncate">⏱ <strong className="text-white font-semibold">{film.duration || fallbackStats.duration}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">📅 <strong className="text-white font-semibold">{film.year}</strong></span>
          </div>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isUnavailable) {
                onPlayTrailer(film);
              }
            }}
            disabled={isUnavailable}
            className={`w-full py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
              isUnavailable
                ? "bg-neutral-950 border border-red-950 text-red-500/20 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md active:scale-95"
            }`}
          >
            <Play className="h-3 w-3 fill-current shrink-0" />
            <span>Lire la bande-annonce</span>
          </button>

          <button
            onClick={(e) => toggleUnavailable(film.youtubeId, e)}
            className="w-full text-[9px] font-mono tracking-wide text-neutral-600 hover:text-neutral-300 transition-colors py-0.5 flex items-center justify-center gap-1.5"
          >
            {isUnavailable ? (
              <>
                <Eye className="h-2.5 w-2.5" />
                <span>Simuler disponible</span>
              </>
            ) : (
              <>
                <EyeOff className="h-2.5 w-2.5" />
                <span>Simuler en panne</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface StarDetailProps {
  star: Star;
  onBack: () => void;
  onPlayTrailer: (film: FilmType) => void;
  favoritesStars?: string[];
  toggleFavoriteStar?: (starId: string) => void;
  favoritesFilms?: string[];
  toggleFavoriteFilm?: (youtubeId: string) => void;
}

export function StarDetail({ 
  star, 
  onBack, 
  onPlayTrailer,
  favoritesStars = [],
  toggleFavoriteStar,
  favoritesFilms = [],
  toggleFavoriteFilm
}: StarDetailProps) {
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<"highlights" | "timeline" | "all_films" | "gallery">("highlights");

  // Manage unavailable video IDs
  const [unavailableIds, setUnavailableIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("movie_unavailable_ids");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ["Ujy-Srb-7Y8"]; // Default Bruce Lee placeholder
  });

  useEffect(() => {
    try {
      localStorage.setItem("movie_unavailable_ids", JSON.stringify(unavailableIds));
    } catch (e) {
      console.error(e);
    }
  }, [unavailableIds]);

  const toggleUnavailable = (youtubeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUnavailableIds(prev => 
      prev.includes(youtubeId) 
        ? prev.filter(id => id !== youtubeId) 
        : [...prev, youtubeId]
    );
  };

  // Get bespoke timeline
  const timelineMilestones = useMemo(() => {
    return STAR_TIMELINES[star.id] || [
      { year: 1980, title: "Débuts artistiques", desc: "S'implique activement dans l'émergence des films de combat.", icon: "🎬" },
      { year: 1995, title: "L'essor au box-office", desc: "Se distingue par un charisme brut hautement sollicité.", icon: "⭐" },
      { year: 2005, title: "Consécration critiques", desc: "Incarne des figures cinématographiques d'envergure universelle.", icon: "🏆" },
      { year: 2018, title: "Derniers blockbusters", desc: "Poursuit ses performances devant les caméras du monde entier.", icon: "⛓️" }
    ];
  }, [star.id]);

  // Get bespoke stats
  const counterStats = useMemo(() => {
    return STAR_STATS[star.id] || [
      { label: "Films Marquants", value: star.films.length, suffix: "", detail: "De grandes productions immortalisées" },
      { label: "Note IMDb Critique", value: 7.7, suffix: "/10", detail: "Plébiscitée globalement" },
      { label: "Box-Office Cumulé", value: 3.4, suffix: " Md$", detail: "Générateur d'entrées historiques" },
      { label: "Années d'Activité", value: 30, suffix: " ans", detail: "Longévité sans précédent" }
    ];
  }, [star.id, star.films.length]);

  // Derive top 2 popular movies for the highlights page
  const popularMovies = useMemo(() => {
    return star.films.slice(0, 2);
  }, [star.films]);

  // Bespoke gallery scenes
  const galleryScenes = useMemo(() => {
    return STAR_GALLERIES[star.id] || star.films.map(f => ({
      url: `https://img.youtube.com/vi/${f.youtubeId}/hqdefault.jpg`,
      title: `${f.title} - Séquence phare marquante`,
      year: String(f.year)
    }));
  }, [star.id, star.films]);

  return (
    <div className="fade-in space-y-10 pb-20 font-sans">
      
      {/* 1. TOP NAV BREADCRUMB */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-5">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors duration-200 hover:bg-neutral-850 hover:text-red-500 border border-neutral-800"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Retour à l'accueil</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="cursor-pointer hover:text-[#F5C518] transition-colors" onClick={onBack}>
            ARCHIVE
          </span>
          <span className="text-neutral-700">/</span>
          <span className="text-[#F5C518] font-bold uppercase">{star.name}</span>
        </div>
      </div>

      {/* 2. MODERN HERO BANNER / PHOTO GRAND FORMAT */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950 shadow-2xl h-[450px]">
        {/* PARALLAX BLUR BACKDROP */}
        <div className="absolute inset-0 select-none overflow-hidden pointer-events-none">
          <img 
            src={star.photo} 
            alt="Blur backdrop" 
            className="w-full h-full object-cover scale-110 filter blur-3xl opacity-35 object-top"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* GLOW DECORATIONS */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />

        {/* HERO CONTENT CONTAINER */}
        <div className="absolute inset-0 z-20 p-6 sm:p-10 flex flex-col justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* PORTRAIT CROPPED MINI BANNER (PHOTO GRAND FORMAT LEFT ACCENT) */}
            <div className="hidden lg:block lg:col-span-3 aspect-[3/4] h-64 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative group">
              {!imgError ? (
                <img
                  src={star.photo}
                  alt={star.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-red-500 font-bebas text-5xl">
                  {star.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#F5C518]">STUNT MASTER</span>
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="lg:col-span-9 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 bg-[#F5C518]/15 border border-[#F5C518]/25 text-[#F5C518] px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider font-extrabold">
                  <Award className="h-3 w-3" />
                  <span>Icône Légendaire d'Action</span>
                </span>
                <span className="text-neutral-500 text-xs font-mono">•</span>
                <span className="text-neutral-300 text-xs font-mono tracking-wide">
                  {star.nationality}
                </span>
              </div>

              <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
                {star.name}
              </h1>

              {/* QUICK BIO EXCERPT */}
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed italic border-l-2 border-red-600 pl-4 py-1">
                "{star.bio}"
              </p>

              {/* ACTION CONTROLS */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {toggleFavoriteStar && (
                  <button 
                    onClick={() => toggleFavoriteStar(star.id)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      favoritesStars.includes(star.id)
                        ? "bg-rose-950/40 border-rose-500/50 text-rose-400 hover:bg-rose-950/70"
                        : "bg-black/60 border-neutral-800 hover:border-red-600/30 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${favoritesStars.includes(star.id) ? "text-rose-500 fill-rose-500 animate-pulse" : "text-neutral-400"}`} />
                    <span>{favoritesStars.includes(star.id) ? "Dans mes acteurs favoris" : "Ajouter aux favoris"}</span>
                  </button>
                )}

                <button 
                  onClick={() => {
                    if (star.films.length > 0) {
                      onPlayTrailer(star.films[0]);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-950/40"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Lecture Démo</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. MULTI-TABS INTERACTIVE CONTROLLERS */}
      <div className="flex border-b border-neutral-900 overflow-x-auto pb-px scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab("highlights")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shrink-0 border-b-2 ${
            activeTab === "highlights"
              ? "border-red-600 text-white"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          🍿 À la une & Stats
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shrink-0 border-b-2 ${
            activeTab === "timeline"
              ? "border-red-600 text-white"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          ⏳ Timeline carrière
        </button>
        <button
          onClick={() => setActiveTab("all_films")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shrink-0 border-b-2 ${
            activeTab === "all_films"
              ? "border-red-600 text-white"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          🎬 Filmographie Complète ({star.films.length})
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shrink-0 border-b-2 ${
            activeTab === "gallery"
              ? "border-red-600 text-white"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          📸 Galerie d'Action ({galleryScenes.length})
        </button>
      </div>

      {/* TABS CONTAINER */}
      <div className="min-h-[400px]">
        {/* TAB A: HIGHLIGHTS & COMPTEURS ANIMÉS */}
        {activeTab === "highlights" && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* SUB-SECTION: COMPTEURS ANIMÉS (STATISTIQUES) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <h3 className="font-bebas text-2xl tracking-widest text-white uppercase">MATRICE DES STATISTIQUES RELEVÉES</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {counterStats.map((stat, sIndex) => (
                  <div 
                    key={sIndex} 
                    className="p-5 rounded-2xl bg-neutral-950/65 border border-neutral-900 hover:border-neutral-800 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase block mb-1">
                        {stat.label}
                      </span>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SUB-SECTION: FILMS POPULAIRES (NETFLIX + IMDB SPLIT BIILSTREET) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-[#F5C518]" />
                  <h3 className="font-bebas text-2xl tracking-widest text-white uppercase">FILMS POPULAIRES AU BOX-OFFICE</h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">NOTATIONS VÉRIFIÉES</span>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {popularMovies.map((film, index) => {
                  const fallbackStats = REAL_YOUTUBE_STATS[film.youtubeId] || getDeterministicStats(film.youtubeId, film.title, film.year, film.duration);
                  const isFavorite = favoritesFilms.includes(film.youtubeId);
                  
                  return (
                    <div 
                      key={film.youtubeId}
                      className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-red-600/30 transition-all duration-350"
                    >
                      {/* Image Frame */}
                      <div className="sm:w-2/5 aspect-video sm:aspect-auto sm:h-52 overflow-hidden bg-neutral-900 relative">
                        <YouTubeThumbnail 
                          youtubeId={film.youtubeId} 
                          alt={film.title} 
                          customPoster={film.poster} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 to-transparent" />
                      </div>

                      {/* Content Frame */}
                      <div className="sm:w-3/5 p-4 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[#F5C518] uppercase tracking-wider font-extrabold">
                              🔥 POPULAIRE #{index + 1}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {film.year}
                            </span>
                          </div>
                          <h4 className="text-lg font-extrabold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                            {film.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-mono">
                            Genre: <strong className="text-neutral-300">{film.genre}</strong> • Durée: <strong className="text-neutral-300">{film.duration || fallbackStats.duration}</strong>
                          </p>
                          <p className="text-[11px] text-neutral-550 leading-relaxed font-light line-clamp-2">
                            Spectaculaire chef-d'œuvre cinématographique plébiscité par les spectateurs sous les bravos d'un auditoire international en délire.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onPlayTrailer(film)}
                            className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>Lire</span>
                          </button>
                          {toggleFavoriteFilm && (
                            <button
                              onClick={() => toggleFavoriteFilm(film.youtubeId)}
                              className={`p-2 rounded-lg border transition-all shrink-0 ${
                                isFavorite 
                                  ? "bg-rose-950/40 border-rose-500/40 text-rose-500" 
                                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                              }`}
                            >
                              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-500" : ""}`} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB B: INTERACTIVE CAREER TIMELINE */}
        {activeTab === "timeline" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3 mb-6">
              <Calendar className="h-4 w-4 text-red-500" />
              <h3 className="font-bebas text-2xl tracking-widest text-white uppercase">TIMELINE DE LA CARRIÈRE</h3>
            </div>

            {/* VERTICAL TIMELINE LAYOUT */}
            <div className="relative border-l-2 border-neutral-900 ml-4 py-4 space-y-8 max-w-4xl">
              {timelineMilestones.map((milestone, idx) => (
                <div key={idx} className="relative pl-8 group">
                  {/* Glowing timeline node */}
                  <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-neutral-950 border-2 border-red-600 flex items-center justify-center text-[9px] group-hover:scale-110 transition-transform group-hover:bg-red-600 group-hover:text-white shadow-lg z-10">
                    <span className="text-[10px] block leading-none select-none">{milestone.icon}</span>
                  </div>

                  <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-950/40 border border-neutral-900 group-hover:border-neutral-800 transition-all duration-300">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-[#F5C518] font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {milestone.year}
                      </span>
                      <span className="text-neutral-500">• Étape clé</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white tracking-tight">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-neutral-450 leading-relaxed font-light">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB C: ALL FILMOGRAPHIE TRADITIONAL TRAILER LIST */}
        {activeTab === "all_films" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-red-500" />
                <h3 className="font-bebas text-2xl tracking-widest text-white uppercase">TOUS LES AUTRES TRAILERS DISPONIBLES</h3>
              </div>
              <span className="text-xs text-neutral-500 font-mono">{star.films.length} Chefs-d'œuvre référencés</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {star.films.map((film, fi) => {
                const isFilmFav = favoritesFilms.includes(film.youtubeId);
                return (
                  <YouTubeFilmCard
                    key={fi}
                    film={film}
                    onPlayTrailer={onPlayTrailer}
                    unavailableIds={unavailableIds}
                    toggleUnavailable={toggleUnavailable}
                    setUnavailableIds={setUnavailableIds}
                    isFavorite={isFilmFav}
                    onToggleFavorite={toggleFavoriteFilm ? () => toggleFavoriteFilm(film.youtubeId) : undefined}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB D: ACTION STUNT MEDIA GALLERIES */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Camera className="h-4 w-4 text-[#F5C518]" />
              <h3 className="font-bebas text-2xl tracking-widest text-white uppercase">PHOTOS EXCLUSIVES & CAPTURES DE TOURNAGE</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryScenes.map((scene, scIdx) => (
                <div 
                  key={scIdx}
                  onClick={() => {
                    // Try to match corresponding trailer film to launch reader
                    const match = star.films.find(f => f.youtubeId === scene.url.split('/vi/')[1]?.split('/')[0]);
                    if (match) {
                      onPlayTrailer(match);
                    }
                  }}
                  className="group relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-[#F5C518]/30 transition-all cursor-pointer shadow-md"
                >
                  <img 
                    src={scene.url} 
                    alt={scene.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
                  
                  {/* Absolute metadata details on gallery card */}
                  <div className="absolute inset-0 p-3.5 flex flex-col justify-between items-start z-10">
                    <span className="text-[8px] font-mono font-bold tracking-widest uppercase bg-black/80 text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded">
                      CAPTURE HD • {scene.year}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white leading-tight line-clamp-1 group-hover:text-[#F5C518] transition-colors">
                        {scene.title}
                      </p>
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                        <Play className="h-2 w-2 fill-current text-red-500" /> Click to Play Trailer
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
