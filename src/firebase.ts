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
// Force Google to always open the Account Selector popup window!
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);

export const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);

/**
 * Trigger Real Google Sign-In Account Selector Popup
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Firebase Google Auth error:', error);
    if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('구글 로그인 창이 닫혔습니다. 다시 구글 계정을 선택해주세요.');
    }
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('브라우저의 팝업 차단이 활성화되어 있습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
    }
    throw error;
  }
}

export async function signInAnonymousStudent() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.warn('Firebase Anonymous Auth failed:', error);
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
