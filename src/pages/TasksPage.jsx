
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskRadio from '../components/TaskRadio';
import Timer from '../components/Timer';
import NotFound from './NotFound';

// Import all mocks and create a map for dynamic access
import mock1 from '../data/mocks/ex316-mock1.json';
import mock2 from '../data/mocks/ex316-mock2.json';
import mock3 from '../data/mocks/ex316-mock3.json';
import mock4 from '../data/mocks/ex316-mock4.json';
import mock5 from '../data/mocks/ex316-mock5.json';
import mock6 from '../data/mocks/ex316-mock6.json';

const examDataMap = {
  [mock1.examId]: mock1,
  [mock2.examId]: mock2,
  [mock3.examId]: mock3,
  [mock4.examId]: mock4,
  [mock5.examId]: mock5,
  [mock6.examId]: mock6,
};

// Custom hook to use localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const TasksPage = () => {
  const { examId } = useParams();
  const currentExam = examDataMap[examId];

  const [taskStatuses, setTaskStatuses] = useLocalStorage(`taskStatuses_${examId}`, {});
  const [startTime, setStartTime] = useLocalStorage(`examStartTime_${examId}`, null);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [examId, startTime, setStartTime]);

  const handleStatusChange = (taskId, status) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [taskId]: status,
    }));
  };

  if (!currentExam) {
    return <NotFound />;
  }

  if (!startTime) {
    // Still waiting for startTime to be set by useEffect
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <Timer startTime={startTime} />
      <h1 className="card-title">{currentExam.title}</h1>
      <p>{currentExam.description}</p>
      
      <h2>Tasks</h2>
      <ul className="task-list">
        {currentExam.tasks.map((task) => (
          <li key={task.id} className="task-item">
            <Link to={`/task/${examId}/${task.id}`} className="task-item-title">
              {task.title}
            </Link>
            <TaskRadio
              examId={examId}
              taskId={task.id}
              status={taskStatuses[task.id] || 'revise'} // Default to 'revise'
              onStatusChange={handleStatusChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
