import BaseStorage from "./BaseStorage";
import { StorageKeys } from "../enums/enums";
import { type Question } from "../types/types";

type QuizData = {
  questions: Question[];
  displayTime: string;
  currentQuestionNumber: number;
  totalAnswer: number;
  score: number;
};

class Quiz extends BaseStorage {
  getResumeQuiz(): QuizData | null {
    const resumeQuizData = super.get(StorageKeys.QUIZ_KEY);
    return resumeQuizData ? JSON.parse(resumeQuizData) : null;
  }

  setResumeQuiz(resumeQuizData: QuizData) {
    super.set(StorageKeys.QUIZ_KEY, JSON.stringify(resumeQuizData));
  }
}

export { Quiz };
