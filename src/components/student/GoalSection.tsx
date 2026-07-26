import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { getMondayOfWeek } from '../../utils/dateUtils';
import { Target, CheckCircle2, Trash2 } from 'lucide-react';

export const GoalSection: React.FC = () => {
  const { selectedStudent, weeklyGoals, setWeeklyGoal, toggleGoalCompletion, deleteWeeklyGoal } = useClass();

  const [goalText, setGoalText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!selectedStudent) return null;

  const monday = getMondayOfWeek();
  const currentGoal = weeklyGoals.find(g => g.studentId === selectedStudent.id && g.weekStartDate === monday);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setWeeklyGoal(goalText.trim());
    setGoalText('');
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-inner">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">이번 주 나의 목표 🎯</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">월요일마다 새로운 목표를 정하고 스스로 달성해보세요</p>
          </div>
        </div>
      </div>

      {currentGoal && !isEditing ? (
        <div className={`border-2 rounded-3xl p-6 transition-all space-y-4 ${
          currentGoal.isCompleted
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 shadow-sm'
            : 'bg-gradient-to-r from-amber-50 to-indigo-50 border-indigo-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black px-3 py-1 rounded-full ${
              currentGoal.isCompleted
                ? 'bg-emerald-200 text-emerald-900'
                : 'bg-indigo-100 text-indigo-900'
            }`}>
              {currentGoal.isCompleted ? '🎉 목표 달성 완료!' : '🔥 이번 주 도전자'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setGoalText(currentGoal.goalText);
                  setIsEditing(true);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                수정
              </button>

              <button
                onClick={() => {
                  if (confirm('이번 주 목표를 삭제하시겠습니까?')) {
                    deleteWeeklyGoal(currentGoal.id);
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                title="목표 삭제"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              "{currentGoal.goalText}"
            </h3>

            <button
              onClick={() => toggleGoalCompletion(currentGoal.id)}
              className={`p-3 rounded-2xl transition-transform hover:scale-110 flex items-center justify-center shrink-0 ${
                currentGoal.isCompleted
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-slate-300 border-2 border-slate-200 hover:border-emerald-400 hover:text-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-8 h-8" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-indigo-50/40 p-5 rounded-3xl border border-indigo-200">
          <label className="block text-xs font-extrabold text-slate-800">
            이번 주에 꼭 지키고 싶은 나만의 목표를 적어보세요!
          </label>
          <input
            type="text"
            required
            placeholder="예: 수업 시간에 손들고 발표 2회 이상 하기!"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            className="w-full px-4 py-3 text-xs font-bold rounded-2xl border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white"
          />
          <div className="flex items-center justify-end gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 bg-white rounded-xl border border-slate-200"
              >
                취소
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
            >
              목표 등록하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
