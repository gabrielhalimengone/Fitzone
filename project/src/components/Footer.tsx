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
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600' },
    { icon: Twitter, href: '#', label: 'Twitter (X)', color: 'hover:bg-gray-800' },
    { icon: Youtube, href: '#', label: 'Youtube', color: 'hover:bg-red-600' },
  ];

  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Cours', path: '/courses' },
    { name: 'Planning', path: '/schedule' },
    { name: 'Équipe', path: '/team' },
    { name: 'Témoignages', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Musculation',
    'Cardio Training',
    'Cours Collectifs',
    'Coaching Personnel',
    'Nutrition',
    'Remise en Forme',
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-900 border-t border-white/5">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-brand-400 to-brand-600 p-2 rounded-xl">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="font-display font-black text-xl text-white">
                Fit<span className="text-gradient">Zone</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Votre partenaire fitness premium pour une transformation complète. 
              Rejoignez notre communauté et atteignez vos objectifs.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-brand-500 to-transparent rounded-full" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-500 transition-all duration-200 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-brand-500 to-transparent rounded-full" />
              Nos Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-brand-500 to-transparent rounded-full" />
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-brand-400" />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed">
                  123 Rue du Fitness<br />75001 Paris, France
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-brand-400" />
                </div>
                <a href="tel:+33123456789" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-brand-400" />
                </div>
                <a href="mailto:contact@fitzone.fr" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  contact@fitzone.fr
                </a>
              </div>
            </div>
            <div className="mt-6 dark-card rounded-xl p-4">
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-2">Horaires</p>
              <p className="text-gray-400 text-sm">Lun–Ven: 6h00 – 22h00</p>
              <p className="text-gray-400 text-sm">Sam–Dim: 8h00 – 20h00</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="dark-card rounded-2xl p-8 mb-10 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Merci pour votre inscription !</h3>
                <p className="text-gray-400 text-sm">Vous recevrez bientôt nos prochaines actualités.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">Restez Informé</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
                  Inscrivez-vous à notre newsletter pour recevoir actualités, conseils fitness et offres spéciales.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="flex-1 px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm placeholder-gray-400 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary px-5 py-3 rounded-xl text-sm whitespace-nowrap flex justify-center items-center gap-2 w-full sm:w-auto"
                  >
                    S'inscrire
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs text-center md:text-left">
          <p>© {currentYear} FitZone. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {['Politique de Confidentialité', "Conditions d'Utilisation", 'Mentions Légales'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors duration-200">
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