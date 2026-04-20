import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

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
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log('Données du formulaire:', data);
    reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['123 Rue du Fitness', '75001 Paris, France'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+33 1 23 45 67 89', '+33 6 12 34 56 78'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@fitzone.fr', 'info@fitzone.fr'],
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun–Ven : 6h00 – 22h00', 'Sam–Dim : 8h00 – 20h00'],
      color: 'from-emerald-500 to-teal-500',
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
    `w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
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
            Contactez-<span className="text-gradient">Nous</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Une question ? Notre équipe est là pour vous accompagner dans votre parcours fitness.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="dark-card rounded-2xl p-5 group hover:border-white/15 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${info.color} mb-4 shadow-lg`}>
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-400 text-xs leading-relaxed">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Image / map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="dark-card rounded-3xl overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
                  alt="FitZone Gym"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-red-500" />
                <div className="absolute bottom-5 left-5">
                  <div className="glass rounded-xl px-4 py-3 border border-white/10 inline-block">
                    <p className="text-white font-bold text-sm">FitZone Paris</p>
                    <p className="text-gray-400 text-xs mt-0.5">Centre de fitness premium</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="relative rounded-3xl overflow-hidden p-8 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-red-700" />
              <div className="absolute inset-0 bg-noise opacity-20" />
              <div className="relative">
                <p className="text-white font-bold text-lg mb-1">Essai Gratuit de 7 Jours</p>
                <p className="text-white/70 text-sm mb-4">Aucun engagement, aucune carte de crédit.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm text-white/80">
                  {['Accès illimité', 'Coach inclus', 'Annulation gratuite'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-white/60" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="dark-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Envoyez-nous un Message</h2>
            <p className="text-gray-400 text-sm mb-8">Nous vous répondrons dans les plus brefs délais.</p>

            {isSubmitSuccessful ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                  <CheckCircle className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message envoyé !</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', {
                        required: 'Prénom requis',
                        minLength: { value: 2, message: '2 caractères minimum' },
                      })}
                      className={inputClass(!!errors.firstName)}
                      placeholder="Jean"
                    />
                    {errors.firstName && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', {
                        required: 'Nom requis',
                        minLength: { value: 2, message: '2 caractères minimum' },
                      })}
                      className={inputClass(!!errors.lastName)}
                      placeholder="Dupont"
                    />
                    {errors.lastName && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide',
                      },
                    })}
                    className={inputClass(!!errors.email)}
                    placeholder="jean.dupont@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      pattern: {
                        value: /^(?:\+33|0)[1-9](?:[.\-\s]?\d{2}){4}$/,
                        message: 'Numéro de téléphone invalide',
                      },
                    })}
                    className={inputClass(!!errors.phone)}
                    placeholder="06 12 34 56 78"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: 'Veuillez sélectionner un sujet' })}
                    className={`${inputClass(!!errors.subject)} appearance-none cursor-pointer`}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value} className="bg-dark-800 text-white">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Le message est requis',
                      minLength: { value: 10, message: '10 caractères minimum' },
                    })}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder="Décrivez votre demande..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Newsletter checkbox */}
                <div className="flex items-center gap-3 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="newsletter"
                      {...register('newsletter')}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="newsletter"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-md border border-white/15 bg-white/5 peer-checked:bg-brand-500 peer-checked:border-brand-500 flex items-center justify-center transition-all duration-200">
                        <CheckCircle className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
                      </div>
                    </label>
                  </div>
                  <label htmlFor="newsletter" className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                    Je souhaite recevoir les actualités et offres spéciales de FitZone
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Envoyer le Message
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