import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { BookOpen, Star, Plus, Book, Trash2 } from 'lucide-react';
import { getTodayYMD } from '../../utils/dateUtils';

export const ReadingSection: React.FC = () => {
  const { selectedStudent, readingLogs, addReadingLog, deleteReadingLog } = useClass();

  const [showAddModal, setShowAddModal] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [pagesRead, setPagesRead] = useState<number | ''>('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [date, setDate] = useState(getTodayYMD());

  if (!selectedStudent) return null;

  const myLogs = readingLogs.filter(l => l.studentId === selectedStudent.id);
  const totalBooks = myLogs.length;
  const totalPages = myLogs.reduce((acc, l) => acc + (l.pagesRead || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;

    addReadingLog(
      bookTitle.trim(),
      date,
      Number(pagesRead) || 0,
      rating,
      review.trim()
    );

    setBookTitle('');
    setPagesRead('');
    setRating(5);
    setReview('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900 shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">나의 독서기록장 📚</h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                총 {totalBooks}권
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">읽은 책의 마음을 자유롭게 적어보세요</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm rounded-2xl shadow-xs transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>새 독서기록 작성</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-center">
          <span className="text-xs font-bold text-amber-800">읽은 책 수</span>
          <div className="text-2xl font-black text-amber-950 mt-1">{totalBooks}권</div>
        </div>
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-center">
          <span className="text-xs font-bold text-amber-800">총 읽은 페이지</span>
          <div className="text-2xl font-black text-amber-950 mt-1">{totalPages}쪽</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">내가 작성한 독서 기록 ({myLogs.length}건)</h3>

        {myLogs.length === 0 ? (
          <div className="text-center py-10 bg-amber-50/30 rounded-2xl border border-dashed border-amber-200 text-xs text-slate-400 space-y-2">
            <Book className="w-8 h-8 text-amber-300 mx-auto" />
            <p>아직 작성한 독서기록이 없습니다. 오른쪽 위 버튼으로 첫 기록을 남겨보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myLogs.map((log) => (
              <div key={log.id} className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 space-y-2 relative group hover:border-amber-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      {log.date}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">{log.bookTitle}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= log.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`'${log.bookTitle}' 독서 기록을 삭제하시겠습니까?`)) {
                          deleteReadingLog(log.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="독서기록 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/80 p-3 rounded-xl border border-amber-100">
                  {log.review}
                </p>

                {log.pagesRead > 0 && (
                  <div className="text-[10px] text-slate-400 font-semibold text-right">
                    📖 {log.pagesRead}쪽 읽음
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-amber-200">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">새 독서기록 남기기 📖</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">책 제목 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 해리 포터와 마법사의 돌"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">읽은 날짜</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">읽은 쪽수 (선택)</label>
                  <input
                    type="number"
                    placeholder="예: 120"
                    value={pagesRead}
                    onChange={(e) => setPagesRead(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">별점 평가</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">독후감 / 느낀 점</label>
                <textarea
                  rows={4}
                  required
                  placeholder="책을 읽고 느낀 점이나 인상 깊었던 구절을 써보세요."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-xs"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
