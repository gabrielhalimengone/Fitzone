import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      api.subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Cours', path: '/courses' },
    { name: 'Planning', path: '/schedule' },
    { name: 'Équipe', path: '/team' },
    { name: 'Abonnements', path: '/subscriptions' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Musculation Force',
    'Cardio Training',
    'CrossFit Élite',
    'Coaching Personnel',
    'Nutrition Sportive',
    'HIIT Bootcamp',
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-300 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* Brand & Social */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center space-x-4 mb-8 group">
              <div className="relative bg-brand-500 p-3 rounded-2xl shadow-xl shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-black text-3xl text-white uppercase tracking-tighter">
                Fit<span className="text-brand-500">Zone</span>
              </span>
            </Link>
            <p className="text-[#BBBBBB] mb-10 leading-relaxed font-bold uppercase tracking-widest text-[11px] max-w-sm">
              L'excellence n'est pas un acte, mais une habitude. 
              <br />Rejoignez le club de fitness le plus exclusif et transformez votre vision en réalité.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-dark-800 border border-dark-300 flex items-center justify-center text-dark-100 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all duration-300 group"
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 flex items-center gap-2">
                 <span className="w-4 h-0.5 bg-brand-500 rounded-full" />
                 Navigation
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[#BBBBBB] hover:text-brand-500 text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 flex items-center gap-2">
                 <span className="w-4 h-0.5 bg-brand-500 rounded-full" />
                 Services
              </h3>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service} className="text-[#BBBBBB] text-[11px] font-black uppercase tracking-widest opacity-60">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
               <div>
                  <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-brand-500 rounded-full" />
                    Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[#BBBBBB] text-[11px] font-black uppercase tracking-widest">
                      <Mail className="h-4 w-4 text-brand-500" />
                      contact@fitzone.fr
                    </div>
                    <div className="flex items-center gap-4 text-[#BBBBBB] text-[11px] font-black uppercase tracking-widest">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      75001 Paris, France
                    </div>
                  </div>
               </div>
               
               <div className="p-6 bg-dark-800 border border-dark-300 rounded-[2rem] shadow-xl">
                  <div className="text-brand-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">Horaires Élite</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-white uppercase tracking-tight">
                       <span className="opacity-60">Lundi - Vendredi</span>
                       <span>06:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-white uppercase tracking-tight">
                       <span className="opacity-60">Samedi - Dimanche</span>
                       <span>08:00 - 21:00</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative bg-[#1E1E1E] border border-[#3A3A3A] rounded-[3rem] p-10 md:p-16 mb-16 overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-hero-pattern opacity-5" />
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-brand-500/20">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Inscription Validée</h3>
                <p className="text-brand-500 font-black uppercase tracking-widest text-[10px]">Bienvenue dans l'élite.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
              >
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Ne ratez rien</h3>
                <p className="text-[#BBBBBB] font-bold uppercase tracking-widest text-[11px] mb-12 max-w-xl mx-auto">
                  Rejoignez notre newsletter et soyez les premiers informés. <br /> Nos meilleurs conseils, rien que pour vous.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VOTRE EMAIL"
                    className="flex-1 px-8 py-5 bg-dark-500 text-white border border-dark-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-[11px] font-black tracking-widest placeholder-dark-100 transition-all shadow-inner"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-brand-500/20"
                  >
                    S'inscrire
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-dark-100 border-t border-dark-300 pt-12">
          <p>© {new Date().getFullYear()} FITZONE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Legal'].map((item) => (
              <a key={item} href="#" className="hover:text-brand-500 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;