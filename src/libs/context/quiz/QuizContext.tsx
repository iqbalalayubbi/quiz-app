import { createContext } from "~/libs/components/components";
import { useState } from "~/libs/hooks/hooks";
import { QuestionType, QuizData } from "./libs/types/types";
import { QUIZ_DATA_DEFAULT_VALUE } from "./libs/constants/constants";

type UpdateQuizType = (QuestionData: QuestionType[]) => QuestionType[];

export type QuizContextType = {
  questions: QuestionType[];
  updateQuiz: UpdateQuizType;
  quizData: QuizData;
};

export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Who is the current Prime Minister of the United Kingdom?",
      answers: [
        "Boris Johnson",
        "David Cameron",
        "Nigel Farage",
        "George Osborne",
      ],
      correctAnswer: "David Cameron",
    },
  ]);

  const updateQuiz: UpdateQuizType = (
    questionData: QuestionType[]
  ): QuestionType[] => {
    setQuestions(questionData);
    return questions;
  };

  return (
    <QuizContext.Provider
      value={{ questions, updateQuiz, quizData: QUIZ_DATA_DEFAULT_VALUE }}
    >
      {children}
    </QuizContext.Provider>
  );
};
