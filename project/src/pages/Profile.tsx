import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User as UserIcon, 
  Calendar, 
  Dumbbell, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  Settings, 
  LogOut,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Mail,
  Phone
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface EditProfileData {
  fullName: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const { user, logout, cancelSession, updateUserInfo, resetDatabase } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EditProfileData>({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  if (!user) {
    React.useEffect(() => {
      navigate('/login');
    }, [user, navigate]);
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelSession = (id: string) => {
    if (window.confirm('Voulez-vous vraiment annuler cette séance ?')) {
      cancelSession(id);
    }
  };

  const onUpdateProfile = async (data: EditProfileData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateUserInfo(data);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Séances réservées', value: user.reservedSessions.length.toString(), icon: Dumbbell, color: 'text-brand-400' },
    { label: 'Minutes prévues', value: (user.reservedSessions.length * 45).toString(), icon: Clock, color: 'text-emerald-400' },
    { label: 'Niveau Forfait', value: user.plan.toUpperCase(), icon: CheckCircle2, color: 'text-blue-400' },
  ];

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-white mb-2">
              Salut, <span className="text-gradient">{user.fullName.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-gray-400">Voici un aperçu de votre activité et de votre abonnement.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button 
              onClick={() => { reset(); setIsEditing(true); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-bold"
            >
              <Settings className="h-5 w-5" />
              Modifier Profil
            </button>
            <button 
              onClick={() => { if(window.confirm('Réinitialiser la base de données de démo ?')) resetDatabase(); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white transition-all font-bold"
              title="Réinitialiser pour la démo"
            >
              <AlertCircle className="h-5 w-5" />
              Reset DB
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column — User Info & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dark-card rounded-3xl p-8 border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <UserIcon className="h-24 w-24" />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-red-600 flex items-center justify-center text-3xl font-black text-white mb-6 shadow-lg shadow-brand-500/20">
                  {user.fullName.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{user.fullName}</h2>
                <p className="text-gray-400 text-sm mb-6">{user.email}</p>
                {user.phone && <p className="text-gray-500 text-xs mb-6 flex items-center gap-2"><Phone className="h-3 w-3" /> {user.phone}</p>}
                
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar className="h-4 w-4 text-brand-400" />
                    Membre depuis {user.joinDate}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin className="h-4 w-4 text-brand-400" />
                    FitZone Paris Centre
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="dark-card rounded-2xl p-5 border-white/5 flex items-center gap-5"
                >
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{stat.label}</p>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle & Right Column — Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subscription & Coach Row */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Subscription Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="dark-card rounded-3xl p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20">
                    <CreditCard className="h-6 w-6 text-brand-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">ACTIF</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Forfait {user.plan}</h3>
                <p className="text-gray-400 text-sm mb-6">Accès illimité Premium</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-gray-500 font-bold uppercase">Prochain prélèvement</span>
                    <span className="text-sm text-white font-medium">{user.nextBillingDate}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[70%] h-full bg-gradient-to-r from-brand-500 to-red-500" />
                  </div>
                </div>
                
                <Link 
                  to="/subscriptions"
                  className="w-full py-3 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-all block text-center"
                >
                  Gérer l'abonnement
                </Link>
              </motion.div>

              {/* Coach Card */}
              {user.coach && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="dark-card rounded-3xl p-8 border-white/5"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <UserIcon className="h-6 w-6 text-purple-400" />
                    </div>
                    <button className="text-xs text-brand-400 font-bold hover:underline">CONTACTER</button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={user.coach.image} alt={user.coach.name} className="w-14 h-14 rounded-xl object-cover border border-white/10" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{user.coach.name}</h3>
                      <p className="text-gray-400 text-xs">{user.coach.specialty}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs text-gray-400 mb-1">Prochain rendez-vous</p>
                    <p className="text-sm text-white font-bold">Lundi 22 Avril — 14:00</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Reserved Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="dark-card rounded-3xl p-8 border-white/5"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Séances Réservées</h3>
                <Link to="/schedule" className="text-sm text-brand-400 font-bold hover:underline flex items-center gap-1">
                  Réserver plus <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {user.reservedSessions.length > 0 ? (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {user.reservedSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex flex-col items-center justify-center border border-brand-500/20">
                            <span className="text-[10px] font-black text-brand-400 uppercase leading-none mb-1">
                              {new Date(session.date).toLocaleDateString('fr-FR', { month: 'short' }).substring(0, 3)}
                            </span>
                            <span className="text-lg font-black text-white leading-none">
                              {session.date.split('-')[2]}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white group-hover:text-brand-400 transition-colors">{session.courseName}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {session.time} ({session.duration})</span>
                              <span className="flex items-center gap-1"><UserIcon className="h-3.5 w-3.5" /> {session.coachName}</span>
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="p-2 rounded-lg bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                          title="Annuler la réservation"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                  <AlertCircle className="h-10 w-10 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Aucune séance réservée pour le moment.</p>
                  <Link to="/schedule" className="mt-4 inline-block text-brand-400 font-bold hover:underline">
                    Réserver un cours maintenant
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg dark-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Settings className="h-6 w-6 text-brand-500" />
                Modifier mon profil
              </h2>

              <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Nom Complet
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      {...register('fullName', { required: 'Le nom est requis' })}
                      className={`${inputClass(!!errors.fullName)} pl-11`}
                      placeholder="Alexandre Martin"
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'L\'email est requis',
                        pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                      })}
                      className={`${inputClass(!!errors.email)} pl-11`}
                      placeholder="alex@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="tel"
                      {...register('phone')}
                      className={`${inputClass(false)} pl-11`}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-6 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
