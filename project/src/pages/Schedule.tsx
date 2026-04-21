import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from 'lucide-react';

const courseColors: Record<string, string> = {
  'Cardio Intensif':    'from-orange-500 to-red-500',
  'Yoga Flow':          'from-purple-500 to-indigo-500',
  'HIIT Bootcamp':      'from-yellow-500 to-orange-500',
  'CrossFit Power':     'from-red-500 to-pink-500',
  'Pilates Core':       'from-teal-500 to-cyan-500',
  'Musculation Débutant': 'from-emerald-500 to-green-500',
};

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);

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
      '07:00': { course: 'Cardio Intensif', duration: 45, available: true },
      '09:00': { course: 'Yoga Flow', duration: 60, available: true },
      '12:00': { course: 'HIIT Bootcamp', duration: 40, available: false },
      '18:00': { course: 'CrossFit Power', duration: 50, available: true },
      '19:00': { course: 'Pilates Core', duration: 45, available: true },
    },
    'Mardi': {
      '06:00': { course: 'Musculation Débutant', duration: 55, available: true },
      '08:00': { course: 'Yoga Flow', duration: 60, available: true },
      '10:00': { course: 'Cardio Intensif', duration: 45, available: true },
      '17:00': { course: 'CrossFit Power', duration: 50, available: false },
      '19:00': { course: 'HIIT Bootcamp', duration: 40, available: true },
    },
    'Mercredi': {
      '07:00': { course: 'Pilates Core', duration: 45, available: true },
      '09:00': { course: 'Cardio Intensif', duration: 45, available: true },
      '12:00': { course: 'Yoga Flow', duration: 60, available: true },
      '18:00': { course: 'Musculation Débutant', duration: 55, available: true },
      '20:00': { course: 'HIIT Bootcamp', duration: 40, available: true },
    },
    'Jeudi': {
      '06:00': { course: 'CrossFit Power', duration: 50, available: true },
      '08:00': { course: 'Pilates Core', duration: 45, available: true },
      '10:00': { course: 'Yoga Flow', duration: 60, available: false },
      '17:00': { course: 'Cardio Intensif', duration: 45, available: true },
      '19:00': { course: 'Musculation Débutant', duration: 55, available: true },
    },
    'Vendredi': {
      '07:00': { course: 'HIIT Bootcamp', duration: 40, available: true },
      '09:00': { course: 'Yoga Flow', duration: 60, available: true },
      '12:00': { course: 'CrossFit Power', duration: 50, available: true },
      '18:00': { course: 'Pilates Core', duration: 45, available: true },
      '19:00': { course: 'Cardio Intensif', duration: 45, available: false },
    },
    'Samedi': {
      '08:00': { course: 'Yoga Flow', duration: 60, available: true },
      '10:00': { course: 'CrossFit Power', duration: 50, available: true },
      '11:00': { course: 'HIIT Bootcamp', duration: 40, available: true },
      '14:00': { course: 'Musculation Débutant', duration: 55, available: true },
      '16:00': { course: 'Pilates Core', duration: 45, available: true },
    },
    'Dimanche': {
      '09:00': { course: 'Yoga Flow', duration: 60, available: true },
      '10:00': { course: 'Cardio Intensif', duration: 45, available: true },
      '11:00': { course: 'Pilates Core', duration: 45, available: false },
      '17:00': { course: 'HIIT Bootcamp', duration: 40, available: true },
    },
  };

  const handleBooking = (day: string, time: string, course: string) => {
    const slotKey = `${day}-${time}-${course}`;
    if (reservedSlots.includes(slotKey)) return;
    setReservedSlots(prev => [...prev, slotKey]);
  };

  const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();

  const filledTimes = times.filter(time =>
    days.some(day => schedule[day as keyof typeof schedule]?.[time as any])
  );

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 xl:max-w-[1400px] xl:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="section-title text-white mb-4">
            Planning des <span className="text-gradient">Cours</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Consultez nos horaires et réservez vos cours préférés en un clic.
          </p>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dark-card rounded-2xl p-4 mb-6 flex justify-between items-center"
        >
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">Semaine précédente</span>
          </button>
          <div className="flex items-center gap-2 text-white font-semibold">
            <CalendarDays className="h-5 w-5 text-brand-400" />
            <span className="text-sm md:text-base">
              Semaine du{' '}
              {weekDates[0].toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
              {' '}au{' '}
              {weekDates[6].toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            <span className="hidden sm:inline text-sm font-medium">Semaine suivante</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Schedule Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="dark-card rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-5 py-5 text-left w-20">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      <Clock className="h-3.5 w-3.5" />
                      Heure
                    </div>
                  </th>
                  {days.map((day, i) => {
                    const date = weekDates[i];
                    const todayClass = isToday(date);
                    return (
                      <th key={day} className={`px-4 py-5 text-left text-xs font-semibold uppercase tracking-wider ${todayClass ? 'text-brand-400' : 'text-gray-400'}`}>
                        <div className={`flex flex-col gap-1`}>
                          <span>{day.substring(0, 3)}</span>
                          <span className={`text-lg font-black ${todayClass ? 'text-brand-400' : 'text-white'}`}>
                            {date.toLocaleDateString('fr-FR', { day: '2-digit' })}
                          </span>
                          {todayClass && (
                            <span className="inline-block w-1.5 h-1.5 bg-brand-400 rounded-full mx-auto" />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filledTimes.map((time, rowIndex) => (
                  <tr key={time} className={`border-b border-white/[0.03] ${rowIndex % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-5 py-3 text-sm font-mono font-semibold text-gray-400 whitespace-nowrap">
                      {time}
                    </td>
                    {days.map((day, dayIndex) => {
                      const daySchedule = schedule[day as keyof typeof schedule];
                      const session = daySchedule?.[time as keyof typeof daySchedule];
                      const slotKey = session ? `${day}-${time}-${session.course}` : '';
                      const isReserved = reservedSlots.includes(slotKey);
                      const colorClass = session ? (courseColors[session.course] || 'from-gray-500 to-gray-600') : '';
                      const todayDay = isToday(weekDates[dayIndex]);

                      return (
                        <td key={`${day}-${time}`} className={`px-3 py-3 ${todayDay ? 'bg-brand-500/[0.03]' : ''}`}>
                          {session ? (
                            <div className={`rounded-xl border overflow-hidden ${
                              session.available
                                ? 'border-white/8 hover:border-white/15'
                                : 'border-white/5 opacity-50'
                            } transition-all duration-200`}>
                              {/* Color bar */}
                              <div className={`h-1 bg-gradient-to-r ${colorClass}`} />
                              <div className="p-2.5">
                                <div className="text-xs font-semibold text-white mb-1 leading-tight">{session.course}</div>
                                <div className="text-[10px] text-gray-400 mb-2">{session.duration} min</div>
                                {session.available ? (
                                  <button
                                    onClick={() => handleBooking(day, time, session.course)}
                                    disabled={isReserved}
                                    className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all duration-200 w-full ${
                                      isReserved
                                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                                        : `bg-gradient-to-r ${colorClass} text-white hover:opacity-90`
                                    }`}
                                  >
                                    {isReserved ? '✓ Réservé' : 'Réserver'}
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-red-400 font-semibold">Complet</span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-white/10 text-center text-xs select-none">·</div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 dark-card rounded-2xl p-5 flex flex-wrap gap-6 items-center"
        >
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Légende :</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
            <span className="text-sm text-gray-400">Places disponibles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-40" />
            <span className="text-sm text-gray-400">Cours complet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
            <span className="text-sm text-gray-400">Réservé par vous</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
            <span className="text-sm text-brand-400 font-medium">Aujourd'hui</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Schedule;