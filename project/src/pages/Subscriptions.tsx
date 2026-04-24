import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle, CheckCircle2, Send, Zap, Crown, Star, ShieldCheck, CreditCard, User as UserIcon, AlertCircle, Calendar, MessageSquare, X } from 'lucide-react';
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
  const [activeOffer, setActiveOffer] = useState<'trial' | 'consultation' | null>(null);
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
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

  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const plans = [
    {
      id: 'starter',
      name: 'Premiers Pas',
      price: '29',
      description: "Tout ce qu'il vous faut pour démarrer sereinement, sans prise de tête.",
      icon: Star,
      color: 'from-dark-300 to-dark-400',
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
      description: 'Le bon équilibre entre engagement et résultats. Le choix de la plupart de nos membres.',
      icon: Zap,
      color: 'from-brand-500 to-brand-600',
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
      name: 'Sur-Mesure',
      price: '89',
      description: 'Un suivi personnalisé, une attention particulière. Pour ceux qui veulent vraiment être accompagnés.',
      icon: Crown,
      color: 'from-dark-300 to-dark-400',
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
    if (isAuthenticated) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      updatePlan(data.plan as 'starter' | 'pro' | 'elite');
    } else {
      // Pour les non-connectés, on enregistre ça comme une demande de contact/lead
      const apiModule = await import('../services/api');
      await apiModule.api.submitContactForm({
        ...data,
        type: 'subscription_request',
        subject: `Demande d'abonnement : ${data.plan}`
      });
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      type: activeOffer === 'trial' ? 'seance_decouverte' : 'bilan_forme'
    };

    const apiModule = await import('../services/api');
    await apiModule.api.submitContactForm({
      ...data,
      subject: activeOffer === 'trial' ? 'Demande de Séance Découverte' : 'Demande de Bilan Forme'
    });

    setIsOfferSubmitted(true);
    setTimeout(() => {
      setIsOfferSubmitted(false);
      setActiveOffer(null);
    }, 3000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-dark-500 border rounded-xl text-white placeholder-dark-100 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-dark-200 hover:border-dark-300'
    }`;

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg" 
            alt="FitZone Subscriptions Hero" 
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
            Nos <span className="text-brand-500">Formules</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.2em] text-[10px]">
            Trouvez la formule qui correspond à votre rythme et vos envies.
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
            Déjà membre ? Connectez-vous pour retrouver votre abonnement directement sur votre compte.
          </motion.div>
        )}

        {/* Welcome Offers Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-brand-500 transition-all cursor-pointer"
            onClick={() => setActiveOffer('trial')}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center border border-brand-500/20 group-hover:bg-brand-500 transition-all">
                <Calendar className="h-6 w-6 text-brand-500 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Séance découverte</h3>
                <p className="text-dark-100 text-sm font-bold uppercase tracking-widest">Venez essayer, la première est pour nous.</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-dark-100 group-hover:text-brand-500 transform group-hover:translate-x-1 transition-all" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-brand-500 transition-all cursor-pointer"
            onClick={() => setActiveOffer('consultation')}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center border border-brand-500/20 group-hover:bg-brand-500 transition-all">
                <MessageSquare className="h-6 w-6 text-brand-500 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Votre bilan offert</h3>
                <p className="text-dark-100 text-sm font-bold uppercase tracking-widest">On prend le temps de vous connaître avant de vous proposer quoi que ce soit.</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-dark-100 group-hover:text-brand-500 transform group-hover:translate-x-1 transition-all" />
          </motion.div>
        </div>

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
                className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 group ${
                  plan.popular 
                    ? 'bg-dark-800 border-2 border-brand-500 scale-105 z-10 shadow-2xl shadow-brand-500/10' 
                    : 'bg-dark-800 border border-dark-300 hover:border-brand-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-brand-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-brand-500/40">
                      Plus Populaire
                    </div>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded border border-emerald-500/30 uppercase tracking-widest">
                      ACTUEL
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-dark-700 border border-dark-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="h-8 w-8 text-brand-500" />
                </div>

                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{plan.name}</h3>
                <p className="text-dark-100 text-sm mb-8 font-medium leading-relaxed">{plan.description}</p>

                <div className="flex items-baseline mb-8">
                  <span className="text-6xl font-black text-white tracking-tighter">{plan.price}€</span>
                  <span className="text-dark-100 font-bold ml-2 uppercase tracking-widest text-xs">/mois</span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-lg bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                        <Check className="h-3 w-3 text-brand-500" />
                      </div>
                      <span className="text-white text-sm font-bold tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      handleSelectPlan(plan.id);
                    } else {
                      navigate('/signup', { state: { selectedPlan: plan.id } });
                    }
                  }}
                  disabled={isCurrentPlan}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                    isCurrentPlan
                      ? 'bg-dark-700 text-dark-100 border border-dark-400 cursor-default'
                      : plan.popular
                        ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-xl shadow-brand-500/20'
                        : 'bg-dark-700 text-white border border-dark-400 hover:border-brand-500'
                  }`}
                >
                  {isCurrentPlan ? 'Votre forfait' : 'Sélectionner'}
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
            className="max-w-5xl mx-auto bg-dark-800 rounded-[3rem] overflow-hidden shadow-2xl border border-dark-300"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-brand-500 p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-20" />
                <div className="relative z-10 h-full flex flex-col">
                  <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-none">
                    {isAuthenticated ? 'Se transformer' : 'Rejoindre'}
                  </h2>
                  <p className="text-white font-bold mb-12 leading-relaxed opacity-90">
                    {isAuthenticated 
                      ? 'Simple et rapide, votre accès change en un instant.'
                      : 'Atteignez vos sommets avec la communauté FitZone.'}
                  </p>
                  
                  <div className="mt-auto space-y-8">
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="h-8 w-8 text-white" />
                      <p className="font-black text-[10px] uppercase tracking-[0.2em]">Paiement Sécurisé</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-white" />
                      <p className="font-black text-[10px] uppercase tracking-[0.2em]">Sans Engagement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-12 lg:p-16">
                {isSubmitSuccessful ? (
                  <div className="text-center py-10">
                    <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-8" />
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                      {isAuthenticated ? "C'est validé !" : "Demande reçue !"}
                    </h3>
                    <p className="text-dark-100 font-bold mb-10 uppercase tracking-widest text-xs">
                      {isAuthenticated 
                        ? `Forfait ${plans.find(p => p.id === selectedPlan)?.name} activé.` 
                        : "On vous recontacte très vite pour finaliser votre inscription."}
                    </p>
                    <button 
                      onClick={() => navigate(isAuthenticated ? '/profile' : '/signup', { state: { selectedPlan: plan.id } })} 
                      className="btn-primary w-full max-w-xs uppercase tracking-widest text-xs font-black"
                    >
                      {isAuthenticated ? 'Mon Profil' : 'Créer mon compte'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-dark-100 uppercase tracking-widest ml-1">Nom Complet</label>
                        <input type="text" {...register('fullName', { required: true })} className={inputClass(!!errors.fullName)} placeholder="Jean Dupont" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-dark-100 uppercase tracking-widest ml-1">Téléphone</label>
                        <input type="tel" {...register('phone', { required: true })} className={inputClass(!!errors.phone)} placeholder="06 12 34 56 78" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-dark-100 uppercase tracking-widest ml-1">Email</label>
                      <input type="email" {...register('email', { required: true })} className={inputClass(!!errors.email)} placeholder="jean@example.com" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-dark-100 uppercase tracking-widest ml-1 text-center block">Quel forfait vous correspond ?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {plans.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => { setSelectedPlan(p.id); setValue('plan', p.id); }}
                            className={`py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                              selectedPlan === p.id ? 'bg-brand-500 border-brand-500 text-white' : 'bg-dark-700 border-dark-400 text-dark-100'
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Méthode de paiement simulée */}
                    <div className="space-y-6 pt-6 border-t border-dark-400">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                        <p className="text-[10px] font-bold text-amber-200 uppercase tracking-widest leading-relaxed">
                          <span className="text-amber-500">Attention :</span> Ceci est une version de test. Ne saisissez aucune information bancaire réelle.
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-dark-100 uppercase tracking-widest ml-1">Mode de paiement</label>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setPaymentMethod('card')} className={`p-2 rounded-lg border transition-all ${paymentMethod === 'card' ? 'bg-brand-500/10 border-brand-500 text-brand-500' : 'bg-dark-700 border-dark-400 text-dark-100'}`}>
                            <CreditCard className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => setPaymentMethod('paypal')} className={`p-2 rounded-lg border transition-all ${paymentMethod === 'paypal' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'bg-dark-700 border-dark-400 text-dark-100'}`}>
                            <Send className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => setPaymentMethod('apple')} className={`p-2 rounded-lg border transition-all ${paymentMethod === 'apple' ? 'bg-white/10 border-white text-white' : 'bg-dark-700 border-dark-400 text-dark-100'}`}>
                            <Zap className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {paymentMethod === 'card' ? (
                          <motion.div
                            key="card-fields"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div className="relative">
                              <input type="text" placeholder="NUMÉRO DE CARTE" className="w-full px-4 py-3.5 bg-dark-500 border border-dark-200 rounded-xl text-white placeholder-dark-100 text-xs font-black tracking-[0.2em]" />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                <div className="w-8 h-5 bg-dark-400 rounded" />
                                <div className="w-8 h-5 bg-dark-400 rounded" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="MM/AA" className="w-full px-4 py-3.5 bg-dark-500 border border-dark-200 rounded-xl text-white placeholder-dark-100 text-xs font-black tracking-[0.2em]" />
                              <input type="text" placeholder="CVV" className="w-full px-4 py-3.5 bg-dark-500 border border-dark-200 rounded-xl text-white placeholder-dark-100 text-xs font-black tracking-[0.2em]" />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="other-method"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-dark-700/50 border border-dark-400 rounded-xl p-4 text-center"
                          >
                            <p className="text-dark-100 text-[10px] font-black uppercase tracking-widest">
                              Vous allez être redirigé vers {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} pour confirmer.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand-500 hover:bg-brand-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-500/20 mt-8">
                      {isSubmitting ? 'Traitement...' : 'Confirmer'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Offer Modal */}
      <AnimatePresence>
        {activeOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-sm p-4"
          >
            <div className="absolute inset-0" onClick={() => setActiveOffer(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-dark-800 border border-dark-300 rounded-[3rem] p-10 shadow-2xl"
            >
              <button onClick={() => setActiveOffer(null)} className="absolute top-8 right-8 text-dark-100 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>

              {isOfferSubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-20 w-20 text-emerald-500 mx-auto mb-8" />
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Demande Reçue</h3>
                  <p className="text-dark-100 font-bold uppercase tracking-widest text-xs">On vous rappelle sous 24h !</p>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">
                    {activeOffer === 'trial' ? 'Essai Gratuit' : 'Bilan Forme'}
                  </h2>
                  <p className="text-dark-100 mb-10 font-bold uppercase tracking-widest text-[10px]">Démarrez sans engagement</p>

                  <form onSubmit={handleOfferSubmit} className="space-y-6">
                    <input required name="fullName" type="text" placeholder="NOM COMPLET" className="w-full px-5 py-4 bg-dark-500 border border-dark-200 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all font-black text-[10px] uppercase tracking-widest placeholder-dark-100" />
                    <input required name="email" type="email" placeholder="EMAIL" className="w-full px-5 py-4 bg-dark-500 border border-dark-200 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all font-black text-[10px] uppercase tracking-widest placeholder-dark-100" />
                    <input required name="phone" type="tel" placeholder="TÉLÉPHONE" className="w-full px-5 py-4 bg-dark-500 border border-dark-200 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all font-black text-[10px] uppercase tracking-widest placeholder-dark-100" />
                    <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] mt-4">Confirmer ma demande</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Subscriptions;
