import {
  Flex,
  ClockCircleOutlined,
  LogoutOutlined,
} from "~/libs/components/components";
import { type TimerContextType } from "~/libs/context/types";
import { useContext } from "~/libs/hooks/hooks";
import { TimerContext } from "~/libs/context/contexts";

import styles from "./styles.module.css";

const Navbar = () => {
  const { displayTime } = useContext(TimerContext) as TimerContextType;

  return (
    <Flex className={styles["navbar"]} justify="space-between">
      <Flex className={styles["clock-container"]} align="center" gap={"8px"}>
        <ClockCircleOutlined className={styles["clock-icon"]} />
        <span>{displayTime}</span>
      </Flex>
      <h1 className={styles["title"]}>Quizea</h1>
      <Flex className={styles["logout-container"]} align="center" gap={"8px"}>
        <LogoutOutlined className={styles["logout-icon"]} />
        <span>Logout</span>
      </Flex>
    </Flex>
  );
};

export { Navbar };
