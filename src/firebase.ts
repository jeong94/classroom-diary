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
 * Trigger Google Sign-In with exact error code reporting
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Firebase Google Auth error detail:', error);
    const errCode = error?.code || 'auth/unknown';
    const errDesc = error?.message || '';

    if (errCode === 'auth/popup-closed-by-user') {
      throw new Error('구글 로그인 팝업 창이 닫혔습니다. 다시 구글 로그인 버튼을 눌러주세요.');
    }
    if (errCode === 'auth/unauthorized-domain') {
      throw new Error(`[도메인 승인 오류: ${errCode}]\nFirebase 콘솔 -> Authentication -> Settings -> Authorized domains 메뉴에 현재 접속하신 주소(vercel.app)를 [Add domain] 하셔야 합니다.`);
    }
    if (errCode === 'auth/operation-not-allowed') {
      throw new Error(`[구글 인증 비활성화 오류: ${errCode}]\nFirebase 콘솔 -> Authentication -> Sign-in method 메뉴에서 [Google] 제공업체를 [사용 설정] 저장하셔야 합니다.`);
    }

    // Try redirect fallback if popup blocked
    try {
      await signInWithRedirect(auth, googleProvider);
      return null;
    } catch (redirectErr: any) {
      throw new Error(`[구글 인증 오류코드: ${redirectErr?.code || errCode}]\n${redirectErr?.message || errDesc}`);
    }
  }
}

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
