import { createContext } from "~/libs/components/components";
import { useState } from "~/libs/hooks/hooks";
import { QuestionType, QuizData } from "./libs/types/types";
import { QUIZ_DATA_DEFAULT_VALUE } from "./libs/constants/constants";
import { QuizApi } from "~/libs/api/api";

export type QuizContextType = {
  questions: QuestionType[];
  getQuizApi: () => void;
  quizData: QuizData;
  isLoading: boolean;
};

type QuestionResponse = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mappedQuestions = (
    questionsResponse: QuestionResponse[]
  ): QuestionType[] => {
    return questionsResponse.map((question) => ({
      question: question.question,
      answers: [...question.incorrect_answers, question.correct_answer],
      correctAnswer: question.correct_answer,
    }));
  };

  const getQuizApi = async () => {
    setIsLoading(true);
    const response = await QuizApi.getQuizData();
    const { results } = response;
    const newQuestions = mappedQuestions(results);
    console.log(newQuestions);
    setQuestions(newQuestions);
    setIsLoading(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        quizData: QUIZ_DATA_DEFAULT_VALUE,
        isLoading,
        getQuizApi,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
