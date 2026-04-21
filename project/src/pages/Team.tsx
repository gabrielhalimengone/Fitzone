import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Instagram, CheckCircle } from 'lucide-react';

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
      bio: "Ancienne athlète professionnelle, Sarah vous accompagne vers vos objectifs avec passion et expertise inégalée.",
      certifications: ['CrossFit Level 2', 'Nutritionniste Sportive', 'Personal Trainer'],
      color: 'from-orange-500 to-red-500',
      accent: 'border-orange-500/30',
      glow: 'rgba(249,115,22,0.25)',
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
      bio: "Spécialiste en entraînement haute intensité, Marc transforme vos séances en défis motivants et stimulants.",
      certifications: ['HIIT Instructor', 'Cardio Specialist', 'Sports Conditioning'],
      color: 'from-blue-500 to-cyan-500',
      accent: 'border-blue-500/30',
      glow: 'rgba(59,130,246,0.25)',
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
      bio: "Emma apporte sérénité et bien-être à travers des pratiques douces mais profondément efficaces.",
      certifications: ['Yoga Alliance RYT-500', 'Pilates Mat & Reformer', 'Meditation Teacher'],
      color: 'from-purple-500 to-indigo-500',
      accent: 'border-purple-500/30',
      glow: 'rgba(168,85,247,0.25)',
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
      bio: "Expert en force et développement musculaire, Thomas vous guide vers des résultats exceptionnels.",
      certifications: ['Certified Strength Coach', 'Powerlifting Coach', 'Sports Nutrition'],
      color: 'from-emerald-500 to-teal-500',
      accent: 'border-emerald-500/30',
      glow: 'rgba(16,185,129,0.25)',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="section-title text-white mb-4">
            Notre <span className="text-gradient">Équipe</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Rencontrez nos coachs experts qui vous accompagneront dans votre parcours fitness avec passion et professionnalisme.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              {/* Card glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ background: coach.glow }} />

              <div className={`relative dark-card rounded-3xl overflow-hidden border transition-all duration-300 group-hover:${coach.accent}`}>
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${coach.color}`} />

                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-44 shrink-0 relative overflow-hidden">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-56 sm:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-dark-800/20" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${coach.color} bg-clip-text text-transparent`}>
                          {coach.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-2.5 py-1.5">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-bold text-sm">{coach.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{coach.bio}</p>

                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Award className="h-3.5 w-3.5 text-brand-400" />
                        {coach.experience} d'exp.
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Users className="h-3.5 w-3.5 text-brand-400" />
                        {coach.clients} clients
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {coach.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className={`pill border text-[11px] bg-white/5 border-white/8 text-gray-300`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="space-y-1 mb-5">
                      {coach.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle className="h-3 w-3 text-brand-500 shrink-0" />
                          {cert}
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r ${coach.color} text-white transition-all duration-300 hover:shadow-glow-sm hover:scale-[1.02]`}>
                      Réserver une Séance
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20 rounded-3xl overflow-hidden text-center p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-red-700" />
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
              Nos coachs sont là pour vous accompagner dans l'atteinte de vos objectifs.
            </p>
            <button className="bg-white text-brand-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
              Réserver votre Consultation Gratuite
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;