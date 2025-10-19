
import React from 'react';

const TaskRadio = ({ examId, taskId, status, onStatusChange }) => {
  const handleChange = (e) => {
    onStatusChange(taskId, e.target.value);
  };

  return (
    <div className="task-radio-simple">
      <label>
        <input
          type="radio"
          name={`status-${examId}-${taskId}`}
          value="revise"
          checked={status === 'revise'}
          onChange={handleChange}
        />
        Revise
      </label>
      <label>
        <input
          type="radio"
          name={`status-${examId}-${taskId}`}
          value="done"
          checked={status === 'done'}
          onChange={handleChange}
        />
        Done
      </label>
    </div>
  );
};

export default TaskRadio;
