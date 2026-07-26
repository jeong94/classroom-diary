import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import type { PraiseCard } from '../../types';
import { Heart, Send, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PraiseSection: React.FC = () => {
  const { selectedStudent, students, praiseCards, addPraiseCard } = useClass();

  const [isOpen, setIsOpen] = useState(false);
  const [toStudentId, setToStudentId] = useState('');
  const [content, setContent] = useState('');
  const [cardStyle, setCardStyle] = useState<PraiseCard['cardStyle']>('pink');
  const [tab, setTab] = useState<'received' | 'sent'>('received');

  if (!selectedStudent) return null;

  const classmates = students.filter(s => s.id !== selectedStudent.id);
  const receivedCards = praiseCards.filter(p => p.toStudentId === selectedStudent.id);
  const sentCards = praiseCards.filter(p => p.fromStudentId === selectedStudent.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toStudentId || !content.trim()) return;

    const targetStudent = students.find(s => s.id === toStudentId);
    if (!targetStudent) return;

    addPraiseCard(targetStudent.id, targetStudent.name, content.trim(), cardStyle);

    setToStudentId('');
    setContent('');
    setIsOpen(false);
  };

  const getStyleClasses = (style?: PraiseCard['cardStyle']) => {
    switch (style) {
      case 'yellow':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'blue':
        return 'bg-sky-50 border-sky-200 text-sky-900';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-900';
      case 'green':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'pink':
      default:
        return 'bg-rose-50 border-rose-200 text-rose-900';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-hover transition-all border border-rose-100/70 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-800 shadow-inner">
              <Heart className="w-6 h-6 fill-rose-400 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">⑤ 칭찬 릴레이</h3>
              <p className="text-xs text-slate-500 font-medium">따뜻한 말 한마디로 전하는 마음</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs rounded-full shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>칭찬 쓰기</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setTab('received')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              tab === 'received' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            내가 받은 칭찬 ({receivedCards.length})
          </button>
          <button
            onClick={() => setTab('sent')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              tab === 'sent' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            내가 보낸 칭찬 ({sentCards.length})
          </button>
        </div>

        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {tab === 'received' ? (
            receivedCards.length === 0 ? (
              <div className="text-center py-6 bg-rose-50/40 rounded-2xl border border-dashed border-rose-200">
                <Heart className="w-7 h-7 text-rose-300 mx-auto mb-1 opacity-70" />
                <p className="text-xs text-slate-400 font-medium">아직 받은 칭찬 카드가 없어요.</p>
              </div>
            ) : (
              receivedCards.map(card => (
                <div
                  key={card.id}
                  className={`p-3 rounded-2xl border ${getStyleClasses(card.cardStyle)} shadow-2xs relative`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-rose-700">From. {card.fromStudentName}</span>
                    <span className="text-[10px] opacity-60 font-normal">{card.createdAt}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">"{card.content}"</p>
                </div>
              ))
            )
          ) : (
            sentCards.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Send className="w-7 h-7 text-slate-300 mx-auto mb-1 opacity-70" />
                <p className="text-xs text-slate-400 font-medium">친구에게 첫 칭찬을 보내보세요!</p>
              </div>
            ) : (
              sentCards.map(card => (
                <div
                  key={card.id}
                  className={`p-3 rounded-2xl border ${getStyleClasses(card.cardStyle)} shadow-2xs`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-rose-700">To. {card.toStudentName}</span>
                    <span className="text-[10px] opacity-60 font-normal">{card.createdAt}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">"{card.content}"</p>
                </div>
              ))
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                칭찬 카드 보내기
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">칭찬할 친구 선택</label>
                  <select
                    required
                    value={toStudentId}
                    onChange={e => setToStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  >
                    <option value="">-- 친구를 선택하세요 --</option>
                    {classmates.map(std => (
                      <option key={std.id} value={std.id}>
                        {std.studentNumber}번 {std.name} {std.avatarEmoji}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">카드 색상 스타일</label>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'pink', color: 'bg-rose-200 border-rose-300' },
                      { id: 'yellow', color: 'bg-amber-200 border-amber-300' },
                      { id: 'blue', color: 'bg-sky-200 border-sky-300' },
                      { id: 'purple', color: 'bg-purple-200 border-purple-300' },
                      { id: 'green', color: 'bg-emerald-200 border-emerald-300' },
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setCardStyle(st.id as PraiseCard['cardStyle'])}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${st.color} ${
                          cardStyle === st.id ? 'scale-125 shadow-md border-slate-800' : 'hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">칭찬 내용</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="예: ○○가 청소를 도와주었어요, 체육 시간에 양보해줘서 고마워!"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                    className="px-5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>카드 전달하기</span>
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
