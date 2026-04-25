import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, User } from 'lucide-react';
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

const FloatingInput = ({ 
  label, 
  type = 'text', 
  name, 
  register, 
  rules, 
  error,
  isTextArea = false
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const Component = isTextArea ? 'textarea' : 'input';

  return (
    <div className="relative group">
      <label className={`absolute left-4 transition-all duration-300 font-black uppercase tracking-widest text-[10px] pointer-events-none z-10 ${
        isFocused || hasValue 
          ? 'top-0 -translate-y-1/2 scale-90 text-brand-500 opacity-100 bg-dark-900 px-2 ml-2' 
          : 'top-1/2 -translate-y-1/2 text-dark-100 opacity-60'
      } ${isTextArea && !isFocused && !hasValue ? 'top-6' : ''}`}>
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

      <Component
        type={type}
        rows={isTextArea ? 4 : undefined}
        {...register(name, { 
          ...rules,
          onChange: (e: any) => setHasValue(e.target.value.length > 0)
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: any) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`w-full px-5 py-5 bg-dark-500 border-2 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest outline-none transition-all duration-300 ${
          error ? 'border-red-500/50' : isFocused ? 'border-brand-500 shadow-lg shadow-brand-500/10' : 'border-dark-200 hover:border-dark-100'
        } ${isTextArea ? 'resize-none' : ''}`}
      />

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
    { icon: MapPin, title: 'Adresse', details: ['123 Rue du Fitness', '75001 Paris, France'] },
    { icon: Phone, title: 'Téléphone', details: ['+33 1 23 45 67 89', '+33 6 12 34 56 78'] },
    { icon: Mail, title: 'Email', details: ['contact@fitzone.fr', 'info@fitzone.fr'] },
    { icon: Clock, title: 'Horaires', details: ['Lun–Ven : 6h00 – 22h00', 'Sam–Dim : 8h00 – 20h00'] },
  ];

  const subjects = [
    { value: '', label: 'SÉLECTIONNEZ UN SUJET' },
    { value: 'information', label: "DEMANDE D'INFORMATION" },
    { value: 'trial', label: 'ESSAI GRATUIT' },
    { value: 'membership', label: 'ABONNEMENT' },
    { value: 'coaching', label: 'COACHING PERSONNEL' },
    { value: 'other', label: 'AUTRE' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-12">
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
           <div className="text-brand-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Contact Élite</div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Parlons <br />
            <span className="text-brand-500">Performance</span>
          </h1>
          <p className="text-[#BBBBBB] max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-widest text-[10px] opacity-70">
            Une question ? Notre équipe est prête à vous accompagner.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-3xl p-6 group hover:border-brand-500 transition-all duration-500 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-dark-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <info.icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="font-black text-white text-[10px] mb-4 uppercase tracking-[0.2em]">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-[#BBBBBB] text-[11px] font-black uppercase tracking-widest opacity-60">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-80 rounded-[3rem] overflow-hidden border border-dark-300 shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
                alt="Gym Interior"
                className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-dark-900/90 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/10 shadow-2xl">
                   <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                      <p className="text-white font-black text-[11px] uppercase tracking-widest">FitZone Paris</p>
                   </div>
                  <p className="text-brand-500 font-black text-[9px] uppercase tracking-[0.2em] opacity-80">Siège Social & Club Elite</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-[#161616] border border-[#3A3A3A] rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <Mail className="w-48 h-48 text-white" />
            </div>
            
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Écrivez-nous</h2>
            <p className="text-[#BBBBBB] text-[10px] font-black uppercase tracking-widest mb-12 opacity-60">Réponse garantie sous 24h par notre équipe élite.</p>

            {isSubmitSuccessful ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/10">
                  <CheckCircle className="h-12 w-12 text-brand-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Transmission Réussie</h3>
                <p className="text-[#BBBBBB] font-black text-[11px] uppercase tracking-widest mb-10 opacity-60">
                  Votre demande est entre les mains de nos experts.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-primary px-12 py-5 rounded-2xl text-[11px]"
                >
                  Nouveau Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FloatingInput label="PRÉNOM" name="firstName" register={register} rules={{ required: 'Requis' }} error={errors.firstName} />
                  <FloatingInput label="NOM" name="lastName" register={register} rules={{ required: 'Requis' }} error={errors.lastName} />
                </div>

                <FloatingInput label="VOTRE EMAIL" name="email" type="email" register={register} rules={{ required: 'Email requis' }} error={errors.email} />

                <div className="relative group">
                   <select
                    {...register('subject', { required: true })}
                    className="w-full px-5 py-5 bg-dark-500 border-2 border-dark-200 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest outline-none transition-all duration-300 hover:border-dark-100 focus:border-brand-500 appearance-none cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value} className="bg-dark-900 text-white">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-dark-100 group-hover:text-white transition-colors">
                     <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>

                <FloatingInput label="MESSAGE" name="message" isTextArea={true} register={register} rules={{ required: 'Message requis' }} error={errors.message} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-6 mt-6 flex items-center justify-center gap-4 shadow-2xl shadow-brand-500/20 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-[0.3em]">Envoyer le Message</span>
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

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default Contact;