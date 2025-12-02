import lesson1 from '../data/introduction-to-chinese/lesson1.json';
import lesson2 from '../data/introduction-to-chinese/lesson2.json';
import lesson3 from '../data/introduction-to-chinese/lesson3.json';
import lesson4 from '../data/introduction-to-chinese/lesson4.json';
import lesson5 from '../data/introduction-to-chinese/lesson5.json';
import lesson6 from '../data/introduction-to-chinese/lesson6.json';
import lesson7 from '../data/introduction-to-chinese/lesson7.json';
import lesson8 from '../data/introduction-to-chinese/lesson8.json';
import lesson9 from '../data/introduction-to-chinese/lesson9.json';
import lesson10 from '../data/introduction-to-chinese/lesson10.json';
import lesson11 from '../data/introduction-to-chinese/lesson11.json';
import lesson12 from '../data/introduction-to-chinese/lesson12.json';
import midterm from '../data/introduction-to-chinese/midterm.json';
import finalExam from '../data/introduction-to-chinese/final-exam.json';

const introCourse = {
  id: 'introduction-to-chinese',
  name: 'Introduction to Chinese',
  quizzes: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    midterm,
    finalExam,
    lesson7,
    lesson8,
    lesson9,
    lesson10,
    lesson11,
    lesson12,
  ],
};

export const courses = [introCourse];

export function getQuiz(courseId, quizId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return undefined;
  return course.quizzes.find((quiz) => quiz.id === quizId);
}
