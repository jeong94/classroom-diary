import React from 'react';
import { ClassProvider, useClass } from './context/ClassContext';
import { Header } from './components/common/Header';
import { LandingPage } from './pages/LandingPage';
import { StudentPage } from './pages/StudentPage';
import { TeacherPage } from './pages/TeacherPage';

const MainContent: React.FC = () => {
  const { mode, selectedStudent } = useClass();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF7]">
      <Header />
      <main className="flex-1 pb-16">
        {mode === 'landing' && <LandingPage />}
        {mode === 'student' && selectedStudent && <StudentPage />}
        {(mode === 'teacher' || mode === 'superadmin') && <TeacherPage />}
      </main>
      <footer className="bg-white/60 border-t border-amber-100/60 py-6 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🌱 우리반 성장기록장 - 초등 학반 멀티인증 & 전담 관리 웹앱</span>
          <span>모든 데이터는 브라우저 LocalStorage에 안전하게 보존되며 즉시 배포 가능합니다.</span>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <ClassProvider>
      <MainContent />
    </ClassProvider>
  );
}

export default App;
