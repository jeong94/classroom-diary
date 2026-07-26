import React, { useState } from 'react';
import { useClass } from '../context/ClassContext';
import { getTodayFormatted, getTodayQuote } from '../utils/dateUtils';
import { StudentProfileModal } from '../components/profile/StudentProfileModal';
import { LoginModal } from '../components/auth/LoginModal';
import type { Student } from '../types';
import { Sparkles, ArrowRight, Award, UserCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { students, tryAccessStudent, getStudentStats, studentBadges, currentTeacher, selectedStudent } = useClass();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);
  const [accessAlert, setAccessAlert] = useState<string | null>(null);

  const handleStudentCardClick = (student: Student) => {
    const check = tryAccessStudent(student);
    if (!check.allowed) {
      setAccessAlert(check.message || '본인의 성장기록장만 접근할 수 있습니다. 먼저 로그인해주세요!');
      setShowLoginModal(true);
    }
  };

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

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            우리반 성장기록장 🌱
          </h1>
          <p className="text-base sm:text-xl font-bold text-slate-700">
            매일 조금씩 성장하는 우리들의 이야기
          </p>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80 max-w-xl shadow-xs">
            <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block mb-0.5">
              💡 오늘의 응원 한마디
            </span>
            <p className="text-sm font-bold text-slate-800 italic">
              "{getTodayQuote()}"
            </p>
          </div>
        </div>
      </div>

      {/* Access Alert Toast */}
      {accessAlert && (
        <div className="bg-rose-50 border-2 border-rose-200 text-rose-900 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-600" />
            <span>{accessAlert}</span>
          </div>
          <button
            onClick={() => setAccessAlert(null)}
            className="text-xs text-rose-700 underline font-bold"
          >
            닫기
          </button>
        </div>
      )}

      {/* Main Login Selection Boxes */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
            신분별 입장 선택
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">어떤 신분으로 접속하시나요?</h2>
          <p className="text-xs text-slate-500 font-bold">학생은 초대코드+실명으로, 교사는 Google 계정으로 로그인합니다.</p>
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
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                학생으로 접속하기
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
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
              <h3 className="text-2xl font-black">교사로 접속하기</h3>
              <p className="text-xs text-purple-100 font-medium leading-relaxed">
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

      {/* Student Roster Overview (Card Protection Enabled) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-500" />
            <span>학급 학생 명부 ({students.length}명)</span>
          </h3>
          <span className="text-xs text-slate-400">🔒 본인 또는 선생님만 학생의 개인 성장기록장에 입장할 수 있습니다.</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {students.map((student) => {
            const stats = getStudentStats(student.id);
            const myBadgeCount = studentBadges.filter(b => b.studentId === student.id).length;

            return (
              <motion.div
                key={student.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl p-5 border border-amber-100 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                onClick={() => handleStudentCardClick(student)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {student.studentNumber}번
                    </span>
                    {myBadgeCount > 0 && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        {myBadgeCount}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2 py-2">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-white group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: student.avatarBgColor }}
                    >
                      {student.avatarEmoji}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate max-w-full italic px-2">
                      "{student.motto || '오늘도 화이팅!'}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>독서 {stats.totalBooks}권</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentTeacher || (selectedStudent && selectedStudent.id === student.id)) {
                        setProfileStudent(student);
                      } else {
                        handleStudentCardClick(student);
                      }
                    }}
                    className="text-amber-600 hover:text-amber-800 font-bold underline"
                  >
                    프로필
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {profileStudent && (
        <StudentProfileModal
          student={profileStudent}
          onClose={() => setProfileStudent(null)}
        />
      )}
    </div>
  );
};
