
import React from 'react';
import { Link } from 'react-router-dom';

const breadcrumbStyles = {
  padding: '0.75rem 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  color: '#555',
};

const linkStyles = {
  color: 'var(--rh-link-color)',
  textDecoration: 'none',
};

const separatorStyles = {
  margin: '0 0.5rem',
  color: '#888',
};

const Breadcrumbs = ({ exam, task }) => {
  return (
    <nav style={breadcrumbStyles} aria-label="breadcrumb">
      <Link to="/" style={linkStyles}>Home</Link>
      {exam && (
        <>
          <span style={separatorStyles}>/</span>
          {task ? (
            <Link to={`/tasks/${exam.examId}`} style={linkStyles}>
              {exam.title}
            </Link>
          ) : (
            <span>{exam.title}</span>
          )}
        </>
      )}
      {task && (
        <>
          <span style={separatorStyles}>/</span>
          <span>{task.title}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
