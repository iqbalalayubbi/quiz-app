import { Flex } from "antd";
import { ClockCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { QuizAnswer } from "~/libs/components/components";
import { QuizContext } from "~/libs/context/contexts";
import { useContext, useState } from "~/libs/hooks/hooks";
import { type QuizContextType } from "~/libs/context/quiz/QuizContext";
import { DEFAULT_SCORE, CORRECT_POINT } from "./libs/constants/constants";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  const { questions, quizData } = useContext(QuizContext) as QuizContextType;
  const { currentQuestion } = quizData;

  const [score, setScore] = useState<number>(DEFAULT_SCORE);

  const onAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + CORRECT_POINT);
    }

    quizData.currentQuestion++;
  };

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
      <Flex
        className={styles["container"]}
        align="center"
        justify="center"
        gap={"3px"}
        vertical
      >
        <Flex align="center" gap={"8px"} vertical>
          <h3 className={styles["question-number"]}>Question 1</h3>
          <h5 className={styles["sub-question-number"]}>1/10</h5>
          <h5 className={styles["score"]}>{score}</h5>
          <h5 className={styles["question"]}>
            {questions[currentQuestion].question}
          </h5>
        </Flex>
        <Flex className={styles["answers"]} gap={"24px"} vertical>
          {questions[currentQuestion].answers.map((answer) => {
            return (
              <QuizAnswer key={answer} answer={answer} onAnswer={onAnswer} />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export { Quiz };
