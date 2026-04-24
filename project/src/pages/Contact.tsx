import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await api.submitContactForm(data);
    if (data.newsletter) {
      api.subscribeNewsletter(data.email);
    }
    reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['123 Rue du Fitness', '75001 Paris, France'],
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+33 1 23 45 67 89', '+33 6 12 34 56 78'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@fitzone.fr', 'info@fitzone.fr'],
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun–Ven : 6h00 – 22h00', 'Sam–Dim : 8h00 – 20h00'],
    },
  ];

  const subjects = [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'information', label: "Demande d'information" },
    { value: 'trial', label: 'Essai gratuit' },
    { value: 'membership', label: 'Abonnement' },
    { value: 'coaching', label: 'Coaching personnel' },
    { value: 'other', label: 'Autre' },
  ];

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-dark-500 border rounded-xl text-white placeholder-gray-500 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
      hasError ? 'border-red-500/50 bg-red-500/5' : 'border-dark-200 hover:border-dark-300'
    }`;

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Hero Header with Background Image */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg" 
            alt="FitZone Contact Hero" 
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
            Contactez-<span className="text-brand-500">Nous</span>
          </h1>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest text-xs">
            Une question ? Notre équipe est là pour vous accompagner.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-2xl p-6 group hover:border-brand-500 transition-all duration-300 shadow-xl"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-dark-900/50 group-hover:scale-110 transition-transform">
                    <info.icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="font-black text-white text-sm mb-3 uppercase tracking-widest">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-[#BBBBBB] text-xs font-bold leading-relaxed">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Simple Map Placeholder / Bottom Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-3xl overflow-hidden p-2"
            >
              <div className="relative h-72 rounded-[1.4rem] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
                  alt="FitZone Gym Interior"
                  className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-dark-900/90 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10">
                    <p className="text-white font-black text-sm uppercase tracking-tight">FitZone Paris</p>
                    <p className="text-brand-500 font-black text-[10px] uppercase tracking-widest mt-1">Siège Social & Club Elite</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#161616] border border-[#3A3A3A] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Mail className="w-32 h-32 text-white" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter leading-none">Envoyez un Message</h2>
            <p className="text-[#BBBBBB] text-sm font-bold uppercase tracking-widest mb-10">Réponse garantie sous 24h.</p>

            {isSubmitSuccessful ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
                  <CheckCircle className="h-10 w-10 text-brand-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">C'est Partit !</h3>
                <p className="text-[#BBBBBB] max-w-sm mx-auto mb-8 font-medium">
                  Votre message a été transmis à notre équipe d'experts.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-dark-800 border border-dark-400 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:border-brand-500 transition-all"
                >
                  Nouveau Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-[10px] font-black text-dark-100 uppercase tracking-[0.2em] ml-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', {
                        required: 'Prénom requis',
                      })}
                      className={inputClass(!!errors.firstName)}
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-[10px] font-black text-dark-100 uppercase tracking-[0.2em] ml-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', {
                        required: 'Nom requis',
                      })}
                      className={inputClass(!!errors.lastName)}
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-black text-dark-100 uppercase tracking-[0.2em] ml-1">
                    Email Pro ou Perso
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: true,
                    })}
                    className={inputClass(!!errors.email)}
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-[10px] font-black text-dark-100 uppercase tracking-[0.2em] ml-1">
                    Sujet de la demande
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: true })}
                    className={`${inputClass(!!errors.subject)} appearance-none cursor-pointer`}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value} className="bg-dark-900 text-white">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[10px] font-black text-dark-100 uppercase tracking-[0.2em] ml-1">
                    Votre Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', {
                      required: true,
                    })}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-brand-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Envoyer
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;