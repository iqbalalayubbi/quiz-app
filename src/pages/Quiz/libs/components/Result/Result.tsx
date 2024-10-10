import { Flex, Button, Modal } from "~/libs/components/components";
import { useCallback, useNavigate } from "~/libs/hooks/hooks";
import { AppRoute } from "~/libs/enums/enums";

import styles from "./styles.module.css";

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
