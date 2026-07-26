import React from 'react';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getTodayYMD, getTodayFormatted } from '../../utils/dateUtils';
import type { EmotionType } from '../../types';
import { Heart, Trash2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmotionSection: React.FC = () => {
  const { selectedStudent, emotionRecords, addEmotionRecord, deleteEmotionRecord } = useClass();

  if (!selectedStudent) return null;

  const today = getTodayYMD();
  const todayRecord = emotionRecords.find(e => e.studentId === selectedStudent.id && e.date === today);

  const handleSelectEmotion = (emotionId: EmotionType) => {
    addEmotionRecord(emotionId, '', today);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-soft space-y-6">
      {/* Header with clean Korean word break */}
      <div className="flex items-center justify-between border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 break-keep">오늘의 감정 달력 💖</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium break-keep">오늘 내 마음 감정 이모티콘을 터치해 등록하세요.</p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shrink-0">
          📅 {getTodayFormatted()}
        </span>
      </div>

      {/* Today's Existing Record Summary Display */}
      {todayRecord && (
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 bg-white rounded-xl shadow-2xs border border-amber-200">
              {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji}
            </div>
            <div>
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit mb-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                오늘 감정 선택 완료
              </span>
              <p className="text-xs font-bold text-slate-800 break-keep">
                등록된 감정: {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji} ({EMOTIONS.find(e => e.id === todayRecord.emotion)?.label})
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('오늘의 감정 기록을 삭제하시겠습니까?')) {
                deleteEmotionRecord(todayRecord.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
            title="오늘 기록 삭제"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span className="text-rose-600">삭제</span>
          </button>
        </div>
      )}

      {/* Compact Emoji Grid - No Overlapping, No Yellow Oval Background */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-900 break-keep">오늘의 이모티콘 선택하기</h3>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          {EMOTIONS.map((emo) => {
            const isSelected = todayRecord?.emotion === emo.id;
            return (
              <motion.button
                key={emo.id}
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectEmotion(emo.id)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50 shadow-sm border-2'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
                }`}
                title={emo.label}
              >
                <span className="text-2xl sm:text-3xl leading-none select-none">{emo.emoji}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
