import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2, LogIn, UserPlus, AlertCircle } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/profile';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        // Map firstName/lastName to fullName for the DB
        const signupData = {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`
        };
        await signup(signupData);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      console.error(err);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-11 pr-11 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <div className="min-h-[calc(100-80px)] flex items-center justify-center py-20 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="dark-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/5">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white mb-3">
              {isLogin ? 'Bon retour !' : 'Rejoignez-nous'}
            </h1>
            <p className="text-gray-400">
              {isLogin 
                ? 'Connectez-vous pour accéder à votre espace.' 
                : 'Commencez votre transformation dès aujourd\'hui.'}
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Prénom"
                        {...register('firstName', { required: !isLogin })}
                        className={inputClass(!!errors.firstName)}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nom"
                        {...register('lastName', { required: !isLogin })}
                        className={inputClass(!!errors.lastName)}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      {...register('phone', { required: !isLogin })}
                      className={inputClass(!!errors.phone)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register('email', { 
                  required: 'Email requis',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                })}
                className={inputClass(!!errors.email)}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.email.message as string}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                {...register('password', { 
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: '6 caractères minimum' }
                })}
                className={inputClass(!!errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.password.message as string}</p>}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                  {isLogin ? 'Se Connecter' : 'Créer un Compte'}
                </>
              )}
            </button>
          </form>

          {/* Switch */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-brand-400 hover:text-brand-300 font-bold underline underline-offset-4"
              >
                {isLogin ? 'S\'inscrire' : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
