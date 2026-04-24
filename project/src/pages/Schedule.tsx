import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CalendarDays, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const courseColors: Record<string, string> = {
  'Cardio Intensif':    'from-brand-500 to-orange-600',
  'Yoga Flow':          'from-dark-300 to-dark-400',
  'HIIT Bootcamp':      'from-brand-500 to-orange-600',
  'CrossFit Power':     'from-brand-500 to-orange-600',
  'Pilates Core':       'from-dark-300 to-dark-400',
  'Musculation Débutant': 'from-dark-300 to-dark-400',
};

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const { user, reserveSession, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7));
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeek);
  const today = new Date();

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const times = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  const schedule = {
    'Lundi': {
      '07:00': { course: 'Cardio Intensif', duration: 45, available: true, coach: 'Marc Durand' },
      '09:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '12:00': { course: 'HIIT Bootcamp', duration: 40, available: false, coach: 'Jean Rémy' },
      '18:00': { course: 'CrossFit Power', duration: 50, available: true, coach: 'Marc Durand' },
      '19:00': { course: 'Pilates Core', duration: 45, available: true, coach: 'Sarah Lopez' },
    },
    'Mardi': {
      '06:00': { course: 'Musculation Débutant', duration: 55, available: true, coach: 'Jean Rémy' },
      '08:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '10:00': { course: 'Cardio Intensif', duration: 45, available: true, coach: 'Marc Durand' },
      '17:00': { course: 'CrossFit Power', duration: 50, available: false, coach: 'Marc Durand' },
      '19:00': { course: 'HIIT Bootcamp', duration: 40, available: true, coach: 'Jean Rémy' },
    },
    'Mercredi': {
      '07:00': { course: 'Pilates Core', duration: 45, available: true, coach: 'Sarah Lopez' },
      '09:00': { course: 'Cardio Intensif', duration: 45, available: true, coach: 'Marc Durand' },
      '12:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '18:00': { course: 'Musculation Débutant', duration: 55, available: true, coach: 'Jean Rémy' },
      '20:00': { course: 'HIIT Bootcamp', duration: 40, available: true, coach: 'Jean Rémy' },
    },
    'Jeudi': {
      '06:00': { course: 'CrossFit Power', duration: 50, available: true, coach: 'Marc Durand' },
      '08:00': { course: 'Pilates Core', duration: 45, available: true, coach: 'Sarah Lopez' },
      '10:00': { course: 'Yoga Flow', duration: 60, available: false, coach: 'Sarah Lopez' },
      '17:00': { course: 'Cardio Intensif', duration: 45, available: true, coach: 'Marc Durand' },
      '19:00': { course: 'Musculation Débutant', duration: 55, available: true, coach: 'Jean Rémy' },
    },
    'Vendredi': {
      '07:00': { course: 'HIIT Bootcamp', duration: 40, available: true, coach: 'Jean Rémy' },
      '09:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '12:00': { course: 'CrossFit Power', duration: 50, available: true, coach: 'Marc Durand' },
      '18:00': { course: 'Pilates Core', duration: 45, available: true, coach: 'Sarah Lopez' },
      '19:00': { course: 'Cardio Intensif', duration: 45, available: false, coach: 'Marc Durand' },
    },
    'Samedi': {
      '08:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '10:00': { course: 'CrossFit Power', duration: 50, available: true, coach: 'Marc Durand' },
      '11:00': { course: 'HIIT Bootcamp', duration: 40, available: true, coach: 'Jean Rémy' },
      '14:00': { course: 'Musculation Débutant', duration: 55, available: true, coach: 'Jean Rémy' },
      '16:00': { course: 'Pilates Core', duration: 45, available: true, coach: 'Sarah Lopez' },
    },
    'Dimanche': {
      '09:00': { course: 'Yoga Flow', duration: 60, available: true, coach: 'Sarah Lopez' },
      '10:00': { course: 'Cardio Intensif', duration: 45, available: true, coach: 'Marc Durand' },
      '11:00': { course: 'Pilates Core', duration: 45, available: false, coach: 'Sarah Lopez' },
      '17:00': { course: 'HIIT Bootcamp', duration: 40, available: true, coach: 'Jean Rémy' },
    },
  };

  const handleBooking = (dayIndex: number, time: string, session: any) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const date = weekDates[dayIndex].toISOString().split('T')[0];
    const isAlreadyReserved = user?.reservedSessions.some(
      s => s.date === date && s.time === time && s.courseName === session.course
    );

    if (isAlreadyReserved) return;

    reserveSession({
      courseName: session.course,
      coachName: session.coach,
      date: date,
      time: time,
      duration: `${session.duration} min`
    });
  };

  const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();

  const filledTimes = times.filter(time =>
    days.some(day => schedule[day as keyof typeof schedule]?.[time as any])
  );

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg" 
            alt="FitZone Schedule Hero" 
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
            Planning des <span className="text-brand-500">Cours</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.2em] text-[10px]">
            Construisez votre semaine fitness selon vos envies et vos objectifs.
          </p>
        </motion.div>
      </div>

      <div className="max-w-full px-4 sm:px-6 lg:px-8 xl:max-w-[1500px] xl:mx-auto">
        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center gap-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl px-6 py-4 text-brand-500 font-bold text-xs uppercase tracking-widest"
          >
            <AlertCircle className="h-5 w-5" />
            Connectez-vous pour pouvoir réserver vos séances.
          </motion.div>
        )}

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="flex items-center gap-2 text-dark-100 hover:text-white px-4 py-2.5 rounded-xl bg-dark-700 border border-dark-400 hover:border-brand-500 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>
          <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
            <CalendarDays className="h-5 w-5 text-brand-500" />
            <span className="bg-dark-700 px-4 py-2 rounded-xl border border-dark-400">
              Du {weekDates[0].toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} au {weekDates[6].toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            </span>
          </div>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="flex items-center gap-2 text-dark-100 hover:text-white px-4 py-2.5 rounded-xl bg-dark-700 border border-dark-400 hover:border-brand-500 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Schedule Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-dark-400">
                  <th className="px-6 py-8 text-left w-24 bg-dark-800">
                    <div className="flex flex-col gap-1 text-brand-500 text-[10px] font-black uppercase tracking-widest">
                      <Clock className="h-4 w-4 mb-1" />
                      HEURE
                    </div>
                  </th>
                  {days.map((day, i) => {
                    const date = weekDates[i];
                    const isTday = isToday(date);
                    return (
                      <th key={day} className={`px-4 py-8 text-left border-l border-dark-400 ${isTday ? 'bg-brand-500/5' : 'bg-dark-800'}`}>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-dark-100 uppercase tracking-widest mb-1">{day}</span>
                           <span className={`text-2xl font-black ${isTday ? 'text-brand-500' : 'text-white'}`}>
                             {date.toLocaleDateString('fr-FR', { day: '2-digit' })}
                           </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filledTimes.map((time, rowIndex) => (
                  <tr key={time} className="border-b border-dark-400">
                    <td className="px-6 py-6 text-[10px] font-black text-dark-100 bg-dark-800 border-r border-dark-400">
                      {time}
                    </td>
                    {days.map((day, dayIndex) => {
                      const daySchedule = schedule[day as keyof typeof schedule];
                      const session = daySchedule?.[time as keyof typeof daySchedule];
                      const dateStr = weekDates[dayIndex].toISOString().split('T')[0];
                      
                      const isReserved = user?.reservedSessions.some(
                        s => s.date === dateStr && s.time === time && s.courseName === session?.course
                      );
                      
                      const colorClass = session ? (courseColors[session.course] || 'from-dark-300 to-dark-400') : '';
                      const isTday = isToday(weekDates[dayIndex]);

                      return (
                        <td key={`${day}-${time}`} className={`px-3 py-3 border-l border-dark-400 ${isTday ? 'bg-brand-500/[0.02]' : ''}`}>
                          {session ? (
                            <div className={`rounded-2xl border ${
                              session.available
                                ? 'bg-dark-700 border-dark-400 hover:border-brand-500'
                                : 'bg-dark-800 border-dark-400 opacity-40'
                            } transition-all duration-300 p-4 group`}>
                              <div className="text-[10px] font-black text-white uppercase tracking-tight mb-1 truncate leading-tight">{session.course}</div>
                              <div className="text-[9px] text-dark-100 font-bold uppercase mb-3">{session.coach}</div>
                              
                              {session.available ? (
                                <button
                                  onClick={() => handleBooking(dayIndex, time, session)}
                                  disabled={isReserved}
                                  className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                    isReserved
                                      ? 'bg-emerald-500/10 text-emerald-500'
                                      : 'bg-brand-500 text-white hover:bg-brand-600'
                                  }`}
                                >
                                  {isReserved ? '✓ PRÊT' : 'RÉSERVER'}
                                </button>
                              ) : (
                                <div className="text-[9px] text-red-500 font-black uppercase text-center py-2">COMPLET</div>
                              )}
                            </div>
                          ) : (
                            <div className="flex justify-center items-center h-full opacity-10">
                               <div className="w-1 h-1 bg-white rounded-full" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-8 items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-dark-100">
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-brand-500" />
              <span>Disponible</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-emerald-500/20 border border-emerald-500/40" />
              <span>Réservé</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-dark-800 opacity-40 border border-dark-400" />
              <span>Complet</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;