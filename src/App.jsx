
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskDetail from './pages/TaskDetail';
import ExamplePage from './pages/ExamplePage';
import NotFound from './pages/NotFound';
import SolutionPage from './pages/SolutionPage';

// Layout for exam pages (with Sidebar)
const ExamLayout = ({ startTime, onStartExam }) => (
  <div className="app-layout">
    <Sidebar startTime={startTime} />
    <main className="main-content">
      <div className="content-wrapper">
        {/* Outlet renders the nested route component (TasksPage, TaskDetail) */}
        <Outlet context={{ onStartExam }} />
      </div>
    </main>
  </div>
);

// Layout for pages without a sidebar (e.g., Home)
const HomeLayout = () => (
    <Outlet />
);

function App() {
  const [startTime, setStartTime] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parts = location.pathname.split('/');
    let examId = null;

    if ((parts[1] === 'tasks' || parts[1] === 'task') && parts[2]) {
      examId = parts[2];
    }

    if (examId) {
      const storedTime = localStorage.getItem(`examStartTime_${examId}`);
      setStartTime(storedTime ? JSON.parse(storedTime) : null);
    } else {
      setStartTime(null); // Not on an exam page, so no start time
    }
  }, [location]);

  const handleStartExam = (examId) => {
    const key = `examStartTime_${examId}`;
    let storedStartTime = localStorage.getItem(key);
    if (!storedStartTime) {
      storedStartTime = Date.now();
      localStorage.setItem(key, JSON.stringify(storedStartTime));
    }
    setStartTime(storedStartTime);
  };

  return (
    <Routes>
      {/* Routes with the simple layout (no sidebar) */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/example" element={<ExamplePage />} />
      </Route>

      {/* Routes with the exam layout (sidebar) */}
      <Route element={<ExamLayout startTime={startTime} onStartExam={handleStartExam} />}>
        <Route path="/tasks/:examId" element={<TasksPage />} />
        <Route path="/task/:examId/:taskId" element={<TaskDetail />} />
        <Route path="/solution/:examId" element={<SolutionPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
