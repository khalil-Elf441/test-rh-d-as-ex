
import React, { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  const examDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const endTime = startTime + examDuration;

  const calculateRemainingTime = () => {
    const now = Date.now();
    const remaining = endTime - now;
    return remaining > 0 ? remaining : 0;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
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

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '2rem',
      background: remainingTime < 15 * 60 * 1000 ? '#EE0000' : '#333',
      color: 'white',
      padding: '0.8rem 1.2rem',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000,
      transition: 'background-color 0.5s ease'
    }}>
      {remainingTime > 0 ? (
        <span>Time Remaining: {formatTime(remainingTime)}</span>
      ) : (
        <span>Time's Up!</span>
      )}
    </div>
  );
};

export default Timer;
