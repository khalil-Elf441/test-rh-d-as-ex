
import React from 'react';
import { Link } from 'react-router-dom';
import examData from '../data/mocks/ex316-mock1.json'; // We'll use this mock as an example

const HomePage = () => {
  // In a real app, you might fetch a list of exams
  const exams = [
    {
      id: examData.examId,
      title: examData.title,
      description: examData.description,
      timeLimit: examData.timeLimit,
    },
    // Add other exams here, e.g., ex294
    {
        id: 'ex294',
        title: 'Red Hat Certified Engineer (RHCE) exam (EX294) - Mock 1',
        description: 'Simulated Red Hat exam for Ansible Automation.',
        timeLimit: '4 hours',
    }
  ];

  return (
    <div>
      <h1>Available Exams</h1>
      <p>Select an exam to begin the simulation.</p>
      <div>
        {exams.map((exam) => (
          <div key={exam.id} className="card">
            <h2 className="card-title">{exam.title}</h2>
            <p className="card-description">{exam.description}</p>
            <p><strong>Time Limit:</strong> {exam.timeLimit}</p>
            <Link to={`/tasks/${exam.id}`} className="btn">
              Start Exam
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
