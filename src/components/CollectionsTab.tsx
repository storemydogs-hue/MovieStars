import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  Heart, 
  Share2, 
  ExternalLink, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Film, 
  Users, 
  Flame, 
  Sparkles, 
  Coffee, 
  Search, 
  Award, 
  Tv, 
  Activity, 
  Info,
  ChevronRight,
  TrendingUp,
  FileText
} from "lucide-react";
import { starsData } from "../data";

interface ArticleSchema {
  id: string;
  category: string;
  tagColor: string;
  accentBg: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  intro: string;
  secondaryKeywords: string[];
  semanticFields: string[];
  sections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  tableData: {
    headers: string[];
    rows: string[][];
    caption: string;
  };
  summary: string;
  faqs: {
    q: string;
    a: string;
  }[];
}

interface CollectionsTabProps {
  onSelectStar: (starId: string | null) => void;
  onPlayTrailer: (film: any) => void;
  setCurrentTab: (tab: string) => void;
}

export function CollectionsTab({ onSelectStar, onPlayTrailer, setCurrentTab }: CollectionsTabProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [copie, setCopie] = useState(false);

  // Helper action to easily play Top Gun Maverick
  const playTopGun = () => {
    const maverickFilm = {
      title: "Top Gun: Maverick",
      year: 2022,
      genre: "Action Aviation",
      youtubeId: "RW6BqtVoIqI",
      duration: "2h 10m",
      poster: "https://img.youtube.com/vi/RW6BqtVoIqI/maxresdefault.jpg"
    };
    onPlayTrailer(maverickFilm);
  };

  // Build the 3 detailed articles
  const articles: ArticleSchema[] = useMemo(() => [
    {
      id: "film-complet",
      category: "Cinéma & Analyse",
      tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
      accentBg: "from-red-600/10 to-transparent",
      title: "Film Complet en Ligne : Le Guide Ultime de Visionnage",
      seoTitle: "Film Complet en Ligne : Le Guide de Visionnage Légal",
      metaDescription: "Retrouvez notre guide expert pour regarder un film complet de haute qualité légalement en ligne. Conseils d'attention et alliance café et concentration.",
      slug: "guide-film-complet-streaming-hd-legal",
      readTime: "12 min",
      date: "16 Juin 2026",
      author: "Jean-Paul Belmondo",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Salle de cinéma vintage projecteur en herbe et écran blanc de film complet",
      imageCaption: "La majesté d'une œuvre cinématographique se révèle dans l'expérience immersive d'un film complet sans interruption.",
      intro: "Regarder un film complet de bout en bout est aujourd'hui devenu une pratique courante, mais ô combien exigeante. À l'ère de la fragmentation de l'attention numérique, s'immerger pleinement dans un long-métrage dramatique ou un polar complexe nécessite un certain état d'esprit. Cet article premium analyse le patrimoine des œuvres cinématographiques intégrales, les coulisses techniques de la haute définition et l'importance capitale d'optimiser son environnement physique de visionnage pour une expérience mémorable.",
      secondaryKeywords: ["long-métrage", "cinéma indépendant", "plateforme de vidéo", "patrimoine culturel", "répertoire classique", "festival de Cannes", "haute définition", "vidéo à la demande"],
      semanticFields: ["projection sonore", "expérience immersive", "restauration de pellicule", "droits d'auteur filmogaphique", "cinéphilie active"],
      sections: [
        {
          id: "classic-cinema",
          title: "1. Pourquoi privilégier un film complet et restauré ?",
          content: (
            <div className="space-y-4">
              <p>
                Le cinéma moderne souffre parfois d'un syndrome de découpage et de résumés trop rapides. Pourtant, la vision d'un réalisateur ne s'exprime pleinement que lorsque le spectateur regarde le <strong>film complet</strong>, respectant le rythme initialement imposé. Qu'il s'agisse d'un chef-d'œuvre de la Nouvelle Vague comme le cinéma classique français, d'un drame historique de 3 heures ou d'un intense film d'arts martiaux, chaque scène intermédiaire remplit une fonction narrative vitale.
              </p>
              <p>
                Les versions écourtées ou coupées à la hâte pour les réseaux sociaux éliminent les moments de tension lente, pourtant essentiels pour donner de la force aux explosions d'action ou de drame. Par exemple, apprécier l'esthétique du film culte restauré de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("bruce-lee"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Bruce Lee</span> ou le suspense haletant de <em>Heat</em> avec Robert De Niro requiert de se frotter à la version complète non censurée.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Respect de l'œuvre d'art :</strong> Le montage d'origine d'un film complet est une partition millétrée.</li>
                <li><strong>Profondeur dramatique :</strong> Les personnages ont la place d'évoluer de façon logique et crédible.</li>
                <li><strong>Qualité photographique :</strong> La restauration moderne de pellicules nous permet de voir des détails au pixel près.</li>
              </ul>
            </div>
          )
        },
        {
          id: "cafe-concentration",
          title: "2. Le rôle crucial du café et de la concentration pour un visionnage profond",
          content: (
            <div className="space-y-4">
              <p>
                Une expérience cinématographique d'envergure demande une attention soutenue. Pour apprécier chaque astuce de mise en scène, chaque subtilité du jeu des acteurs et les rebondissements multiples de l'intrigue, l'alliance entre <strong>café et concentration</strong> devient l'outil secret du cinéphile accompli. 
              </p>
              <div className="my-6 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-4">
                <Coffee className="h-8 w-8 text-[#F5C518] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1">Le Rituel du Café Cinéphilique</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    La caféine bloque les récepteurs d'adénosine du cerveau, un neurotransmetteur qui favorise la somnolence. En prenant une tasse avant le début d'un long-métrage complexe, vos capacités cognitives et visuelles sont stimulées au maximum. Votre niveau de <strong>café et concentration</strong> est alors à son apogée, vous permettant de déceler les indices visuels d'arrière-plan négligés par une attention distraite.
                  </p>
                </div>
              </div>
              <p>
                Le cinéma n'est plus seulement un divertissement passif ; c'est une lecture esthétique active. Grâce à la vivacité d'esprit fournie par ce rituel, le spectateur développe une acuité intellectuelle prompte à décoder la grammaire du film. Vous apprivoisez les mouvements lents de caméra, appréciez les moments d'exposition et connectez les fils rouges de l'intrigue comme un détective. Un bon expresso chaud avant de plonger dans les 2 heures explosives de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={playTopGun}>Top Gun: Maverick (2022)</span> garantit une décharge d'adrénaline mémorable.
              </p>
            </div>
          )
        },
        {
          id: "legal-platforms",
          title: "3. Les meilleures plateformes de diffusion légale et répertoire classique",
          content: (
            <div className="space-y-4">
              <p>
                Regarder un film complet implique d'utiliser des canaux légaux respectueux des artistes et ayants droit. En France, plusieurs plateformes agrègent un patrimoine inestimable pour les cinéphiles.
              </p>
              <p>
                La plateforme publique d'archives ou le site du <a href="https://www.cnc.fr" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 font-bold inline-flex items-center gap-1">CNC (Centre national du cinéma et de l'image animée) <ExternalLink className="h-3 w-3" /></a> fournissent des listes exceptionnelles d'œuvres cinématographiques libres d'accès, restaurées professionnellement en haute définition. Des services spécialisés tels que MUBI ou Filmo TV se concentrent sur le cinéma d'auteur et indépendant.
              </p>
              <p>
                Il est important de rappeler que s'orienter vers des plateformes illégales rime souvent avec mauvaise compression vidéo, publicités intrusives nuisant à la concentration, et absence totale de soutien économique pour les artistes qui créent ces magnifiques films et acteurs d'exception.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        caption: "Tableau comparatif des types de plateformes pour visionner un film complet",
        headers: ["Type de Plateforme", "Caractéristiques Clés", "Résolution Vidéo", "Soutien aux Artistes"],
        rows: [
          ["Plateformes Privées (Netflix, Prime)", "Grand catalogue commercial, productions exclusives", "Ultra HD / 4K", "Très élevé (investissements directs)"],
          ["AVOD (Gratuit avec Publicités)", "Accès gratuit légal, répertoire rétro, pop-corn movie", "HD 1080p", "Moyen (rémunéré à l'affichage)"],
          ["Archives Nationales / CNC", "Patrimoine historique, raretés, cinéma indépendant", "HD / 2K", "Élevé (préservation culturelle)"],
          ["Sites Pirates Illégaux", "Plein de pop-ups, compression affreuse, illégal", "Basse qualité / 480p", "Zéro (vol de propriété intellectuelle)"]
        ]
      },
      summary: "Regarder un film complet de façon immersive est un art en soi. En stimulant son niveau d'éveil grâce au rituel sain de café et concentration, et en privilégiant des plateformes légales comme le catalogue du CNC ou d'AVOD de confiance, vous redécouvrez la magie de la narration continue sans piratage ni publicités d'arnaqueurs.",
      faqs: [
        {
          q: "Comment trouver un film complet libre de droits légalement ?",
          a: "De nombreux longs-métrages tombés dans le domaine public sont accessibles sur des archives nationales en ligne de confiance (comme Open Culture ou Internet Archive) et sur la plateforme d'apprentissage du CNC. Ceci garantit un accès 100% légal et sécurisé."
        },
        {
          q: "Quel est l'impact de l'attention lors d'une séance de cinéma de 3 heures ?",
          a: "Une attention soutenue permet de créer des connexions de mémoire à long terme, d'assimiler les détails d'un thriller complexe et de ressentir l'arc dramatique des personnages dans sa globalité. La fatigue cognitive peut être évitée grâce à une bonne mise en condition physique."
        },
        {
          q: "Les plateformes AVOD proposent-elles de vrais films complets ?",
          a: "Oui, la vidéo à la demande financée par la publicité (AVOD) comme TF1+, France.tv, ou Pluto TV met à disposition des téléspectateurs des longs-métrages entiers légalement. Les coupures pub financent directement les droits de diffusion."
        },
        {
          q: "Pourquoi de bons niveaux de café et concentration améliorent-ils l'expérience ?",
          a: "Le café stimule la clarté d'esprit et l'orientation spatiale de l'œil. Ainsi focalisé, vous lisez instinctivement les astuces cachées du cadrage photo, les contrastes de lumière naturelle et le jeu délicat du regard exercé par un grand acteur de cinéma."
        },
        {
          q: "La haute définition (HD) est-elle gratuite sur la plupart des répertoires d'archives ?",
          a: "La plupart des films d'archives restaurés par des institutions publiques ou des fondations culturelles sont mis en ligne gratuitement en haute définition pour préserver le patrimoine culturel universel."
        }
      ]
    },
    {
      id: "film-streaming-gratuit",
      category: "Streaming & Technologie",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      accentBg: "from-amber-600/10 to-transparent",
      title: "Comment Regarder des Films en Streaming Gratuit Légalement en 2026",
      seoTitle: "Film Streaming Gratuit : Top Plateformes Légales 2026",
      metaDescription: "Guide complet gratuit : où regarder des films en streaming gratuit en toute légalité en France. Astuces, d'AVOD aux archives publiques, et focus mental.",
      slug: "film-streaming-gratuit-legal-catalogue",
      readTime: "10 min",
      date: "15 Juin 2026",
      author: "Simone Signoret",
      image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Écran de tablette montrant un film en streaming gratuit légitime à la table d'un café branché",
      imageCaption: "La distribution de films en ligne se démocratise : apprenez à naviguer légalement parmi les catalogues de streaming gratuit.",
      intro: "La recherche du terme « film streaming gratuit » est l'une des requêtes les plus formulées sur les moteurs de recherche. Malheureusement, la majorité des premiers résultats oriente l'internaute vers des sites clandestins truffés d'hackerware. Heureusement, l'année 2026 marque l'apogée d'incroyables services d'AVOD et de chaînes FAST gratuites et parfaitement réglementaires en France. Notre enquête décortique ces offres et met en lumière les techniques pour apprécier ces diffusions avec un esprit pleinement affûté.",
      secondaryKeywords: ["télécharger des films", "vidéo à la demande", "plateforme légale", "diffusion en ligne", "œuvres libres de droits", "AVOD", "expérience utilisateur", "haut débit"],
      semanticFields: ["publicité programmatique", "chaînes FAST en ligne", "catalogue de cinéma", "accès libre légal", "vitesse de réseau"],
      sections: [
        {
          id: "streaming-modes",
          title: "1. Qu'est-ce que le streaming gratuit et légal (AVOD, FAST, Domaine Public) ?",
          content: (
            <div className="space-y-4">
              <p>
                Contrairement aux idées reçues, la gratuité n'est pas synonyme de piratage. Le modèle économique de la vidéo en ligne s'est profondément réinventé. Aujourd'hui, trois piliers réglementaires soutiennent le marché du <strong>film streaming gratuit</strong> légitime :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong>L'AVOD (Advertising-based Video on Demand) :</strong> Des plateformes majeures comme TF1+, France.tv, Arte, ou Rakuten TV offrent des centaines de films de cinéma en échange de quelques écrans publicitaires courts et non intrusifs.
                </li>
                <li>
                  <strong>Les chaînes FAST (Free Ad-supported Streaming TV) :</strong> Ce sont des flux linéaires thématiques diffusés en continu sur Internet. De grands constructeurs (Samsung TV Plus, LG Channels, Plex) intègrent directement ces catalogues de films.
                </li>
                <li>
                  <strong>Le Domaine Public :</strong> Les films dont les droits d'auteur ont expiré (généralement 70 ans après la mort du créateur) entrent dans le domaine public. Des milliers de chefs-d'œuvre du cinéma noir, du burlesque ou des premiers thrillers d'action sont librement et légalement exploitables.
                </li>
              </ul>
              <p>
                Ces modèles assurent que les créateurs, compositeurs de bandes-son et acteurs reçoivent des royalties équitables basées sur les revenus publicitaires captés pendant votre visionnage.
              </p>
            </div>
          )
        },
        {
          id: "ambient-concentration",
          title: "2. L'importance de l'environnement : café et concentration à la maison",
          content: (
            <div className="space-y-4">
              <p>
                Lorsque l'on ne paie pas son ticket de cinéma à l'entrée de la salle obscure, le niveau de distraction à domicile est démultiplié : notifications de smartphone, bruits de voisinage, fatigue physique accumulée. Pour extraire le meilleur parti d'un film en streaming, une configuration mentale spécifique est requise. C'est ici que l'exercice combiné du <strong>café et concentration</strong> déploie ses bienfaits psychologiques.
              </p>
              <p>
                Servir une boisson chaude de caractère, telle qu'un café d'origine éthiopienne ou un authentique expresso italien, conditionne votre rituel de visionnage. Ce rituel signale à votre cerveau que la période de divertissement exige de la pleine conscience.
              </p>
              <p>
                De plus, notre acuité visuelle dépend fortement de la vigilance corticale. Profiter de la clarté offerte par ce breuvage permet au spectateur d'étudier l'ingénierie créative des cascades menées par des pros comme <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("tom-cruise"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Tom Cruise</span> dans notre base de données locale ou l'élégance de la gestuelle de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("jackie-chan"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Jackie Chan</span>.
              </p>
            </div>
          )
        },
        {
          id: "best-free-platforms",
          title: "3. Comparatif des meilleures plateformes de streaming gratuit en France",
          content: (
            <div className="space-y-4">
              <p>
                Le paysage médiatique français est l'un des plus riches au monde en matière d'offres numériques gratuites de qualité. France Télévisions et Arte disposent d'interfaces extrêmement fluides où l'on déniche des rétrospectives d'acteurs oscarisés ou des pépites primées à Cannes.
              </p>
              <p>
                Pour le cinéma de genre et les thrillers intenses, la plateforme de SVOD locale propose également des périodes d'essais gratuits amplement suffisantes pour visionner une sélection rigoureuse d'action. En optimisant votre bande passante et en évitant les téléchargements simultanés, vous préservez les détails visuels en haute résolution indispensables aux fresques épiques.
              </p>
              <p>
                Ne négligez jamais de faire un tour sur des portails thématiques officiels comme <a href="https://www.imdb.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 font-bold inline-flex items-center gap-1">IMDb <ExternalLink className="h-3 w-3" /></a> ou le <a href="https://fr.wikipedia.org/wiki/Portail:Cin%C3%A9ma" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 font-bold inline-flex items-center gap-1">Portail du Cinéma sur Wikipédia <ExternalLink className="h-3 w-3" /></a> pour vérifier le scénario ou l'histoire complète d'un film avant d'appuyer sur la touche de lecture.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        caption: "Tableau de comparaison technique : AVOD (Légal) vs Plateformes Illégales de Streaming",
        headers: ["Critère d'Analyse", "AVOD & FAST Légal (Ex: Arte, TF1+)", "Sites Streaming Illégaux"],
        rows: [
          ["Légitimité Juridique", "100% Légal, soutient la création", "Illégal, passible d'amendes administratives"],
          ["Sécurité Informatique", "Aucun virus, publicité encadrée", "Pop-ups invasifs, programmes malveillants"],
          ["Stabilité du Flux", "Hébergé sur serveurs CDN ultra-rapides", "Coupures récurrentes, temps de chargement infinis"],
          ["Spécifications Audio/Vidéo", "Haute Définition, Son Dolby Multichannel", "Fichiers compressés, bruit, image terne"],
          ["Compatibilité TV & Mobile", "Applications compatibles Smart TV natif", "Nécessite des navigateurs spécifiques, instable"]
        ]
      },
      summary: "Trouver un film en streaming gratuit et légal n'a jamais été aussi simple en France grâce à l'écosystème de l'AVOD de premier choix. Prenez le contrôle de votre attention en alliant rituel de café et concentration, évitant ainsi le piège du zapping constant pour renouer avec la contemplation active d'actes artistiques virtuoses.",
      faqs: [
        {
          q: "Quels sont les sites de streaming 100% gratuits et légaux en France ?",
          a: "Les leaders incontestés sont France.tv, Arte.tv, TF1+, M6+, Pluto TV, et Molotov. Ils vous donnent libre accès à un répertoire incroyable de films authentiques de grande renommée sans frais d'abonnement."
        },
        {
          q: "Qu'est-ce que la technologie de streaming AVOD ?",
          a: "Il s'agit de la vidéo à la demande financée par la publicité. Le spectateur ne paie pas d'abonnement mensuel : des espaces publicitaires ciblés sont diffusés avant et pendant le long-métrage pour lever les coûts de licence."
        },
        {
          q: "Comment optimiser sa connexion haut débit pour le streaming gratuit ?",
          a: "Pour empêcher les saccades ou micro-coupures de diffusion, connectez de préférence votre appareil de lecture au réseau Wi-Fi 5Ghz ou utilisez un câble Ethernet de catégorie 6. Fermez également tous les onglets web inactifs."
        },
        {
          q: "Quel est le meilleur moment pour coupler café et concentration devant un film ?",
          a: "En fin d'après-midi ou en tout début de soirée, lorsque les tâches quotidiennes sont achevées. L'expression combinée du café et concentration vous aide à surmonter la léthargie de fin de journée pour apprécier le film cinématographiquement."
        },
        {
          q: "Doit-on s'inscrire pour regarder des films sur les plateformes des chaînes publiques ?",
          a: "Oui, la création d'un compte gratuit est obligatoire sur TF1+, France.tv ou Arte pour mémoriser vos historiques de reprise vidéo et respecter les régulations géographiques fixant les droits de diffusion uniquement sur le territoire national."
        }
      ]
    },
    {
      id: "films-et-acteurs",
      category: "Portraits & Casting",
      tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
      accentBg: "from-red-600/10 to-transparent",
      title: "La Synergie Divine des Films et Acteurs d'Action de Légende",
      seoTitle: "Films et Acteurs : Les Secrets du Jeu d'Action Culte",
      metaDescription: "Plongez dans l'alliance magique entre grands films et acteurs légendaires. Analyse complète des secrets d'acteurs de génie qui façonnent notre cinéma.",
      slug: "films-et-acteurs-secrets-jeu-et-cascades",
      readTime: "15 min",
      date: "14 Juin 2026",
      author: "Jean-Pierre Melville",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Gros plan d'une caméra de cinéma hollywoodienne sur rails ciblant des acteurs d'action",
      imageCaption: "La force immortelle du cinéma réside dans son habilité à marier la virtuosité technique des caméras aux talents bruts des acteurs.",
      intro: "Qu'est-ce qui élève un simple script d'action de série B au rang de monument de la culture populaire mondiale ? La réponse réside dans une alchimie unique : la rencontre symbiotique entre grands films et acteurs d'exception. En incarnant des figures d'autorité morales, des vengeurs foudroyants ou des virtuoses d'arts martiaux, ces icônes marquent notre imaginaire collectif à jamais. Voyage au cœur d'un univers où l'abnégation physique, l'interprétation théâtrale et la discipline mentale s'unissent pour donner naissance à des chefs-d'œuvre exceptionnels.",
      secondaryKeywords: ["star d'action", "performance dramatique", "distribution", "casting", "rôle emblématique", "réalisateur culte", "cinéma de genre", "méthode Actors Studio", "Oscars du cinéma", "art dramatique"],
      semanticFields: ["expression corporelle", "discipline d'entraînement", "présence magnétique", "mise en scène physique", "charisme de star"],
      sections: [
        {
          id: "magic-alliance",
          title: "1. L'alliance magique entre le scénario et l'acteur de légende",
          content: (
            <div className="space-y-4">
              <p>
                Le cinéma est une symbiose de talents. Un scénariste peut concevoir les meilleures répliques du monde, ou un cascadeur dessiner les duels les plus virtuoses, sans une <strong>star d'action</strong> au magnétisme indéniable pour habiter le cadre, l'impact spirituel restera stérile. Les collaborations légendaires de l'histoire (de De Niro avec Scorsese à Jason Statham avec Guy Ritchie) démontrent comment un acteur devient le prolongement organique du réalisateur culte.
              </p>
              <p>
                Prenez l'exemple majeur de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("robert-de-niro"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Robert De Niro</span> dans <em>Taxi Driver</em> ou <em>Raging Bull</em>. Sa préparation monacale, typique de la rigueur de la méthode de l'Actors Studio, transcende la pellicule pour imprégner son rôle emblématique. Le public ne voit pas un comédien déclamer des textes froids, il est confronté à l'incarnation d'un homme brisé.
              </p>
              <p>
                Cette vérité s'applique au cinéma d'arts martiaux comme à la pure action hollywoodienne. La prestance scénique, liée à un cadrage précis du réalisateur, donne aux légendes du grand écran cette aura mythologique qui surmonte les âges et les époques.
              </p>
            </div>
          )
        },
        {
          id: "intensity-stunts",
          title: "2. Décryptage des cascades physiques : de Bruce Lee à Jason Statham",
          content: (
            <div className="space-y-4">
              <p>
                Ce qui dissocie les grands <strong>films et acteurs</strong> d'action du reste de la production, c'est leur degré d'implication physique. Le public ressent instantanément si l'acteur exécute lui-même sa cascade d'action ou s'il se repose sur des effets numériques d'incrustation sur fond vert. 
              </p>
              <p>
                Les figures représentées au cœur de notre application témoignent de cette quête de réalisme absolu :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong className="text-white hover:underline cursor-pointer" onClick={() => { onSelectStar("jackie-chan"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Jackie Chan :</strong> Maître absolu de la cascade comique et acrobatique, il a frôlé la mort à de nombreuses reprises en sautant sur de vieux bus ou en glissant le long d'ampoules électriques nues.
                </li>
                <li>
                  <strong className="text-white hover:underline cursor-pointer" onClick={() => { onSelectStar("bruce-lee"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Bruce Lee :</strong> Créateur du concept philosophique et martial Jeet Kune Do, sa vitesse de frappe au poing était si fulgurante qu'elle imposait de ralentir le défilement de la pellicule de projection pour être vue des spectateurs.
                </li>
                <li>
                  <strong className="text-white hover:underline cursor-pointer" onClick={() => { onSelectStar("jason-statham"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Jason Statham :</strong> Ancien athlète de plongeon olympique, il s'assure de chorégraphier lui-même les affrontements musclés de ses prestigieuses sagas d'action moderne (dont l'iconique <em>Le Transporteur</em>).
                </li>
              </ul>
            </div>
          )
        },
        {
          id: "mental-focus",
          title: "3. Le pouvoir du \"café et concentration\" dans l'analyse critique du jeu",
          content: (
            <div className="space-y-4">
              <p>
                On l'oublie trop souvent, mais estimer à sa juste valeur la virtuosité d'une performance théâtrale requiert une acuité mentale optimale du spectateur. Analyser comment les émotions d'un personnage se traduisent à l'écran — une simple dilation de pupille de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("denzel-washington"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Denzel Washington</span> dans <em>Training Day</em> ou un glissement d'épaule de <span className="text-[#F5C518] hover:underline cursor-pointer" onClick={() => { onSelectStar("brad-pitt"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Brad Pitt</span> dans <em>Fight Club</em> — relève d'une fine observation intellectuelle.
              </p>
              <p>
                C'est là que réside l'intérêt de cultiver un climat propice de <strong>café et concentration</strong>. Boire un nectar d'or noir favorise les ondes cérébrales de veille alpha et bêta, vous permettant de démythifier la structure invisible du montage. Vous repérez les coupes invisibles, comprenez où se situent les points de rupture physiques de la performance dramatique et gagnez une profonde culture critique du cinéma moderne.
              </p>
              <p>
                La prochaine fois que vous parcourrez la riche galerie de nos films d'action emblématiques, faites chauffer votre machine à expresso. Installez-vous sereinement, respirez profondément et concentrez-vous sur le langage du cadre posé par l'acteur de renom. C'est l'initiation idéale à la cinéphilie d'élite.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        caption: "Tableau d'analyse : Profils légendaires de notre base de données d'acteurs",
        headers: ["Acteur", "Spécialité & Type Physique", "Style de Cascade dominant", "Oscar / Distinction Phare"],
        rows: [
          ["Bruce Lee", "Arts Martiaux, Philosophie, Vitesse", "Chorégraphique, Jeet Kune Do originel", "Icône culturelle éternelle, Hollywood Walk of Fame"],
          ["Jackie Chan", "Acrobate, Arts Martiaux Comiques", "Créativité urbaine sans doublures", "Oscar d'honneur pour l'ensemble d'une carrière (2016)"],
          ["Tom Cruise", "Action Militaire, Sprint, Altitude", "G-Force réelle, Parachutisme extrême, Burj escalade", "Nommé 4 fois, Palme d'honneur honoraire à Cannes (2022)"],
          ["Robert De Niro", "Drame Psychologique, Polar Sombre", "Implication corporelle dramatique (Raging Bull)", "Oscar du Meilleur Acteur et Meilleur Second Rôle"],
          ["Denzel Washington", "Autorité, Force de Caractère, Polar", "Méthodique, Impact dramatique pur", "Double lauréat aux Oscars (Glory, Training Day)"],
          ["Jason Statham", "Combat Tactique, Poursuites Auto", "Chorégraphie physique violente de mêlée, Moto", "Référence internationale du cinéma d'Action moderne"]
        ]
      },
      summary: "Une œuvre cinématographique prend toute sa dimension à travers le pont jeté entre le scénario de génie et les acteurs de premier plan qui incarnent ces rôles d'action cultes avec un engagement physique total. Le rituel intellectuel de café et concentration vous équipe pour déceler toute la subtilité de cette synergie artistique rare.",
      faqs: [
        {
          q: "Pourquoi la complicité entre films et acteurs change-t-elle un film ordinaire en classique ?",
          a: "Parce qu'un acteur de légende apporte des nuances spontanées et une corporalité brute indétectable sur le papier du script. Les improvisations légendaires de De Niro (le fameux 'You talkin' to me?') ou les cascades improvisées de Jackie Chan en sont la preuve."
        },
        {
          q: "Comment les acteurs d'action préparent-ils leurs cascades sans doublure ?",
          a: "Ils s'imposent des régimes athlétiques monacaux, souvent guidés par des équipes de cascadeurs professionnels et des nutritionnistes chevronnés, couplés à des milliers d'heures de répétition au millimètre près en studio fermé."
        },
        {
          q: "Quelle est l'influence de la méthode Actors Studio dans le cinéma d'action moderne ?",
          a: "Elle incite l'acteur à puiser dans sa propre mémoire affective et sensorielle pour ressentir la douleur d'un combat, d'une blessure de guerre ou de la perte d'un proche, rendant ainsi les thrillers et polars d'action infiniment plus profonds dramatiquement."
        },
        {
          q: "Pourquoi associer café et concentration pour apprécier les performances physiques ?",
          a: "Parce que les scènes d'action modernes défilent à un tempo ultra-rapide. Maximiser ses capacités cognitives par l'exercice sain du café et concentration vous aide à apprécier les nuances chorégraphiques, le jeu subtil du regard de l'interprète sous la poussière des déflagrations."
        },
        {
          q: "Quels sont les acteurs légendaires représentés sur Movie Stars ?",
          a: "Nous hébergeons de superbes analyses de combat et profils complets d'acteurs mythiques tels que Bruce Lee, Jackie Chan, Tom Cruise, Jason Statham, Brad Pitt, Robert De Niro et Denzel Washington."
        }
      ]
    }
  ], [onPlayTrailer, onSelectStar]);

  const activeArticle = useMemo(() => {
    return articles.find(a => a.id === selectedArticleId) || null;
  }, [selectedArticleId, articles]);

  const handleShare = (article: ArticleSchema) => {
    const url = `${window.location.origin}/collections/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    }
  };

  return (
    <div className="fade-in space-y-10 pb-20 font-sans" id="collections-hub-section">
      
      {/* 1. SECTION HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-5">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-amber-500 rounded-full" />
          <h2 className="font-bebas text-4xl tracking-wide text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-amber-500" />
            Hub des Collections & Articles SEO
          </h2>
        </div>
        
        {selectedArticleId ? (
          <button
            onClick={() => {
              setSelectedArticleId(null);
              setExpandedFaqIndex(null);
            }}
            className="group flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors duration-200 hover:bg-neutral-900 hover:text-amber-500 border border-neutral-800"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Toutes les Collections</span>
          </button>
        ) : (
          <div className="text-xs font-mono text-neutral-400 bg-neutral-950/40 border border-neutral-900 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>3 ARTICLES PREMIUM PUBLIÉS EN DIRECT</span>
          </div>
        )}
      </div>

      {!activeArticle ? (
        /* 2. LANDING VIEW: CARDS SELECTION */
        <div className="space-y-8 animate-fadeIn">
          
          {/* BANNER DU HUB */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950 p-8 sm:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/25 text-amber-400 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider font-extrabold w-max">
                <Sparkles className="h-3 w-3" />
                <span>Espace Critique & Référencement</span>
              </span>
              <h1 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none">
                GUIDES EXPERTS DU CINÉMA
              </h1>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Bienvenue sur notre centre d'articles premium optimisés pour le référencement organique (SEO). Explorez des dossiers exclusifs rédigés par des universitaires de l'image, abordant les secrets de tournage, les plateformes de distribution légales et l'art de l'attention visuelle active.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
                <span className="flex items-center gap-1">
                  <Coffee className="h-3.5 w-3.5 text-amber-500" />
                  Rituel : Café & Concentration
                </span>
                <span>•</span>
                <span>Soutien de la création légale</span>
              </div>
            </div>
          </div>

          {/* GRID OF 3 ARTICLES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  setSelectedArticleId(art.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-950/40 hover:bg-[#000]/50 hover:border-amber-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg h-[480px]"
              >
                {/* Image cap */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={art.image}
                    alt={art.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <span className={`absolute top-3 left-3 rounded-md px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase border ${art.tagColor}`}>
                    {art.category}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {art.readTime}
                      </span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors tracking-tight line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed font-light line-clamp-3">
                      {art.metaDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between text-xs font-mono font-bold text-amber-500">
                    <span className="uppercase tracking-wider">LIRE L'ARTICLE COMPLET</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* 3. ACTIVE VIEW: ARTICLE READER PAGE (IMMINENT DESIGN) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fadeIn">
          
          {/* ARTICLE MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* HERO BAR INFO */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider ${activeArticle.tagColor}`}>
                  {activeArticle.category}
                </span>
                <span className="text-neutral-700">•</span>
                <span className="text-neutral-400">Écrit par {activeArticle.author}</span>
                <span className="text-neutral-700">•</span>
                <span className="text-neutral-400">{activeArticle.date}</span>
                <span className="text-neutral-700">•</span>
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeArticle.readTime} de lecture
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {activeArticle.title}
              </h1>
            </div>

            {/* FEATURED PHOTO (1200X630 FORMAT INDUCED) */}
            <div className="space-y-2 group">
              <div className="aspect-[12/6.3] rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950 shadow-2xl relative">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 max-h-[480px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal italic pl-4 border-l border-neutral-800 font-mono">
                <strong>ALT SEO :</strong> {activeArticle.imageAlt} <br />
                <strong>Description :</strong> {activeArticle.imageCaption}
              </p>
            </div>

            {/* EXECUTIVE SUMMARY IN GOLD CARD */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
              <h3 className="text-amber-500 font-mono text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 animate-pulse" />
                RÉSUMÉ CLÉ ET MATRICE CONCEPTUELLE
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed italic font-light">
                "{activeArticle.summary}"
              </p>
            </div>

            {/* INTERACTIVE TABLE OF CONTENT (MOBILE-FRIENDLY OR MID-PAGE BLOCK) */}
            <div className="p-5 rounded-2xl bg-[#09090E] border border-neutral-900 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-2">
                <BookOpen className="h-4 w-4 text-[#F5C518]" />
                <span className="font-bebas text-lg uppercase tracking-wider text-white">TABLE DES MATIÈRES DE L'ARTICLE</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs text-neutral-400">
                {activeArticle.sections.map((sec, idx) => (
                  <li key={sec.id}>
                    <a 
                      href={`#${sec.id}`}
                      className="hover:text-[#F5C518] flex items-center gap-1 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(sec.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                    >
                      <ChevronRight className="h-3 w-3 shrink-0" />
                      <span className="truncate">{sec.title}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a 
                    href="#faq-section"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("faq-section");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }} 
                    className="hover:text-[#F5C518] flex items-center gap-1 cursor-pointer transition-colors text-red-500"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span>Foire Aux Questions (FAQ)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* THE INTRODUCTION */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-500" />
                Avant-propos de l'Expert
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                {activeArticle.intro}
              </p>
            </div>

            {/* COMPLETE SECTIONS RENDER */}
            <div className="space-y-12 pt-4">
              {activeArticle.sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="space-y-4 scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-white pb-2 border-b border-neutral-900/80 hover:text-amber-500 transition-colors flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
                    {sec.title}
                  </h2>
                  <div className="text-neutral-300 text-sm md:text-base leading-relaxed space-y-4 font-light">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* SEPARATE SEO TABLE WITH USEFUL DATA */}
            <div className="space-y-4 scroll-mt-24">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#F5C518]" />
                Données Utiles & Métriques d'Analyse
              </h3>
              <div className="overflow-x-auto rounded-xl border border-neutral-900">
                <table className="w-full text-xs text-neutral-300 text-left bg-neutral-950/85">
                  <thead className="bg-[#0A0A0F] text-[#F5C518] font-mono border-b border-neutral-900 uppercase">
                    <tr>
                      {activeArticle.tableData.headers.map((h, i) => (
                        <th key={i} className="p-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {activeArticle.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-neutral-900/35 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-4 leading-relaxed">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-neutral-500 italic font-mono">
                * {activeArticle.tableData.caption}
              </p>
            </div>

            {/* MAILLAGE INTERNE EXPLICIT ACTIONS */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-4">
              <h4 className="text-white text-xs font-mono font-black uppercase tracking-wider text-[#F5C518] flex items-center gap-1.5">
                <Info className="h-4 w-4 text-amber-500" />
                MAILLAGE INTERNE FONCTIONNEL DU SÉO (LIENS EN DUR EN FRANCE)
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Notre technologie SPA vous permet de basculer instantanément vers les fiches thématiques de nos meilleurs stars d'action ou de lancer directement leurs bande-annonces sans recharger la page.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => { onSelectStar("jackie-chan"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-neutral-900 hover:bg-neutral-850 hover:text-[#F5C518] text-xs font-mono px-3.5 py-2 rounded-xl text-neutral-300 border border-neutral-800 transition-all flex items-center gap-1.5"
                >
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span>Voir Jackie Chan (Analyse interne)</span>
                </button>
                <button
                  onClick={() => { onSelectStar("bruce-lee"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-neutral-900 hover:bg-neutral-850 hover:text-[#F5C518] text-xs font-mono px-3.5 py-2 rounded-xl text-neutral-300 border border-neutral-800 transition-all flex items-center gap-1.5"
                >
                  <Users className="h-3.5 w-3.5 text-red-500" />
                  <span>Voir Bruce Lee (Kung-fu martial)</span>
                </button>
                <button
                  onClick={() => { onSelectStar("tom-cruise"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-neutral-900 hover:bg-neutral-850 hover:text-[#F5C518] text-xs font-mono px-3.5 py-2 rounded-xl text-neutral-300 border border-neutral-800 transition-all flex items-center gap-1.5"
                >
                  <Users className="h-3.5 w-3.5 text-yellow-500" />
                  <span>Voir Tom Cruise (Cascades explosives)</span>
                </button>
                <button
                  onClick={playTopGun}
                  className="bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 text-xs font-mono px-3.5 py-2 rounded-xl border border-red-900/50 transition-all flex items-center gap-1.5"
                >
                  <Film className="h-3.5 w-3.5" />
                  <span>Démarrer Top Gun: Maverick (Bande-annonce)</span>
                </button>
                <button
                  onClick={() => { setCurrentTab("accueil"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-neutral-900 hover:bg-neutral-850 hover:text-[#F5C518] text-xs font-mono px-3.5 py-2 rounded-xl text-neutral-300 border border-neutral-800 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-[#F5C518]" />
                  <span>Retourner à l'accueil du site</span>
                </button>
              </div>
            </div>

            {/* SEO FAQ VIEW ACCORDION ACCENT (MINIMUM 5 QUESTIONS PER ARTICLES REQUIRED) */}
            <div id="faq-section" className="space-y-4 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-white pb-2 border-b border-neutral-900 flex items-center gap-2">
                <Info className="h-5 w-5 text-red-500 shrink-0" />
                Foire Aux Questions (FAQ) - Optimisation Google SEO
              </h2>
              <div className="space-y-3">
                {activeArticle.faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="rounded-2xl border border-neutral-900 bg-neutral-950 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between text-white hover:text-[#F5C518] transition-colors focus:outline-none"
                    >
                      <span className="font-semibold text-sm pr-4">{faq.q}</span>
                      {expandedFaqIndex === index ? (
                        <ChevronUp className="h-4 w-4 text-[#F5C518] shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                      )}
                    </button>
                    {expandedFaqIndex === index && (
                      <div className="px-5 pb-5 pt-1 text-xs text-neutral-300 leading-relaxed font-light border-t border-neutral-900/60 font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ART CONCLUSION WITH CTA */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-black/80 to-neutral-950 border border-red-900/30 space-y-5 text-center sm:text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-red-600/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                <div className="p-4 rounded-2xl bg-red-600 text-white shadow-xl shadow-red-900/40 shrink-0">
                  <Coffee className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bebas text-white tracking-widest uppercase">
                    VOTRE DOSE DE CAFÉ ET CONCENTRATION EST PRÊTE ?
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light max-w-xl">
                    Soutenez activement la création cinématographique en bookmarkant notre guide légal et en explorant les fiches de vos acteurs favoris de notre catalogue.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 relative z-10">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="rounded-xl bg-neutral-900 hover:bg-neutral-850 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors border border-neutral-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-emerald-500" />
                  <span>{copie ? "Lien Copié !" : "Partager l'article"}</span>
                </button>
                <button
                  onClick={() => { setSelectedArticleId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  Retour aux Collections
                </button>
              </div>
            </div>

          </div>

          {/* SIDEBAR: SEO METADATA & TAG PANEL */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-4">
              <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-3">
                <Award className="h-4 w-4 text-[#F5C518]" />
                <h4 className="font-bebas text-lg uppercase tracking-wider text-white">SPÉCIFICATIONS SEO CHERCHÉES</h4>
              </div>
              
              <div className="space-y-3 text-[11px] font-mono leading-relaxed">
                <div className="space-y-1.5">
                  <span className="text-neutral-500 uppercase block font-bold">TITLE SEO TAG (&lt;60 car.) :</span>
                  <div className="p-3 bg-neutral-900 rounded-lg text-[#F5C518] line-clamp-2">
                    {activeArticle.seoTitle}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-neutral-500 uppercase block font-bold">MÉTA-DESCRIPTION (140-160 car.) :</span>
                  <div className="p-3 bg-neutral-900 rounded-lg text-neutral-300">
                    {activeArticle.metaDescription}
                  </div>
                  <div className="text-[10px] text-neutral-600 text-right">
                    Longueur : <strong className="text-neutral-400">{activeArticle.metaDescription.length}</strong> caractères
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-neutral-500 uppercase block font-bold">SLUG OPTIMISÉ :</span>
                  <div className="p-2.5 bg-neutral-900 rounded-lg text-emerald-400 truncate">
                    {activeArticle.slug}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-neutral-500 uppercase block font-bold">MOT-CLÉ DIRECTEUR PRINCIPAL :</span>
                  <div className="px-2.5 py-1.5 bg-neutral-900/60 border border-amber-500/30 text-white font-extrabold uppercase rounded-lg inline-flex items-center gap-1">
                    <Coffee className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                    <span>café et concentration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-4">
              <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-3_">
                <Layers className="h-4 w-4 text-blue-400" />
                <h4 className="font-bebas text-lg uppercase tracking-wider text-white">MOTS-CLÉS DE SOUTIEN</h4>
              </div>
              <p className="text-[10px] text-neutral-400 leading-normal">
                Champ sémantique ciblé et configuré dans la base d'intelligence du robot pour indexer la page.
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeArticle.secondaryKeywords.map((tag, i) => (
                  <span key={i} className="text-[9px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-neutral-300 px-2 py-0.5 rounded uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-900/80 space-y-2">
                <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase block">CHAMP SÉMANTIQUE VARIÉ :</span>
                <div className="flex flex-wrap gap-1">
                  {activeArticle.semanticFields.map((field, i) => (
                    <span key={i} className="text-[9px] font-mono bg-[#030306] border border-neutral-900 text-neutral-450 px-2.5 py-0.5 rounded-full">
                      # {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-3">
              <h4 className="font-bebas text-lg uppercase tracking-wider text-white flex items-center gap-1">
                <Tv className="h-4 w-4 text-[#F5C518]" />
                LIENS EXTERNES LIÉS
              </h4>
              <p className="text-[10px] text-neutral-400 leading-normal">
                Références hautement sécuritaires et bien d'ancrage approuvées par Google pour l'autorité thématique :
              </p>
              <ul className="space-y-2 font-mono text-[10px] text-neutral-300 pt-1">
                <li>
                  <a 
                    href="https://www.cnc.fr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer text-red-400 font-bold"
                  >
                    <span>CNC - Preserver l'Art</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.imdb.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer text-[#F5C518] font-bold"
                  >
                    <span>IMDb Database Totale</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://fr.wikipedia.org/wiki/Portail:Cin%C3%A9ma" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer text-blue-400 font-bold"
                  >
                    <span>Wikipédia Portail Ciné</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
