import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, 
  User, 
  Heart, 
  Compass, 
  FileText, 
  Users, 
  Mail, 
  Moon, 
  Sun, 
  ChevronRight, 
  Sparkles, 
  Send, 
  CheckCircle, 
  X, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Award,
  Flame,
  Star
} from "lucide-react";
import { Film as FilmType } from "../types";
import { starsData } from "../data";

interface CinemaFooterProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSelectStar: (starId: string | null) => void;
  onPlayTrailer: (film: FilmType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export function CinemaFooter({
  currentTab,
  setCurrentTab,
  onSelectStar,
  onPlayTrailer,
  isDarkMode,
  setIsDarkMode
}: CinemaFooterProps) {
  // Modal states for requested pages
  const [activeModal, setActiveModal] = useState<"terms" | "about" | "contact" | null>(null);
  
  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quick navigation handler
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    onSelectStar(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select some prominent films for the column
  const topFilms = [
    { title: "Top Gun: Maverick", youtubeId: "RW6BqtVoIqI", genre: "Action" },
    { title: "The Foreigner", youtubeId: "th6w3CpFKRc", genre: "Thriller Action" },
    { title: "Police Story", youtubeId: "6DR6gMIQ7XM", genre: "Action" },
    { title: "Drunken Master", youtubeId: "aS3pMhtiRq0", genre: "Arts Martiaux" },
    { title: "Mr. & Mrs. Smith", youtubeId: "QNF2bjh9pFY", genre: "Action / Comédie" }
  ];

  // Submit real message direct to Gmail
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    // Construct the mailto redirect URI
    const subject = encodeURIComponent(`Contact Movie Stars - Message de ${contactName}`);
    const emailBody = encodeURIComponent(
      `Nom: ${contactName}\n` +
      `Email de l'expéditeur: ${contactEmail}\n\n` +
      `Message:\n${contactMessage}\n\n` +
      `---\n` +
      `Message envoyé depuis le site Movie Stars.`
    );

    // Open default mail client (Gmail, Outlook, Mail app, etc.)
    window.location.href = `mailto:storemydogs@gmail.com?subject=${subject}&body=${emailBody}`;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setActiveModal(null);
    }, 4000);
  };

  return (
    <>
      <footer className="relative mt-20 overflow-hidden border-t border-neutral-900 bg-[#040407] transition-all duration-300">
        
        {/* 1. PREMIUM LIGHT EFFECT (EFFET LUMIÈRE) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#F5C518]/60 to-transparent shadow-[0_0_20px_#F5C518] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#F5C518]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 font-sans">
          
          {/* TOP FOOTER ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-neutral-900 pb-12 mb-12">
            
            {/* BRAND SUMMARY */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl border border-[#F5C518]/25 flex items-center justify-center bg-black overflow-hidden shadow-lg shadow-[#F5C518]/5">
                  <img src="/Movie.png" alt="Movie Stars" className="h-full w-full object-cover" />
                </div>
                <div>
                  <span className="font-bebas text-2xl tracking-wider text-white">
                    MOVIE <span className="text-[#F5C518]">STARS</span>
                  </span>
                  <p className="text-[8px] uppercase tracking-widest font-mono text-neutral-500 -mt-1 font-bold">
                    PRESTIGE ARCHIVE
                  </p>
                </div>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xs font-light">
                Le temple ultime des légendes du cinéma d'aventure et de combats. Explorez leurs fiches cinématographiques exclusives et l'intégralité de leurs bandes-annonces légendaires en Ultra-HD.
              </p>

              {/* MODE SOMBRE / ÉCLAIRÉ ACCENT SWITCH */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 border border-neutral-900 p-1">
                  <button 
                    onClick={() => setIsDarkMode(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isDarkMode 
                        ? "bg-amber-500/15 text-[#F5C518] border border-amber-500/30" 
                        : "text-neutral-500 hover:text-neutral-200"
                    }`}
                  >
                    <Moon className="h-3 w-3 text-[#F5C518]" />
                    <span>Sombre</span>
                  </button>
                  <button 
                    onClick={() => setIsDarkMode(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      !isDarkMode 
                        ? "bg-red-600 text-white shadow-md" 
                        : "text-neutral-500 hover:text-neutral-200"
                    }`}
                  >
                    <Sun className="h-3 w-3" />
                    <span>Éclairé</span>
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 1 : NAVIGATION */}
            <div className="space-y-4 text-left">
              <h4 className="font-bebas text-lg tracking-wider text-white uppercase border-l-2 border-[#F5C518] pl-2.5">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <button 
                    onClick={() => handleNavClick("accueil")}
                    className="text-neutral-400 hover:text-[#F5C518] flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="h-3 w-3 text-neutral-600 group-hover:text-[#F5C518] group-hover:translate-x-0.5 transition-transform" />
                    <span>Accueil Principal</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick("films")}
                    className="text-neutral-400 hover:text-[#F5C518] flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="h-3 w-3 text-neutral-600 group-hover:text-[#F5C518] group-hover:translate-x-0.5 transition-transform" />
                    <span>Bandes-Annonces Films</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick("acteurs")}
                    className="text-neutral-400 hover:text-[#F5C518] flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="h-3 w-3 text-neutral-600 group-hover:text-[#F5C518] group-hover:translate-x-0.5 transition-transform" />
                    <span>Acteurs & Cascades</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick("accueil")}
                    className="text-neutral-400 hover:text-[#F5C518] flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="h-3 w-3 text-neutral-600 group-hover:text-[#F5C518] group-hover:translate-x-0.5 transition-transform" />
                    <span>Sagas & Collections</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 2 : FILMS */}
            <div className="space-y-4 text-left">
              <h4 className="font-bebas text-lg tracking-wider text-white uppercase border-l-2 border-red-600 pl-2.5">
                Chef-d'œuvres
              </h4>
              <ul className="space-y-2 text-xs">
                {topFilms.map((filmItem) => (
                  <li key={filmItem.youtubeId}>
                    <button
                      onClick={() => {
                        const targetFilm: FilmType = {
                          title: filmItem.title,
                          year: 2000,
                          genre: filmItem.genre,
                          youtubeId: filmItem.youtubeId
                        };
                        onPlayTrailer(targetFilm);
                      }}
                      className="text-neutral-400 hover:text-white flex items-center justify-between w-full group text-left cursor-pointer transition-colors"
                    >
                      <span className="truncate group-hover:text-[#F5C518] font-semibold transition-colors">
                        {filmItem.title}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-neutral-900 text-neutral-500 border border-neutral-800/80 px-1.5 py-0.5 rounded shrink-0 ml-1.5">
                        {filmItem.genre}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 : ACTEURS */}
            <div className="space-y-4 text-left">
              <h4 className="font-bebas text-lg tracking-wider text-white uppercase border-l-2 border-blue-500 pl-2.5">
                Acteurs Vedettes
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {starsData.map((star) => (
                  <button
                    key={star.id}
                    onClick={() => {
                      onSelectStar(star.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-1.5 p-1 rounded hover:bg-neutral-900 border border-transparent hover:border-neutral-800/60 text-neutral-400 hover:text-white transition-all text-left cursor-pointer truncate"
                  >
                    <img 
                      src={star.photo} 
                      alt={star.name} 
                      className="h-5 w-5 rounded-full object-cover shrink-0 border border-neutral-800" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate font-semibold text-[11px]">{star.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* LOWER FOOTER ROW : PAGES LINKS, LEGAL ACCENTS, WITH LIGHT GLOW */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
            
            {/* STYLISH LEGAL INFORMATION SWITCHES */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
              <button 
                onClick={() => setActiveModal("about")}
                className="hover:text-[#F5C518] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
              >
                <Users className="h-3.5 w-3.5 text-blue-400" />
                <span>About us</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveModal("terms")}
                className="hover:text-[#F5C518] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
              >
                <FileText className="h-3.5 w-3.5 text-amber-500" />
                <span>Terms of Service</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveModal("contact")}
                className="hover:text-[#F5C518] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
              >
                <Mail className="h-3.5 w-3.5 text-red-500" />
                <span>Contact us</span>
              </button>
            </div>

            {/* COPYRIGHT NOTICE */}
            <div className="font-mono text-[10px] text-neutral-600 text-center md:text-right">
              &copy; {new Date().getFullYear()} MOVIE STARS ARCHIVE. TOUS DROITS RÉSERVÉS. CONÇU POUR LES AMATEURS DE SENSATIONS FORTES.
            </div>

          </div>

        </div>
      </footer>

      {/* POPUP DESIGN MODALS FOR SUPPLEMENTARY CORES PAGES */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#08080C] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-y-auto max-h-[90vh] font-sans"
            >
              {/* Absolutes Light effects inside Modal */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#F5C518]/5 rounded-full blur-2xl pointer-events-none" />
              
              <button
                onClick={() => {
                  setActiveModal(null);
                  setFormSubmitted(false);
                }}
                className="absolute top-4 right-4 p-2 bg-neutral-950 border border-neutral-900 rounded-xl text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* TERMS OF SERVICE TEMPLATE */}
              {activeModal === "terms" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                    <ShieldCheck className="h-5 w-5 text-amber-500" />
                    <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">TERMS OF SERVICE</h3>
                  </div>
                  
                  <div className="space-y-3 text-xs text-neutral-400 leading-relaxed max-h-[50vh] overflow-y-auto pr-2 scrollbar-none">
                    <p className="font-bold text-neutral-200">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                    <p>
                      Bienvenue sur <strong>Movie Stars Archive</strong>. En accédant à notre catalogue interactif de bandes-annonces cinématographiques d'action, vous acceptez de respecter sans réserve les conditions d'utilisation suivantes.
                    </p>
                    <h4 className="font-bold text-[#F5C518] mt-4 uppercase">1. Droits intellectuels et contenus</h4>
                    <p>
                      Toutes les bandes-annonces, affiches, images de couverture et biographies affichées sur cette plateforme appartiennent à leurs titulaires de droits respectifs. Notre but est purement éducatif, archivistique et récréatif sous la réserve des réglementations "Fair Use".
                    </p>
                    <h4 className="font-bold text-[#F5C518] mt-4 uppercase">2. Utilisation du service de lecture</h4>
                    <p>
                      La lecture vidéo est hébergée sur YouTube. Toute altération du flux direct ou blocage des publicités intégrées est soumis aux conditions d'utilisation distinctes de YouTube LLC. Vous n'êtes pas autorisé à copier ou téléverser les fichiers de l'archive.
                    </p>
                    <h4 className="font-bold text-[#F5C518] mt-4 uppercase">3. Limitation de responsabilité</h4>
                    <p>
                      Ce site est fourni "en l'état". Bien que nous mettions tout en œuvre pour corriger les liens brisés grâce à notre moteur d'auto-guérison d'identifiants de bandes-annonces, nous ne garantissons pas la disponibilité continue des flux externes.
                    </p>
                    <p className="text-[10px] text-neutral-500 italic mt-4">
                      Pour toute question relative aux réclamations de droits d'auteur, visitez notre section Contact ci-dessous ou soumettez un courriel officiel.
                    </p>
                  </div>
                </div>
              )}

              {/* ABOUT US TEMPLATE */}
              {activeModal === "about" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                    <Award className="h-5 w-5 text-[#F5C518]" />
                    <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">À PROPOS DE NOUS</h3>
                  </div>
                  
                  <div className="space-y-3 text-xs text-neutral-400 leading-relaxed">
                    <p className="font-bold text-white text-sm">
                      Qui sommes-nous ?
                    </p>
                    <p>
                      <strong>Movie Stars Archive</strong> est né d'une passion inconditionnelle pour les films d'action emblématiques des années 70 à aujourd'hui. Notre équipe de cinéastes chevronnés et de développeurs dévoués rassemble les fiches techniques des plus célèbres virtuoses des cascades et du combat chorégraphié.
                    </p>
                    <p>
                      De l'incroyable agilité acrobatique de Jackie Chan au dévouement sans limite de Tom Cruise, en passant par l'impact philosophique éternel de Bruce Lee – notre mission est d'honorer ces icônes avec un design épuré, dynamique et ultra-qualitatif.
                    </p>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-900 mt-4">
                      <h5 className="font-bold text-[#F5C518] text-[10px] uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        Engagement Qualité Intégrale
                      </h5>
                      <p className="text-[10px] text-neutral-500 mt-1 lines-clamp-3 leading-relaxed">
                        Chaque lien de bande-annonce est audité de manière automatisée pour garantir le flux direct original des cinémas en résolution HD, éliminant les temps d'attente pour le spectateur.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTACT US TEMPLATE WITH SUCCESS EFFECT AND INPUT VERIFICATION */}
              {activeModal === "contact" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                    <Mail className="h-5 w-5 text-red-500" />
                    <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">CONTACT US</h3>
                  </div>

                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Vous pouvez nous envoyer un message via le formulaire ci-dessous ou nous écrire directement à : {" "}
                    <a 
                      href="mailto:storemydogs@gmail.com?subject=Contact%20Movie%20Stars" 
                      className="text-[#F5C518] hover:underline font-mono font-bold"
                    >
                      storemydogs@gmail.com
                    </a>
                  </p>
                  
                  <AnimatePresence mode="wait">
                    {formSubmitted ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="py-10 text-center space-y-3"
                      >
                        <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mx-auto">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <h4 className="text-white font-bold text-sm">Message Envoyé !</h4>
                        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                          Merci pour votre message. Nous l'avons transmis à notre boîte de réception <strong className="text-neutral-300">storemydogs@gmail.com</strong>. Nous vous répondrons sous un délai de 24 heures.
                        </p>
                        <div className="pt-2">
                          <a
                            href={`mailto:storemydogs@gmail.com?subject=Contact%20Movie%20Stars%20-%20${encodeURIComponent(contactName)}&body=${encodeURIComponent(contactMessage)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-mono tracking-wider text-[#F5C518] hover:bg-neutral-850 transition-all"
                          >
                            <Mail className="h-3 w-3" />
                            Ouvrir dans votre application de messagerie
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                        <div className="space-y-1.5">
                          <label className="text-neutral-400 font-semibold block uppercase tracking-wider text-[9px]">Nom complet</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex. Bruce Wayne"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-neutral-400 font-semibold block uppercase tracking-wider text-[9px]">Adresse email</label>
                          <input
                            type="email"
                            required
                            placeholder="bruce@wayne-industries.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-neutral-400 font-semibold block uppercase tracking-wider text-[9px]">Votre message</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Décrivez votre suggestion ou signalez une bande-annonce indisponible..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 leading-relaxed font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-950/40 active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-widest text-[10px]"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Envoyer le Message</span>
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
