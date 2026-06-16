import React from "react";

export function getExtraArticles(onPlayTrailer: any, onSelectStar: any) {
  return [
    {
      id: "films-gratuits",
      category: "Cinéma & Astuces",
      tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
      accentBg: "from-green-600/10 to-transparent",
      title: "Films Gratuits : Où trouver des pépites sans abonnement",
      seoTitle: "Films Gratuits : Plateformes Légales et Découvertes",
      metaDescription: "Découvrez notre sélection des meilleures méthodes pour regarder des films gratuits légalement avec une qualité optimale.",
      slug: "ou-trouver-des-films-gratuits",
      readTime: "8 min",
      date: "17 Juin 2026",
      author: "Cinéphile Libre",
      image: "https://images.unsplash.com/photo-1574267432553-4b462808152a?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Popcorn et lunettes 3D devant un écran de cinéma",
      imageCaption: "La culture cinématographique accessible à tous grâce aux plateformes gratuites.",
      intro: "La quête de films gratuits est souvent un parcours du combattant entre pop-ups indésirables et qualité médiocre. Heureusement, le paysage audiovisuel s'est transformé pour offrir des catalogues riches et 100% légaux sans débourser un centime. Cet article décrypte les meilleures offres de films gratuits sur le web.",
      secondaryKeywords: ["streaming gratuit", "cinéma libre", "plateformes gratuites", "domaine public"],
      semanticFields: ["VOD gratuite", "accès libre", "archives cinématographiques", "sans abonnement"],
      sections: [
        {
          id: "legal-free",
          title: "1. L'essor des plateformes AVOD (Advertising VOD)",
          content: (
            <div className="space-y-4">
              <p>
                Le modèle AVOD permet de regarder des <strong>films gratuits</strong> en échange de quelques minutes de publicité. Des géants comme Pluto TV, Tubi ou Rakuten TV offrent des bibliothèques contenant des classiques comme des blockbusters plus anciens. C'est l'un des meilleurs moyens de profiter de films gratuits en toute légalité et en haute qualité.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Plateforme", "Type de Contenu", "Publicité", "Inscription"],
        rows: [
          ["Pluto TV", "Chaînes thématiques", "Oui", "Facultatif"],
          ["France.tv", "Cinéma français / d'auteur", "Oui", "Requise"],
          ["Arte.tv", "Films indépendants & Documentaires", "Non", "Facultatif"]
        ],
        caption: "Comparatif des principales plateformes de films gratuits légaux."
      },
      summary: "Profitez d'un accès inégalé à des films gratuits en explorant les services AVOD et les replays des grandes chaînes télévisées.",
      faqs: [
        {
          q: "Est-il vraiment possible de trouver des films gratuits et récents légalement ?",
          a: "Oui, grâce au système AVOD, de nombreux distributeurs monétisent leurs anciens catalogues. Les films très récents sont plus rares, mais de solides classiques modernes y sont disponibles."
        }
      ]
    },
    {
      id: "films-hd",
      category: "Technologie & Cinéma",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      accentBg: "from-blue-600/10 to-transparent",
      title: "Films HD : L'impact de la Haute Définition sur l'expérience",
      seoTitle: "Films HD : Redécouvrez vos œuvres préférées",
      metaDescription: "Comprendre pourquoi la qualité visuelle des films HD transforme radicalement la perception de l'œuvre originale.",
      slug: "impact-films-hd-haute-definition",
      readTime: "10 min",
      date: "18 Juin 2026",
      author: "Tech & Screen",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Écran HD montrant des détails vibrants",
      imageCaption: "La résolution HD révèle des détails que les réalisateurs ont minutieusement préparés.",
      intro: "Le passage aux films HD (Haute Définition) a marqué un tournant majeur pour la cinéphilie. La netteté de l'image, la richesse colorimétrique de la 4K, et les technologies HDR permettent désormais de voir des films HD tels qu'ils ont été étalonnés originellement en salle de post-production.",
      secondaryKeywords: ["4K", "Ultra HD", "HDR", "qualité image", "restauration 4K"],
      semanticFields: ["résolution d'écran", "étalonnage", "colorimétrie", "pixels", "immersion visuelle"],
      sections: [
        {
          id: "restoration",
          title: "1. La magie des restaurations en Films HD",
          content: (
            <div className="space-y-4">
              <p>
                Regarder des <strong>films HD</strong> n'est pas qu'une question de modernité. De nombreux classiques du cinéma sont scannés depuis leur pellicule 35mm d'origine en résolution 4K ou 8K. Le résultat donne des films HD au piqué exceptionnel, révélant le grain originel et des contrastes que la VHS ou le DVD avaient noyés.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Format", "Résolution", "Impact Visuel"],
        rows: [
          ["DVD (SD)", "720x480", "Doux, détails flous"],
          ["Blu-ray (HD)", "1920x1080", "Net, textures de peau visibles"],
          ["UHD (4K)", "3840x2160", "Immersion totale, HDR étendu"]
        ],
        caption: "Évolution de la résolution vers les films HD."
      },
      summary: "Ne sous-estimez pas le bond technologique des films HD ; c'est le pont le plus direct entre la vision du réalisateur et votre salon.",
      faqs: [
        {
          q: "Faut-il un équipement spécial pour profiter des films HD ?",
          a: "Un moniteur ou une télévision 1080p ou 4K, associé à un débit internet d’au moins 5 Mbps, garantit un streaming fluide pour les films HD."
        }
      ]
    },
    {
      id: "film-youtube",
      category: "Plateformes",
      tagColor: "bg-red-600/10 text-red-500 border-red-600/20",
      accentBg: "from-red-600/10 to-transparent",
      title: "Film YouTube : Le Cinéma Légal sur la Plateforme Google",
      seoTitle: "Film YouTube : Trouver des longs métrages complets et légaux",
      metaDescription: "Explorer comment YouTube est devenu une option sérieuse pour regarder un film YouTube en entier et de grandes qualités.",
      slug: "film-youtube-streaming-legal",
      readTime: "9 min",
      date: "19 Juin 2026",
      author: "Digital Streamer",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Logo YouTube et concept vidéo",
      imageCaption: "Des milliers de vidéos, dont de nombreux films légaux et documentaires poignants.",
      intro: "Un « film YouTube » n'évoque plus aujourd'hui de simples courts métrages amateurs. Les détenteurs de droits et même YouTube Movies proposent énormément de contenus avec publicités, transformant la recherche d'un film YouTube en une vraie expérience VOD.",
      secondaryKeywords: ["YouTube Movies", "film gratuit YouTube", "documentaires complets"],
      semanticFields: ["streaming vidéo", "chaînes cinématographiques", "domaine public", "Google vidéo"],
      sections: [
        {
          id: "youtube-movies",
          title: "1. Les films légaux sur YouTube",
          content: (
            <div className="space-y-4">
              <p>
                Il est tout à fait possible de trouver un <strong>film YouTube</strong> de grande envergure en se tournant vers les chaînes de distributeurs officiels ou la section "Films avec annonces". Le visionnage d'un film YouTube classique tombé dans le domaine public est aussi très prisé.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Chaîne/Source", "Type", "Exemple de contenu"],
        rows: [
          ["YouTube Movies", "VOD / AVOD", "Films récents, classiques soutenus"],
          ["Cinémathèques", "Archives", "Films muets, Méliès"],
          ["Distributeurs Indépendants", "Films de genre", "Horreur, Science-Fiction B-Movies"]
        ],
        caption: "Où trouver un film YouTube complet et légal."
      },
      summary: "Le film YouTube est devenu un incontournable pour les adeptes du streaming sans friction, alliant gratuité et praticité.",
      faqs: [
        {
          q: "La qualité d'un film YouTube est-elle bonne ?",
          a: "Oui, la plupart des ayants droit uploadent leurs œuvres en très haute qualité (1080p, voire 4K) pour garantir des revenus publicitaires optimaux."
        }
      ]
    },
    {
      id: "top-films",
      category: "Classements",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      accentBg: "from-amber-600/10 to-transparent",
      title: "Top Films : Les Œuvres Essentielles à Voir Absolument",
      seoTitle: "Top Films : Le Classement Ultime des Chefs-d'œuvre",
      metaDescription: "Découvrez notre sélection des top films mondiaux, des blockbusters aux drames intimes, qui marquent l'histoire du cinéma.",
      slug: "top-films-classement-chef-d-oeuvre",
      readTime: "15 min",
      date: "20 Juin 2026",
      author: "Critique Anonyme",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Photographie et bobines de film s'empilant",
      imageCaption: "Tout amoureux du septième art se doit d'avoir une liste de classiques.",
      intro: "Qu'est-ce qui définit un « top films » ? L'impact culturel, les prouesses techniques, ou l'émotion brute ? Dans notre quête pour compiler les top films de tous les temps, nous avons retenu des critères rigoureux pour ne vous proposer que le meilleur de l'expérience cinématographique.",
      secondaryKeywords: ["meilleurs films du monde", "classement cinéma", "films cultes", "Oscars"],
      semanticFields: ["récompenses", "critiques de presse", "succès au box-office", "réalisateurs visionnaires"],
      sections: [
        {
          id: "what-makes-a-top",
          title: "1. L'anatomie des Top Films",
          content: (
            <div className="space-y-4">
              <p>
                Un vrai <strong>top films</strong> se démarque par son intemporalité. Au-delà des effets spéciaux, c'est l'histoire qui reste. De "Le Parrain" à "Inception", ces œuvres définissent des générations entières et changent notre façon de voir le monde.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Titre", "Réalisateur", "Année", "Impact"],
        rows: [
          ["Le Parrain", "Francis Ford Coppola", "1972", "Redéfinition du genre mafieux"],
          ["Pulp Fiction", "Quentin Tarantino", "1994", "Narration non-linéaire"],
          ["Matrix", "Les Wachowski", "1999", "Révolution des effets spéciaux"]
        ],
        caption: "Aperçu de quelques-uns de nos Top Films historiques."
      },
      summary: "Ce florilège de Top Films a forgé tant de vocations qu'il représente aujourd'hui une référence absolue.",
      faqs: [
        {
          q: "Un top films est-il purement objectif ?",
          a: "Même s'il y a un consensus critique global, tout classement comporte sa dose de subjectivité et d'inclination personnelle."
        }
      ]
    },
    {
      id: "films-action",
      category: "Genre Cinéma",
      tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      accentBg: "from-orange-600/10 to-transparent",
      title: "Films Action : L'Adrénaline Pure au Cœur de l'Écran",
      seoTitle: "Films Action : Scènes Cultes et Cascades Explosives",
      metaDescription: "Retrouvez les meilleurs films action, des arts martiaux aux cascades automobiles haletantes, pour une dose d'adrénaline pure.",
      slug: "films-action-adrenaline-cascades",
      readTime: "11 min",
      date: "21 Juin 2026",
      author: "Jack Reacher",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Étincelles de feu et scène de danger",
      imageCaption: "Les films d'action demandent une synchronisation parfaite entre les cascadeurs et les effets pyrotechniques.",
      intro: "Viscéraux, rapides et inoubliables. Les films action repoussent les limites de la physique et des capacités humaines pour captiver l'audience. Découvrons ensemble comment le genre des films action s'est métamorphosé des westerns rugueux aux chorégraphies hyper-stylisées de John Wick.",
      secondaryKeywords: ["thriller", "arts martiaux", "cascades", "film de vengeance", "poursuite"],
      semanticFields: ["explosion", "chorégraphie martiale", "adrénaline", "effets pratiques", "fusillade"],
      sections: [
        {
          id: "evolution",
          title: "1. L'évolution fulgurante des Films Action",
          content: (
            <div className="space-y-4">
              <p>
                Du machisme de l'ère Schwarzenegger au réalisme blessé des <strong>films action</strong> contemporains comme Mad Max: Fury Road, la donne a changé. L'accent est aujourd'hui mis sur la clarté spatiale de l'image et l'effort réel de l'acteur.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Sous-genre", "Décennie Phare", "Exemple Majeur"],
        rows: [
          ["Kung-Fu & Martial Arts", "1970 - 1980", "Opération Dragon"],
          ["Muscle Action / One Man Army", "1980 - 1990", "Die Hard, Rambo"],
          ["Gun-Fu & Tactical", "2010 - Présent", "John Wick, The Raid"]
        ],
        caption: "L'évolution des courants au sein des films action."
      },
      summary: "Une célébration du mouvement brut, où les films action se révèlent être de véritables ballets modernes mortels et frénétiques.",
      faqs: [
        {
          q: "Quel est l'impact de la CGI dans les films action ?",
          a: "Si elle a parfois rendu les séquences moins tangibles dans les années 2000, la tendance s'est inversée pour privilégier les effets pratiques réels (les cascades) sublimés par des corrections numériques pures."
        }
      ]
    },
    {
      id: "movie-stars",
      category: "Célébrités",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      accentBg: "from-purple-600/10 to-transparent",
      title: "Movie Stars : Le Charisme qui Domine le Box-Office",
      seoTitle: "Movie Stars : Profils, Histoires et Héritage",
      metaDescription: "Partez à la rencontre des grandes movie stars et analysez ce qui fait leur charme magnétique sur grand écran.",
      slug: "movie-stars-charisme-box-office",
      readTime: "14 min",
      date: "22 Juin 2026",
      author: "Star Reporter",
      image: "https://images.unsplash.com/photo-1541243160454-e054d5b99149?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Tapis rouge de cinéma ou star sous les projecteurs",
      imageCaption: "Les lumières d'Hollywood ont forgé le concept moderne des icônes culturelles et des movie stars.",
      intro: "Certaines présences transcendent le simple jeu d'acteur. Les vraies movie stars peuvent propulser un film conceptuel au sommet du box-office sur la simple force de leur nom. Mais qu'est-ce qui sépare un bon acteur d'une véritable movie star internationale ?",
      secondaryKeywords: ["célébrités", "acteurs cultes", "icônes hollywoodiennes", "charisme"],
      semanticFields: ["tapis rouge", "Agent de talent", "bankable", "aura médiatique", "Oscars du meilleur acteur"],
      sections: [
        {
          id: "the-it-factor",
          title: "1. Le fameux \"It Factor\" des Movie Stars",
          content: (
            <div className="space-y-4">
              <p>
                Tom Cruise, Brad Pitt ou Leonardo DiCaprio n'ont pas qu'un simple talent dramatique ; ils ont une <strong>aura</strong>. C'est l'essence même des <strong>movie stars</strong> : on veut les voir eux, parfois même avant de s'intéresser au sujet du film lui-même.
              </p>
            </div>
          )
        }
      ],
      tableData: {
        headers: ["Star", "Genre Prédilection", "Film Iconique"],
        rows: [
          ["Tom Cruise", "Action Militaire / Espionnage", "Mission: Impossible"],
          ["Leonardo DiCaprio", "Drame Psychologique / Historique", "The Revenant"],
          ["Brad Pitt", "Thriller / Comédie Sombre", "Fight Club"]
        ],
        caption: "Quelques movie stars ayant défini la pop-culture des dernières décennies."
      },
      summary: "La longévité d'une Movie Star prouve que le public recherche, au-delà d'une histoire captivante, une connexion personnelle avec les icônes de la toile.",
      faqs: [
        {
          q: "L'ère des vraies Movie Stars est-elle révolue face aux franchises super-héroïques ?",
          a: "Le débat est très ouvert. On remarque aujourd'hui que c'est souvent la « marque » (ex: Marvel) qui tire le héros, là où autrefois la star (ex: Schwarzenegger) tirait le scénario."
        }
      ]
    }
  ];
}
