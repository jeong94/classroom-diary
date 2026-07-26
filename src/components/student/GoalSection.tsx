import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { getMondayOfWeek } from '../../utils/dateUtils';
import { Target, CheckCircle2, Edit2, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const GoalSection: React.FC = () => {
  const { selectedStudent, weeklyGoals, setWeeklyGoal, toggleGoalCompletion } = useClass();

  const monday = getMondayOfWeek();
  const currentGoal = selectedStudent
    ? weeklyGoals.find(g => g.studentId === selectedStudent.id && g.weekStartDate === monday)
    : null;

  const [goalText, setGoalText] = useState(currentGoal?.goalText || '');
  const [isEditing, setIsEditing] = useState(!currentGoal);

  if (!selectedStudent) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    setWeeklyGoal(goalText.trim());
    setIsEditing(false);
  };

  const sampleGoals = [
    '수업시간 손들고 발표하기 ✋',
    '책 2권 이상 읽기 📚',
    '친구에게 매일 칭찬 한마디 💖',
    '아침 자습 시간 지각하지 않기 ⏰',
    '급식 남기지 않고 맛있게 먹기 🍱',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-hover transition-all border border-sky-100/70 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-800 shadow-inner">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">④ 이번 주 목표</h3>
              <p className="text-xs text-slate-500 font-medium">스스로 약속하고 지키는 주간 다짐</p>
            </div>
          </div>

          {currentGoal && !isEditing && (
            <button
              onClick={() => {
                setGoalText(currentGoal.goalText);
                setIsEditing(true);
              }}
              className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors"
              title="목표 수정"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1.5">
                이번 주 목표를 작성해보세요.
              </label>
              <input
                type="text"
                required
                placeholder="예: 수업시간 손들기, 책 2권 읽기"
                value={goalText}
                onChange={e => setGoalText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold text-sky-800 block mb-1">추천 목표 예시:</span>
              <div className="flex flex-wrap gap-1">
                {sampleGoals.map((sg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGoalText(sg)}
                    className="text-[10px] bg-white border border-sky-200 hover:bg-sky-100 text-sky-900 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {sg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              {currentGoal && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  취소
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-xs"
              >
                목표 등록하기
              </button>
            </div>
          </form>
        ) : currentGoal ? (
          <div className={`p-4 rounded-2xl border transition-all ${
            currentGoal.isCompleted
              ? 'bg-gradient-to-r from-sky-50 to-emerald-50 border-emerald-300 shadow-xs'
              : 'bg-sky-50/70 border-sky-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold bg-white text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
                  이번 주 다짐
                </span>
                <p className="text-sm font-bold text-slate-900 mt-2 leading-relaxed">
                  "{currentGoal.goalText}"
                </p>
                {currentGoal.isCompleted && (
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 mt-2">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span>목표 달성 성공! 축하합니다! 🎉 ({currentGoal.completedAt})</span>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleGoalCompletion(currentGoal.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition-all ${
                  currentGoal.isCompleted
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-sky-400 hover:bg-sky-500 text-slate-950 shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{currentGoal.isCompleted ? '달성 완료! 🎉' : '달성 체크!'}</span>
              </motion.button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
