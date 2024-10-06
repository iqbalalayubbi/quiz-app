import {
  Flex,
  ClockCircleOutlined,
  LogoutOutlined,
} from "~/libs/components/components";
import { QuizContext } from "~/libs/context/contexts";
import { useContext, useState, useCallback } from "~/libs/hooks/hooks";
import { type QuizContextType } from "~/libs/context/quiz/QuizContext";
import { Question } from "./libs/components/Question/Question";
import {
  DEFAULT_SCORE,
  CORRECT_POINT,
  START_QUESTION_NUMBER,
} from "./libs/constants/constants";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  const { questions, quizData } = useContext(QuizContext) as QuizContextType;
  const { currentQuestion } = quizData;
  const quizQuestion = questions[currentQuestion];

  const [, setScore] = useState<number>(DEFAULT_SCORE);
  const totalQuestion = questions.length;
  const currentQuestionNumber =
    START_QUESTION_NUMBER + quizData.currentQuestion;

  const onAnswer = useCallback(
    (answer: string) => {
      if (answer === quizQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + CORRECT_POINT);
      }

      if (currentQuestionNumber < totalQuestion) {
        quizData.currentQuestion++;
      }
    },
    [setScore, quizData, quizQuestion, currentQuestionNumber, totalQuestion]
  );

  return (
    <>
      <Flex className={styles["navbar"]} justify="space-between">
        <Flex className={styles["clock-container"]} align="center" gap={"8px"}>
          <ClockCircleOutlined className={styles["clock-icon"]} />
          <span>05:00</span>
        </Flex>
        <h1 className={styles["title"]}>Quizea</h1>
        <Flex className={styles["logout-container"]} align="center" gap={"8px"}>
          <LogoutOutlined className={styles["logout-icon"]} />
          <span>Logout</span>
        </Flex>
      </Flex>
      {}
      <Question
        currentQuestionNumber={currentQuestionNumber}
        totalQuestion={totalQuestion}
        quizQuestion={quizQuestion}
        onAnswer={onAnswer}
      />
    </>
  );
};

export { Quiz };
