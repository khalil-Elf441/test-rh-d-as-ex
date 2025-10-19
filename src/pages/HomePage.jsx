
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allExams } from '../data/examData';

const HomePage = () => {
  const [examStatuses, setExamStatuses] = useState({});

  // This effect checks the status of each exam on component mount.
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
    const exam = allExams.find(e => e.examId === examId);
    if (exam) {
      exam.tasks.forEach(task => {
        localStorage.removeItem(`checkedSubtasks_${examId}_${task.id}`);
      });
    }
    // Force a re-render by updating state
    setExamStatuses(prev => ({ ...prev, [examId]: 'Not Started' }));
  };

  return (
    <div className="main-content">
        <div className="content-wrapper">
            <h1 className="page-title">Available Exams</h1>
            <p className="page-intro">Select an exam to begin the simulation.</p>
            <div className="home-exam-list">
                {allExams.map((exam) => (
                <div key={exam.examId} className="card">
                    <h2 className="card-title">{exam.title}</h2>
                    <p className="card-description">{exam.description}</p>
                    <p><strong>Time Limit:</strong> {exam.timeLimit}</p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
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
    </div>
  );
};

export default HomePage;
