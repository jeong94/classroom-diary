import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { Copy, Check, Users } from 'lucide-react';

export const StudentInviteManager: React.FC = () => {
  const { currentTeacher, activeInviteCode, students } = useClass();
  const [copied, setCopied] = useState(false);

  const inviteCode = currentTeacher ? currentTeacher.inviteCode : activeInviteCode;
  const myStudents = students.filter(s => s.classInviteCode === inviteCode);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="bg-white/90 text-amber-900 text-xs font-black px-3 py-1 rounded-full shadow-xs">
            2단계: 학생 초대 및 학반 코드 관리
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            우리 반 학생 초대하기 💌
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-900/90">
            학생들에게 학반 초대 코드와 학학년/반 정보를 안내하면 학생들이 직접 실명으로 가입 및 접속할 수 있습니다.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-md text-center shrink-0 min-w-[220px]">
          <span className="text-xs font-bold text-slate-500 block mb-1">우리 반 학반 초대 코드</span>
          <div className="text-3xl font-black text-amber-600 tracking-wider mb-2 font-mono">
            {inviteCode}
          </div>
          <button
            onClick={handleCopyCode}
            className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '초대코드 복사됨!' : '초대코드 복사하기'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>초대 코드로 입장한 학급 학생 목록 ({myStudents.length}명)</span>
          </h3>
        </div>

        {myStudents.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
            아직 초대 코드로 입장한 학생이 없습니다. 학생들에게 초대 코드 <b>{inviteCode}</b>를 안내해주세요!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {myStudents.map(s => (
              <div key={s.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0"
                  style={{ backgroundColor: s.avatarBgColor }}
                >
                  {s.avatarEmoji}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">{s.name}</div>
                  <div className="text-[10px] font-bold text-slate-400">{s.studentNumber}번</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
