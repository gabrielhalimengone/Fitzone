import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from 'lucide-react';

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
      text: "FitZone a complètement transformé ma vie ! En 6 mois, j'ai perdu 15kg et gagné une confiance en moi incroyable. L'équipe est formidable.",
      program: 'Perte de Poids',
      duration: '6 mois',
      results: '–15 kg',
      color: 'from-brand-500 to-orange-600',
    },
    {
      id: 2,
      name: 'Antoine Dubois',
      age: 28,
      occupation: 'Ingénieur',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
      rating: 5,
      text: "Après des années de sédentarité, FitZone m'a redonné le goût du sport. Les coachs sont à l'écoute et créent une ambiance incroyablement motivante.",
      program: 'CrossFit',
      duration: '8 mois',
      results: '+12 kg muscle',
      color: 'from-brand-500 to-orange-600',
    },
    {
      id: 3,
      name: 'Marie Lefevre',
      age: 45,
      occupation: 'Professeure',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg',
      rating: 5,
      text: "Les cours de yoga avec Emma sont exceptionnels. J'ai retrouvé ma flexibilité et une sérénité que j'avais perdues avec le stress du travail.",
      program: 'Yoga Flow',
      duration: '1 an',
      results: 'Zen & Souple',
      color: 'from-brand-500 to-orange-600',
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
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg" 
            alt="FitZone Testimonials Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/90 to-dark-900" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="section-title text-white mb-4 uppercase tracking-tighter text-5xl md:text-7xl">
            Ils nous font <span className="text-brand-500">Confiance</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.2em] text-[10px]">
            Découvrez les victoires de notre communauté d'élite.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Highlighted Testimonial */}
        <div className="relative bg-[#1E1E1E] border border-[#3A3A3A] rounded-[3rem] p-8 md:p-16 mb-8 overflow-hidden shadow-2xl">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-dark-900/50">
            <motion.div
              className={`h-full bg-brand-500 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.5)]`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex justify-center mb-10">
                <div className={`p-5 rounded-2xl bg-brand-500/10 border border-brand-500/20`}>
                  <Quote className="h-8 w-8 text-brand-500" />
                </div>
              </div>

              <blockquote className="text-2xl md:text-4xl text-white font-black text-center mb-12 leading-[1.1] max-w-4xl mx-auto uppercase tracking-tighter">
                « {current.text} »
              </blockquote>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-10 border-t border-dark-400">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-20 h-20 rounded-2xl object-cover grayscale"
                    />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{current.name}</h3>
                    <p className="text-brand-500 font-black text-[10px] uppercase tracking-widest">{current.occupation}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { label: 'Programme', val: current.program },
                    { label: 'Durée', val: current.duration },
                    { label: 'Résultat', val: current.results },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-dark-700 border border-dark-400 rounded-2xl px-6 py-4 text-center min-w-[120px]">
                      <div className="text-[9px] font-black text-dark-100 uppercase tracking-widest mb-1">
                        {stat.label}
                      </div>
                      <div className="text-white text-sm font-black uppercase tracking-tight">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-dark-800 border border-dark-400 flex items-center justify-center text-white hover:border-brand-500 hover:bg-brand-500 transition-all duration-300 group"
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => goTo((currentTestimonial + 1) % testimonials.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-dark-800 border border-dark-400 flex items-center justify-center text-white hover:border-brand-500 hover:bg-brand-500 transition-all duration-300 group"
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mb-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-500 rounded-full ${index === currentTestimonial
                ? `w-12 h-2.5 bg-brand-500 shadow-[0_0_10px_rgba(255,69,0,0.4)]`
                : 'w-2.5 h-2.5 bg-dark-400 hover:bg-brand-500/50'
                }`}
            />
          ))}
        </div>

        {/* Other Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => goTo(index)}
              className={`bg-[#1E1E1E] border rounded-[2rem] p-6 cursor-pointer transition-all duration-500 hover:border-brand-500 ${index === currentTestimonial
                ? `border-brand-500/50 shadow-xl shadow-brand-500/10`
                : 'border-dark-400'
                }`}
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-xl object-cover grayscale"
                />
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-tight">{testimonial.name}</h4>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-brand-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#BBBBBB] text-xs font-medium leading-relaxed line-clamp-3 italic">
                « {testimonial.text} »
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-dark-800 border border-dark-300 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Votre <span className="text-brand-500">Succès</span> Commence Ici</h2>
            <p className="text-[#BBBBBB] text-xl font-bold uppercase tracking-widest text-[10px] mb-10">Devenez la prochaine source d'inspiration.</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3 px-12 py-5 text-sm uppercase tracking-[0.2em] font-black shadow-2xl shadow-brand-500/30 hover:scale-105 transition-all">
              Démarrer Mon Parcours
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;