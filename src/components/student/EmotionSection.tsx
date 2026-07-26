import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getTodayYMD, getTodayFormatted } from '../../utils/dateUtils';
import type { EmotionType } from '../../types';
import { Heart, Trash2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmotionSection: React.FC = () => {
  const { selectedStudent, emotionRecords, addEmotionRecord, deleteEmotionRecord } = useClass();

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [note, setNote] = useState('');

  if (!selectedStudent) return null;

  const today = getTodayYMD();
  const todayRecord = emotionRecords.find(e => e.studentId === selectedStudent.id && e.date === today);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmotion) return;

    addEmotionRecord(selectedEmotion, note.trim(), today);
    setSelectedEmotion(null);
    setNote('');
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
            <p className="text-xs text-slate-500 font-medium">오늘 내 마음은 어떤 색깔인가요?</p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          📅 {getTodayFormatted()}
        </span>
      </div>

      {/* Today's Existing Record Display */}
      {todayRecord && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-300 shadow-2xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              오늘 감정 기록 완료!
            </span>

            <button
              onClick={() => {
                if (confirm('오늘의 감정 기록을 삭제하시겠습니까?')) {
                  deleteEmotionRecord(todayRecord.id);
                }
              }}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
              title="오늘 기록 삭제"
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
              <span className="text-rose-600">기록 삭제</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-4xl p-3.5 bg-white rounded-2xl shadow-inner border border-amber-100">
              {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg">
                {EMOTIONS.find(e => e.id === todayRecord.emotion)?.label}
              </h4>
              <p className="text-xs text-slate-700 font-medium mt-1 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-100">
                "{todayRecord.note || '특별한 메모 없이 등록했습니다.'}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Emotion Selection Grid - Clean 7 Grid Layout */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">오늘의 감정 캐릭터 선택하기</h3>
          <span className="text-xs text-slate-400 font-medium">아이콘을 선택하면 메모를 남길 수 있습니다.</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {EMOTIONS.map((emo) => {
            const isSelected = selectedEmotion === emo.id;
            return (
              <motion.button
                key={emo.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedEmotion(emo.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-500 bg-gradient-to-b from-amber-100 to-orange-100 scale-105 shadow-md'
                    : 'border-slate-100 hover:border-amber-300 hover:bg-amber-50/60 bg-slate-50/70'
                }`}
              >
                <span className="text-3xl sm:text-4xl drop-shadow-xs">{emo.emoji}</span>
                <span className="text-xs font-black text-slate-900">{emo.label}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2" />
                )}
              </motion.button>
            );
          })}
        </div>

        {selectedEmotion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 pt-2 bg-amber-50/50 p-5 rounded-2xl border-2 border-amber-200 shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{EMOTIONS.find(e => e.id === selectedEmotion)?.emoji}</span>
              <label className="block text-xs font-black text-slate-800">
                [{EMOTIONS.find(e => e.id === selectedEmotion)?.label}] 마음을 느낀 이유를 써주세요 (선택)
              </label>
            </div>
            <input
              type="text"
              placeholder="예: 오늘 피구 게임에서 우리 모둠이 이겨서 정말 기뻤다!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 text-xs font-bold rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-102"
              >
                오늘의 감정 등록 완료! ✨
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};
