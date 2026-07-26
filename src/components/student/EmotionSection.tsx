import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getTodayYMD, getTodayFormatted } from '../../utils/dateUtils';
import type { EmotionType } from '../../types';
import { Heart, Trash2 } from 'lucide-react';

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

      {todayRecord && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 bg-white/80 px-3 py-1 rounded-full border border-amber-200">
              오늘 기록 완료! ✨
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
              <span className="text-rose-600">삭제하기</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-4xl p-3 bg-white rounded-2xl shadow-inner">
              {EMOTIONS.find(e => e.id === todayRecord.emotion)?.emoji}
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">
                {EMOTIONS.find(e => e.id === todayRecord.emotion)?.label}
              </h4>
              <p className="text-xs text-slate-700 font-medium mt-1">
                "{todayRecord.note || '특별한 메모 없이 등록했습니다.'}"
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <h3 className="text-sm font-extrabold text-slate-900">오늘의 마음 감정 선택하기</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {EMOTIONS.map((emo) => {
            const isSelected = selectedEmotion === emo.id;
            return (
              <button
                key={emo.id}
                type="button"
                onClick={() => setSelectedEmotion(emo.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-100 scale-105 shadow-md'
                    : 'border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 bg-slate-50/50'
                }`}
              >
                <span className="text-3xl">{emo.emoji}</span>
                <span className="text-xs font-bold text-slate-800">{emo.label}</span>
              </button>
            );
          })}
        </div>

        {selectedEmotion && (
          <div className="space-y-3 pt-2 bg-amber-50/40 p-4 rounded-2xl border border-amber-200">
            <label className="block text-xs font-bold text-slate-700">
              오늘 왜 이런 감정이 들었나요? (한 줄 메모)
            </label>
            <input
              type="text"
              placeholder="예: 오늘 피구 게임에서 이겨서 기뻤다!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
              >
                오늘의 감정 저장하기
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
