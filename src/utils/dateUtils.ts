import type { EmotionOption } from '../types';

export const EMOTIONS: EmotionOption[] = [
  { id: 'happy', emoji: '😀', label: '행복해요', color: '#EAB308', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'joy', emoji: '😄', label: '즐거워요', color: '#16A34A', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'calm', emoji: '🙂', label: '평온해요', color: '#0284C7', bg: 'bg-sky-100 text-sky-800 border-sky-300' },
  { id: 'neutral', emoji: '😐', label: '그저그래요', color: '#64748B', bg: 'bg-slate-100 text-slate-800 border-slate-300' },
  { id: 'sad', emoji: '😢', label: '슬퍼요', color: '#A855F7', bg: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'angry', emoji: '😡', label: '화나요', color: '#EF4444', bg: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'sleepy', emoji: '😴', label: '피곤해요', color: '#F97316', bg: 'bg-orange-100 text-orange-800 border-orange-300' },
];

export function getTodayFormatted(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayName = dayNames[today.getDay()];
  return `${year}년 ${month}월 ${date}일 ${dayName}`;
}

export function getTodayYMD(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMondayOfWeek(d: Date = new Date()): string {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const dayStr = String(monday.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayStr}`;
}

export const DAILY_MOTIVATIONAL_QUOTES = [
  "오늘도 작은 성장이 쌓여 더 큰 꿈을 이뤄갈 거예요! 🌱",
  "친구들과 함께 웃으며 행복한 하루를 만들어봐요! ✨",
  "실수해도 괜찮아, 매일 새로 시작할 기회가 있단다! 🌈",
  "너의 따뜻한 한마디가 학급 전체를 빛나게 해! 💖",
  "오늘 읽은 책 한 권이 너의 세상을 훨씬 넓혀 줄 거야! 📚",
  "1인 1역을 성실히 하는 너의 모습이 정말 멋져! 🌟",
  "서로 배려하고 돕는 6학년 우리 반이 으뜸이야! 👍",
  "오늘의 목표를 향해 기분 좋게 한 발짝씩 걸어가자! 👟",
];

export function getTodayQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return DAILY_MOTIVATIONAL_QUOTES[dayOfYear % DAILY_MOTIVATIONAL_QUOTES.length];
}

export function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }
  return days;
}
