import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Star, Award, ChevronRight, X, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import gymVideo from '../assets/gym.mp4';

// Animated counter hook
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

const StatCard = ({ icon: Icon, value, suffix = '', label, display }: { icon: React.ElementType; value: number; suffix?: string; label: string; display?: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group flex flex-col items-center">
      <div className="relative inline-flex mb-3">
        <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative bg-dark-600 border border-dark-300 rounded-2xl p-2.5 sm:p-3 group-hover:border-brand-500 transition-all duration-300">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-brand-500" />
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
        {display ?? `${count}${suffix}`}
      </div>
      <div className="text-xs sm:text-sm text-dark-100 mt-1 font-bold uppercase tracking-wider">{label}</div>
    </div>
  );
};

const FloatingShape = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full blur-3xl opacity-10 animate-float ${className}`} />
);

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'trial' | 'consultation' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(3);

  // Simulate real-time urgency
  useEffect(() => {
    const timer = setTimeout(() => {
      if (spotsLeft > 1) setSpotsLeft(prev => prev - 1);
    }, 45000);
    return () => clearTimeout(timer);
  }, [spotsLeft]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (spotsLeft > 1) setSpotsLeft(prev => prev - 1);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveForm(null);
    }, 3000);
  };

  return (
    <section className="relative flex items-center bg-dark-900 overflow-hidden pt-24 pb-6 lg:pt-24 lg:pb-8 min-h-[90vh]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={gymVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/40 to-transparent" />
      </div>

      {/* Background layers */}
      <FloatingShape className="w-96 h-96 bg-brand-500 -top-20 -left-20 animation-delay-0 z-0" />
      <FloatingShape className="w-72 h-72 bg-dark-400 top-1/2 -right-20 animation-delay-2000 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >


            <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.9] mb-6 text-shadow uppercase tracking-tighter">
              <span className="text-white">Transformez</span>
              <br />
              <span className="text-brand-500">Votre Corps</span>
              <br />
              <span className="text-white">& Votre Vie</span>
            </h1>

            <p className="text-lg text-dark-100 mb-8 leading-relaxed max-w-lg font-medium">
              Rejoignez des milliers de membres et progressez avec des programmes adaptés à votre rythme.
               Votre transformation commence aujourd’hui.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/subscriptions"
                className="btn-primary flex items-center justify-center gap-2 text-base px-10 py-5 uppercase tracking-widest font-black"
              >
                Démarrer mon parcours
                <ChevronRight className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm hover:text-brand-500 transition-colors"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-500/10 group-hover:border-brand-500 transition-all duration-300">
                  <Play className="h-5 w-5 fill-current ml-1" />
                </span>
                Voir Nos salles
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-dark-400">
              <StatCard icon={Users} value={500} suffix="+" label="Membres" />
              <StatCard icon={Star} value={49} suffix="" label="Avis" display="4.9/5" />
              <StatCard icon={Award} value={5} suffix=" ans" label="Expertise" />
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:flex flex-col justify-center items-end gap-10"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                borderColor: spotsLeft === 1 ? ['#333333', '#FF4500', '#333333'] : '#333333'
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="bg-dark-600/50 backdrop-blur-xl rounded-3xl p-8 border border-dark-300 shadow-2xl mr-12 rotate-3"
            >
               <div className="text-brand-500 text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                 Places Limitées
               </div>
               <div className="text-white font-black text-5xl">
                 0{spotsLeft}
               </div>
            </motion.div>
            
            <div className="bg-dark-600/50 backdrop-blur-xl rounded-3xl p-6 border border-dark-300 shadow-2xl -rotate-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Star className="h-6 w-6 text-white fill-current" />
                </div>
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-wide">Cours du Jour</div>
                  <div className="text-dark-100 text-xs font-bold">CrossFit Power — 18:00</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-md p-4"
          >
            <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-dark-800 border border-dark-300"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-dark-900/50 hover:bg-brand-500 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video w-full">
                <video src={gymVideo} autoPlay controls className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;