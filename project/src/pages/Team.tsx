import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Instagram, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Team = () => {
  const coaches = [
    {
      id: 1,
      name: 'Sarah Martinez',
      role: 'Coach Principal',
      specialties: ['CrossFit', 'Musculation', 'Nutrition'],
      experience: '8 ans',
      rating: 4.9,
      clients: 120,
      image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
      bio: "Ancienne athlète professionnelle, Sarah met toute son expérience et sa passion au service de vos objectifs.",
      certifications: ['CrossFit Level 2', 'Nutritionniste Sportive', 'Personal Trainer'],
      color: 'from-brand-500 to-orange-600',
    },
    {
      id: 2,
      name: 'Marc Dubois',
      role: 'Coach Cardio & HIIT',
      specialties: ['HIIT', 'Cardio', 'Préparation physique'],
      experience: '6 ans',
      rating: 4.8,
      clients: 95,
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
      bio: "Spécialiste du sport intensif, Marc sait comment vous pousser dans vos retranchements tout en gardant le sourire.",
      certifications: ['HIIT Instructor', 'Cardio Specialist', 'Sports Conditioning'],
      color: 'from-dark-300 to-dark-400',
    },
    {
      id: 3,
      name: 'Emma Rousseau',
      role: 'Coach Yoga & Pilates',
      specialties: ['Yoga', 'Pilates', 'Méditation'],
      experience: '10 ans',
      rating: 4.9,
      clients: 150,
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
      bio: "Avec Emma, chaque séance est un moment pour souffler, se recentrer et prendre soin de soi.",
      certifications: ['Yoga Alliance RYT-500', 'Pilates Mat & Reformer', 'Meditation Teacher'],
      color: 'from-brand-500 to-orange-600',
    },
    {
      id: 4,
      name: 'Thomas Leblanc',
      role: 'Coach Musculation',
      specialties: ['Musculation', 'Powerlifting', 'Coaching personnel'],
      experience: '7 ans',
      rating: 4.7,
      clients: 85,
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
      bio: "Avec Thomas, chaque séance est pensée pour vous faire progresser concrètement en force et en muscle.",
      certifications: ['Certified Strength Coach', 'Powerlifting Coach', 'Sports Nutrition'],
      color: 'from-dark-300 to-dark-400',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg" 
            alt="FitZone Team Hero" 
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
            Notre <span className="text-brand-500">Équipe</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.2em] text-[10px]">
            Des coachs à l'écoute, engagés à vos côtés pour atteindre vos objectifs.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#1E1E1E] border border-[#3A3A3A] rounded-[2.5rem] overflow-hidden hover:border-brand-500 transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className="sm:w-56 shrink-0 relative overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-72 sm:h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#1E1E1E]/20" />
                  <div className="absolute top-4 left-4">
                     <div className="bg-brand-500 text-white font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full">EXPERT</div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{coach.name}</h3>
                      <p className="text-brand-500 font-black text-[10px] uppercase tracking-widest">{coach.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-dark-700 px-3 py-1.5 rounded-xl border border-dark-400">
                      <Star className="h-3.5 w-3.5 text-brand-500 fill-current" />
                      <span className="text-white font-black text-xs">{coach.rating}</span>
                    </div>
                  </div>

                  <p className="text-[#BBBBBB] text-sm font-medium mb-6 leading-relaxed">
                    {coach.bio}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center border border-dark-400">
                         <Award className="h-4 w-4 text-brand-500" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-tight">{coach.experience} d'exp.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center border border-dark-400">
                         <Users className="h-4 w-4 text-brand-500" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-tight">{coach.clients} clients</span>
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {coach.specialties.map((spec, i) => (
                      <span key={i} className="px-3 py-1 bg-dark-700 border border-dark-400 rounded-lg text-[9px] font-black text-dark-100 uppercase tracking-widest">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-brand-500/20">
                    Réserver un Bilan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-dark-800 border border-dark-300 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Prêt à <span className="text-brand-500">vous lancer </span> ?</h2>
            <p className="text-[#BBBBBB] text-xl font-bold uppercase tracking-widest text-[10px] mb-10">Faites le premier pas et rejoignez-nous dès aujourd'hui.</p>
            <Link to="/signup" className="btn-primary inline-flex items-center gap-3 px-12 py-5 text-sm uppercase tracking-[0.2em] font-black shadow-2xl shadow-brand-500/30 hover:scale-105 transition-all">
              Je me lance
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;