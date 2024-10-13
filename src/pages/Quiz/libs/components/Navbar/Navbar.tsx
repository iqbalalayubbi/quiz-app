import {
  Flex,
  ClockCircleOutlined,
  LogoutOutlined,
  Modal,
} from "~/libs/components/components";
import { type TimerContextType } from "~/libs/context/types";
import { useContext, useNavigate } from "~/libs/hooks/hooks";
import { TimerContext } from "~/libs/context/contexts";

import styles from "./styles.module.css";
import { QuizStorage, TokenStorage } from "~/libs/storage/storage";
import { AppRoute } from "~/libs/enums/enums";

const Navbar = () => {
  const navigate = useNavigate();

  const { displayTime } = useContext(TimerContext) as TimerContextType;

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        QuizStorage.removeResumeQuiz();
        TokenStorage.removeToken();
        navigate(AppRoute.LOGIN);
      },
      onCancel() {},
      centered: true,
    });
  };

  return (
    <Flex className={styles["navbar"]} justify="space-between">
      <Flex className={styles["clock-container"]} align="center" gap={"8px"}>
        <ClockCircleOutlined className={styles["clock-icon"]} />
        <span>{displayTime}</span>
      </Flex>
      <h1 className={styles["title"]}>Quizea</h1>
      <Flex
        className={styles["logout-container"]}
        align="center"
        gap={"8px"}
        onClick={handleLogout}
      >
        <LogoutOutlined className={styles["logout-icon"]} />
        <span>Logout</span>
      </Flex>
    </Flex>
  );
};

export { Navbar };
