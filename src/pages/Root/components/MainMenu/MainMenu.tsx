import { Flex, Modal } from "antd";
import { Button } from "~/libs/components/components";
import {
  useCallback,
  useEffect,
  useNavigate,
  useState,
} from "~/libs/hooks/hooks";

import { AppRoute } from "~/libs/enums/enums";
import { QuizStorage, TokenStorage } from "~/libs/storage/storage";
import { ButtonStatusText } from "./enums/enums";

import styles from "./styles.module.css";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [textStatusButton, setTextStatusButton] = useState<string>(
    ButtonStatusText.START
  );

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
        window.location.reload();
      },
      okCancel: true,
      centered: true,
    });
  }, [navigate]);

  useEffect(() => {
    const hasResumeQuiz = QuizStorage.hasResumeQuiz();
    if (hasResumeQuiz) {
      setTextStatusButton(ButtonStatusText.RESUME);
    } else {
      setTextStatusButton(ButtonStatusText.START);
    }
  }, []);

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
          label={textStatusButton}
          htmlType="button"
          name="startQuiz"
          type="primary"
          onClick={clickStartGame}
        />
        <Button
          label={ButtonStatusText.EXIT}
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
