import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Student, Duty, Badge, ReadingLog, EmotionRecord, DutyCompletion,
  WeeklyGoal, PraiseCard, TeacherNote, StudentBadge, StudentStats,
  TeacherUser, SchoolClass
} from '../types';
import { getInitialSeedData, SUPER_ADMIN_EMAIL, DEFAULT_INVITE_CODE } from '../utils/seedData';
import { getTodayYMD, getMondayOfWeek } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'GROWTH_TRACKER_V2_DATA';

export interface ViewState {
  mode: 'landing' | 'student' | 'teacher' | 'superadmin';
  student?: Student | null;
  teacherTab?: string;
}

interface ClassContextType {
  mode: 'landing' | 'student' | 'teacher' | 'superadmin';
  setMode: (mode: 'landing' | 'student' | 'teacher' | 'superadmin') => void;
  selectedStudent: Student | null;
  currentTeacher: TeacherUser | null;
  activeInviteCode: string;

  teachers: TeacherUser[];
  schoolClasses: SchoolClass[];
  students: Student[];
  duties: Duty[];
  badges: Badge[];
  readingLogs: ReadingLog[];
  emotionRecords: EmotionRecord[];
  dutyCompletions: DutyCompletion[];
  weeklyGoals: WeeklyGoal[];
  praiseCards: PraiseCard[];
  teacherNotes: TeacherNote[];
  studentBadges: StudentBadge[];

  // Navigation History (7단계 & 8단계)
  navHistory: ViewState[];
  pushViewState: (state: ViewState) => void;
  goBack: () => void;
  logout: () => void;

  // Actions
  loginAsTeacherGoogle: (email: string, name: string, schoolName: string, grade: number, classNum: number) => TeacherUser;
  approveTeacher: (teacherId: string) => void;
  rejectTeacher: (teacherId: string) => void;
  loginAsStudentWithCode: (grade: number, classNum: number, realName: string, inviteCode: string) => { success: boolean; message?: string };
  selectStudent: (student: Student | null) => void;

  addReadingLog: (bookTitle: string, date: string, pagesRead: number, rating: number, review: string) => void;
  addEmotionRecord: (emotion: EmotionRecord['emotion'], note: string, date?: string) => void;
  toggleDutyCompletion: (dutyId: string, date?: string) => void;
  setWeeklyGoal: (goalText: string) => void;
  toggleGoalCompletion: (goalId: string) => void;
  addPraiseCard: (toStudentId: string, toStudentName: string, content: string, cardStyle?: PraiseCard['cardStyle']) => void;
  addTeacherNote: (studentId: string, content: string, category: TeacherNote['category']) => void;
  addStudent: (name: string, studentNumber: number, avatarEmoji: string, avatarBgColor: string, gender?: 'M'|'F', motto?: string) => void;
  awardBadgeToStudent: (studentId: string, badgeId: string, customReason?: string) => void;
  resetToDemoData: () => void;
  triggerConfetti: () => void;
  getStudentStats: (studentId: string) => StudentStats;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<'landing' | 'student' | 'teacher' | 'superadmin'>('landing');
  const [selectedStudent, setSelectedStudentState] = useState<Student | null>(null);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherUser | null>(null);
  const [activeInviteCode, setActiveInviteCode] = useState<string>(DEFAULT_INVITE_CODE);

  // Navigation Stack History
  const [navHistory, setNavHistory] = useState<ViewState[]>([{ mode: 'landing' }]);

