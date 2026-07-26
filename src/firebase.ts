import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously,
  signOut as firebaseSignOut
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDYlMozdTERryEtFee6ivtvNh-7o5gsO0I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "classroom-diary-3d1ec.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "classroom-diary-3d1ec",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "classroom-diary-3d1ec.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "953979010475",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:953979010475:web:8cb6997536066bd23b26ee"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);

export const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey);

/**
 * Handle Google Auth with Automatic Popup -> Redirect Fallback for Mobile Devices
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.warn('signInWithPopup failed, attempting signInWithRedirect fallback:', error);
    if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('구글 로그인 창이 닫혔습니다. 다시 시도해 주세요.');
    }
    
    // Attempt redirect method for mobile browsers where popups are blocked
    try {
      await signInWithRedirect(auth, googleProvider);
      return null;
    } catch (redirectErr: any) {
      console.error('signInWithRedirect error:', redirectErr);
      throw new Error(`구글 인증 오류 (${redirectErr?.code || '오류'}): ${redirectErr?.message || '인증 실패'}`);
    }
  }
}

/**
 * Check if returning from Google Auth Redirect
 */
export async function checkGoogleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      return result.user;
    }
    return null;
  } catch (e) {
    console.error('getRedirectResult error:', e);
    return null;
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
