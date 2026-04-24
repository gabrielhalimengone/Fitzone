import React, { useState } from 'react';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Clock, Trophy, ArrowRight, Zap, X, CheckCircle2, User } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Programmes Personnalisés',
    description: 'Des entraînements sur-mesure adaptés à vos objectifs et votre niveau actuel.',
    color: 'from-orange-500 to-brand-500',
    glow: 'rgba(255,69,0,0.2)',
  },
  {
    icon: Users,
    title: 'Coachs Certifiés',
    description: "Une équipe d'experts passionnés pour vous accompagner dans votre progression.",
    color: 'from-dark-300 to-dark-400',
    glow: 'rgba(255,255,255,0.05)',
  },
  {
    icon: Clock,
    title: 'Horaires Flexibles',
    description: 'Ouvert 7j/7 avec des créneaux larges pour s\'adapter à votre emploi du temps.',
    color: 'from-orange-500 to-brand-500',
    glow: 'rgba(255,69,0,0.2)',
  },
  {
    icon: Trophy,
    title: 'Résultats Garantis',
    description: 'Un suivi rigoureux et des conseils nutritionnels pour atteindre vos sommets.',
    color: 'from-dark-300 to-dark-400',
    glow: 'rgba(255,255,255,0.05)',
  },
];

const Home = () => {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setActiveCourse(null);
    }, 3000);
  };

  return (
    <div className="bg-dark-900 min-h-screen">
      <Hero />

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title uppercase tracking-tighter mb-4"
            >
              Pourquoi Choisir <span className="text-brand-500">FitZone ?</span>
            </motion.h2>
            <p className="text-dark-100 max-w-2xl mx-auto font-medium">
              Nous combinons expertise, technologie et motivation pour vous offrir la meilleure expérience fitness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 bg-dark-800 border border-dark-300 rounded-[2rem] hover:border-brand-500/50 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-3.5 mb-6 shadow-xl relative z-10`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-dark-100 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-dark-800 border border-dark-300 p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-hero-pattern opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                Prêt à <span className="text-brand-500">faire le</span> premier pas ?
              </h2>
              <p className="text-xl text-dark-100 mb-10 max-w-2xl mx-auto font-medium">
                Ils ont osé se lancer, et ils ne le regrettent pas. 
                <br />Votre première séance est offerte pour que vous puissiez en faire autant.
              </p>
              <Link
                to="/signup"
                className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5 uppercase tracking-widest font-black"
              >
                Je rejoins la communauté
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal (Placeholder for actual courses) */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/90 backdrop-blur-sm p-4"
          >
            <div className="absolute inset-0" onClick={() => setActiveCourse(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-dark-700 border border-dark-300 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-6 right-6 p-2 text-dark-100 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {isBooked ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Séance Réservée !</h3>
                  <p className="text-dark-100">Vous recevrez un email de confirmation.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Réserver une séance</h2>
                  <p className="text-dark-100 mb-8 font-medium">Réservez votre place pour une session de coaching ou un cours collectif.</p>

                  <form onSubmit={handleBooking} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-dark-100 uppercase tracking-widest ml-1">Séance / Coach</label>
                      <select required className="w-full px-5 py-4 bg-dark-500 border border-dark-200 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none">
                        <option value="">Choisir une séance</option>
                        <option value="crossfit">CrossFit Power - Marc Durand</option>
                        <option value="yoga">Yoga Vinyasa - Sarah Martin</option>
                        <option value="boxing">Boxe Anglaise - Thomas Petit</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-dark-100 uppercase tracking-widest ml-1">Date & Heure</label>
                      <input required type="datetime-local" className="w-full px-5 py-4 bg-dark-500 border border-dark-200 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 text-lg font-black uppercase tracking-widest mt-4 rounded-2xl transition-all duration-300 shadow-xl shadow-brand-500/20">
                      Réserver ma place
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;