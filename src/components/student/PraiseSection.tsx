import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { MessageSquareHeart, Send, Trash2 } from 'lucide-react';

export const PraiseSection: React.FC = () => {
  const { selectedStudent, students, praiseCards, addPraiseCard, deletePraiseCard } = useClass();

  const [toStudentId, setToStudentId] = useState('');
  const [content, setContent] = useState('');
  const [cardStyle, setCardStyle] = useState<'pink' | 'yellow' | 'blue' | 'purple' | 'green'>('yellow');

  if (!selectedStudent) return null;

  const myPraiseReceived = praiseCards.filter(p => p.toStudentId === selectedStudent.id);
  const myPraiseSent = praiseCards.filter(p => p.fromStudentId === selectedStudent.id);
  const otherStudents = students.filter(s => s.id !== selectedStudent.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toStudentId || !content.trim()) return;

    const targetStudent = students.find(s => s.id === toStudentId);
    if (!targetStudent) return;

    addPraiseCard(
      targetStudent.id,
      targetStudent.name,
      content.trim(),
      cardStyle
    );

    setToStudentId('');
    setContent('');
  };

  const styleMap = {
    yellow: 'bg-amber-100 border-amber-300 text-amber-950',
    pink: 'bg-rose-100 border-rose-300 text-rose-950',
    blue: 'bg-sky-100 border-sky-300 text-sky-950',
    purple: 'bg-purple-100 border-purple-300 text-purple-950',
    green: 'bg-emerald-100 border-emerald-300 text-emerald-950',
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">칭찬 릴레이 💌</h2>
              <span className="bg-rose-100 text-rose-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                받은 칭찬 {myPraiseReceived.length}개
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">친구들에게 따뜻한 칭찬과 응원의 카드를 선물하세요</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-rose-50/40 p-5 rounded-3xl border border-rose-200">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
          <Send className="w-4 h-4 text-rose-500" />
          <span>친구에게 칭찬 카드 보내기</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">칭찬할 친구 선택 *</label>
            <select
              required
              value={toStudentId}
              onChange={(e) => setToStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-rose-300 focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
            >
              <option value="">친구를 선택하세요</option>
              {otherStudents.map(s => (
                <option key={s.id} value={s.id}>{s.studentNumber}번 {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">카드 색상 선택</label>
            <div className="flex items-center gap-2 pt-1">
              {(['yellow', 'pink', 'blue', 'purple', 'green'] as const).map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setCardStyle(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    color === 'yellow' ? 'bg-amber-300' :
                    color === 'pink' ? 'bg-rose-300' :
                    color === 'blue' ? 'bg-sky-300' :
                    color === 'purple' ? 'bg-purple-300' : 'bg-emerald-300'
                  } ${cardStyle === color ? 'scale-125 border-slate-900 shadow-xs' : 'border-transparent hover:scale-110'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">칭찬 내용 *</label>
          <textarea
            rows={3}
            required
            placeholder="친구에게 고마웠던 일이나 훌륭한 점을 적어보세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-rose-300 focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shadow-xs transition-transform hover:scale-105"
          >
            칭찬 카드 보내기 💌
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">내가 받은 칭찬 카드 ({myPraiseReceived.length}장)</h3>
        {myPraiseReceived.length === 0 ? (
          <div className="text-center py-8 bg-rose-50/20 rounded-2xl border border-dashed border-rose-200 text-xs text-slate-400">
            아직 받은 칭찬 카드가 없습니다. 먼저 친구에게 따뜻한 칭찬 카드를 남겨보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {myPraiseReceived.map(card => (
              <div key={card.id} className={`p-4 rounded-2xl border-2 shadow-2xs space-y-2 ${styleMap[card.cardStyle || 'yellow']}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{card.fromStudentName} 친구가</span>
                  <span className="text-[10px] opacity-70">{card.createdAt}</span>
                </div>
                <p className="text-xs font-bold leading-relaxed">"{card.content}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-extrabold text-slate-900">내가 보낸 칭찬 카드 ({myPraiseSent.length}장)</h3>
        <div className="space-y-2">
          {myPraiseSent.map(card => (
            <div key={card.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-medium">
              <div>
                <span className="font-bold text-slate-900">{card.toStudentName}</span> 친구에게: "{card.content}"
              </div>

              <button
                onClick={() => {
                  if (confirm('보낸 칭찬 카드를 삭제하시겠습니까?')) {
                    deletePraiseCard(card.id);
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors shrink-0 ml-2"
                title="칭찬 카드 삭제"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
