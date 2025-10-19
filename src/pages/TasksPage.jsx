
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskRadio from '../components/TaskRadio';
import examData from '../data/mocks/ex316-mock1.json';

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
  // In a real app, you would fetch the exam data based on examId
  const currentExam = examData; // Using mock data for now

  const [taskStatuses, setTaskStatuses] = useLocalStorage(`taskStatuses_${examId}`, {});

  const handleStatusChange = (taskId, status) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [taskId]: status,
    }));
  };

  return (
    <div className="card">
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
