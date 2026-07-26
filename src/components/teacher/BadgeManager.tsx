import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { Award, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BadgeManager: React.FC = () => {
  const { students, badges, studentBadges, awardBadgeToStudent } = useClass();

  const [isOpen, setIsOpen] = useState(false);
  const [targetStudentId, setTargetStudentId] = useState('');
  const [targetBadgeId, setTargetBadgeId] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudentId || !targetBadgeId) return;

    awardBadgeToStudent(targetStudentId, targetBadgeId, customReason.trim());

    setTargetStudentId('');
    setTargetBadgeId('');
    setCustomReason('');
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-200" />
            배지 시스템 관리
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            활동 조건 달성 시 자동 수여되며, 선생님께서 직접 특별 배지를 부여할 수도 있습니다.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-white text-amber-950 font-bold text-xs rounded-full shadow-md hover:bg-amber-50 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Gift className="w-4 h-4 text-amber-600" />
          <span>수동 배지 수여</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {badges.map(b => (
          <div key={b.id} className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-soft text-center space-y-2">
            <span className="text-3xl block">{b.icon}</span>
            <div className="font-extrabold text-sm text-slate-900">{b.name}</div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{b.description}</p>
            <span className="inline-block text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-300">
              {b.criteria}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <h3 className="font-bold text-slate-900 text-base">학생별 배지 획득 현황</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {students.map(s => {
            const sBadges = studentBadges.filter(sb => sb.studentId === s.id);
            return (
              <div key={s.id} className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-inner"
                      style={{ backgroundColor: s.avatarBgColor }}
                    >
                      {s.avatarEmoji}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {s.studentNumber}번 {s.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {sBadges.length}개
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {sBadges.length === 0 ? (
                    <span className="text-[10px] text-slate-400">아직 배지 없음</span>
                  ) : (
                    sBadges.map(sb => {
                      const badgeDef = badges.find(b => b.id === sb.badgeId);
                      return (
                        <span
                          key={sb.id}
                          className="bg-white border border-amber-200 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-2xs"
                          title={sb.customReason || badgeDef?.description}
                        >
                          <span>{badgeDef?.icon || '🎖️'}</span>
                          <span>{badgeDef?.name || '배지'}</span>
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                선생님의 특별 배지 부여
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">대상 학생</label>
                  <select
                    required
                    value={targetStudentId}
                    onChange={e => setTargetStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  >
                    <option value="">-- 학생 선택 --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.studentNumber}번 {s.name} {s.avatarEmoji}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">수여할 배지</label>
                  <select
                    required
                    value={targetBadgeId}
                    onChange={e => setTargetBadgeId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  >
                    <option value="">-- 배지 선택 --</option>
                    {badges.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.icon} {b.name} ({b.criteria})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">수여 사유 (선택)</label>
                  <input
                    type="text"
                    placeholder="예: 학급 주간 칭찬왕 모범상"
                    value={customReason}
                    onChange={e => setCustomReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full shadow-sm"
                  >
                    배지 수여 및 축하 🎉
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
