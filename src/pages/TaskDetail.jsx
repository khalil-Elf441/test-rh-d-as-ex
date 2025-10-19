
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SubtaskCheckbox from '../components/SubtaskCheckbox';
import NotFound from './NotFound';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { examDataMap } from '../data/examData';

const TaskDetail = () => {
  const { examId, taskId } = useParams();
  const currentExam = examDataMap[examId];
  const task = currentExam?.tasks.find((t) => t.id === taskId);

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
    <div>
      <Link to={`/tasks/${examId}`} className="back-link">
        &larr; Back to Task List
      </Link>

      <div className="task-detail-header">
        <h1>{task.title}</h1>
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
