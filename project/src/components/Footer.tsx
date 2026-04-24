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
    <footer className="relative bg-dark-900 border-t border-dark-400">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-brand-500 p-2.5 rounded-xl">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="font-display font-black text-xl text-white uppercase tracking-tight">
                Fit<span className="text-brand-500">Zone</span>
              </span>
            </Link>
            <p className="text-dark-100 mb-6 leading-relaxed text-sm font-medium">
              Bien plus qu'une salle de sport, un accompagnement complet pour changer votre vie.
              Rejoignez-nous.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl bg-dark-800 border border-dark-300 flex items-center justify-center text-dark-100 hover:text-white hover:border-brand-500 transition-all duration-300`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-100 hover:text-brand-500 text-sm font-bold transition-all duration-200 flex items-center gap-2 group"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-dark-100 text-sm font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-dark-100 text-sm font-medium">
                <MapPin className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                <span>123 Rue du Fitness, 75001 Paris</span>
              </div>
              <div className="flex items-center gap-3 text-dark-100 text-sm font-medium">
                <Phone className="h-5 w-5 text-brand-500 shrink-0" />
                <a href="tel:+33123456789" className="hover:text-white">+33 1 23 45 67 89</a>
              </div>
              <div className="flex items-center gap-3 text-dark-100 text-sm font-medium">
                <Mail className="h-5 w-5 text-brand-500 shrink-0" />
                <a href="mailto:contact@fitzone.fr" className="hover:text-white">contact@fitzone.fr</a>
              </div>
            </div>
            <div className="mt-8 bg-dark-800 border border-dark-300 rounded-2xl p-5">
              <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Horaires</p>
              <div className="space-y-1">
                <p className="text-white text-xs font-bold flex justify-between"><span>Lun–Ven:</span> <span>6h00 – 22h00</span></p>
                <p className="text-white text-xs font-bold flex justify-between"><span>Sam–Dim:</span> <span>8h00 – 20h00</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-dark-800 border border-dark-300 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Merci !</h3>
                <p className="text-dark-100 font-medium">Vous êtes inscrit à la newsletter.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Ne ratez rien</h3>
                <p className="text-dark-100 font-medium mb-10 max-w-xl mx-auto">
                  Rejoignez notre newsletter et soyez les premiers informés. <br /> Nos meilleurs conseils, rien que pour vous.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="flex-1 px-5 py-4 bg-dark-500 text-white border border-dark-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm placeholder-dark-100 transition-all font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    S'inscrire
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-400 flex flex-col md:flex-row justify-between items-center gap-6 text-dark-100 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
          <p>© {currentYear} FitZone. Fuel your strength.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {['Confidentialité', "Conditions", 'Légal'].map((item) => (
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