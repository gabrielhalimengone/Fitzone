/**
 * Simulation d'une base de données locale pour la démo.
 * Utilise localStorage pour persister les données entre les sessions.
 */

const DB_KEY = 'fitzone_db';

interface DBStructure {
  users: any[];
  sessions: any[];
  newsletterEmails: string[];
  contactSubmissions: any[];
  currentUserId: string | null;
}

const initialDB: DBStructure = {
  users: [
    {
      id: '1',
      fullName: 'Gabriel Halim',
      email: 'demo@fitzone.fr',
      password: 'password123',
      phone: '06 12 34 56 78',
      plan: 'pro',
      joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      coach: {
        name: 'Marc Durand',
        specialty: 'Force & Conditionnement',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop'
      }
    }
  ],
  sessions: [
    {
      id: 's1',
      userId: '1',
      courseName: 'CrossFit Power',
      coachName: 'Marc Durand',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '18:00',
      duration: '60 min'
    }
  ],
  newsletterEmails: [],
  contactSubmissions: [],
  currentUserId: null
};

class DemoDB {
  private data: DBStructure;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      this.data = JSON.parse(saved);
      // Ensure new fields exist if migrating from old DB
      if (!this.data.newsletterEmails) this.data.newsletterEmails = [];
      if (!this.data.contactSubmissions) this.data.contactSubmissions = [];
    } else {
      this.data = initialDB;
      this.save();
    }
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
  }

  // Auth
  login(email: string, password: string) {
    const user = this.data.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.data.currentUserId = user.id;
      this.save();
      return user;
    }
    return null;
  }

  async signup(userData: any) {
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      plan: userData.plan || 'starter',
      joinDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    this.data.users.push(newUser);
    this.data.currentUserId = newUser.id;
    this.save();

    // Envoi vers Sheet2 pour les inscriptions
    try {
      const GOOGLE_SCRIPT_URL_SHEET2 = import.meta.env.VITE_GOOGLE_SCRIPT_URL_SHEET2;
      await fetch(GOOGLE_SCRIPT_URL_SHEET2, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify({
          ...newUser,
          source: 'signup_form',
          timestamp: new Date().toISOString()
        }),
      });
    } catch (e) {
      console.error('Erreur envoi Sheet2:', e);
    }

    return newUser;
  }

  logout() {
    this.data.currentUserId = null;
    this.save();
  }

  getCurrentUser() {
    if (!this.data.currentUserId) return null;
    const index = this.data.users.findIndex(u => u.id === this.data.currentUserId);
    if (index === -1) return null;

    let user = this.data.users[index];

    // Auto-réparation de la date de facturation si elle est dans le passé
    const now = new Date();
    const billingDate = new Date(user.nextBillingDate);
    if (billingDate < now) {
      const nextMonth = new Date();
      nextMonth.setDate(now.getDate() + 30);
      user.nextBillingDate = nextMonth.toISOString().split('T')[0];
      this.data.users[index] = user;
      this.save();
    }

    // Join with sessions
    const userSessions = this.data.sessions.filter(s => s.userId === user.id);
    return { ...user, reservedSessions: userSessions };
  }

  // Users
  updateUser(userId: string, updates: any) {
    const index = this.data.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      // Si on change de forfait, on repart sur un cycle de 30 jours
      if (updates.plan) {
        updates.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      }
      
      this.data.users[index] = { ...this.data.users[index], ...updates };
      this.save();
      return this.data.users[index];
    }
    return null;
  }

  // Sessions
  reserveSession(userId: string, sessionData: any) {
    const newSession = {
      ...sessionData,
      id: Math.random().toString(36).substr(2, 9),
      userId
    };
    this.data.sessions.push(newSession);
    this.save();
    return newSession;
  }

  cancelSession(sessionId: string) {
    this.data.sessions = this.data.sessions.filter(s => s.id !== sessionId);
    this.save();
  }

  // Newsletter
  subscribeNewsletter(email: string) {
    if (!this.data.newsletterEmails.includes(email)) {
      this.data.newsletterEmails.push(email);
      this.save();
      return true;
    }
    return false;
  }

  // Contact
  async submitContactForm(formData: any) {
    this.data.contactSubmissions.push({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    });
    this.save();

    try {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // On garde no-cors
        cache: 'no-cache',
        // On ne met PAS de headers. Google recevra le texte brut et le script le transformera en JSON.
        body: JSON.stringify(formData),
      });

      console.log('Données envoyées (en attente de réception côté Sheets)');
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      return true;
    }
  }

  // Demo tool
  resetDB() {
    this.data = initialDB;
    this.save();
    window.location.reload();
  }
}

export const api = new DemoDB();
