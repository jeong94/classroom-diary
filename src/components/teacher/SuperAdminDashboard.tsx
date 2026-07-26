import React from 'react';
import { useClass } from '../../context/ClassContext';
import { CheckCircle, XCircle, School, Users, Clock } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { teachers, schoolClasses, students, approveTeacher, rejectTeacher } = useClass();

  const pendingTeachers = teachers.filter(t => t.status === 'pending');
  const approvedTeachers = teachers.filter(t => t.status === 'approved' && !t.isSuperAdmin);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-indigo-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              👑 최종 관리자 (Super Admin)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">교사 승인 및 전체 학반 관리 센터</h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium">
              교사 가입 신청 승인/거절 및 교사 가입 시 자동 생성된 전국 학반 정보를 통합 관리합니다.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <div className="text-xs text-indigo-300 font-bold">승인 대기 중 교사</div>
            <div className="text-3xl font-black text-amber-300">{pendingTeachers.length}명</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>교사 가입 신청 승인 대기 목록 ({pendingTeachers.length}건)</span>
          </h3>
        </div>

        {pendingTeachers.length === 0 ? (
          <div className="py-8 text-center bg-amber-50/50 rounded-2xl border border-dashed border-amber-200 text-xs text-amber-800 font-bold">
            현재 대기 중인 교사 가입 신청이 없습니다. 🎉
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTeachers.map(teacher => (
              <div
                key={teacher.id}
                className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900">{teacher.name}</span>
                    <span className="text-xs text-slate-500 font-medium">({teacher.email})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="bg-white px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-indigo-600" />
                      {teacher.schoolName}
                    </span>
                    <span className="bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full">
                      {teacher.grade}학년 {teacher.classNum}반
                    </span>
                    <span className="text-[10px] text-slate-400">{teacher.createdAt} 신청</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveTeacher(teacher.id)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs transition-transform hover:scale-105 flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>승인하기</span>
                  </button>
                  <button
                    onClick={() => rejectTeacher(teacher.id)}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shadow-xs transition-transform hover:scale-105 flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>거절하기</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-600" />
            <span>자동 생성된 전체 학반 목록 (6단계: 총 {schoolClasses.length}개 학반)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schoolClasses.map(cls => {
            const classStudents = students.filter(s => s.classInviteCode === cls.inviteCode);
            return (
              <div key={cls.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">{cls.schoolName}</h4>
                    <p className="text-xs font-bold text-indigo-700">{cls.grade}학년 {cls.classNum}반</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-900 font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {classStudents.length}명
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex items-center justify-between">
                    <span>담당 교사:</span>
                    <span className="font-bold text-slate-900">{cls.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>학반 초대코드:</span>
                    <span className="font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300 tracking-wider">
                      {cls.inviteCode}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900">승인 완료된 교사 명부 ({approvedTeachers.length}명)</h3>
        <div className="space-y-2">
          {approvedTeachers.map(t => (
            <div key={t.id} className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">{t.name} 교사</span>
                <span className="text-slate-500">({t.email})</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {t.schoolName} {t.grade}학년 {t.classNum}반
                </span>
              </div>
              <span className="font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                초대코드: {t.inviteCode}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
