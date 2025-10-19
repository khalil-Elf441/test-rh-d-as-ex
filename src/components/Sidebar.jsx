
import React from 'react';

// Timer logic is now integrated directly into the Sidebar
const Timer = ({ startTime }) => {
  const examDuration = 4 * 60 * 60 * 1000; // 4 hours
  const endTime = startTime + examDuration;

  const calculateRemainingTime = () => {
    const now = Date.now();
    const remaining = endTime - now;
    return remaining > 0 ? remaining : 0;
  };

  const [remainingTime, setRemainingTime] = React.useState(calculateRemainingTime());

  React.useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (!startTime) {
    return null; // Don't show timer if exam hasn't started
  }

  return (
    <div className="timer-box">
      <div className="timer-label">Time remaining</div>
      <div className="timer-time">
        {remainingTime > 0 ? formatTime(remainingTime) : "Time's Up!"}
      </div>
    </div>
  );
};

const Sidebar = ({ startTime }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
          src="https://www.svgrepo.com/show/354273/redhat-icon.svg"
          alt="Red Hat Logo" 
          className="sidebar-logo" 
        />
        <h1 className="sidebar-title">Red Hat Test Exam</h1>
      </div>
      <Timer startTime={startTime} />
    </aside>
  );
};

export default Sidebar;
