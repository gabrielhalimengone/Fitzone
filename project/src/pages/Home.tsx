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
    color: 'from-orange-500 to-red-500',
    glow: 'rgba(249,115,22,0.3)',
  },
  {
    icon: Users,
    title: 'Coachs Certifiés',
    description: "Une équipe d'experts passionnés pour vous accompagner dans votre progression.",
    color: 'from-purple-500 to-indigo-500',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    icon: Clock,
    title: 'Horaires Flexibles',
    description: "Cours disponibles 7j/7 de 6h à 22h pour s'adapter à votre emploi du temps.",
    color: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon: Trophy,
    title: 'Résultats Garantis',
    description: 'Méthodes éprouvées et scientifiques pour atteindre vos objectifs rapidement.',
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.3)',
  },
];

const Home = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBookingOpen(false);
    }, 3000);
  };

  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="pt-16 pb-28 bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-brand-400" />
              <span className="text-brand-300 text-sm font-semibold">Pourquoi nous choisir</span>
            </div>
            <h2 className="section-title text-white mb-5">
              Pourquoi Choisir{' '}
              <span className="text-gradient">FitZone</span> ?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Nous offrons bien plus qu'une simple salle de sport. Découvrez notre approche unique du fitness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: feature.glow }}
                />
                <div className="relative dark-card rounded-3xl p-8 h-full transition-all duration-300 group-hover:border-white/15">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-red-700" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 text-shadow leading-tight">
              Prêt à Commencer
              <br />Votre Transformation ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Rejoignez des centaines de membres qui ont déjà transformé leur vie avec nos programmes d'élite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/subscriptions"
                className="inline-flex items-center gap-3 bg-white text-brand-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto justify-center"
              >
                Démarrer mon parcours
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-3 bg-dark-900/40 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-dark-900/60 transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto justify-center"
              >
                Réserver une séance
                <Clock className="h-5 w-5" />
              </button>
            </div>
            <p className="text-white/50 text-sm mt-5">Aucune carte de crédit requise · Annulation à tout moment</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="absolute inset-0" onClick={() => setIsBookingOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg dark-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Réservation Reçue !</h3>
                  <p className="text-gray-400">
                    Nous avons bien reçu votre demande de réservation. Un coach vous contactera d'ici 24h pour confirmer le créneau.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white mb-2">Réserver une séance</h2>
                  <p className="text-gray-400 mb-8">Choisissez votre type de séance et nous vous rappellerons.</p>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nom Complet</label>
                      <input required type="text" placeholder="Jean Dupont" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                        <input required type="tel" placeholder="06..." className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Type de séance</label>
                        <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none">
                          <option className="bg-dark-800">Cardio</option>
                          <option className="bg-dark-800">Musculation</option>
                          <option className="bg-dark-800">Yoga</option>
                          <option className="bg-dark-800">CrossFit</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Coach préféré (Optionnel)</label>
                      <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none">
                        <option className="bg-dark-800">Aucune préférence</option>
                        <option className="bg-dark-800">Marc Durand</option>
                        <option className="bg-dark-800">Sarah Lopez</option>
                        <option className="bg-dark-800">Jean Rémy</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full btn-primary py-4 text-lg font-bold mt-4">Confirmer la réservation</button>
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