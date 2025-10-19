
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskDetail from './pages/TaskDetail';
import ExamplePage from './pages/ExamplePage'; // This is for the example page
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:examId" element={<TasksPage />} />
          <Route path="/task/:examId/:taskId" element={<TaskDetail />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
