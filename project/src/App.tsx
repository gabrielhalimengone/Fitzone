import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Subscriptions from './pages/Subscriptions';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/team" element={<Team />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
              <Route path="/forgot-password" element={<Auth mode="forgot" />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;