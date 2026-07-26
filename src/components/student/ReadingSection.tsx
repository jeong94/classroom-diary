import React, { useState } from 'react';
import { useClass } from '../../context/ClassContext';
import { getTodayYMD } from '../../utils/dateUtils';
import { BookOpen, Star, Plus, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReadingSection: React.FC = () => {
  const { selectedStudent, readingLogs, addReadingLog } = useClass();

  const [isOpen, setIsOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [date, setDate] = useState(getTodayYMD());
  const [pagesRead, setPagesRead] = useState<number | ''>(50);
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState('');

  if (!selectedStudent) return null;

  const myLogs = readingLogs.filter(l => l.studentId === selectedStudent.id);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const totalBooksYear = myLogs.filter(l => new Date(l.date).getFullYear() === currentYear).length;
  const totalBooksMonth = myLogs.filter(l => {
    const d = new Date(l.date);
    return d.getFullYear() === currentYear && (d.getMonth() + 1) === currentMonth;
  }).length;
  const cumulativePages = myLogs.reduce((acc, curr) => acc + (curr.pagesRead || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !review.trim()) return;

    addReadingLog(
      bookTitle.trim(),
      date,
      Number(pagesRead) || 0,
      rating,
      review.trim()
    );

    setBookTitle('');
    setReview('');
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-hover transition-all border border-amber-100/70 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">① 독서기록</h3>
              <p className="text-xs text-slate-500 font-medium">마음의 양식을 쌓아가는 독서 여정</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-full shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>기록하기</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 my-4 bg-amber-50/60 p-3 rounded-2xl border border-amber-200/50">
          <div className="text-center">
            <div className="text-[11px] text-amber-800 font-semibold">올해 읽은 책</div>
            <div className="text-base font-extrabold text-amber-950">{totalBooksYear}권</div>
          </div>
          <div className="text-center border-x border-amber-200/60">
            <div className="text-[11px] text-amber-800 font-semibold">이번 달 독서</div>
            <div className="text-base font-extrabold text-amber-950">{totalBooksMonth}권</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-amber-800 font-semibold">누적 페이지</div>
            <div className="text-base font-extrabold text-amber-950">{cumulativePages}p</div>
          </div>
        </div>

        <div className="space-y-2.5 mt-2">
          {myLogs.length === 0 ? (
            <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Book className="w-8 h-8 text-amber-300 mx-auto mb-1 opacity-70" />
              <p className="text-xs text-slate-400 font-medium">첫 번째 독서기록을 남겨보세요!</p>
            </div>
          ) : (
            myLogs.slice(0, 2).map((log) => (
              <div key={log.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-start gap-3">
                <div className="w-9 h-11 bg-amber-200/80 rounded-lg flex items-center justify-center shrink-0 shadow-xs border border-amber-300 text-amber-900 font-bold text-xs">
                  📖
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{log.bookTitle}</h4>
                    <span className="text-[10px] text-slate-400">{log.date}</span>
                  </div>
                  <div className="flex items-center gap-1 my-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= log.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                    <span className="text-[10px] text-amber-800 font-bold ml-1">{log.pagesRead}p</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">"{log.review}"</p>
                </div>
              </div>
            ))
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
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                새 독서기록 작성하기
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">책 제목</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 해리 포터와 마법사의 돌"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">읽은 날짜</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">읽은 쪽수(페이지)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={pagesRead}
                      onChange={(e) => setPagesRead(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">별점</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-700 ml-2">{rating}점</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">한 줄 소감</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="책을 읽고 느낀 점을 간단히 적어보세요."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
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
                    className="px-5 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-full shadow-sm"
                  >
                    저장하기
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
