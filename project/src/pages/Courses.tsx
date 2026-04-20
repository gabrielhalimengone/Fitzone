import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Filter, CheckCircle } from 'lucide-react';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [reservedCourses, setReservedCourses] = useState<number[]>([]);

  const handleReservation = (courseId: number, courseName: string) => {
    if (reservedCourses.includes(courseId)) return;
    setReservedCourses(prev => [...prev, courseId]);
  };

  const courses = [
    {
      id: 1,
      name: 'Cardio Intensif',
      type: 'cardio',
      level: 'intermediate',
      duration: '45 min',
      capacity: 15,
      rating: 4.8,
      price: '25€',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
      description: 'Brûlez un maximum de calories avec ce cours cardio haute intensité.',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 2,
      name: 'Yoga Flow',
      type: 'yoga',
      level: 'beginner',
      duration: '60 min',
      capacity: 20,
      rating: 4.9,
      price: '20€',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg',
      description: 'Détendez-vous et renforcez votre flexibilité avec ce yoga dynamique.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 3,
      name: 'CrossFit Power',
      type: 'strength',
      level: 'advanced',
      duration: '50 min',
      capacity: 12,
      rating: 4.7,
      price: '30€',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      description: 'Entraînement fonctionnel intensif pour développer force et endurance.',
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 4,
      name: 'Pilates Core',
      type: 'pilates',
      level: 'intermediate',
      duration: '45 min',
      capacity: 18,
      rating: 4.6,
      price: '22€',
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
      description: 'Renforcez votre centre et améliorez votre posture avec le Pilates.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 5,
      name: 'HIIT Bootcamp',
      type: 'cardio',
      level: 'advanced',
      duration: '40 min',
      capacity: 16,
      rating: 4.8,
      price: '28€',
      image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg',
      description: "Entraînement par intervalles pour un maximum d'efficacité.",
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 6,
      name: 'Musculation Débutant',
      type: 'strength',
      level: 'beginner',
      duration: '55 min',
      capacity: 10,
      rating: 4.5,
      price: '25€',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
      description: 'Initiation à la musculation avec techniques et sécurité.',
      color: 'from-emerald-500 to-green-500',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    const typeMatch = selectedType === 'all' || course.type === selectedType;
    return levelMatch && typeMatch;
  });

  const levelConfig = {
    beginner: { label: 'Débutant', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    intermediate: { label: 'Intermédiaire', color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' },
    advanced: { label: 'Avancé', color: 'bg-red-500/15 text-red-400 border-red-500/20' },
  };

  const levelFilters = [
    { value: 'all', label: 'Tous' },
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
  ];

  const typeFilters = [
    { value: 'all', label: 'Tous les types' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength', label: 'Musculation' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'pilates', label: 'Pilates' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-white mb-4">
            Nos <span className="text-gradient">Cours</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez notre large gamme de cours adaptés à tous les niveaux et objectifs.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dark-card rounded-3xl p-6 mb-10"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 min-w-[80px]">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Niveau</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {levelFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedLevel(f.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      selectedLevel === f.value
                        ? 'bg-brand-500 border-brand-500 text-white shadow-glow-sm'
                        : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 min-w-[80px]">
                <span className="text-sm font-medium">Type</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedType(f.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      selectedType === f.value
                        ? 'bg-brand-500 border-brand-500 text-white shadow-glow-sm'
                        : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => {
              const isReserved = reservedCourses.includes(course.id);
              const lvl = levelConfig[course.level as keyof typeof levelConfig];
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group dark-card rounded-3xl overflow-hidden hover:border-white/15 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent`} />
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${course.color}`} />
                    {/* Level badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`pill border ${lvl.color}`}>
                        {lvl.label}
                      </span>
                    </div>
                    {/* Price badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`font-display font-black text-3xl text-white text-shadow`}>
                        {course.price}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">/séance</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{course.name}</h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">{course.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        Max {course.capacity}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReservation(course.id, course.name)}
                      disabled={isReserved}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isReserved
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
                          : `bg-gradient-to-r ${course.color} text-white hover:shadow-glow-orange hover:scale-[1.02]`
                      }`}
                    >
                      {isReserved ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Réservé avec succès
                        </>
                      ) : (
                        'Réserver maintenant'
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">Aucun cours ne correspond à vos critères.</p>
            <button
              onClick={() => { setSelectedLevel('all'); setSelectedType('all'); }}
              className="mt-4 text-brand-400 hover:text-brand-300 font-medium underline underline-offset-4"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;