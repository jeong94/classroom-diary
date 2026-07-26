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
    // Save emotion instantly upon emoji click without requiring text notes
    addEmotionRecord(emotionId, '', today);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">오늘의 감정 달력 💖</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">오늘 내 마음 감정 이모티콘을 터치해 등록하세요</p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          📅 {getTodayFormatted()}
        </span>
      </div>

      {/* Today's Existing Record Display */}
      {todayRecord && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-200 rounded-3xl p-5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="text-4xl p-3 bg-white rounded-2xl shadow-inner border border-amber-100">
              {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji}
            </div>
            <div>
              <span className="text-xs font-black text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1 w-fit mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                오늘 감정 완료!
              </span>
              <p className="text-xs font-extrabold text-slate-800">
                오늘의 선택: {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('오늘의 감정 기록을 삭제하시겠습니까?')) {
                deleteEmotionRecord(todayRecord.id);
              }
            }}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
            title="오늘 기록 삭제"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span className="text-rose-600">삭제</span>
          </button>
        </div>
      )}

      {/* Emotion Emoji Only Grid (Labels & Notes Removed) */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900">오늘의 이모티콘 터치하기</h3>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {EMOTIONS.map((emo) => {
            const isSelected = todayRecord?.emotion === emo.id;
            return (
              <motion.button
                key={emo.id}
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelectEmotion(emo.id)}
                className={`py-5 px-3 rounded-2xl border-2 transition-all flex items-center justify-center bg-white ${
                  isSelected
                    ? 'border-amber-500 bg-amber-100 scale-110 shadow-md ring-4 ring-amber-200'
                    : 'border-amber-100 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
                title={emo.label}
              >
                <span className="text-4xl sm:text-5xl drop-shadow-xs">{emo.emoji}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
