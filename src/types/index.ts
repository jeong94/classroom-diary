/**
 * Data structures for '우리반 성장기록장' (Classroom Growth Tracker)
 * Multi-role Authentication, Class Invite Code, Super Admin Approval, and Student Activity History
 */

export type EmotionType = 'happy' | 'joy' | 'calm' | 'neutral' | 'sad' | 'angry' | 'sleepy';

export interface EmotionOption {
  id: EmotionType;
  emoji: string;
  label: string;
  color: string;
  bg: string;
}

export interface TeacherUser {
  id: string;
  email: string;
  name: string; // 실명
  schoolName: string;
  grade: number; // 1 ~ 6
  classNum: number; // 1 ~ 10
  status: 'pending' | 'approved' | 'rejected'; // 최종관리자 승인 상태
  isSuperAdmin?: boolean; // 최종 관리자 여부
  inviteCode: string; // 학반 6자리 고유 초대 코드
  createdAt: string;
}

export interface StudentUser {
  id: string;
  name: string; // 실명 (닉네임 금지)
  schoolName: string;
  grade: number; // 1 ~ 6
  classNum: number; // 1 ~ 10
  inviteCode: string;
  studentNumber?: number;
  avatarEmoji: string;
  avatarBgColor: string;
  createdAt: string;
}

export interface SchoolClass {
  id: string;
  schoolName: string;
  grade: number; // 1 ~ 6
  classNum: number; // 1 ~ 10
  teacherId: string;
  teacherName: string;
  inviteCode: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  studentNumber: number;
  avatarEmoji: string;
  avatarBgColor: string;
  gender?: 'M' | 'F';
  motto?: string;
  classInviteCode: string;
  createdAt: string;
}

export interface ReadingLog {
  id: string;
  studentId: string;
  classInviteCode: string;
  bookTitle: string;
  date: string; // YYYY-MM-DD
  pagesRead: number;
  rating: number; // 1 to 5
  review: string;
  createdAt: string;
}

export interface EmotionRecord {
  id: string;
  studentId: string;
  classInviteCode: string;
  date: string; // YYYY-MM-DD
  emotion: EmotionType;
  note: string;
  createdAt: string;
}

export interface Duty {
  id: string;
  classInviteCode: string;
  name: string;
  icon: string;
  description: string;
}

export interface DutyCompletion {
  id: string;
  studentId: string;
  classInviteCode: string;
  dutyId: string;
  date: string;
  createdAt: string;
}

export interface WeeklyGoal {
  id: string;
  studentId: string;
  classInviteCode: string;
  goalText: string;
  weekStartDate: string;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface PraiseCard {
  id: string;
  classInviteCode: string;
  fromStudentId: string;
  fromStudentName: string;
  toStudentId: string;
  toStudentName: string;
  content: string;
  createdAt: string;
  cardStyle?: 'pink' | 'yellow' | 'blue' | 'purple' | 'green';
}

export interface TeacherNote {
  id: string;
  studentId: string;
  classInviteCode: string;
  content: string;
  category: '학업' | '생활' | '상담' | '칭찬';
  date: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  criteria: string;
  category: 'reading' | 'duty' | 'goal' | 'praise' | 'custom';
}

export interface StudentBadge {
  id: string;
  studentId: string;
  classInviteCode: string;
  badgeId: string;
  awardedAt: string;
  isCustom?: boolean;
  customReason?: string;
}

export interface StudentStats {
  totalBooks: number;
  monthlyBooks: number;
  totalPages: number;
  dutyCompletions: number;
  dutyStreak: number;
  completedGoals: number;
  goalCompletionRate: number;
  goalStreak: number;
  praisesReceived: number;
  praisesGiven: number;
  badgesCount: number;
}
