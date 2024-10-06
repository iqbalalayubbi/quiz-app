import { Flex } from "antd";
import { ClockCircleOutlined, LogoutOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  return (
    <>
      <Flex className={styles["navbar"]} justify="space-between">
        <Flex align="center" gap={"8px"}>
          <ClockCircleOutlined className={styles["clock-icon"]} />
          <span>05:00</span>
        </Flex>
        <h1 className={styles["title"]}>Quizea</h1>
        <Flex align="center" gap={"8px"}>
          <LogoutOutlined className={styles["logout-icon"]} />
          <span>Logout</span>
        </Flex>
      </Flex>
    </>
  );
};

export { Quiz };
