
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import all mock exams
import mock1 from '../data/mocks/ex316-mock1.json';
import mock2 from '../data/mocks/ex316-mock2.json';
import mock3 from '../data/mocks/ex316-mock3.json';
import mock4 from '../data/mocks/ex316-mock4.json';
import mock5 from '../data/mocks/ex316-mock5.json';
import mock6 from '../data/mocks/ex316-mock6.json';

const allExams = [mock1, mock2, mock3, mock4, mock5, mock6];

const HomePage = () => {
  const [examStatuses, setExamStatuses] = useState({});

  useEffect(() => {
    const statuses = {};
    allExams.forEach(exam => {
      const startTime = localStorage.getItem(`examStartTime_${exam.examId}`);
      statuses[exam.examId] = startTime ? 'In Progress' : 'Not Started';
    });
    setExamStatuses(statuses);
  }, []);

  const resetProgress = (examId) => {
    localStorage.removeItem(`examStartTime_${examId}`);
    localStorage.removeItem(`taskStatuses_${examId}`);
    // Also remove subtask statuses for all tasks in the exam
    const exam = allExams.find(e => e.examId === examId);
    if (exam) {
      exam.tasks.forEach(task => {
        localStorage.removeItem(`checkedSubtasks_${examId}_${task.id}`);
      });
    }
    setExamStatuses(prev => ({ ...prev, [examId]: 'Not Started' }));
  };

  return (
    <div>
      <h1>Available Exams</h1>
      <p>Select an exam to begin the simulation.</p>
      <div>
        {allExams.map((exam) => (
          <div key={exam.examId} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title">{exam.title}</h2>
              <span style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '15px',
                background: examStatuses[exam.examId] === 'In Progress' ? '#ffc107' : '#e9ecef',
                color: examStatuses[exam.examId] === 'In Progress' ? '#333' : '#495057',
                fontWeight: 'bold'
              }}>
                {examStatuses[exam.examId]}
              </span>
            </div>
            <p className="card-description">{exam.description}</p>
            <p><strong>Time Limit:</strong> {exam.timeLimit}</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to={`/tasks/${exam.examId}`} className="btn">
                {examStatuses[exam.examId] === 'In Progress' ? 'Continue Exam' : 'Start Exam'}
                </Link>
                {examStatuses[exam.examId] === 'In Progress' && (
                <button onClick={() => resetProgress(exam.examId)} style={{ background: 'none', border: 'none', color: 'var(--rh-red)', cursor: 'pointer', textDecoration: 'underline' }}>
                    Reset Progress
                </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
