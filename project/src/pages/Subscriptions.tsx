import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle, Send, Zap, Crown, Star, ShieldCheck, CreditCard, User as UserIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SubscriptionFormData {
  plan: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: 'card' | 'paypal' | 'transfer';
  termsAccepted: boolean;
}

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const { user, updatePlan, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SubscriptionFormData>({
    defaultValues: {
      plan: 'pro',
      paymentMethod: 'card',
      fullName: user?.fullName || '',
      email: user?.email || '',
    }
  });

  // Update form if user data changes
  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const plans = [
    {
      id: 'starter',
      name: 'Débutant',
      price: '29',
      description: 'Idéal pour commencer votre transformation physique.',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Accès à la salle 7j/7',
        'Vestiaires et douches',
        '1 Cours collectif / semaine',
        'Application mobile FitZone',
        'Sans engagement'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '49',
      description: 'Le choix le plus populaire pour des résultats rapides.',
      icon: Zap,
      color: 'from-brand-500 to-red-500',
      popular: true,
      features: [
        'Accès illimité 24h/24',
        'Tous les cours collectifs',
        'Bilan forme mensuel',
        'Accès à l\'espace Spa',
        'Programme personnalisé',
        'Invité gratuit (1x / mois)'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '89',
      description: 'L\'expérience ultime avec un accompagnement VIP.',
      icon: Crown,
      color: 'from-purple-500 to-indigo-500',
      features: [
        'Tout le forfait Pro',
        '2 Séances Coach Personnel / mois',
        'Suivi nutritionnel complet',
        'Accès VIP Lounge',
        'Serviettes fournies',
        'Boissons ionisées illimitées'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setValue('plan', planId);
    document.getElementById('subscription-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: SubscriptionFormData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isAuthenticated) {
      updatePlan(data.plan as 'starter' | 'pro' | 'elite');
    } else {
      // In a real app, we would create the account here or redirect to signup
      console.log('Nouvelle souscription (non connecté):', data);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-white mb-4">
            Choisissez votre <span className="text-gradient">Forfait</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à vos objectifs et à votre budget.
          </p>
          {!isAuthenticated && (
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 text-amber-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              Connectez-vous pour lier cet abonnement à votre compte existant.
            </div>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => {
            const isCurrentPlan = user?.plan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl transition-all duration-500 group ${
                  plan.popular 
                    ? 'bg-white/5 border-2 border-brand-500/50 scale-105 z-10' 
                    : 'dark-card border-white/5 hover:border-white/15'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-brand-500/40">
                      Plus Populaire
                    </div>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/30">
                      ACTUEL
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-black text-white">{plan.price}€</span>
                  <span className="text-gray-400 ml-2">/mois</span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isCurrentPlan
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                      : plan.popular
                        ? 'btn-primary'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-dark-900'
                  }`}
                >
                  {isCurrentPlan ? 'Votre forfait actuel' : 'Sélectionner ce forfait'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Subscription Form Section */}
        <div id="subscription-form" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto dark-card rounded-[2.5rem] overflow-hidden shadow-2xl border-white/5"
          >
            <div className="flex flex-col md:flex-row">
              {/* Form Info Side */}
              <div className="md:w-1/3 bg-gradient-to-br from-brand-600 to-red-600 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-20" />
                <div className="relative z-10 h-full flex flex-col">
                  <h2 className="text-3xl font-black mb-6 leading-tight">
                    {isAuthenticated ? 'Changer de forfait' : 'Finalisez votre inscription'}
                  </h2>
                  <p className="text-white/80 mb-10 leading-relaxed">
                    {isAuthenticated 
                      ? 'Mettez à jour votre abonnement en quelques secondes. Vos nouvelles fonctionnalités seront actives immédiatement.'
                      : 'Vous êtes à quelques clics de rejoindre la communauté FitZone et d\'atteindre vos objectifs.'}
                  </p>
                  
                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase">Paiement Sécurisé</p>
                        <p className="text-xs text-white/60">SSL 256-bit crypté</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase">Sans Engagement</p>
                        <p className="text-xs text-white/60">Annulez à tout moment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="md:w-2/3 p-10 md:p-12">
                {isSubmitSuccessful ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      >
                        <CheckCircle className="h-12 w-12 text-emerald-400" />
                      </motion.div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {isAuthenticated ? 'Forfait mis à jour !' : 'Bienvenue chez FitZone !'}
                    </h3>
                    <p className="text-gray-400 max-w-sm mb-10">
                      Votre {isAuthenticated ? 'changement pour le' : 'souscription au'} forfait <span className="text-brand-400 font-bold uppercase">{plans.find(p => p.id === selectedPlan)?.name}</span> a été validée avec succès. 
                      Un email de confirmation vous a été envoyé.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => navigate('/profile')}
                        className="btn-primary px-10"
                      >
                        Voir mon profil
                      </button>
                      <button 
                        onClick={() => reset()}
                        className="btn-outline px-10"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-brand-500" />
                        Informations Personnelles
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">
                            Nom Complet *
                          </label>
                          <input
                            type="text"
                            {...register('fullName', { required: 'Le nom est requis' })}
                            className={inputClass(!!errors.fullName)}
                            placeholder="Alexandre Martin"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">
                            Téléphone *
                          </label>
                          <input
                            type="tel"
                            {...register('phone', { required: 'Le téléphone est requis' })}
                            className={inputClass(!!errors.phone)}
                            placeholder="06 12 34 56 78"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'L\'email est requis',
                            pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                          })}
                          className={inputClass(!!errors.email)}
                          placeholder="alex@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-brand-500" />
                        Choix du Forfait
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {plans.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setSelectedPlan(p.id);
                              setValue('plan', p.id);
                            }}
                            className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                              selectedPlan === p.id
                                ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="relative flex items-center mt-1">
                          <input
                            type="checkbox"
                            id="terms"
                            {...register('termsAccepted', { required: true })}
                            className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                          />
                          <div className="h-5 w-5 border border-white/20 rounded bg-white/5 flex items-center justify-center peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-all duration-200">
                            <Check className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
                          </div>
                        </div>
                        <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                          J'accepte les <span className="text-white underline underline-offset-4 decoration-brand-500/50">conditions générales de vente</span> et le règlement intérieur du club.
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedPlan}
                        className="w-full btn-primary py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Traitement en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            {isAuthenticated ? 'Mettre à jour mon forfait' : 'Confirmer ma Souscription'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
