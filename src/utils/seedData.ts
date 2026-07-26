import type { Student, Duty, Badge, ReadingLog, EmotionRecord, DutyCompletion, WeeklyGoal, PraiseCard, TeacherNote, StudentBadge, TeacherUser, SchoolClass } from '../types';
import { getTodayYMD, getMondayOfWeek } from './dateUtils';

export const SUPER_ADMIN_EMAIL = 'admin@growth.edu';
export const DEFAULT_INVITE_CODE = 'CLASS61';

export const DEFAULT_SUPER_ADMIN: TeacherUser = {
  id: 'tch-super-admin',
  email: SUPER_ADMIN_EMAIL,
  name: '최종관리자 (개발자)',
  schoolName: '중앙초등학교',
  grade: 6,
  classNum: 1,
  status: 'approved',
  isSuperAdmin: true,
  inviteCode: DEFAULT_INVITE_CODE,
  createdAt: '2026-03-01',
};

export const DEFAULT_CLASSES: SchoolClass[] = [
  {
    id: 'cls-61',
    schoolName: '중앙초등학교',
    grade: 6,
    classNum: 1,
    teacherId: 'tch-super-admin',
    teacherName: '최종관리자 (개발자)',
    inviteCode: DEFAULT_INVITE_CODE,
    createdAt: '2026-03-01',
  },
];

