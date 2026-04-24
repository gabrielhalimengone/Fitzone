import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Users, Star, Filter, CheckCircle, AlertCircle } from 'lucide-react';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { user, reserveSession, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReservation = (course: any) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    
    const isAlreadyReserved = user?.reservedSessions.some(
      s => s.courseName === course.name && s.date === dateStr
    );

    if (isAlreadyReserved) return;

    reserveSession({
      courseName: course.name,
      coachName: course.defaultCoach,
      date: dateStr,
      time: '18:00',
      duration: course.duration
    });
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
      defaultCoach: 'Marc Durand',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
      description: 'Le cours idéal pour bouger, transpirer et se sentir vivant. Cardio haute intensité garanti',
      color: 'from-brand-500 to-orange-600',
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
      defaultCoach: 'Sarah Lopez',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg',
      description: 'Un moment pour vous recentrer, respirer et travailler votre souplesse en douceur.',
      color: 'from-dark-300 to-dark-400',
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
      defaultCoach: 'Marc Durand',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      description: 'Travaillez votre force et votre endurance avec des exercices concrets qui transforment vraiment le corps.',
      color: 'from-brand-500 to-orange-600',
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
      defaultCoach: 'Sarah Lopez',
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
      description: 'Renforcez votre corps en douceur et tenez-vous mieux dans votre quotidien grâce au Pilates.',
      color: 'from-dark-300 to-dark-400',
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
      defaultCoach: 'Jean Rémy',
      image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg',
      description: "Des intervalles pensés pour vous faire progresser à chaque séance, sans vous épuiser.",
      color: 'from-brand-500 to-orange-600',
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
      defaultCoach: 'Jean Rémy',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
      description: 'On vous accompagne pas à pas pour débuter la musculation en toute confiance et en toute sécurité.',
      color: 'from-dark-300 to-dark-400',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    const typeMatch = selectedType === 'all' || course.type === selectedType;
    return levelMatch && typeMatch;
  });

  const levelConfig = {
    beginner: { label: 'Débutant', color: 'bg-dark-700 text-white border-dark-400' },
    intermediate: { label: 'Intermédiaire', color: 'bg-brand-500/20 text-brand-500 border-brand-500/30' },
    advanced: { label: 'Avancé', color: 'bg-brand-500 text-white border-brand-500' },
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
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg" 
            alt="FitZone Courses Hero" 
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
            Nos <span className="text-brand-500">Cours</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.2em] text-[10px]">
            Chaque séance vous rapproche un peu plus de la meilleure version de vous-même.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center gap-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl px-6 py-4 text-brand-500 font-bold text-xs uppercase tracking-widest"
          >
            <AlertCircle className="h-5 w-5" />
            Connectez-vous, choisissez votre séance et on s'occupe du reste.
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-[2rem] p-8 mb-12"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-3 text-white min-w-[120px]">
                <Filter className="h-4 w-4 text-brand-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Niveau</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {levelFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedLevel(f.value)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                      selectedLevel === f.value
                        ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                        : 'border-dark-300 text-dark-100 hover:border-brand-500 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-3 text-white min-w-[120px]">
                <div className="w-4 h-4" /> {/* Spacer */}
                <span className="text-[10px] font-black uppercase tracking-widest">Discipline</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {typeFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedType(f.value)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                      selectedType === f.value
                        ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                        : 'border-dark-300 text-dark-100 hover:border-brand-500 hover:text-white'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const dateStr = tomorrow.toISOString().split('T')[0];
              
              const isReserved = user?.reservedSessions.some(
                s => s.courseName === course.name && s.date === dateStr
              );
              
              const lvl = levelConfig[course.level as keyof typeof levelConfig];
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group bg-[#1E1E1E] border border-[#3A3A3A] rounded-[2.5rem] overflow-hidden hover:border-brand-500 transition-all duration-500 shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/20 to-transparent" />
                    <div className="absolute top-6 right-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${lvl.color}`}>
                        {lvl.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{course.name}</h3>
                        <div className="text-brand-500 font-black text-2xl">{course.price}</div>
                    </div>
                    <p className="text-[#BBBBBB] text-sm font-medium mb-8 leading-relaxed h-10 overflow-hidden line-clamp-2">
                        {course.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-dark-700 rounded-2xl p-3 text-center border border-dark-400">
                           <Clock className="h-4 w-4 text-brand-500 mx-auto mb-2" />
                           <span className="text-[10px] font-black text-white uppercase">{course.duration}</span>
                        </div>
                        <div className="bg-dark-700 rounded-2xl p-3 text-center border border-dark-400">
                           <Users className="h-4 w-4 text-brand-500 mx-auto mb-2" />
                           <span className="text-[10px] font-black text-white uppercase">{course.capacity} max</span>
                        </div>
                        <div className="bg-dark-700 rounded-2xl p-3 text-center border border-dark-400">
                           <Star className="h-4 w-4 text-brand-500 mx-auto mb-2" />
                           <span className="text-[10px] font-black text-white uppercase">{course.rating}</span>
                        </div>
                    </div>

                    <button
                      onClick={() => handleReservation(course)}
                      disabled={isReserved}
                      className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
                        isReserved
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                          : `bg-brand-500 text-white hover:bg-brand-600 shadow-xl shadow-brand-500/20`
                      }`}
                    >
                      {isReserved ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          RÉSERVÉ
                        </>
                      ) : (
                        "C'est parti !"
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Courses;