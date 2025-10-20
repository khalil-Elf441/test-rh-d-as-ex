import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { examDataMap } from '../data/examData';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SolutionPage = () => {
  const { examId } = useParams();
  const currentExam = examDataMap[examId];
  const [completedTasks, setCompletedTasks] = useLocalStorage(`completedTasks_${examId}`, {});

  if (!currentExam) {
    return <div>Exam not found</div>;
  }

  const handleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const score = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = currentExam.tasks.length;

  return (
    <div>
      <Breadcrumbs exam={currentExam} />
      <h1 className="page-title">{currentExam.title} - Solutions</h1>
      <div className="solution-header">
        <h2>Score: {score} / {totalTasks}</h2>
      </div>
      <hr />
      {currentExam.tasks.map(task => (
        <div key={task.id} className="solution-task-card">
          <div className="solution-task-header">
            <h3>{task.title}</h3>
            <label>
              <input
                type="checkbox"
                checked={!!completedTasks[task.id]}
                onChange={() => handleTaskCompletion(task.id)}
              />
              Completed
            </label>
          </div>
          <h4>Solution:</h4>
          <pre className="solution-code">{task.solution}</pre>
        </div>
      ))}
    </div>
  );
};

export default SolutionPage;