import { Flex } from "antd";
import { ClockCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { QuizAnswer } from "~/libs/components/components";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  const onAnswer = (answer: string, isCorrect: boolean) => {
    console.log(answer, isCorrect);
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
          <h5 className={styles["question"]}>
            How tall is One World Trade Center in New York City?
          </h5>
        </Flex>
        <Flex className={styles["answers"]} gap={"24px"} vertical>
          <QuizAnswer answer="320 feet" isCorrect={false} onAnswer={onAnswer} />
          <QuizAnswer answer="332 feet" isCorrect={true} onAnswer={onAnswer} />
          <QuizAnswer answer="340 feet" isCorrect={false} onAnswer={onAnswer} />
          <QuizAnswer answer="350 feet" isCorrect={false} onAnswer={onAnswer} />
        </Flex>
      </Flex>
    </>
  );
};

export { Quiz };
