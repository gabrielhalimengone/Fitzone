import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2, LogIn, UserPlus, AlertCircle, ArrowLeft, CheckCircle2, Zap, Crown, Star, Dumbbell } from 'lucide-react';

interface AuthProps {
  mode?: 'login' | 'signup' | 'forgot';
}

const FloatingInput = ({ 
  icon: Icon, 
  label, 
  type, 
  name, 
  register, 
  rules, 
  error, 
  showPasswordToggle, 
  showPassword, 
  setShowPassword 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${isFocused || hasValue ? 'scale-75 -translate-y-9 -translate-x-2 text-brand-500' : 'text-dark-100'}`}>
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      
      <label className={`absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 font-black uppercase tracking-widest text-[10px] ${isFocused || hasValue ? 'opacity-0 scale-75 -translate-y-10' : 'text-dark-100 opacity-60'}`}>
        {label}
      </label>

      {/* Pulsing glow when focused */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-500/5 rounded-2xl blur-xl -z-10"
          />
        )}
      </AnimatePresence>

      <input
        type={type}
        {...register(name, { 
          ...rules,
          onChange: (e: any) => setHasValue(e.target.value.length > 0)
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`w-full pl-12 pr-12 py-5 bg-dark-800 border-2 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest outline-none transition-all duration-300 ${
          error ? 'border-red-500/50' : isFocused ? 'border-brand-500 shadow-lg shadow-brand-500/10' : 'border-dark-300 hover:border-dark-100'
        }`}
      />

      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-100 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}

      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black text-red-500 mt-2 ml-1 uppercase tracking-widest"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

const Auth: React.FC<AuthProps> = ({ mode: initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/profile';
  const initialPlan = (location.state as any)?.selectedPlan || 'starter';
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'elite'>(initialPlan);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
      setError(null);
      setSuccess(null);
    }
  }, [initialMode]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data: any) => {
    setError(null);
    setSuccess(null);
    try {
      if (mode === 'login') {
        await login(data.email, data.password);
        navigate(from, { replace: true });
      } else if (mode === 'signup') {
        const signupData = {
          ...data,
          plan: selectedPlan,
          fullName: `${data.firstName} ${data.lastName}`
        };
        await signup(signupData);
        navigate(from, { replace: true });
      } else if (mode === 'forgot') {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(`Un lien de réinitialisation a été envoyé à ${data.email}`);
        reset();
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-dark-400/20 rounded-full blur-[120px] -ml-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-500" />
          
          <div className="text-center mb-12">
             <div className="inline-flex p-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl mb-6">
                <Dumbbell className="h-8 w-8 text-brand-500" />
             </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
              {mode === 'login' && 'ACCÈS ÉLITE'}
              {mode === 'signup' && 'REJOINDRE LE CLUB'}
              {mode === 'forgot' && 'RÉCUPÉRATION'}
            </h1>
            <p className="text-[#BBBBBB] font-bold uppercase tracking-widest text-[10px]">
              {mode === 'login' && 'Connectez-vous pour continuer votre transformation.'}
              {mode === 'signup' && 'Commencez votre parcours vers l\'excellence.'}
              {mode === 'forgot' && 'Entrez votre email pour réinitialiser.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 text-red-500 text-[10px] font-black uppercase tracking-widest"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <p>{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput 
                      icon={User} 
                      label="PRÉNOM" 
                      name="firstName" 
                      register={register} 
                      rules={{ required: 'Requis' }} 
                      error={errors.firstName} 
                    />
                    <FloatingInput 
                      label="NOM" 
                      name="lastName" 
                      register={register} 
                      rules={{ required: 'Requis' }} 
                      error={errors.lastName} 
                    />
                  </div>
                  <FloatingInput 
                    icon={Phone} 
                    label="TÉLÉPHONE" 
                    name="phone" 
                    type="tel"
                    register={register} 
                    rules={{ required: 'Requis' }} 
                    error={errors.phone} 
                  />

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#BBBBBB] uppercase tracking-[0.2em] ml-1">SÉLECTIONNEZ VOTRE FORFAIT</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'starter', label: 'STARTER', icon: Star },
                        { id: 'pro', label: 'PRO', icon: Zap },
                        { id: 'elite', label: 'ELITE', icon: Crown }
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPlan(p.id as any)}
                          className={`flex flex-col items-center gap-3 py-5 rounded-2xl border-2 transition-all duration-300 ${
                            selectedPlan === p.id 
                              ? 'bg-brand-500/10 border-brand-500 text-white shadow-xl shadow-brand-500/20' 
                              : 'bg-dark-800 border-dark-300 text-dark-100 hover:border-dark-100'
                          }`}
                        >
                          <p.icon className={`h-5 w-5 ${selectedPlan === p.id ? 'text-brand-500' : 'text-dark-100'}`} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <FloatingInput 
              icon={Mail} 
              label="EMAIL" 
              name="email" 
              type="email"
              register={register} 
              rules={{ 
                required: 'Email requis',
                pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
              }} 
              error={errors.email} 
            />

            {mode !== 'forgot' && (
              <FloatingInput 
                icon={Lock} 
                label="MOT DE PASSE" 
                name="password" 
                type={showPassword ? 'text' : 'password'}
                register={register} 
                rules={{ 
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: '6 caractères minimum' }
                }} 
                error={errors.password}
                showPasswordToggle={true}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <Link to="/forgot-password" size="sm" className="text-[10px] text-brand-500 hover:text-brand-400 font-black uppercase tracking-widest transition-colors">
                  Oublié ?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-5 mt-4 flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-brand-500/30 group"
            >
              {isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">
                    {mode === 'login' && 'ACCÉDER'}
                    {mode === 'signup' && 'CONFIRMER'}
                    {mode === 'forgot' && 'ENVOYER'}
                  </span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-dark-300 text-center">
            {mode === 'forgot' ? (
              <Link
                to="/login"
                className="text-dark-100 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Retour
              </Link>
            ) : (
              <p className="text-dark-100 text-[10px] font-black uppercase tracking-[0.2em]">
                {mode === 'login' ? 'NOUVEAU ICI ?' : 'DÉJÀ MEMBRE ?'}
                <Link
                  to={mode === 'login' ? '/signup' : '/login'}
                  className="ml-3 text-brand-500 hover:text-brand-400 underline underline-offset-8 decoration-2"
                >
                  {mode === 'login' ? 'CRÉER UN COMPTE' : 'SE CONNECTER'}
                </Link>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
