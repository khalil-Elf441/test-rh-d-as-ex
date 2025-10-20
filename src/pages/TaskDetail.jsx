
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SubtaskCheckbox from '../components/SubtaskCheckbox';
import NotFound from './NotFound';
import Breadcrumbs from '../components/Breadcrumbs';
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

  const [showSolution, setShowSolution] = React.useState(false);

  if (!task || !currentExam) {
    return <NotFound />;
  }

  const handleCheckboxChange = (sectionIndex, subtaskIndex) => {
    const key = `${sectionIndex}-${subtaskIndex}`;
    setCheckedSubtasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Placeholder solution content
  const solutionContent = `Solution for ${task.title}:\n\n# This will be populated with actual solution scripts.\noc get vm ${task.id} -o yaml`;

  return (
    <div>
      <Breadcrumbs exam={currentExam} task={task} />
      <div className="task-detail-header">
        <h1>{task.title}</h1>
      </div>
      <hr />

      {task.sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="task-section">
          <h2 className="section-title">{section.title}</h2>
          {section.notice && <p className="section-notice" dangerouslySetInnerHTML={{ __html: section.notice.replace(/\n/g, '<br />') }}></p>}
          
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

      <hr />
    </div>
  );
};

export default TaskDetail;
