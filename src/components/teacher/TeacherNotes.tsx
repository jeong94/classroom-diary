import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import type { TeacherNote } from '../../types';
import { Lock, Plus, Search, Filter, ClipboardCopy, Check } from 'lucide-react';

export const TeacherNotes: React.FC = () => {
  const { students, teacherNotes, addTeacherNote } = useClass();

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<TeacherNote['category']>('학업');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !content.trim()) return;

    addTeacherNote(selectedStudentId, content.trim(), category);
    setContent('');
  };

  const filteredNotes = teacherNotes.filter(note => {
    const student = students.find(s => s.id === note.studentId);
    const matchesSearch =
      (student?.name.includes(searchQuery) || false) ||
      note.content.includes(searchQuery);

    const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
    const matchesStudent = !selectedStudentId || note.studentId === selectedStudentId;

    return matchesSearch && matchesCategory && matchesStudent;
  });

  const handleCopyNote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-5 h-5" />
            <h2 className="text-xl font-extrabold">교사 비공개 관찰 메모</h2>
          </div>
          <p className="text-xs text-slate-300">
            학생별 생활기록부 작성, 상담 및 맞춤형 지도용 비공개 기록입니다. (학생 화면에서는 노출되지 않습니다)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-500" />
            새 관찰 메모 작성
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">대상 학생</label>
              <select
                required
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">분류 카테고리</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['학업', '생활', '상담', '칭찬'] as TeacherNote['category'][]).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                      category === cat
                        ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">관찰 및 상담 내용</label>
              <textarea
                required
                rows={5}
                placeholder="예: 발표에 매우 적극적이며, 친구들이 어려워할 때 먼저 다가가 도 도움을 줌."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              메모 저장하기
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="학생 이름 또는 메모 내용 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              >
                <option value="all">전체 카테고리</option>
                <option value="학업">학업</option>
                <option value="생활">생활</option>
                <option value="상담">상담</option>
                <option value="칭찬">칭찬</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-slate-200 text-slate-400 text-xs">
                저장된 메모가 없습니다.
              </div>
            ) : (
              filteredNotes.map(note => {
                const std = students.find(s => s.id === note.studentId);
                return (
                  <div key={note.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-800">
                          {std?.avatarEmoji || '👤'}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {std ? `${std.studentNumber}번 ${std.name}` : '학생'}
                        </span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {note.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{note.date}</span>
                        <button
                          onClick={() => handleCopyNote(note.content, note.id)}
                          className="p-1 text-slate-400 hover:text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                          title="생기부 참고 텍스트 복사"
                        >
                          {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {note.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
