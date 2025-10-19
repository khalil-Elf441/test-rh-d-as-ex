
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SubtaskCheckbox from '../components/SubtaskCheckbox';
import examData from '../data/mocks/ex316-mock1.json';
import NotFound from './NotFound';

// Re-using the localStorage hook from TasksPage
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

const TaskDetail = () => {
  const { examId, taskId } = useParams();
  const task = examData.tasks.find((t) => t.id === taskId);

  const [checkedSubtasks, setCheckedSubtasks] = useLocalStorage(
    `checkedSubtasks_${examId}_${taskId}`,
    {}
  );

  if (!task) {
    return <NotFound />;
  }

  const handleCheckboxChange = (sectionIndex, subtaskIndex) => {
    const key = `${sectionIndex}-${subtaskIndex}`;
    setCheckedSubtasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="card">
      <Link to={`/tasks/${examId}`} className="back-link">
        &larr; Back to Task List
      </Link>

      <div className="task-detail-header">
        <h1 className="task-detail-title">{task.title}</h1>
      </div>

      {task.sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="task-section">
          <h2 className="section-title">{section.title}</h2>
          {section.notice && <p className="section-notice">{section.notice}</p>}
          
          <ul className="subtask-list">
            {section.subtasks.map((subtask, subtaskIndex) => (
              <SubtaskCheckbox
                key={subtaskIndex}
                examId={examId}
                taskId={taskId}
                sectionIndex={sectionIndex}
                subtaskIndex={subtaskIndex}
                subtask={subtask}
                isChecked={!!checkedSubtasks[`${sectionIndex}-${subtaskIndex}`]}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default TaskDetail;
