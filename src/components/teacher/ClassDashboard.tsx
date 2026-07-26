import React from 'react';
import { useClass } from '../../context/ClassContext';
import { EMOTIONS, getTodayYMD, getMondayOfWeek } from '../../utils/dateUtils';
import { BookOpen, Smile, ShieldCheck, Target, Heart, Users } from 'lucide-react';

export const ClassDashboard: React.FC = () => {
  const {
    students,
    readingLogs,
    emotionRecords,
    dutyCompletions,
    weeklyGoals,
    praiseCards,
  } = useClass();

  const todayStr = getTodayYMD();
  const mondayStr = getMondayOfWeek();

  const todayEmotions = emotionRecords.filter(e => e.date === todayStr);
  const emotionCounts = EMOTIONS.map(emo => ({
    ...emo,
    count: todayEmotions.filter(e => e.emotion === emo.id).length,
  }));

  const totalBooksRead = readingLogs.length;
  const totalPagesRead = readingLogs.reduce((acc, curr) => acc + (curr.pagesRead || 0), 0);

  const todayDutyCount = dutyCompletions.filter(d => d.date === todayStr).length;
  const dutyRate = students.length > 0 ? Math.round((todayDutyCount / students.length) * 100) : 0;

  const currentWeekGoals = weeklyGoals.filter(g => g.weekStartDate === mondayStr);
  const completedGoalsCount = currentWeekGoals.filter(g => g.isCompleted).length;
  const goalRate = currentWeekGoals.length > 0 ? Math.round((completedGoalsCount / currentWeekGoals.length) * 100) : 0;

  const totalPraises = praiseCards.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
            학급 통계 현황
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            6학년 1반 한눈에 보는 우리반 성장 리포트
          </h2>
          <p className="text-purple-100 text-xs sm:text-sm font-medium">
            전체 학생 {students.length}명의 독서, 감정, 1인1역, 주간 목표 및 칭찬 활동 현황입니다.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0">
          <Users className="w-8 h-8 text-amber-300" />
          <div>
            <div className="text-xs text-purple-200 font-medium">등록 학생 수</div>
            <div className="text-2xl font-black text-white">{students.length}명</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">누적 독서량</span>
            <BookOpen className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalBooksRead}권</div>
          <p className="text-xs text-amber-700 font-semibold mt-1">총 {totalPagesRead.toLocaleString()}페이지 읽음</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">오늘 1인 1역 참여율</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{dutyRate}%</div>
          <p className="text-xs text-emerald-700 font-semibold mt-1">오늘 {todayDutyCount}명 완료</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">이번 주 목표 달성률</span>
            <Target className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{goalRate}%</div>
          <p className="text-xs text-sky-700 font-semibold mt-1">{completedGoalsCount}/{currentWeekGoals.length}명 달성 완료</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">전체 칭찬 오간 수</span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalPraises}건</div>
          <p className="text-xs text-rose-700 font-semibold mt-1">따뜻한 마음 나누는 중</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-base">오늘 우리 반 감정 분포 ({todayStr})</h3>
          </div>
          <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            오늘 참여기록 {todayEmotions.length}명
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {emotionCounts.map(emo => (
            <div key={emo.id} className="bg-purple-50/50 border border-purple-100 rounded-2xl p-3 text-center flex flex-col items-center">
              <span className="text-3xl mb-1">{emo.emoji}</span>
              <span className="text-xs font-bold text-slate-800">{emo.label}</span>
              <span className="text-sm font-black text-purple-900 mt-1">{emo.count}명</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
