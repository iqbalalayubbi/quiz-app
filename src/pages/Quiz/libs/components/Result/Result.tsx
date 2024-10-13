import { Flex, Button, Modal } from "~/libs/components/components";
import { useCallback, useNavigate, useContext } from "~/libs/hooks/hooks";
import { TimerContextType } from "~/libs/context/types";
import { TimerContext } from "~/libs/context/contexts";
import { combineClassNames } from "~/libs/helpers/helpers";
import { AppRoute } from "~/libs/enums/enums";

import styles from "./styles.module.css";

type Properties = {
  score: number;
  totalQuestion: number;
  totalAnswer: number;
  createNewQuestion: () => void;
};

const Result: React.FC<Properties> = ({
  score,
  totalQuestion,
  totalAnswer,
  createNewQuestion,
}: Properties) => {
  const navigate = useNavigate();
  const { resetTimer } = useContext(TimerContext) as TimerContextType;

  const correctAnswer = score / totalQuestion;
  const wrongAnswer = totalQuestion - correctAnswer;

  const handlePlayAgain = useCallback(() => {
    Modal.confirm({
      title: "Play Again",
      content: "Are you sure you want to play again?",
      onOk: () => {
        resetTimer();
        createNewQuestion();
      },
      okCancel: true,
      centered: true,
    });
  }, [createNewQuestion, resetTimer]);

  const handleBackToMenu = () => {
    navigate(AppRoute.ROOT);
  };

  return (
    <Flex className={styles["container"]} align="center" vertical>
      <h1 className={styles["title"]}>Your Score</h1>
      <h1 className={styles["score"]}>{score}</h1>
      <Flex className={styles["data-container"]} gap={16} justify="center">
        <Flex
          className={combineClassNames(
            styles["answered-container"],
            styles["data"]
          )}
          justify="space-between"
          align="center"
        >
          <h3 className={styles["title"]}>Answered</h3>
          <h3 className={styles["value"]}>{totalAnswer}</h3>
        </Flex>
        <Flex
          className={combineClassNames(
            styles["correct-container"],
            styles["data"]
          )}
          justify="space-between"
          align="center"
        >
          <h3 className={styles["title"]}>Correct</h3>
          <h3 className={styles["value"]}>{correctAnswer}</h3>
        </Flex>
        <Flex
          className={combineClassNames(
            styles["wrong-container"],
            styles["data"]
          )}
          justify="space-between"
          align="center"
        >
          <h3 className={styles["title"]}>Wrong</h3>
          <h3 className={styles["value"]}>{wrongAnswer}</h3>
        </Flex>
      </Flex>
      <Flex className={styles["buttons"]} align="center" gap={"16px"} vertical>
        <Button
          type="primary"
          name="playAgain"
          htmlType="button"
          label="Play Again"
          onClick={handlePlayAgain}
        />
        <Button
          type="secondary"
          name="backMenu"
          htmlType="button"
          label="Back To Menu"
          onClick={handleBackToMenu}
        />
      </Flex>
    </Flex>
  );
};

export { Result };
