import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Clock, Trophy, ArrowRight, Zap } from 'lucide-react';

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
  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="pt-16 pb-28 bg-dark-800 relative overflow-hidden">
        {/* Background pattern */}
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
                {/* Card glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: feature.glow }}
                />
                <div className="relative dark-card rounded-3xl p-8 h-full transition-all duration-300 group-hover:border-white/15">
                  {/* Icon */}
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
        {/* Background */}
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
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-brand-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Essai Gratuit de 7 Jours
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-white/50 text-sm mt-5">Aucune carte de crédit requise · Annulation à tout moment</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;