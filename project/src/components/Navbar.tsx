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
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-dark-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-brand-400 to-brand-600 p-2 rounded-xl">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                Fit<span className="text-gradient">Zone</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-brand-400 active'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive('/profile')
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  {user?.fullName.split(' ')[0]}
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition-all"
                  >
                    <LogIn className="h-4 w-4" />
                    Connexion
                  </Link>
                  <Link
                    to="/auth"
                    className="btn-primary text-xs px-5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
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
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-dark-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navigationLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-brand-400 bg-brand-500/10 border border-brand-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigationLinks.length * 0.05 }}
                className="pt-4 mt-4 border-t border-white/5 space-y-3"
              >
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500 text-white font-bold"
                  >
                    <User className="h-5 w-5" />
                    Mon Profil ({user?.fullName})
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/auth"
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10"
                    >
                      <LogIn className="h-5 w-5" />
                      Connexion
                    </Link>
                    <Link
                      to="/auth"
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl btn-primary font-bold"
                    >
                      <UserPlus className="h-5 w-5" />
                      S'inscrire
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;