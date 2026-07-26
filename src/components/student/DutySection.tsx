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
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-hover transition-all border border-emerald-100/70 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">③ 1인 1역</h3>
              <p className="text-xs text-slate-500 font-medium">우리 반을 가꾸는 나만의 책임 과제</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-center">
            <span className="text-[10px] text-emerald-800 font-bold block leading-none">누적 수행</span>
            <span className="text-sm font-extrabold text-emerald-950">{totalCompletedCount}회</span>
          </div>
        </div>

        <div className="space-y-2.5 my-3">
          {duties.map((duty) => {
            const IconComponent = ICON_MAP[duty.icon] || ShieldCheck;
            const isDoneToday = myCompletions.some(c => c.dutyId === duty.id && c.date === todayStr);
            const totalDutyCount = myCompletions.filter(c => c.dutyId === duty.id).length;

            return (
              <div
                key={duty.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isDoneToday
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-emerald-800 shrink-0 ${
                    isDoneToday ? 'bg-emerald-200 shadow-xs' : 'bg-white border border-slate-200'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{duty.name}</h4>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-semibold">
                        {totalDutyCount}회 완료
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{duty.description}</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDutyCompletion(duty.id, todayStr)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                    isDoneToday
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                  }`}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${isDoneToday ? 'text-white' : 'text-emerald-700'}`} />
                  <span>{isDoneToday ? '완료됨 🎉' : '오늘 완료했습니다!'}</span>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
