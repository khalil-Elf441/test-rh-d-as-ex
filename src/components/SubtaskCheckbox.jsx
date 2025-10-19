
import React from 'react';

const SubtaskCheckbox = ({ examId, taskId, sectionIndex, subtaskIndex, subtask, isChecked, onCheckboxChange }) => {
  const handleChange = () => {
    onCheckboxChange(sectionIndex, subtaskIndex);
  };

  const checkboxId = `subtask-${examId}-${taskId}-${sectionIndex}-${subtaskIndex}`;

  return (
    <li className="subtask-item">
      <label htmlFor={checkboxId} className="subtask-label">
        <input
          type="checkbox"
          id={checkboxId}
          checked={isChecked}
          onChange={handleChange}
        />
        <span className={isChecked ? 'completed' : ''}>{subtask}</span>
      </label>
    </li>
  );
};

export default SubtaskCheckbox;
