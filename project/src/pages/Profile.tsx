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
    { label: 'Séances réservées', value: user.reservedSessions.length.toString(), icon: Dumbbell, color: 'text-brand-500' },
    { label: 'Minutes prévues', value: (user.reservedSessions.length * 45).toString(), icon: Clock, color: 'text-brand-500' },
    { label: 'Niveau Forfait', value: user.plan.toUpperCase(), icon: CheckCircle2, color: 'text-brand-500' },
  ];

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-dark-500 border rounded-xl text-white placeholder-dark-100 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-dark-200 hover:border-dark-300'
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
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter leading-none">
              Salut, <span className="text-brand-500">{user.fullName.split(' ')[0]}</span>
            </h1>
            <p className="text-dark-100 font-bold uppercase tracking-widest text-xs">Tableau de bord membre FitZone</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button 
              onClick={() => { reset(); setIsEditing(true); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800 border border-dark-300 text-white hover:bg-brand-500 hover:border-brand-500 transition-all font-black text-xs uppercase tracking-widest"
            >
              <Settings className="h-4 w-4" />
              Modifier
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800 border border-dark-300 text-red-500 hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest"
            >
              <LogOut className="h-4 w-4" />
              Quitter
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
              className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-brand-500 flex items-center justify-center text-3xl font-black text-white mb-6 shadow-xl shadow-brand-500/20">
                  {user.fullName.charAt(0)}
                </div>
                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{user.fullName}</h2>
                <p className="text-dark-100 text-sm mb-6 font-medium">{user.email}</p>
                
                <div className="space-y-4 pt-6 border-t border-dark-400">
                  <div className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest">
                    <Calendar className="h-4 w-4 text-brand-500" />
                    Depuis {user.joinDate}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest">
                    <MapPin className="h-4 w-4 text-brand-500" />
                    Paris Centre
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
                  className="bg-dark-800 border border-dark-300 rounded-2xl p-5 flex items-center gap-5"
                >
                  <div className={`p-3 rounded-xl bg-dark-700`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-dark-100 uppercase tracking-widest font-black mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle & Right Column — Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subscription Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-dark-700 border border-dark-400">
                  <CreditCard className="h-6 w-6 text-brand-500" />
                </div>
                <span className="px-4 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black tracking-widest uppercase">ABONNÉ</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">Forfait {user.plan}</h3>
              <p className="text-dark-100 font-bold text-sm mb-8">Votre accès illimité à toutes les zones FitZone.</p>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-dark-100 font-black uppercase tracking-widest">Renouvellement</span>
                  <span className="text-sm text-white font-black">{user.nextBillingDate}</span>
                </div>
                <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden p-0.5">
                  <div className="w-[75%] h-full bg-brand-500 rounded-full" />
                </div>
              </div>
              
              <Link 
                to="/subscriptions"
                className="inline-block px-8 py-4 rounded-xl bg-white text-dark-900 text-xs font-black uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all"
              >
                Gérer Forfait
              </Link>
            </motion.div>

            {/* Reserved Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vos Prochaines Séances</h3>
                <Link to="/schedule" className="text-xs text-brand-500 font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                  Plus <ChevronRight className="h-4 w-4" />
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
                        className="flex items-center justify-between p-6 rounded-2xl bg-dark-700 border border-dark-400 hover:border-brand-500 transition-all group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex flex-col items-center justify-center shadow-lg shadow-brand-500/10">
                            <span className="text-[10px] font-black text-white/80 uppercase leading-none mb-1">
                              {new Date(session.date).toLocaleDateString('fr-FR', { month: 'short' }).substring(0, 3)}
                            </span>
                            <span className="text-xl font-black text-white leading-none">
                              {session.date.split('-')[2]}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-black text-white text-lg uppercase tracking-tight">{session.courseName}</h4>
                            <div className="flex items-center gap-4 mt-1">
                               <span className="flex items-center gap-1.5 text-[10px] font-bold text-dark-100 uppercase tracking-widest"><Clock className="h-3.5 w-3.5" /> {session.time}</span>
                               <span className="flex items-center gap-1.5 text-[10px] font-bold text-dark-100 uppercase tracking-widest"><UserIcon className="h-3.5 w-3.5" /> {session.coachName}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleCancelSession(session.id)}
                          className="p-3 rounded-xl bg-dark-600 text-dark-100 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-dark-400 rounded-[2rem]">
                  <AlertCircle className="h-12 w-12 text-dark-300 mx-auto mb-4" />
                  <p className="text-dark-100 font-bold uppercase tracking-widest text-xs mb-6">Aucune séance réservée</p>
                  <Link to="/schedule" className="btn-primary px-8 py-3 text-xs uppercase tracking-widest">
                    Réserver maintenant
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
              className="absolute inset-0 bg-dark-900/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 text-dark-100 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter">Modifier Profil</h2>

              <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-dark-100 uppercase tracking-widest ml-1">Nom Complet</label>
                  <input type="text" {...register('fullName', { required: true })} className={inputClass(!!errors.fullName)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-dark-100 uppercase tracking-widest ml-1">Email</label>
                  <input type="email" {...register('email', { required: true })} className={inputClass(!!errors.email)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-dark-100 uppercase tracking-widest ml-1">Téléphone</label>
                  <input type="tel" {...register('phone')} className={inputClass(false)} />
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 px-6 py-4 rounded-xl border border-dark-400 text-white font-black text-xs uppercase tracking-widest hover:bg-dark-700">Annuler</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-brand-600 transition-all">Enregistrer</button>
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
