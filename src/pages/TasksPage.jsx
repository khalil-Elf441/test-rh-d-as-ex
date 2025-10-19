
import React, { useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import TaskRadio from '../components/TaskRadio';
import NotFound from './NotFound';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { examDataMap } from '../data/examData';

const TasksPage = () => {
  const { onStartExam } = useOutletContext(); // Get function from parent layout
  const { examId } = useParams();
  const currentExam = examDataMap[examId];

  const [taskStatuses, setTaskStatuses] = useLocalStorage(`taskStatuses_${examId}`, {});

  useEffect(() => {
    if (examId && onStartExam) {
      onStartExam(examId);
    }
  }, [examId, onStartExam]);

  const handleStatusChange = (taskId, status) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [taskId]: status,
    }));
  };

  if (!currentExam) {
    return <NotFound />;
  }

  return (
    <div>
        <h1 className="page-title">{currentExam.title}</h1>
        <p className="page-intro">Please review the Important Configuration Information section below for information on your exam environment.</p>
        <hr />
        
        <h2 style={{marginBottom: '1.5rem'}}>Tasks</h2>
        <ul className="task-list-exam">
            {currentExam.tasks.map((task) => (
            <li key={task.id}>
                <TaskRadio
                    examId={examId}
                    taskId={task.id}
                    status={taskStatuses[task.id] || 'revise'}
                    onStatusChange={handleStatusChange}
                />
                <Link to={`/task/${examId}/${task.id}`}>
                {task.title}
                </Link>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default TasksPage;
