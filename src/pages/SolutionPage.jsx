
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { examDataMap } from '../data/examData';
import NotFound from './NotFound';
import Breadcrumbs from '../components/Breadcrumbs';

const SolutionPage = () => {
  const { examId, taskId } = useParams();
  const currentExam = examDataMap[examId];
  const task = currentExam?.tasks.find((t) => t.id === taskId);

  if (!task || !currentExam) {
    return <NotFound />;
  }

  return (
    <div>
      <Breadcrumbs exam={currentExam} task={task} />
      <div className="task-detail-header">
        <h1>Solution: {task.title}</h1>
      </div>
      <Link to={`/task/${examId}/${taskId}`} className="back-link" style={{marginBottom: '1.5rem'}}>
        &larr; Back to Task Description
      </Link>
      <hr />
      <div style={{ marginTop: '1rem' }}>
        <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', border: '1px solid #ddd', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {task.solution || 'No solution provided for this task.'}
        </pre>
      </div>
    </div>
  );
};

export default SolutionPage;
