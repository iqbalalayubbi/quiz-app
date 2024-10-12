import { Flex, Button, Modal } from "~/libs/components/components";
import { useCallback, useNavigate } from "~/libs/hooks/hooks";
import { AppRoute } from "~/libs/enums/enums";

import styles from "./styles.module.css";
import { combineClassNames } from "~/libs/helpers/helpers";

type Properties = {
  score: number;
};

const Result: React.FC<Properties> = ({ score }: Properties) => {
  const navigate = useNavigate();
  const PLAY_AGAIN = "playAgain";

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = event.target as HTMLButtonElement;

      if (name == PLAY_AGAIN) {
        Modal.confirm({
          title: "Play Again",
          content: "Are you sure you want to play again?",
          onOk: () => window.location.reload(),
          okCancel: true,
          centered: true,
        });
      } else {
        navigate(AppRoute.ROOT);
      }
    },
    [navigate]
  );

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
          <h3 className={styles["value"]}>8</h3>
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
          <h3 className={styles["value"]}>6</h3>
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
          <h3 className={styles["value"]}>2</h3>
        </Flex>
      </Flex>
      <Flex className={styles["buttons"]} align="center" gap={"16px"} vertical>
        <Button
          type="primary"
          name="playAgain"
          htmlType="button"
          label="Play Again"
          onClick={handleClick}
        />
        <Button
          type="secondary"
          name="backMenu"
          htmlType="button"
          label="Back To Menu"
          onClick={handleClick}
        />
      </Flex>
    </Flex>
  );
};

export { Result };
