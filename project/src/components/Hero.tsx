import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Star, Award, ChevronRight } from 'lucide-react';
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
    <div ref={ref} className="text-center group">
      <div className="relative inline-flex">
        <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-3 mb-3 group-hover:border-brand-500/40 transition-all duration-300">
          <Icon className="h-7 w-7 text-brand-400" />
        </div>
      </div>
      <div className="text-3xl font-display font-black text-white">
        {display ?? `${count}${suffix}`}
      </div>
      <div className="text-sm text-gray-400 mt-1 font-medium">{label}</div>
    </div>
  );
};

const FloatingShape = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 animate-float ${className}`} />
);

const Hero = () => {
  return (
    <section className="relative flex items-center bg-dark-900 overflow-hidden pt-24 pb-6 lg:pt-24 lg:pb-8">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={gymVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent" />
      </div>

      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50 z-0" />
      <FloatingShape className="w-96 h-96 bg-brand-500 -top-20 -left-20 animation-delay-0 z-0" />
      <FloatingShape className="w-72 h-72 bg-red-600 top-1/2 -right-20 animation-delay-2000 z-0" />
      <FloatingShape className="w-64 h-64 bg-orange-400 bottom-0 left-1/3 animation-delay-4000 z-0" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 mb-4"
            >
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <span className="text-brand-300 text-sm font-semibold">🏆 #1 Salle de Sport à Paris</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl font-black leading-[0.95] mb-5 text-shadow">
              <span className="text-white">Transformez</span>
              <br />
              <span className="text-gradient">Votre Corps</span>
              <br />
              <span className="text-white">& Votre</span>
              <span className="text-gradient"> Vie</span>
            </h1>

            <p className="text-lg text-gray-400 mb-6 leading-relaxed max-w-lg">
              Rejoignez notre communauté d'élite et découvrez des programmes d'entraînement 
              sur-mesure avec nos coachs experts certifiés. Votre transformation commence aujourd'hui.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <Link
                to="/contact"
                className="btn-primary flex items-center justify-center gap-2 text-base"
              >
                Commencer Maintenant
                <ChevronRight className="h-5 w-5" />
              </Link>
              <button className="group flex items-center gap-3 text-white font-semibold hover:text-brand-400 transition-colors">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 group-hover:bg-brand-500/20 group-hover:border-brand-500/30 transition-all duration-300">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </span>
                Voir la Vidéo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/8">
              <StatCard icon={Users} value={500} suffix="+" label="Membres Actifs" />
              <StatCard icon={Star} value={49} suffix="" label="Note Moyenne" display="4.9/5" />
              <StatCard icon={Award} value={5} suffix=" ans" label="D'Expérience" />
            </div>
          </motion.div>

          {/* Right column — Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex flex-col justify-center items-end gap-10 h-full w-full pr-10"
          >
            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="glass rounded-2xl px-4 py-3 border border-white/10 mr-16"
            >
              <div className="text-brand-400 text-xs font-semibold">PLACES DISPONIBLES</div>
              <div className="text-white font-black text-2xl">3</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="glass rounded-2xl px-5 py-4 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                  <Star className="h-5 w-5 text-white fill-current" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Cours d'aujourd'hui</div>
                  <div className="text-gray-400 text-xs">CrossFit Power — 18:00</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;