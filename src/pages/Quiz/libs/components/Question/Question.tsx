import { QuizAnswer, Flex } from "~/libs/components/components";
import { useCallback } from "~/libs/hooks/hooks";

import styles from "./styles.module.css";

type Properties = {
  currentQuestionNumber: number;
  totalQuestion: number;
  quizQuestion: {
    question: string;
    answers: string[];
    correctAnswer: string;
  };
  onAnswer: (answer: string) => void;
};

const Question: React.FC<Properties> = ({
  currentQuestionNumber,
  totalQuestion,
  quizQuestion,
  onAnswer,
}) => {
  const handleAnswer = useCallback(
    (answer: string) => {
      onAnswer(answer);
    },
    [onAnswer]
  );

  return (
    <Flex
      className={styles["container"]}
      align="center"
      justify="center"
      gap={"3px"}
      vertical
    >
      <Flex align="center" gap={"8px"} vertical>
        <h3 className={styles["question-number"]}>
          Question {currentQuestionNumber}
        </h3>
        <h5 />
        <h5 className={styles["sub-question-number"]}>
          {currentQuestionNumber}/{totalQuestion}
        </h5>
        <h5
          dangerouslySetInnerHTML={{ __html: quizQuestion.question }}
          className={styles["question"]}
        />
      </Flex>
      <Flex className={styles["answers"]} gap={"24px"} vertical>
        {quizQuestion.answers.map((answer) => {
          return (
            <QuizAnswer key={answer} answer={answer} onAnswer={handleAnswer} />
          );
        })}
      </Flex>
    </Flex>
  );
};

export { Question };
