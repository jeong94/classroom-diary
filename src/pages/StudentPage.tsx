import React, { useState } from 'react';
import { useClass } from '../context/ClassContext';
import { ReadingSection } from '../components/student/ReadingSection';
import { EmotionSection } from '../components/student/EmotionSection';
import { DutySection } from '../components/student/DutySection';
import { GoalSection } from '../components/student/GoalSection';
import { PraiseSection } from '../components/student/PraiseSection';
import { StudentProfileModal } from '../components/profile/StudentProfileModal';
import { Award, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentPage: React.FC = () => {
  const { selectedStudent, studentBadges } = useClass();
  const [showProfile, setShowProfile] = useState(false);

  if (!selectedStudent) return null;

  const myBadgesCount = studentBadges.filter(b => b.studentId === selectedStudent.id).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-pink-100 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-white shrink-0"
            style={{ backgroundColor: selectedStudent.avatarBgColor }}
          >
            {selectedStudent.avatarEmoji}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="bg-white/90 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full text-xs border border-amber-300">
                {selectedStudent.studentNumber}번
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                {selectedStudent.name}의 성장기록장
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 italic">
              "{selectedStudent.motto || '오늘도 스스로 다짐하고 성장하기!'}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs sm:text-sm rounded-full shadow-xs border border-amber-200 transition-all hover:scale-105"
          >
            <User className="w-4 h-4 text-amber-600" />
            <span>내 프로필 보기</span>
          </button>

          <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3.5 py-2 rounded-full font-black text-xs sm:text-sm shadow-xs">
            <Award className="w-4 h-4" />
            <span>배지 {myBadgesCount}개</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <ReadingSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <EmotionSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <DutySection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <GoalSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <PraiseSection />
        </motion.div>
      </div>

      {showProfile && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};
