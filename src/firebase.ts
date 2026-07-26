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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
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
      throw new Error('구글 로그인 창이 닫혔습니다. 다시 구글 로그인 버튼을 눌러 계정을 선택해 주세요.');
    }
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('브라우저의 팝업 차단이 설정되어 있습니다. 팝업 허용 후 다시 시도해 주세요.');
    }
    if (error?.code === 'auth/unauthorized-domain') {
      throw new Error('Firebase 콘솔 [Authentication -> Settings -> Authorized domains]에 Vercel 주소를 추가하셔야 합니다.');
    }
    throw new Error(`구글 인증 오류 (${error?.code || '오류'}): ${error?.message || '인증 실패'}`);
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
