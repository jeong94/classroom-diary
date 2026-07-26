import React, { useState } from 'react';
import { useClass } from '../context/ClassContext';
import { ClassDashboard } from '../components/teacher/ClassDashboard';
import { BadgeManager } from '../components/teacher/BadgeManager';
import { StatsView } from '../components/teacher/StatsView';
import { DutyManager } from '../components/teacher/DutyManager';
import { StudentInviteManager } from '../components/teacher/StudentInviteManager';
import { StudentProfileModal } from '../components/profile/StudentProfileModal';
import type { Student } from '../types';
import { LayoutDashboard, Users, Award, Trophy, Settings, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeacherPage: React.FC = () => {
  const { students, getStudentStats, studentBadges } = useClass();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);

  // 생기부 관찰 메모 탭 제거 per user request
  const tabs = [
    { id: 'dashboard', label: '학급 대시보드', icon: LayoutDashboard },
    { id: 'invite', label: '학생 초대 (초대코드)', icon: Key },
    { id: 'students', label: '학생 목록', icon: Users },
    { id: 'badges', label: '배지 관리', icon: Award },
    { id: 'stats', label: '목표 & 칭찬 통계', icon: Trophy },
    { id: 'settings', label: '학급 설정', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-purple-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-800 border border-slate-200/70'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'dashboard' && <ClassDashboard />}
        {activeTab === 'invite' && <StudentInviteManager />}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">학급 학생 목록 ({students.length}명)</h2>
              <span className="text-xs text-slate-500 font-medium">학생카드를 클릭하여 상세 프로필을 확인하세요.</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {students.map((student) => {
                const stats = getStudentStats(student.id);
                const badgeCount = studentBadges.filter(b => b.studentId === student.id).length;

                return (
                  <div
                    key={student.id}
                    onClick={() => setProfileStudent(student)}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {student.studentNumber}번
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        배지 {badgeCount}개
                      </span>
                    </div>

                    <div className="text-center space-y-1 py-1">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: student.avatarBgColor }}
                      >
                        {student.avatarEmoji}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{student.name}</h3>
                    </div>

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 text-center text-[10px] text-slate-500 font-semibold gap-1">
                      <div>독서: <span className="text-amber-800 font-bold">{stats.totalBooks}권</span></div>
                      <div>1인1역: <span className="text-emerald-700 font-bold">{stats.dutyCompletions}회</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'badges' && <BadgeManager />}
        {activeTab === 'stats' && <StatsView />}
        {activeTab === 'settings' && <DutyManager />}
      </motion.div>

      {profileStudent && (
        <StudentProfileModal
          student={profileStudent}
          onClose={() => setProfileStudent(null)}
        />
      )}
    </div>
  );
};