export const DEFAULT_STUDENTS: Student[] = [
  { id: 'std-1', name: '김민준', studentNumber: 1, avatarEmoji: '🦁', avatarBgColor: '#FEF08A', gender: 'M', motto: '매일 한 걸음씩!', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-2', name: '이서연', studentNumber: 2, avatarEmoji: '🐰', avatarBgColor: '#FBCFE8', gender: 'F', motto: '책 속에서 꿈을 꿔요', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-3', name: '박도윤', studentNumber: 3, avatarEmoji: '🐻', avatarBgColor: '#BAE6FD', gender: 'M', motto: '친구들을 돕는 도윤이', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-4', name: '최하은', studentNumber: 4, avatarEmoji: '🐱', avatarBgColor: '#DDD6FE', gender: 'F', motto: '긍정의 힘!', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-5', name: '정시우', studentNumber: 5, avatarEmoji: '🦊', avatarBgColor: '#FFEDD5', gender: 'M', motto: '즐겁게 도전하기', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-6', name: '강지유', studentNumber: 6, avatarEmoji: '🦄', avatarBgColor: '#BBF7D0', gender: 'F', motto: '밝은 미소 나누기', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-7', name: '윤지호', studentNumber: 7, avatarEmoji: '🐶', avatarBgColor: '#FFE4E6', gender: 'M', motto: '약속을 잘 지키는 어린이', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
  { id: 'std-8', name: '임수아', studentNumber: 8, avatarEmoji: '🐣', avatarBgColor: '#FEF9C3', gender: 'F', motto: '따뜻한 마음 가득히', classInviteCode: DEFAULT_INVITE_CODE, createdAt: '2026-03-02' },
];

export const DEFAULT_DUTIES: Duty[] = [
  { id: 'duty-1', classInviteCode: DEFAULT_INVITE_CODE, name: '칠판지우기', icon: 'Eraser', description: '수업 후 칠판을 깨끗이 지우고 분필 가루 정리하기' },
  { id: 'duty-2', classInviteCode: DEFAULT_INVITE_CODE, name: '급식도우미', icon: 'Utensils', description: '점심시간에 식판 배식과 잔반 정리를 돕기' },
  { id: 'duty-3', classInviteCode: DEFAULT_INVITE_CODE, name: '화분관리', icon: 'Flower2', description: '교실 화분에 주기적으로 물을 주고 시든 잎 정리하기' },
  { id: 'duty-4', classInviteCode: DEFAULT_INVITE_CODE, name: '창문정리', icon: 'Wind', description: '하교 전 창문을 잠그고 환기 관리하기' },
  { id: 'duty-5', classInviteCode: DEFAULT_INVITE_CODE, name: '도서정리', icon: 'BookOpen', description: '학급 문고 책장 정리 및 도서 대여 관리' },
  { id: 'duty-6', classInviteCode: DEFAULT_INVITE_CODE, name: '우유도우미', icon: 'Milk', description: '아침 우유 상자 수령 및 빈 우유 상자 정리' },
];

export const DEFAULT_BADGES: Badge[] = [
  { id: 'badge-reading', name: '독서왕', icon: '📚', description: '책을 5권 이상 읽고 독서록을 성실히 작성한 학생', criteria: '독서 5권 이상', category: 'reading' },
  { id: 'badge-caring', name: '배려왕', icon: '🤝', description: '친구들에게 칭찬 카드를 3회 이상 보낸 친절한 학생', criteria: '칭찬 3회 작성', category: 'praise' },
  { id: 'badge-goal', name: '목표달성왕', icon: '🌟', description: '주간 목표를 3주 연속 달성한 의지 강한 학생', criteria: '주간목표 3회 완료', category: 'goal' },
  { id: 'badge-kindness', name: '친절왕', icon: '😊', description: '친구들로부터 칭찬을 5회 이상 받은 따뜻한 학생', criteria: '칭찬 5회 수신', category: 'praise' },
  { id: 'badge-duty', name: '성실왕', icon: '🎖️', description: '1인 1역 과제를 10회 이상 성실히 수행한 학생', criteria: '1인1역 10회 완료', category: 'duty' },
];

export function getInitialSeedData() {
  const today = getTodayYMD();
  const monday = getMondayOfWeek();

  const teachers: TeacherUser[] = [
    DEFAULT_SUPER_ADMIN,
    {
      id: 'tch-2',
      email: 'teacher2@growth.edu',
      name: '홍길동 교사',
      schoolName: '서울초등학교',
      grade: 5,
      classNum: 3,
      status: 'pending', // 대기 중인 교사 예시
      inviteCode: 'CLASS53',
      createdAt: '2026-03-05',
    }
  ];

  const readingLogs: ReadingLog[] = [
    { id: 'rl-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '해리 포터와 마법사의 돌', date: '2026-07-20', pagesRead: 120, rating: 5, review: '마법 학교 이야기가 너무 흥미진진해서 손에서 뗄 수가 없었다.', createdAt: '2026-07-20' },
    { id: 'rl-2', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '어린 왕자', date: '2026-07-24', pagesRead: 90, rating: 5, review: '길들인다는 것에 대해 깊이 생각해보게 해준 소중한 책!', createdAt: '2026-07-24' },
    { id: 'rl-3', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '이상한 과자가게 전천당 1', date: '2026-07-22', pagesRead: 150, rating: 4, review: '신비한 과자들의 능력이 너무 재미있어서 2권도 빨리 읽고 싶다.', createdAt: '2026-07-22' },
    { id: 'rl-4', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '클로버', date: '2026-07-25', pagesRead: 180, rating: 5, review: '행운과 행복의 의미를 다시금 깨닫게 해준 감동적인 이야기.', createdAt: '2026-07-25' },
    { id: 'rl-5', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '100층 짜리 집', date: '2026-07-21', pagesRead: 60, rating: 4, review: '각 층마다 다른 동물들의 집 그림이 알록달록 재미있다.', createdAt: '2026-07-21' },
    { id: 'rl-6', studentId: 'std-4', classInviteCode: DEFAULT_INVITE_CODE, bookTitle: '자전거 도둑', date: '2026-07-23', pagesRead: 110, rating: 5, review: '양심에 대해 스스로 돌이켜보게 된 뜻깊은 소설이었다.', createdAt: '2026-07-23' },
  ];

  const emotionRecords: EmotionRecord[] = [
    { id: 'er-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'happy', note: '오늘 체육 시간에 피구 경기에서 우리 팀이 이겨서 정말 기뻤다!', createdAt: today },
    { id: 'er-2', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'joy', note: '도서관에서 읽고 싶었던 신간 소설책을 대여했다.', createdAt: today },
    { id: 'er-3', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'calm', note: '아침 모둠 활동을 평화롭게 마치고 친구와 이야기 나누었다.', createdAt: today },
    { id: 'er-4', studentId: 'std-4', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'happy', note: '수업 시간에 선생님께 칭찬을 들어서 하루 종일 기분이 좋았다.', createdAt: today },
    { id: 'er-5', studentId: 'std-5', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'sleepy', note: '어제 늦게 자서 약간 피곤했지만 청소는 열심히 했다.', createdAt: today },
    { id: 'er-6', studentId: 'std-6', classInviteCode: DEFAULT_INVITE_CODE, date: today, emotion: 'joy', note: '점심 메뉴로 맛있고 달콤한 떡볶이가 나와서 신났다!', createdAt: today },
  ];

  const dutyCompletions: DutyCompletion[] = [
    { id: 'dc-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-1', date: today, createdAt: today },
    { id: 'dc-2', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-5', date: today, createdAt: today },
    { id: 'dc-3', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-2', date: today, createdAt: today },
    { id: 'dc-4', studentId: 'std-4', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-3', date: today, createdAt: today },
    { id: 'dc-5', studentId: 'std-5', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-4', date: today, createdAt: today },
    { id: 'dc-6', studentId: 'std-6', classInviteCode: DEFAULT_INVITE_CODE, dutyId: 'duty-6', date: today, createdAt: today },
  ];

  const weeklyGoals: WeeklyGoal[] = [
    { id: 'wg-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, goalText: '수업 시간에 손들고 발표 2회 이상 하기', weekStartDate: monday, isCompleted: true, completedAt: today, createdAt: monday },
    { id: 'wg-2', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, goalText: '이번 주에 책 2권 읽기', weekStartDate: monday, isCompleted: true, completedAt: today, createdAt: monday },
    { id: 'wg-3', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, goalText: '매일 아침 친구 3명에게 먼저 반갑게 인사하기', weekStartDate: monday, isCompleted: false, createdAt: monday },
    { id: 'wg-4', studentId: 'std-4', classInviteCode: DEFAULT_INVITE_CODE, goalText: '수학 단원평가 오답 노트 성실히 정리하기', weekStartDate: monday, isCompleted: true, completedAt: today, createdAt: monday },
    { id: 'wg-5', studentId: 'std-5', classInviteCode: DEFAULT_INVITE_CODE, goalText: '청소 시간에 내 구역 책임감 있게 정리하기', weekStartDate: monday, isCompleted: false, createdAt: monday },
    { id: 'wg-6', studentId: 'std-6', classInviteCode: DEFAULT_INVITE_CODE, goalText: '어려워하는 친구에게 친절하게 설명해주기', weekStartDate: monday, isCompleted: true, completedAt: today, createdAt: monday },
  ];

  const praiseCards: PraiseCard[] = [
    { id: 'pc-1', classInviteCode: DEFAULT_INVITE_CODE, fromStudentId: 'std-1', fromStudentName: '김민준', toStudentId: 'std-3', toStudentName: '박도윤', content: '도윤이가 청소 시간에 빗자루를 선뜻 건네주어 고마웠어!', createdAt: '2026-07-23', cardStyle: 'yellow' },
    { id: 'pc-2', classInviteCode: DEFAULT_INVITE_CODE, fromStudentId: 'std-2', fromStudentName: '이서연', toStudentId: 'std-4', toStudentName: '최하은', content: '하은이가 모둠 과제 때 친절하게 아이디어를 정리해 주어서 대단해!', createdAt: '2026-07-24', cardStyle: 'pink' },
    { id: 'pc-3', classInviteCode: DEFAULT_INVITE_CODE, fromStudentId: 'std-3', fromStudentName: '박도윤', toStudentId: 'std-1', toStudentName: '김민준', content: '민준이가 체육 시간에 패스를 잘 해줘서 멋진 골을 넣을 수 있었어!', createdAt: '2026-07-25', cardStyle: 'blue' },
    { id: 'pc-4', classInviteCode: DEFAULT_INVITE_CODE, fromStudentId: 'std-4', fromStudentName: '최하은', toStudentId: 'std-6', toStudentName: '강지유', content: '지유가 아침에 밝게 웃으며 인사해줘서 기분이 정말 좋아졌어.', createdAt: '2026-07-25', cardStyle: 'purple' },
  ];

  const teacherNotes: TeacherNote[] = [
    { id: 'tn-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, content: '체육 활동 시 리더십이 뛰어나며 친구들의 참여를 잘 독려함. 독서 습관이 정착되어 깊이 있는 생각을 적어냄.', category: '학업', date: '2026-07-20', createdAt: '2026-07-20' },
    { id: 'tn-2', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, content: '학급 문고 정리를 주도적으로 맡아 솔선수범함. 어휘력이 풍부하고 글짓기 표현력이 우수함.', category: '생활', date: '2026-07-22', createdAt: '2026-07-22' },
    { id: 'tn-3', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, content: '친구들의 도움이 필요할 때 먼저 다가가 따뜻하게 돌봐줌. 급식도우미 역할을 훌륭히 수행함.', category: '칭찬', date: '2026-07-24', createdAt: '2026-07-24' },
  ];

  const studentBadges: StudentBadge[] = [
    { id: 'sb-1', studentId: 'std-1', classInviteCode: DEFAULT_INVITE_CODE, badgeId: 'badge-reading', awardedAt: '2026-07-20' },
    { id: 'sb-2', studentId: 'std-2', classInviteCode: DEFAULT_INVITE_CODE, badgeId: 'badge-reading', awardedAt: '2026-07-22' },
    { id: 'sb-3', studentId: 'std-3', classInviteCode: DEFAULT_INVITE_CODE, badgeId: 'badge-caring', awardedAt: '2026-07-24' },
    { id: 'sb-4', studentId: 'std-4', classInviteCode: DEFAULT_INVITE_CODE, badgeId: 'badge-kindness', awardedAt: '2026-07-25' },
  ];

  return {
    teachers,
    schoolClasses: DEFAULT_CLASSES,
    students: DEFAULT_STUDENTS,
    duties: DEFAULT_DUTIES,
    badges: DEFAULT_BADGES,
    readingLogs,
    emotionRecords,
    dutyCompletions,
    weeklyGoals,
    praiseCards,
    teacherNotes,
    studentBadges,
  };
}
