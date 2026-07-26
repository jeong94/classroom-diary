import React from 'react';
import { useClass } from '../../context/ClassContext';
import { getTodayFormatted, getTodayQuote } from '../../utils/dateUtils';
import { Sparkles, LogOut, GraduationCap, RotateCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    mode,
    selectedStudent,
    currentTeacher,
    goBack,
    logout,
    resetToDemoData
  } = useClass();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-100/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Single Clean Logo / Main Navigation Link */}
        <div
          onClick={() => goBack()}
          className="flex items-center gap-3 cursor-pointer group"
          title="첫 메인 화면으로 이동"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-300 via-orange-200 to-rose-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 text-amber-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 tracking-tight break-keep">우리반 성장기록장</h1>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                초등 6학년
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium break-keep">매일 조금씩 성장하는 우리들의 이야기</p>
          </div>
        </div>

        {/* Center: Today's Quote */}
        <div className="hidden lg:flex flex-col items-center max-w-md text-center">
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200/80 mb-0.5">
            📅 {getTodayFormatted()}
          </span>
          <p className="text-xs text-slate-600 truncate max-w-full font-medium italic break-keep">
            "{getTodayQuote()}"
          </p>
        </div>

        {/* Right: User Login Status & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentTeacher && (
            <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold text-purple-900 shadow-2xs">
              <GraduationCap className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="break-keep">{`${currentTeacher.schoolName} ${currentTeacher.grade}-${currentTeacher.classNum} ${currentTeacher.name}`}</span>
            </div>
          )}

          {mode === 'student' && selectedStudent && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-bold text-slate-800 shadow-2xs">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                style={{ backgroundColor: selectedStudent.avatarBgColor }}
              >
                {selectedStudent.avatarEmoji}
              </span>
              <span className="break-keep">{selectedStudent.studentNumber}번 {selectedStudent.name}</span>
            </div>
          )}

          {(currentTeacher || selectedStudent || mode !== 'landing') && (
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-full transition-all"
              title="로그아웃"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          )}

          <button
            onClick={() => {
              if (confirm('초기 데모 데이터로 다시 복원하시겠습니까?')) {
                resetToDemoData();
              }
            }}
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
            title="데모 데이터 초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
