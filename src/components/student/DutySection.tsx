import React from 'react';
import { useClass } from '../../context/ClassContext';
import { getTodayYMD } from '../../utils/dateUtils';
import { ShieldCheck, CheckCircle, Eraser, Utensils, Flower2, Wind, BookOpen, Milk } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
  Eraser: Eraser,
  Utensils: Utensils,
  Flower2: Flower2,
  Wind: Wind,
  BookOpen: BookOpen,
  Milk: Milk,
};

export const DutySection: React.FC = () => {
  const { selectedStudent, duties, dutyCompletions, toggleDutyCompletion } = useClass();

  if (!selectedStudent) return null;

  const todayStr = getTodayYMD();
  const myCompletions = dutyCompletions.filter(d => d.studentId === selectedStudent.id);
  const totalCompletedCount = myCompletions.length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">1인 1역 과제 🎖️</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">우리 반을 가꾸는 나만의 책임 과제</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-center shadow-2xs">
          <span className="text-[10px] text-emerald-800 font-extrabold block leading-none mb-1">누적 수행 횟수</span>
          <span className="text-base font-black text-emerald-950">{totalCompletedCount}회 완료</span>
        </div>
      </div>

      {/* Duty List Cards - Full Description Display without Truncation (1인 1역 내용 잘림 해제) */}
      <div className="space-y-3">
        {duties.map((duty) => {
          const IconComponent = ICON_MAP[duty.icon] || ShieldCheck;
          const isDoneToday = myCompletions.some(c => c.dutyId === duty.id && c.date === todayStr);
          const totalDutyCount = myCompletions.filter(c => c.dutyId === duty.id).length;

          return (
            <div
              key={duty.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDoneToday
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0 shadow-xs ${
                  isDoneToday ? 'bg-emerald-200 border border-emerald-300' : 'bg-white border border-slate-200'
                }`}>
                  <IconComponent className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">{duty.name}</h3>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      총 {totalDutyCount}회 완료
                    </span>
                  </div>
                  {/* Full Text Display without Truncation */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed break-words">
                    {duty.description}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDutyCompletion(duty.id, todayStr)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black shrink-0 flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  isDoneToday
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${isDoneToday ? 'text-white' : 'text-emerald-700'}`} />
                <span>{isDoneToday ? '오늘 완료됨 🎉' : '오늘 수행 완료하기'}</span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
