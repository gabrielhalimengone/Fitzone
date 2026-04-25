import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Star, Award, ChevronRight, X, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import gymVideo from '../assets/gym.mp4';

const FloatingShape = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full blur-3xl opacity-10 animate-float ${className}`} />
);

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [nextSession, setNextSession] = useState({ course: 'Chargement...', time: '--:--', coach: '' });

  // Schedule data (simplified from Schedule.tsx)
  const schedule: Record<string, Record<string, { course: string; coach: string }>> = {
    'Lundi': {
      '07:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
      '09:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '12:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
      '18:00': { course: 'CrossFit Power', coach: 'Marc Durand' },
      '19:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
    },
    'Mardi': {
      '06:00': { course: 'Musculation Débutant', coach: 'Jean Rémy' },
      '08:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '10:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
      '17:00': { course: 'CrossFit Power', coach: 'Marc Durand' },
      '19:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
    },
    'Mercredi': {
      '07:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
      '09:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
      '12:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '18:00': { course: 'Musculation Débutant', coach: 'Jean Rémy' },
      '20:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
    },
    'Jeudi': {
      '06:00': { course: 'CrossFit Power', coach: 'Marc Durand' },
      '08:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
      '10:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '17:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
      '19:00': { course: 'Musculation Débutant', coach: 'Jean Rémy' },
    },
    'Vendredi': {
      '07:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
      '09:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '12:00': { course: 'CrossFit Power', coach: 'Marc Durand' },
      '18:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
      '19:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
    },
    'Samedi': {
      '08:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '10:00': { course: 'CrossFit Power', coach: 'Marc Durand' },
      '11:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
      '14:00': { course: 'Musculation Débutant', coach: 'Jean Rémy' },
      '16:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
    },
    'Dimanche': {
      '09:00': { course: 'Yoga Flow', coach: 'Sarah Lopez' },
      '10:00': { course: 'Cardio Intensif', coach: 'Marc Durand' },
      '11:00': { course: 'Pilates Core', coach: 'Sarah Lopez' },
      '17:00': { course: 'HIIT Bootcamp', coach: 'Jean Rémy' },
    },
  };

  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  useEffect(() => {
    const updateNextSession = () => {
      const now = new Date();
      const currentDay = days[now.getDay()];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const daySchedule = schedule[currentDay];
      const sortedTimes = Object.keys(daySchedule).sort();
      
      // Find next session today
      let next = sortedTimes.find(time => {
        const [hour, minute] = time.split(':').map(Number);
        return hour > currentHour || (hour === currentHour && minute > currentMinute);
      });

      if (next) {
        setNextSession({ 
          course: daySchedule[next].course, 
          time: next, 
          coach: daySchedule[next].coach 
        });
      } else {
        // Find first session of tomorrow
        const tomorrowDay = days[(now.getDay() + 1) % 7];
        const tomorrowSchedule = schedule[tomorrowDay];
        const firstTime = Object.keys(tomorrowSchedule).sort()[0];
        setNextSession({ 
          course: tomorrowSchedule[firstTime].course, 
          time: `Demain ${firstTime}`, 
          coach: tomorrowSchedule[firstTime].coach 
        });
      }
    };

    updateNextSession();
    const interval = setInterval(updateNextSession, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time urgency
  useEffect(() => {
    const timer = setTimeout(() => {
      if (spotsLeft > 1) setSpotsLeft(prev => prev - 1);
    }, 45000);
    return () => clearTimeout(timer);
  }, [spotsLeft]);

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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={nextSession.course}
              className="bg-dark-600/50 backdrop-blur-xl rounded-3xl p-6 border border-dark-300 shadow-2xl -rotate-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-wide">Cours à Venir</div>
                  <div className="text-brand-500 text-xs font-black uppercase tracking-widest">{nextSession.course}</div>
                  <div className="text-dark-100 text-[10px] font-bold">{nextSession.time} — {nextSession.coach}</div>
                </div>
              </div>
            </motion.div>
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