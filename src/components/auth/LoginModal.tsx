import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { SUPER_ADMIN_EMAIL, DEFAULT_INVITE_CODE } from '../../utils/seedData';
import { signInWithGoogle, signInAnonymousStudent } from '../../firebase';
import { ArrowRight, Lock, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { loginAsTeacherGoogle, loginAsStudentWithCode } = useClass();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');

  const [stdGrade, setStdGrade] = useState<number>(6);
  const [stdClassNum, setStdClassNum] = useState<number>(1);
  const [stdRealName, setStdRealName] = useState<string>('');
  const [stdInviteCode, setStdInviteCode] = useState<string>(DEFAULT_INVITE_CODE);
  const [stdError, setStdError] = useState<string | null>(null);

  const [tchName, setTchName] = useState<string>('');
  const [tchSchool, setTchSchool] = useState<string>('중앙초등학교');
  const [tchGrade, setTchGrade] = useState<number>(6);
  const [tchClassNum, setTchClassNum] = useState<number>(1);
  const [tchMessage, setTchMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stdRealName.trim()) {
      setStdError('이름(실명)을 정확히 입력해주세요. (닉네임 금지)');
      return;
    }

    setIsLoading(true);
    // 1. Firebase Anonymous Auth call
    await signInAnonymousStudent();

    // 2. Class Context student login
    const res = loginAsStudentWithCode(stdGrade, stdClassNum, stdRealName.trim(), stdInviteCode.trim());
    setIsLoading(false);

    if (res.success) {
      onClose();
    } else {
      setStdError(res.message || '로그인에 실패했습니다. 정보를 다시 확인해주세요.');
    }
  };

  const handleTeacherGoogleLogin = async (overrideEmail?: string) => {
    setIsLoading(true);
    let finalEmail = overrideEmail;
    let finalName = tchName;

    if (!finalEmail) {
      // Try real Firebase Google Sign-In Popup
      const fbUser = await signInWithGoogle();
      if (fbUser && fbUser.email) {
        finalEmail = fbUser.email;
        finalName = fbUser.displayName || tchName || '선생님';
      } else {
        finalEmail = 'teacher.google@growth.edu';
        finalName = tchName || '홍길동 선생님';
      }
    }

    const teacherObj = loginAsTeacherGoogle(
      finalEmail,
      finalName || '홍길동 선생님',
      tchSchool,
      tchGrade,
      tchClassNum
    );

    setIsLoading(false);

    if (teacherObj.status === 'pending') {
      setTchMessage(`가입 신청이 성공적으로 제출되었습니다! 최종 관리자(admin@growth.edu)의 승인 후 서비스 이용이 가능합니다.`);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-amber-200 my-6"
      >
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-6 flex items-center justify-between border-b border-amber-200">
          <div>
            <span className="text-[11px] font-extrabold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full uppercase">
              3단계 로그인 선택 (Firebase Auth 연동)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
              우리반 성장기록장 접속하기 🌱
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('student')}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                activeTab === 'student'
                  ? 'border-amber-400 bg-amber-50/70 shadow-md scale-102'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 opacity-70'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center text-2xl shadow-inner">
                🙋‍♂️
              </div>
              <h3 className="font-black text-slate-900 text-base">학생으로 입장</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">
                Firebase 익명 인증 + 실명 + 초대코드
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('teacher')}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                activeTab === 'teacher'
                  ? 'border-purple-500 bg-purple-50/70 shadow-md scale-102'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 opacity-70'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-200 flex items-center justify-center text-2xl shadow-inner">
                👩‍🏫
              </div>
              <h3 className="font-black text-slate-900 text-base">교사로 입장</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">
                Firebase Google 인증 + 학반 입력
              </p>
            </button>
          </div>

          {activeTab === 'student' && (
            <form onSubmit={handleStudentLogin} className="space-y-4 bg-amber-50/40 p-5 rounded-2xl border border-amber-200/70">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">학년 선택 (1~6학년)</label>
                  <select
                    value={stdGrade}
                    onChange={(e) => setStdGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6].map(g => (
                      <option key={g} value={g}>{g}학년</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">반 선택 (1~10반)</label>
                  <select
                    value={stdClassNum}
                    onChange={(e) => setStdClassNum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => (
                      <option key={c} value={c}>{c}반</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  이름 (실명 입력 필수 - 닉네임 금지 🛑)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김민준"
                  value={stdRealName}
                  onChange={(e) => {
                    setStdError(null);
                    setStdRealName(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">학반 초대 코드 (6자리)</label>
                <input
                  type="text"
                  required
                  placeholder="예: CLASS61"
                  value={stdInviteCode}
                  onChange={(e) => setStdInviteCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 text-xs font-mono font-bold tracking-wider rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 uppercase"
                />
              </div>

              {stdError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  ⚠️ {stdError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-sm rounded-xl shadow-md transition-all hover:scale-101 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <span>{isLoading ? '인증 진행 중...' : '성장기록장 입장하기'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {activeTab === 'teacher' && (
            <div className="space-y-4 bg-purple-50/40 p-5 rounded-2xl border border-purple-200/70">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">담당 학년 (1~6학년)</label>
                    <select
                      value={tchGrade}
                      onChange={(e) => setTchGrade(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6].map(g => (
                        <option key={g} value={g}>{g}학년</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">담당 반 (1~10반)</label>
                    <select
                      value={tchClassNum}
                      onChange={(e) => setTchClassNum(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => (
                        <option key={c} value={c}>{c}반</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">학교명</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 서울초등학교"
                      value={tchSchool}
                      onChange={(e) => setTchSchool(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">선생님 실명</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 교사"
                      value={tchName}
                      onChange={(e) => setTchName(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleTeacherGoogleLogin()}
                  className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all hover:scale-101 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Firebase Google 로그인 진행</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTeacherGoogleLogin(SUPER_ADMIN_EMAIL)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>👑 최종 관리자 (admin@growth.edu) 구글 빠른 로그인</span>
                </button>
              </div>

              {tchMessage && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold">
                  ⚠️ {tchMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
