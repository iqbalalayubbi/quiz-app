import {
  Flex,
  ClockCircleOutlined,
  LogoutOutlined,
  Spin,
} from "~/libs/components/components";
import { QuizContext } from "~/libs/context/contexts";
import { useContext, useState, useCallback } from "~/libs/hooks/hooks";
import { type QuizContextType } from "~/libs/context/quiz/QuizContext";
import { Question, Result } from "./libs/components/components";
import {
  DEFAULT_SCORE,
  CORRECT_POINT,
  START_QUESTION_NUMBER,
  QUESTION_STEP,
  NO_ANSWERED,
} from "./libs/constants/constants";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  const { questions, quizData, isLoading } = useContext(
    QuizContext
  ) as QuizContextType;

  const quizQuestion = questions[quizData.currentQuestion];
  const totalQuestion = questions.length;

  const [score, setScore] = useState<number>(DEFAULT_SCORE);
  const [isQuestionEnd, setIsQuestionEnd] = useState<boolean>(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(
    START_QUESTION_NUMBER
  );
  const [totalAnswer, setTotalAnswer] = useState<number>(NO_ANSWERED);

  const onAnswer = useCallback(
    (answer: string) => {
      setTotalAnswer((prevTotalAnswer) => prevTotalAnswer + QUESTION_STEP);

      if (answer === quizQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + CORRECT_POINT);
      }

      if (currentQuestionNumber < totalQuestion) {
        quizData.currentQuestion++;
        setCurrentQuestionNumber(
          (prevQuestionNumber) => prevQuestionNumber + START_QUESTION_NUMBER
        );
      } else {
        setIsQuestionEnd(true);
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
      {isQuestionEnd ? (
        <Result
          score={score}
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
        />
      ) : isLoading ? (
        <Flex
          className={styles["loading-container"]}
          justify="center"
          align="center"
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Question
          currentQuestionNumber={currentQuestionNumber}
          totalQuestion={totalQuestion}
          quizQuestion={quizQuestion}
          onAnswer={onAnswer}
        />
      )}
    </>
  );
};

export { Quiz };
