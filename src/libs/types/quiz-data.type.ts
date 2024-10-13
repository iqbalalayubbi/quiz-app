import { Question } from "./question.type";

type QuizData = {
  questions: Question[];
  displayTime: string;
  currentQuestionNumber: number;
  totalAnswer: number;
  score: number;
};

export { type QuizData };
