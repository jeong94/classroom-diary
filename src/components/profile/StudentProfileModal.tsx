import React, { useState } from 'react';
import type { Student } from '../../types';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getMonthDays } from '../../utils/dateUtils';
import { X, BookOpen, Award, CheckCircle2, Heart, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentProfileModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ student, onClose }) => {
  const {
    badges,
    studentBadges,
    getStudentStats,
    emotionRecords,
    praiseCards
  } = useClass();

  const stats = getStudentStats(student.id);
  const myBadges = studentBadges.filter(sb => sb.studentId === student.id);
  const myPraises = praiseCards.filter(pc => pc.toStudentId === student.id);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const monthDays = getMonthDays(currentYear, currentMonth);

  const getEmotionForDay = (day: number) => {
    const monthStr = String(currentMonth).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const rec = emotionRecords.find(er => er.studentId === student.id && er.date === dateStr);
    if (!rec) return null;
    return EMOTIONS.find(e => e.id === rec.emotion);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-amber-100 my-8"
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-md border-4 border-white"
              style={{ backgroundColor: student.avatarBgColor }}
            >
              {student.avatarEmoji}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-white/80 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-xs border border-amber-200">
                  {student.studentNumber}번
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.name}</h2>
              </div>
              <p className="text-slate-600 text-sm italic">
                "{student.motto || '매일 성장하는 멋진 6학년!'}"
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5 text-center">
              <BookOpen className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <div className="text-xs text-amber-800 font-medium">독서 권수</div>
              <div className="text-lg font-black text-amber-900">{stats.totalBooks}권 <span className="text-xs font-normal text-amber-700">({stats.totalPages}p)</span></div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-3.5 text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xs text-emerald-800 font-medium">1인1역 수행</div>
              <div className="text-lg font-black text-emerald-900">{stats.dutyCompletions}회</div>
            </div>

            <div className="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-3.5 text-center">
              <Sparkles className="w-5 h-5 text-sky-600 mx-auto mb-1" />
              <div className="text-xs text-sky-800 font-medium">목표 달성률</div>
              <div className="text-lg font-black text-sky-900">{stats.goalCompletionRate}%</div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-3.5 text-center">
              <Heart className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <div className="text-xs text-rose-800 font-medium">칭찬 받은 횟수</div>
              <div className="text-lg font-black text-rose-900">{stats.praisesReceived}개</div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-sm">획득한 배지 ({myBadges.length}개)</h3>
            </div>
            {myBadges.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">아직 획득한 배지가 없어요. 활동을 통해 배지를 모아보세요!</p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {myBadges.map(sb => {
                  const badgeDef = badges.find(b => b.id === sb.badgeId);
                  return (
                    <div
                      key={sb.id}
                      className="bg-white border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xs group relative"
                    >
                      <span className="text-xl">{badgeDef?.icon || '🎖️'}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{badgeDef?.name || '특출난 노력 배지'}</div>
                        <div className="text-[10px] text-amber-600 font-medium">{sb.awardedAt}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Monthly Emotion Calendar Grid */}
          <div className="bg-purple-50/50 border border-purple-200/60 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-purple-950 text-base">월별 감정 달력</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900">
                <button
                  onClick={() => {
                    if (currentMonth === 1) {
                      setCurrentMonth(12);
                      setCurrentYear(y => y - 1);
                    } else {
                      setCurrentMonth(m => m - 1);
                    }
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 rounded-lg border border-purple-200 shadow-2xs"
                >
                  &lt;
                </button>
                <span className="bg-white px-3 py-1 rounded-lg border border-purple-200">
                  {currentYear}년 {currentMonth}월
                </span>
                <button
                  onClick={() => {
                    if (currentMonth === 12) {
                      setCurrentMonth(1);
                      setCurrentYear(y => y + 1);
                    } else {
                      setCurrentMonth(m => m + 1);
                    }
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 rounded-lg border border-purple-200 shadow-2xs"
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-purple-800">
              <div className="text-rose-500">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div className="text-sky-500">토</div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {monthDays.map((day, idx) => {
                if (!day) return <div key={idx} className="h-10"></div>;
                const emo = getEmotionForDay(day);
                return (
                  <div
                    key={idx}
                    className="h-11 rounded-xl border border-purple-200/80 bg-white flex flex-col items-center justify-center relative hover:scale-105 transition-transform shadow-2xs group"
                    title={emo ? `${day}일: ${emo.label}` : `${day}일`}
                  >
                    <span className="text-[9px] font-bold text-slate-400 absolute top-0.5 left-1.5">{day}</span>
                    {emo ? (
                      <span className="text-xl leading-none mt-1">{emo.emoji}</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Received Praise Section */}
          <div className="bg-rose-50/50 border border-rose-200/60 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-rose-900 text-sm">친구들에게 받은 칭찬 ({myPraises.length}개)</h3>
            </div>
            {myPraises.length === 0 ? (
              <p className="text-xs text-slate-400">아직 받은 칭찬 카드가 없어요.</p>
            ) : (
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {myPraises.map(p => (
                  <div key={p.id} className="bg-white border border-rose-100 rounded-xl p-2.5 text-xs shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 font-medium mb-1">
                      <span className="font-bold text-rose-700">From. {p.fromStudentName}</span>
                      <span className="text-[10px] text-slate-400">{p.createdAt}</span>
                    </div>
                    <p className="text-slate-800 font-medium">"{p.content}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
