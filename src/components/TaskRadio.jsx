
import React from 'react';

const TaskRadio = ({ examId, taskId, status, onStatusChange }) => {
  const handleChange = (e) => {
    onStatusChange(taskId, e.target.value);
  };

  return (
    <div className="task-radio">
      <div>
        <input
          type="radio"
          id={`revise-${examId}-${taskId}`}
          name={`status-${examId}-${taskId}`}
          value="revise"
          checked={status === 'revise'}
          onChange={handleChange}
        />
        <label htmlFor={`revise-${examId}-${taskId}`}>Revise</label>
      </div>
      <div>
        <input
          type="radio"
          id={`done-${examId}-${taskId}`}
          name={`status-${examId}-${taskId}`}
          value="done"
          checked={status === 'done'}
          onChange={handleChange}
        />
        <label htmlFor={`done-${examId}-${taskId}`}>Done</label>
      </div>
    </div>
  );
};

export default TaskRadio;
