import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, User, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const navigationLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Cours', path: '/courses' },
    { name: 'Planning', path: '/schedule' },
    { name: 'Équipe', path: '/team' },
    { name: 'Abonnements', path: '/subscriptions' },
    { name: 'Témoignages', path: '/Testimonials'},
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-2xl py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative bg-brand-500 p-2.5 rounded-xl shadow-lg shadow-brand-500/20">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="font-display font-black text-2xl text-white uppercase tracking-tighter">
                Fit<span className="text-brand-500">Zone</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-brand-500'
                    : 'text-dark-100 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-500 rounded-full"
                  />
                )}
              </Link>
            ))}
            
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-white/10">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive('/profile')
                      ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/20'
                      : 'bg-white/5 border border-white/10 text-white hover:border-brand-500'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{user?.fullName.split(' ')[0]}</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[10px] font-black uppercase tracking-widest text-dark-100 hover:text-white transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest font-black shadow-xl shadow-brand-500/20"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white transition-all hover:border-brand-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 z-50 bg-dark-800 border border-dark-300 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    isActive(link.path)
                      ? 'bg-brand-500 text-white'
                      : 'text-dark-100 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-brand-500 text-white font-black uppercase tracking-widest text-xs"
                  >
                    <User className="h-5 w-5" />
                    Mon Profil
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center px-6 py-4 rounded-2xl btn-primary font-black uppercase tracking-widest text-xs"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;