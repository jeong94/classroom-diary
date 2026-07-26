import React, { useState } from 'react';
import { useClass } from '../context/ClassContext';
import { getTodayFormatted, getTodayQuote } from '../utils/dateUtils';
import { LoginModal } from '../components/auth/LoginModal';
import { Sparkles, ArrowRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { currentTeacher, selectedStudent, setMode, logout } = useClass();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-amber-200 via-orange-100 to-rose-200 rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-300/40 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-900 border border-amber-300/60 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>오늘 날짜: {getTodayFormatted()}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight break-keep">
            우리반 성장기록장 🌱
          </h1>
          <p className="text-base sm:text-xl font-bold text-slate-700 break-keep">
            매일 조금씩 성장하는 우리들의 이야기
          </p>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80 max-w-xl shadow-xs">
            <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block mb-0.5">
              💡 오늘의 응원 한마디
            </span>
            <p className="text-sm font-bold text-slate-800 italic break-keep">
              "{getTodayQuote()}"
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Login Session Welcome Card */}
      {(currentTeacher || selectedStudent) && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {currentTeacher ? '👩‍🏫' : selectedStudent?.avatarEmoji || '🙋‍♂️'}
            </div>
            <div>
              <span className="text-[10px] font-extrabold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                현재 로그인됨 (세션 유지 중)
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5 break-keep">
                {currentTeacher
                  ? `반갑습니다, ${currentTeacher.schoolName} ${currentTeacher.grade}-${currentTeacher.classNum} ${currentTeacher.name} 선생님!`
                  : `반갑습니다, ${selectedStudent?.name} 학생!`
                }
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMode(currentTeacher ? 'teacher' : 'student')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <span>{currentTeacher ? '학반 대시보드로 이동' : '내 성장기록장으로 이동'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2.5 bg-white border border-slate-300 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Login Selection Boxes - Small top pill banner removed per user request */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 break-keep">어떤 신분으로 접속하시나요?</h2>
          <p className="text-xs text-slate-500 font-bold break-keep">학생은 초대코드+실명으로, 교사는 Google 계정으로 로그인합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowLoginModal(true)}
            className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                🙋‍♂️
              </div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
                학생 전용 로그인
              </span>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors break-keep">
                학생으로 접속하기
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed break-keep">
                학년 (1~6학년), 반 (1~10반), <b>이름(실명 필수 - 닉네임 금지)</b> 및 담임 선생님의 학반 초대 코드를 입력하여 내 성장기록장에 들어갑니다.
              </p>
            </div>

            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>학생 초대코드 및 실명 로그인</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowLoginModal(true)}
            className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>
              <span className="text-xs font-extrabold text-purple-200 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
                교사 전용 로그인
              </span>
              <h3 className="text-2xl font-black break-keep">교사로 접속하기</h3>
              <p className="text-xs text-purple-100 font-medium leading-relaxed break-keep">
                <b>Google 계정으로 로그인</b> 후 선생님 실명, 학교명, 학년 (1~6학년), 반 (1~10반)을 입력하여 학반 관리자 권한을 가집니다.
              </p>
            </div>

            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3.5 bg-white hover:bg-purple-50 text-purple-950 font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Google 계정으로 교사 로그인</span>
              <ArrowRight className="w-4 h-4 text-purple-700" />
            </button>
          </motion.div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};
