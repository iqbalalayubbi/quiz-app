import { Flex, Modal } from "antd";
import { Button } from "~/libs/components/components";
import { useCallback, useNavigate } from "~/libs/hooks/hooks";

import styles from "./styles.module.css";
import { AppRoute } from "~/libs/enums/enums";
import { TokenStorage } from "~/libs/storage/storage";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(AppRoute.QUIZ);
  };

  const clickStartGame = () => {
    Modal.confirm({
      title: "Start Quiz",
      content: "Are you sure you want to start the quiz?",
      onOk: handleStartGame,
      okCancel: true,
      centered: true,
    });
  };

  const handleLogout = useCallback(() => {
    Modal.error({
      title: "Logout",
      content: "Are you sure you want to exit?",
      onOk: () => {
        navigate(AppRoute.LOGIN);
        TokenStorage.removeToken();
      },
      okCancel: true,
      centered: true,
    });
  }, [navigate]);

  return (
    <Flex
      className={styles["container"]}
      align="center"
      justify="center"
      vertical
    >
      <h1 className={styles["title"]}>Quizea</h1>
      <Flex className={styles["buttons"]} gap={"16px"} vertical>
        <Button
          label="Start Quiz"
          htmlType="button"
          name="startQuiz"
          type="primary"
          onClick={clickStartGame}
        />
        <Button
          label="Exit"
          htmlType="button"
          name="logout"
          type="secondary"
          onClick={handleLogout}
        />
      </Flex>
    </Flex>
  );
};

export { MainMenu };
