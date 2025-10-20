
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allExams } from '../data/examData';
import Modal from '../components/Modal';

const HomePage = () => {
  const [examStatuses, setExamStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const statuses = {};
    allExams.forEach(exam => {
      const startTime = localStorage.getItem(`examStartTime_${exam.examId}`);
      statuses[exam.examId] = startTime ? 'In Progress' : 'Not Started';
    });
    setExamStatuses(statuses);
  }, []);

  const openPrerequisites = (exam) => {
    // Placeholder content for now. This will be replaced with actual data.
    const content = `Prerequisites for ${exam.title}:\n\n# This script will be generated in the next step.\necho \"Setting up environment...\"`;
    setModalContent(content);
    setIsModalOpen(true);
  };

  const resetProgress = (examId) => {
    localStorage.removeItem(`examStartTime_${examId}`);
    localStorage.removeItem(`taskStatuses_${examId}`);
    const exam = allExams.find(e => e.examId === examId);
    if (exam) {
      exam.tasks.forEach(task => {
        localStorage.removeItem(`checkedSubtasks_${examId}_${task.id}`);
      });
    }
    setExamStatuses(prev => ({ ...prev, [examId]: 'Not Started' }));
  };

  return (
    <div className="main-content">
        <div className="content-wrapper">
            <div className="disclaimer-notice">
                <strong>Disclaimer:</strong> This is an unofficial training tool and is not affiliated with, endorsed by, or sponsored by Red Hat, Inc. The tasks herein are simulations and do not reflect the content of the actual EX316 exam.
            </div>
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
                        <Link to={`/solution/${exam.examId}`} className="btn" style={{ background: '#007bff' }}>
                            Solutions
                        </Link>
                        <button onClick={() => openPrerequisites(exam)} className="btn" style={{ background: '#6c757d' }}>
                            Prerequisites
                        </button>
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Exam Prerequisites">
            <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>{modalContent}</pre>
        </Modal>
    </div>
  );
};

export default HomePage;
