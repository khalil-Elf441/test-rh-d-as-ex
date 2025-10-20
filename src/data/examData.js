
// Import all mocks and create a map for dynamic access
import mock1 from './mocks/ex316-mock1.json';
import mock2 from './mocks/ex316-mock2.json';
import mock3 from './mocks/ex316-mock3.json';
import mock4 from './mocks/ex316-mock4.json';
import mock5 from './mocks/ex316-mock5.json';
import mock6 from './mocks/ex316-mock6.json';
import mock7 from './mocks/ex316-mock7.json';
import mock8 from './mocks/ex316-mock8.json';
import mock9 from './mocks/ex316-mock9.json';

export const examDataMap = {
  [mock1.examId]: mock1,
  [mock2.examId]: mock2,
  [mock3.examId]: mock3,
  [mock4.examId]: mock4,
  [mock5.examId]: mock5,
  [mock6.examId]: mock6,
  [mock7.examId]: mock7,
  [mock8.examId]: mock8,
  [mock9.examId]: mock9,
};

export const allExams = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9];
