import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut as firebaseSignOut
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderKeyForDevelopment1234",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "classroom-diary-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "classroom-diary-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "classroom-diary-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.warn('Firebase Google Auth popup failed or in demo mode:', error);
    return null;
  }
}

export async function signInAnonymousStudent() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.warn('Firebase Anonymous Auth failed or in demo mode:', error);
    return null;
  }
}

export async function logoutFirebase() {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.error('Firebase SignOut error:', e);
  }
}
