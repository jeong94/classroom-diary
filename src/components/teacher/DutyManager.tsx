import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { ShieldCheck, UserPlus, Settings } from 'lucide-react';

export const DutyManager: React.FC = () => {
  const { students, duties, addStudent } = useClass();

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState<number | ''>(students.length + 1);
  const [newEmoji, setNewEmoji] = useState('🐯');
  const [newBg, setNewBg] = useState('#FEF08A');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addStudent(
      newName.trim(),
      Number(newNum) || students.length + 1,
      newEmoji,
      newBg
    );

    setNewName('');
    setNewNum(students.length + 2);
  };

  const emojiOptions = ['🦁', '🐰', '🐻', '🐱', '🦊', '🦄', '🐶', '🐣', '🐯', '🐼', '🐨', '🐸'];
  const colorOptions = ['#FEF08A', '#FBCFE8', '#BAE6FD', '#DDD6FE', '#FFEDD5', '#BBF7D0', '#FFE4E6', '#FEF9C3'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between border border-slate-700">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-300" />
            학급 및 역할 관리
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            새로운 학생을 등록하거나 1인 1역 과제 설정을 관리할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-600" />
            신규 학생 등록
          </h3>

          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">번호</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newNum}
                  onChange={e => setNewNum(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">이름</label>
                <input
                  type="text"
                  required
                  placeholder="예: 박준서"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">아바타 캐릭터 선택</label>
              <div className="flex flex-wrap gap-2">
                {emojiOptions.map(emo => (
                  <button
                    key={emo}
                    type="button"
                    onClick={() => setNewEmoji(emo)}
                    className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-all ${
                      newEmoji === emo ? 'bg-indigo-100 border-2 border-indigo-500 scale-110 shadow-xs' : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">아바타 배경색</label>
              <div className="flex gap-2">
                {colorOptions.map(clr => (
                  <button
                    key={clr}
                    type="button"
                    onClick={() => setNewBg(clr)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      newBg === clr ? 'scale-125 border-slate-900 shadow-xs' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: clr }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              학생 추가하기
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            등록된 1인 1역 목록 ({duties.length}개)
          </h3>

          <div className="space-y-2.5">
            {duties.map(d => (
              <div key={d.id} className="bg-emerald-50/60 border border-emerald-200/70 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{d.name}</h4>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  활성 과제
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
