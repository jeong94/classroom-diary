import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { Trophy, Heart, Target, BookOpen, Crown, Medal } from 'lucide-react';

export const StatsView: React.FC = () => {
  const { students, getStudentStats } = useClass();

  const [activeTab, setActiveTab] = useState<'goals' | 'praise' | 'reading'>('goals');

  const studentStatsList = students.map(s => ({
    student: s,
    stats: getStudentStats(s.id),
  }));

  const sortedByGoals = [...studentStatsList].sort((a, b) => b.stats.completedGoals - a.stats.completedGoals);
  const sortedByPraiseReceived = [...studentStatsList].sort((a, b) => b.stats.praisesReceived - a.stats.praisesReceived);
  const sortedByReading = [...studentStatsList].sort((a, b) => b.stats.totalBooks - a.stats.totalBooks);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            목표 및 칭찬 성장 통계
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            학생별 이번 주 목표 달성 횟수, 연속 달성률, 칭찬 리더보드를 확인하세요.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs max-w-md font-bold text-xs">
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'goals' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>목표 달성 통계</span>
        </button>
        <button
          onClick={() => setActiveTab('praise')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'praise' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>칭찬 랭킹</span>
        </button>
        <button
          onClick={() => setActiveTab('reading')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'reading' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>독서 리더보드</span>
        </button>
      </div>

      {activeTab === 'goals' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500">
                <th className="pb-3 pl-2">순위</th>
                <th className="pb-3">학생</th>
                <th className="pb-3 text-center">완료 목표 수</th>
                <th className="pb-3 text-center">연속 달성(Streak)</th>
                <th className="pb-3 text-center">누적 달성률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedByGoals.map((item, index) => (
                <tr key={item.student.id} className="hover:bg-slate-50">
                  <td className="py-3 pl-2 font-bold text-slate-700">
                    {index === 0 ? <Crown className="w-4 h-4 text-amber-400 inline" /> : index + 1}
                  </td>
                  <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: item.student.avatarBgColor }}
                    >
                      {item.student.avatarEmoji}
                    </span>
                    <span>{item.student.studentNumber}번 {item.student.name}</span>
                  </td>
                  <td className="py-3 text-center font-black text-sky-900">{item.stats.completedGoals}개</td>
                  <td className="py-3 text-center font-bold text-emerald-600">🔥 {item.stats.goalStreak}회</td>
                  <td className="py-3 text-center font-bold text-purple-700">
                    <span className="bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                      {item.stats.goalCompletionRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'praise' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500">
                <th className="pb-3 pl-2">순위</th>
                <th className="pb-3">학생</th>
                <th className="pb-3 text-center">받은 칭찬</th>
                <th className="pb-3 text-center">보낸 칭찬</th>
                <th className="pb-3 text-center">칭찬 영향력 점수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedByPraiseReceived.map((item, index) => (
                <tr key={item.student.id} className="hover:bg-slate-50">
                  <td className="py-3 pl-2 font-bold text-slate-700">
                    {index === 0 ? <Medal className="w-4 h-4 text-rose-500 inline" /> : index + 1}
                  </td>
                  <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: item.student.avatarBgColor }}
                    >
                      {item.student.avatarEmoji}
                    </span>
                    <span>{item.student.studentNumber}번 {item.student.name}</span>
                  </td>
                  <td className="py-3 text-center font-black text-rose-600">💖 {item.stats.praisesReceived}개</td>
                  <td className="py-3 text-center font-bold text-sky-700">💌 {item.stats.praisesGiven}개</td>
                  <td className="py-3 text-center font-bold text-amber-700">
                    {item.stats.praisesReceived * 10 + item.stats.praisesGiven * 5}점
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reading' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500">
                <th className="pb-3 pl-2">순위</th>
                <th className="pb-3">학생</th>
                <th className="pb-3 text-center">읽은 책 권수</th>
                <th className="pb-3 text-center">누적 읽은 쪽수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedByReading.map((item, index) => (
                <tr key={item.student.id} className="hover:bg-slate-50">
                  <td className="py-3 pl-2 font-bold text-slate-700">
                    {index === 0 ? <Crown className="w-4 h-4 text-amber-500 inline" /> : index + 1}
                  </td>
                  <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: item.student.avatarBgColor }}
                    >
                      {item.student.avatarEmoji}
                    </span>
                    <span>{item.student.studentNumber}번 {item.student.name}</span>
                  </td>
                  <td className="py-3 text-center font-black text-amber-900">📚 {item.stats.totalBooks}권</td>
                  <td className="py-3 text-center font-bold text-slate-700">{item.stats.totalPages}p</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
