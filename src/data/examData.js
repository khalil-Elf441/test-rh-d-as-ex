// Dynamically import all exam.json files from mock directories
const modules = import.meta.glob('./mocks/ex316-*/exam.json', { eager: true });

const loadedExams = Object.values(modules).map(module => module.default);

// Sort exams by examId to maintain a consistent order
loadedExams.sort((a, b) => {
  const numA = parseInt(a.examId.split('-').pop(), 10);
  const numB = parseInt(b.examId.split('-').pop(), 10);
  return numA - numB;
});

export const allExams = loadedExams;

export const examDataMap = allExams.reduce((acc, exam) => {
  acc[exam.examId] = exam;
  return acc;
}, {});