// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
let app, db;

function initializeFirebase() {
  try {
    // Check if Firebase is already initialized
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      app = firebase.app();
      db = firebase.firestore();
    } else {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      app = firebase.app();
      db = firebase.firestore();
    }
    
    console.log('Firebase initialized successfully');
    return { app, db };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return null;
  }
}

// Visit Counter Class
class VisitCounter {
  constructor() {
    this.db = db;
    this.counterRef = this.db.collection('analytics').doc('website_visits');
    this.isUpdating = false;
  }

  async incrementVisit() {
    if (this.isUpdating) return;
    
    this.isUpdating = true;
    
    try {
      // Check if user is a bot
      if (this.isBot()) {
        console.log('Bot detected, skipping visit count');
        return;
      }

      // Rate limiting - check last update time
      const lastUpdate = localStorage.getItem('lastVisitUpdate');
      const now = Date.now();
      if (lastUpdate && (now - parseInt(lastUpdate)) < 60000) { // 1 minute cooldown
        console.log('Rate limit: Visit already counted recently');
        return;
      }

      // Update visit count
      await this.db.runTransaction(async (transaction) => {
        const doc = await transaction.get(this.counterRef);
        
        if (doc.exists) {
          const currentCount = doc.data().visitCount || 0;
          transaction.update(this.counterRef, {
            visitCount: currentCount + 1,
            lastVisit: firebase.firestore.FieldValue.serverTimestamp()
          });
        } else {
          transaction.set(this.counterRef, {
            visitCount: 1,
            lastVisit: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      });

      // Update local storage
      localStorage.setItem('lastVisitUpdate', now.toString());
      console.log('Visit count updated successfully');
      
    } catch (error) {
      console.error('Error updating visit count:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  isBot() {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
      'python', 'java', 'perl', 'ruby', 'php', 'go', 'node'
    ];
    
    return botPatterns.some(pattern => userAgent.includes(pattern));
  }

  async getVisitCount() {
    try {
      const doc = await this.counterRef.get();
      if (doc.exists) {
        return doc.data().visitCount || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error getting visit count:', error);
      return 0;
    }
  }
}

// Export functions for admin dashboard
function getFirebaseDB() {
  return db;
}

function getFirebaseDoc(collection, docId) {
  return db.collection(collection).doc(docId);
}

function getFirebaseDocData(docRef) {
  return docRef.get();
}

// Initialize Firebase when script loads
if (typeof firebase !== 'undefined') {
  initializeFirebase();
} 