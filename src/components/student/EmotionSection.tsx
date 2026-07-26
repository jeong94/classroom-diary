import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getTodayYMD, getMonthDays } from '../../utils/dateUtils';
import type { EmotionType } from '../../types';
import { Smile, Calendar, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EmotionSection: React.FC = () => {
  const { selectedStudent, emotionRecords, addEmotionRecord } = useClass();

  const todayStr = getTodayYMD();
  const myRecord = selectedStudent
    ? emotionRecords.find(er => er.studentId === selectedStudent.id && er.date === todayStr)
    : null;

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(myRecord?.emotion || 'happy');
  const [note, setNote] = useState(myRecord?.note || '');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  if (!selectedStudent) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    addEmotionRecord(selectedEmotion, note.trim(), todayStr);
  };

  const getEmotionForDay = (day: number) => {
    const monthStr = String(currentMonth).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const rec = emotionRecords.find(er => er.studentId === selectedStudent.id && er.date === dateStr);
    if (!rec) return null;
    return EMOTIONS.find(e => e.id === rec.emotion);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-hover transition-all border border-purple-100/70 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-800 shadow-inner">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">② 오늘의 감정</h3>
              <p className="text-xs text-slate-500 font-medium">오늘 내 마음 날씨를 살피고 기록하기</p>
            </div>
          </div>
          <button
            onClick={() => setShowCalendarModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs rounded-full transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>달력 보기</span>
          </button>
        </div>

        <div className="my-3">
          <label className="block text-xs font-bold text-slate-700 mb-2">오늘 어떤 기분인가요?</label>
          <div className="grid grid-cols-7 gap-1.5 bg-purple-50/50 p-2 rounded-2xl border border-purple-100">
            {EMOTIONS.map(emo => {
              const isSelected = selectedEmotion === emo.id;
              return (
                <button
                  key={emo.id}
                  type="button"
                  onClick={() => setSelectedEmotion(emo.id)}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-white shadow-md scale-110 border border-purple-300 font-bold'
                      : 'hover:bg-white/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl sm:text-2xl leading-none mb-1">{emo.emoji}</span>
                  <span className="text-[9px] text-slate-700 font-medium">{emo.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3 mt-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              오늘 있었던 일을 한 줄로 적어보세요.
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="예: 체육 시간에 피구 이겨서 신났음!"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 focus:bg-white pr-20"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>저장</span>
              </button>
            </div>
          </div>
        </form>

        {myRecord && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {EMOTIONS.find(e => e.id === myRecord.emotion)?.emoji}
              </span>
              <span className="truncate max-w-[200px]">"{myRecord.note}"</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              오늘 기록완료
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCalendarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-purple-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentYear}년 {currentMonth}월 감정 달력
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (currentMonth === 1) {
                        setCurrentMonth(12);
                        setCurrentYear(y => y - 1);
                      } else {
                        setCurrentMonth(m => m - 1);
                      }
                    }}
                    className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    &lt; 이전달
                  </button>
                  <button
                    onClick={() => {
                      if (currentMonth === 12) {
                        setCurrentMonth(1);
                        setCurrentYear(y => y + 1);
                      } else {
                        setCurrentMonth(m => m + 1);
                      }
                    }}
                    className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    다음달 &gt;
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-purple-800 mb-2">
                <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {getMonthDays(currentYear, currentMonth).map((day, idx) => {
                  if (!day) return <div key={idx} className="h-10"></div>;
                  const emo = getEmotionForDay(day);
                  return (
                    <div
                      key={idx}
                      className="h-10 rounded-xl border border-purple-100 bg-purple-50/30 flex flex-col items-center justify-center relative p-1"
                    >
                      <span className="text-[9px] text-slate-400 absolute top-0.5 left-1 font-bold">{day}</span>
                      {emo ? (
                        <span className="text-lg leading-none mt-1">{emo.emoji}</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end mt-5">
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-full shadow-sm"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
