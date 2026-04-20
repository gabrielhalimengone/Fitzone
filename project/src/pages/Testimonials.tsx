import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const DURATION = 5000;

  const testimonials = [
    {
      id: 1,
      name: 'Julie Moreau',
      age: 32,
      occupation: 'Directrice Marketing',
      image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg',
      rating: 5,
      text: "FitZone a complètement transformé ma vie ! En 6 mois, j'ai perdu 15kg et gagné une confiance en moi incroyable. L'équipe est formidable et les cours sont parfaitement adaptés.",
      program: 'Perte de Poids',
      duration: '6 mois',
      results: '15 kg perdus',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 2,
      name: 'Antoine Dubois',
      age: 28,
      occupation: 'Ingénieur',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
      rating: 5,
      text: "Après des années de sédentarité, FitZone m'a redonné le goût du sport. Les coachs sont à l'écoute et créent une ambiance incroyablement motivante. Je recommande vivement !",
      program: 'CrossFit Débutant',
      duration: '8 mois',
      results: '12 kg de muscle',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      name: 'Marie Lefevre',
      age: 45,
      occupation: 'Professeure',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg',
      rating: 5,
      text: "Les cours de yoga avec Emma sont exceptionnels. J'ai retrouvé ma flexibilité et une sérénité que j'avais perdues avec le stress du travail. Merci FitZone !",
      program: 'Yoga & Bien-être',
      duration: '1 an',
      results: 'Stress –70%',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 4,
      name: 'David Martin',
      age: 35,
      occupation: "Chef d'entreprise",
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
      rating: 5,
      text: "Malgré un emploi du temps chargé, les horaires flexibles de FitZone me permettent de maintenir une routine sportive efficace. Les résultats sont là et je me sens en pleine forme !",
      program: 'Programme Executive',
      duration: '10 mois',
      results: 'Forme optimale',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 5,
      name: 'Sophie Bernard',
      age: 26,
      occupation: 'Étudiante',
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
      rating: 5,
      text: "En tant qu'étudiante, j'apprécie les tarifs abordables et la qualité des cours. L'ambiance est conviviale, j'ai fait de super rencontres. FitZone, c'est ma deuxième famille !",
      program: 'Abonnement Étudiant',
      duration: '1.5 an',
      results: 'Excellente forme',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 6,
      name: 'Pierre Rousseau',
      age: 50,
      occupation: 'Médecin',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
      rating: 5,
      text: "Après une blessure, les coachs de FitZone ont adapté mes entraînements avec un soin remarquable. Leur professionnalisme m'a permis de retrouver ma forme d'avant.",
      program: 'Rééducation Sportive',
      duration: '4 mois',
      results: 'Récupération complète',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const startInterval = () => {
    setProgress(0);
    clearInterval(intervalRef.current);
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / DURATION) * 100);
      if (elapsed >= DURATION) {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        elapsed = 0;
        setProgress(0);
      }
    }, 50);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [currentTestimonial]);

  const goTo = (index: number) => {
    setCurrentTestimonial(index);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-white mb-4">
            Ils nous font <span className="text-gradient">Confiance</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Découvrez les histoires inspirantes de nos membres qui ont transformé leur vie avec FitZone.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="relative dark-card rounded-3xl p-8 mb-4 overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <motion.div
              className={`h-full bg-gradient-to-r ${current.color} rounded-full`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0 }}
            />
          </div>

          {/* Background glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl bg-gradient-to-br ${current.color}`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex justify-center mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${current.color} shadow-lg`}>
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl text-white font-medium text-center mb-8 leading-relaxed max-w-3xl mx-auto">
                « {current.text} »
              </blockquote>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center`}>
                      <Star className="h-2.5 w-2.5 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{current.name}</h3>
                    <p className="text-gray-400 text-sm">{current.occupation}, {current.age} ans</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {[
                    { label: 'Programme', val: current.program },
                    { label: 'Durée', val: current.duration },
                    { label: 'Résultats', val: current.results },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl px-4 py-3 text-center min-w-[90px]">
                      <div className={`text-xs font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
                        {stat.label}
                      </div>
                      <div className="text-white text-sm font-semibold mt-0.5">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goTo((currentTestimonial + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((t, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${index === currentTestimonial
                ? `w-8 h-2.5 bg-gradient-to-r ${current.color}`
                : 'w-2.5 h-2.5 bg-white/15 hover:bg-white/30'
                }`}
            />
          ))}
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              onClick={() => goTo(index)}
              className={`dark-card rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-white/15 ${index === currentTestimonial
                ? `border-white/15 ring-1 ring-brand-500/40`
                : ''
                }`}
            >
              {/* Color top bar */}
              <div className={`h-0.5 rounded-full bg-gradient-to-r ${testimonial.color} mb-4`} />
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-white text-sm font-semibold">{testimonial.name}</h4>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                « {testimonial.text} »
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-800" />
          <div className="absolute inset-0 border border-white/8 rounded-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-black text-white mb-4">
              Rejoignez Nos Membres Satisfaits
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
              Commencez votre transformation dès aujourd'hui et écrivez votre propre success story.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 text-base"
            >
              Démarrer Mon Parcours
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;