  const [teachers, setTeachers] = useState<TeacherUser[]>([]);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [duties, setDuties] = useState<Duty[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [readingLogs, setReadingLogs] = useState<ReadingLog[]>([]);
  const [emotionRecords, setEmotionRecords] = useState<EmotionRecord[]>([]);
  const [dutyCompletions, setDutyCompletions] = useState<DutyCompletion[]>([]);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([]);
  const [praiseCards, setPraiseCards] = useState<PraiseCard[]>([]);
  const [teacherNotes, setTeacherNotes] = useState<TeacherNote[]>([]);
  const [studentBadges, setStudentBadges] = useState<StudentBadge[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTeachers(parsed.teachers || []);
        setSchoolClasses(parsed.schoolClasses || []);
        setStudents(parsed.students || []);
        setDuties(parsed.duties || []);
        setBadges(parsed.badges || []);
        setReadingLogs(parsed.readingLogs || []);
        setEmotionRecords(parsed.emotionRecords || []);
        setDutyCompletions(parsed.dutyCompletions || []);
        setWeeklyGoals(parsed.weeklyGoals || []);
        setPraiseCards(parsed.praiseCards || []);
        setTeacherNotes(parsed.teacherNotes || []);
        setStudentBadges(parsed.studentBadges || []);
      } catch (e) {
        console.error('Failed to parse localStorage:', e);
        loadSeedData();
      }
    } else {
      loadSeedData();
    }
  }, []);

  const loadSeedData = () => {
    const seed = getInitialSeedData();
    setTeachers(seed.teachers);
    setSchoolClasses(seed.schoolClasses);
    setStudents(seed.students);
    setDuties(seed.duties);
    setBadges(seed.badges);
    setReadingLogs(seed.readingLogs);
    setEmotionRecords(seed.emotionRecords);
    setDutyCompletions(seed.dutyCompletions);
    setWeeklyGoals(seed.weeklyGoals);
    setPraiseCards(seed.praiseCards);
    setTeacherNotes(seed.teacherNotes);
    setStudentBadges(seed.studentBadges);

    saveToLocalStorage(seed);
  };

  const saveToLocalStorage = (data: Record<string, any>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    if (teachers.length > 0) {
      saveToLocalStorage({
        teachers,
        schoolClasses,
        students,
        duties,
        badges,
        readingLogs,
        emotionRecords,
        dutyCompletions,
        weeklyGoals,
        praiseCards,
        teacherNotes,
        studentBadges,
      });
    }
  }, [teachers, schoolClasses, students, duties, badges, readingLogs, emotionRecords, dutyCompletions, weeklyGoals, praiseCards, teacherNotes, studentBadges]);

  // Navigation History Stack Push & GoBack (7단계 & 8단계)
  const pushViewState = (nextState: ViewState) => {
    setNavHistory(prev => [...prev, nextState]);
    setModeState(nextState.mode);
    if (nextState.student !== undefined) {
      setSelectedStudentState(nextState.student);
    }
  };

  const goBack = () => {
    if (navHistory.length <= 1) {
      setModeState('landing');
      setSelectedStudentState(null);
      return;
    }
    const newHistory = [...navHistory];
    newHistory.pop();
    const prevState = newHistory[newHistory.length - 1];

    setNavHistory(newHistory);
    setModeState(prevState.mode);
    if (prevState.student !== undefined) {
      setSelectedStudentState(prevState.student);
    }
  };

  const logout = () => {
    setCurrentTeacher(null);
    setSelectedStudentState(null);
    setModeState('landing');
    setNavHistory([{ mode: 'landing' }]);
  };

  const setMode = (newMode: 'landing' | 'student' | 'teacher' | 'superadmin') => {
    pushViewState({ mode: newMode, student: selectedStudent });
  };

  const selectStudent = (student: Student | null) => {
    if (student) {
      pushViewState({ mode: 'student', student });
    } else {
      pushViewState({ mode: 'landing', student: null });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FEF08A', '#FBCFE8', '#BAE6FD', '#BBF7D0', '#DDD6FE'],
    });
  };

  // Google Login simulation & registration for teachers
  const loginAsTeacherGoogle = (email: string, name: string, schoolName: string, grade: number, classNum: number): TeacherUser => {
    const isSuperAdmin = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    const existing = teachers.find(t => t.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      setCurrentTeacher(existing);
      setActiveInviteCode(existing.inviteCode);
      if (existing.isSuperAdmin) {
        pushViewState({ mode: 'superadmin' });
      } else {
        pushViewState({ mode: 'teacher' });
      }
      return existing;
    }

    const inviteCode = `CLASS${grade}${classNum}_${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const newTeacher: TeacherUser = {
      id: `tch-${Date.now()}`,
      email,
      name,
      schoolName,
      grade,
      classNum,
      status: isSuperAdmin ? 'approved' : 'pending',
      isSuperAdmin,
      inviteCode,
      createdAt: getTodayYMD(),
    };

    setTeachers(prev => [...prev, newTeacher]);
    setCurrentTeacher(newTeacher);
    setActiveInviteCode(inviteCode);

    if (isSuperAdmin) {
      pushViewState({ mode: 'superadmin' });
    } else {
      pushViewState({ mode: 'teacher' });
    }

    return newTeacher;
  };

  // Super Admin approves teacher (5단계 & 6단계: 승인 시 학반 자동 생성됨!)
  const approveTeacher = (teacherId: string) => {
    const target = teachers.find(t => t.id === teacherId);
    if (!target) return;

    const updatedTeacher: TeacherUser = { ...target, status: 'approved' };
    setTeachers(prev => prev.map(t => t.id === teacherId ? updatedTeacher : t));

    // Automatically create SchoolClass (6단계)
    const existingClass = schoolClasses.find(c => c.schoolName === target.schoolName && c.grade === target.grade && c.classNum === target.classNum);
    if (!existingClass) {
      const newClass: SchoolClass = {
        id: `cls-${Date.now()}`,
        schoolName: target.schoolName,
        grade: target.grade,
        classNum: target.classNum,
        teacherId: target.id,
        teacherName: target.name,
        inviteCode: target.inviteCode,
        createdAt: getTodayYMD(),
      };
      setSchoolClasses(prev => [...prev, newClass]);
    }
    triggerConfetti();
  };

  const rejectTeacher = (teacherId: string) => {
    setTeachers(prev => prev.map(t => t.id === teacherId ? { ...t, status: 'rejected' } : t));
  };

  // Student Login with Real Name & Class Invite Code (1단계 & 3단계 & 5단계)
  const loginAsStudentWithCode = (grade: number, classNum: number, realName: string, inviteCode: string) => {
    const cleanCode = inviteCode.trim().toUpperCase();
    const targetClass = schoolClasses.find(c => c.inviteCode.toUpperCase() === cleanCode && c.grade === grade && c.classNum === classNum);
    
    // Also check default invite code CLASS61
    const isValidCode = targetClass || cleanCode === DEFAULT_INVITE_CODE;

    if (!isValidCode && schoolClasses.length > 0) {
      return { success: false, message: '초대 코드 또는 학반 정보(학년/반)가 일치하지 않습니다.' };
    }

    const codeToUse = targetClass ? targetClass.inviteCode : DEFAULT_INVITE_CODE;
    setActiveInviteCode(codeToUse);

    const existingStudent = students.find(s => s.name === realName.trim() && s.classInviteCode === codeToUse);

    if (existingStudent) {
      pushViewState({ mode: 'student', student: existingStudent });
      return { success: true };
    }

    // Auto create new student record under real name
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: realName.trim(),
      studentNumber: students.length + 1,
      avatarEmoji: '🐣',
      avatarBgColor: '#FEF08A',
      classInviteCode: codeToUse,
      createdAt: getTodayYMD(),
    };

    setStudents(prev => [...prev, newStudent]);
    pushViewState({ mode: 'student', student: newStudent });
    return { success: true };
  };

  // Auto Badge Check
  const checkAutoBadges = (studentId: string) => {
    const sLogs = readingLogs.filter(l => l.studentId === studentId);
    const sDuties = dutyCompletions.filter(d => d.studentId === studentId);
    const sGoals = weeklyGoals.filter(g => g.studentId === studentId && g.isCompleted);
    const sPraisesReceived = praiseCards.filter(p => p.toStudentId === studentId);
    const sPraisesGiven = praiseCards.filter(p => p.fromStudentId === studentId);
    const existingBadgeIds = new Set(studentBadges.filter(b => b.studentId === studentId).map(b => b.badgeId));

    const newBadgeIds: string[] = [];

    if (sLogs.length >= 5 && !existingBadgeIds.has('badge-reading')) newBadgeIds.push('badge-reading');
    if (sDuties.length >= 10 && !existingBadgeIds.has('badge-duty')) newBadgeIds.push('badge-duty');
    if (sGoals.length >= 3 && !existingBadgeIds.has('badge-goal')) newBadgeIds.push('badge-goal');
    if (sPraisesReceived.length >= 5 && !existingBadgeIds.has('badge-kindness')) newBadgeIds.push('badge-kindness');
    if (sPraisesGiven.length >= 3 && !existingBadgeIds.has('badge-caring')) newBadgeIds.push('badge-caring');

    if (newBadgeIds.length > 0) {
      const today = getTodayYMD();
      const newBadges: StudentBadge[] = newBadgeIds.map(bId => ({
        id: `sb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        studentId,
        classInviteCode: activeInviteCode,
        badgeId: bId,
        awardedAt: today,
      }));

      setStudentBadges(prev => [...prev, ...newBadges]);
      triggerConfetti();
    }
  };

  const addReadingLog = (bookTitle: string, date: string, pagesRead: number, rating: number, review: string) => {
    if (!selectedStudent) return;
    const newLog: ReadingLog = {
      id: `rl-${Date.now()}`,
      studentId: selectedStudent.id,
      classInviteCode: activeInviteCode,
      bookTitle,
      date,
      pagesRead,
      rating,
      review,
      createdAt: getTodayYMD(),
    };
    setReadingLogs(prev => [newLog, ...prev]);
    checkAutoBadges(selectedStudent.id);
  };

  const addEmotionRecord = (emotion: EmotionRecord['emotion'], note: string, dateStr = getTodayYMD()) => {
    if (!selectedStudent) return;
    setEmotionRecords(prev => {
      const filtered = prev.filter(e => !(e.studentId === selectedStudent.id && e.date === dateStr));
      const newRecord: EmotionRecord = {
        id: `er-${Date.now()}`,
        studentId: selectedStudent.id,
        classInviteCode: activeInviteCode,
        date: dateStr,
        emotion,
        note,
        createdAt: dateStr,
      };
      return [newRecord, ...filtered];
    });
  };

  const toggleDutyCompletion = (dutyId: string, dateStr = getTodayYMD()) => {
    if (!selectedStudent) return;
    const existing = dutyCompletions.find(d => d.studentId === selectedStudent.id && d.dutyId === dutyId && d.date === dateStr);
    
    if (existing) {
      setDutyCompletions(prev => prev.filter(d => d.id !== existing.id));
    } else {
      const newCompletion: DutyCompletion = {
        id: `dc-${Date.now()}`,
        studentId: selectedStudent.id,
        classInviteCode: activeInviteCode,
        dutyId,
        date: dateStr,
        createdAt: dateStr,
      };
      setDutyCompletions(prev => [...prev, newCompletion]);
      triggerConfetti();
      checkAutoBadges(selectedStudent.id);
    }
  };

  const setWeeklyGoal = (goalText: string) => {
    if (!selectedStudent) return;
    const monday = getMondayOfWeek();
    const existing = weeklyGoals.find(g => g.studentId === selectedStudent.id && g.weekStartDate === monday);

    if (existing) {
      setWeeklyGoals(prev => prev.map(g => g.id === existing.id ? { ...g, goalText, isCompleted: false } : g));
    } else {
      const newGoal: WeeklyGoal = {
        id: `wg-${Date.now()}`,
        studentId: selectedStudent.id,
        classInviteCode: activeInviteCode,
        goalText,
        weekStartDate: monday,
        isCompleted: false,
        createdAt: getTodayYMD(),
      };
      setWeeklyGoals(prev => [newGoal, ...prev]);
    }
  };

  const toggleGoalCompletion = (goalId: string) => {
    const today = getTodayYMD();
    let targetStudentId = '';
    setWeeklyGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        targetStudentId = g.studentId;
        const nextState = !g.isCompleted;
        if (nextState) triggerConfetti();
        return {
          ...g,
          isCompleted: nextState,
          completedAt: nextState ? today : undefined,
        };
      }
      return g;
    }));

    if (targetStudentId) {
      setTimeout(() => checkAutoBadges(targetStudentId), 300);
    }
  };

  const addPraiseCard = (toStudentId: string, toStudentName: string, content: string, cardStyle: PraiseCard['cardStyle'] = 'yellow') => {
    if (!selectedStudent) return;
    const newCard: PraiseCard = {
      id: `pc-${Date.now()}`,
      classInviteCode: activeInviteCode,
      fromStudentId: selectedStudent.id,
      fromStudentName: selectedStudent.name,
      toStudentId,
      toStudentName,
      content,
      createdAt: getTodayYMD(),
      cardStyle,
    };
    setPraiseCards(prev => [newCard, ...prev]);
    triggerConfetti();
    checkAutoBadges(selectedStudent.id);
  };

  const addTeacherNote = (studentId: string, content: string, category: TeacherNote['category']) => {
    const newNote: TeacherNote = {
      id: `tn-${Date.now()}`,
      studentId,
      classInviteCode: activeInviteCode,
      content,
      category,
      date: getTodayYMD(),
      createdAt: getTodayYMD(),
    };
    setTeacherNotes(prev => [newNote, ...prev]);
  };

  const addStudent = (name: string, studentNumber: number, avatarEmoji: string, avatarBgColor: string, gender: 'M'|'F' = 'M', motto = '') => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name,
      studentNumber,
      avatarEmoji,
      avatarBgColor,
      gender,
      motto,
      classInviteCode: activeInviteCode,
      createdAt: getTodayYMD(),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const awardBadgeToStudent = (studentId: string, badgeId: string, customReason?: string) => {
    const newStudentBadge: StudentBadge = {
      id: `sb-${Date.now()}`,
      studentId,
      classInviteCode: activeInviteCode,
      badgeId,
      awardedAt: getTodayYMD(),
      isCustom: true,
      customReason,
    };
    setStudentBadges(prev => [...prev, newStudentBadge]);
    triggerConfetti();
  };

  const resetToDemoData = () => {
    loadSeedData();
    logout();
  };

  const getStudentStats = (studentId: string): StudentStats => {
    const sLogs = readingLogs.filter(l => l.studentId === studentId);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const totalBooks = sLogs.length;
    const monthlyBooks = sLogs.filter(l => {
      const d = new Date(l.date);
      return d.getFullYear() === currentYear && (d.getMonth() + 1) === currentMonth;
    }).length;
    const totalPages = sLogs.reduce((acc, curr) => acc + (curr.pagesRead || 0), 0);

    const dutyCompletionsCount = dutyCompletions.filter(d => d.studentId === studentId).length;
    const sGoals = weeklyGoals.filter(g => g.studentId === studentId);
    const completedGoals = sGoals.filter(g => g.isCompleted).length;
    const goalCompletionRate = sGoals.length > 0 ? Math.round((completedGoals / sGoals.length) * 100) : 0;

    const praisesReceived = praiseCards.filter(p => p.toStudentId === studentId).length;
    const praisesGiven = praiseCards.filter(p => p.fromStudentId === studentId).length;
    const badgesCount = studentBadges.filter(b => b.studentId === studentId).length;

    return {
      totalBooks,
      monthlyBooks,
      totalPages,
      dutyCompletions: dutyCompletionsCount,
      dutyStreak: dutyCompletionsCount,
      completedGoals,
      goalCompletionRate,
      goalStreak: completedGoals,
      praisesReceived,
      praisesGiven,
      badgesCount,
    };
  };

  return (
    <ClassContext.Provider
      value={{
        mode,
        setMode,
        selectedStudent,
        currentTeacher,
        activeInviteCode,
        teachers,
        schoolClasses,
        students,
        duties,
        badges,
        readingLogs,
        emotionRecords,
        dutyCompletions,
        weeklyGoals,
        praiseCards,
        teacherNotes,
        studentBadges,
        navHistory,
        pushViewState,
        goBack,
        logout,
        loginAsTeacherGoogle,
        approveTeacher,
        rejectTeacher,
        loginAsStudentWithCode,
        selectStudent,
        addReadingLog,
        addEmotionRecord,
        toggleDutyCompletion,
        setWeeklyGoal,
        toggleGoalCompletion,
        addPraiseCard,
        addTeacherNote,
        addStudent,
        awardBadgeToStudent,
        resetToDemoData,
        triggerConfetti,
        getStudentStats,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) throw new Error('useClass must be used within a ClassProvider');
  return context;
};
