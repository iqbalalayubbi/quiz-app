import styles from "./styles.module.css";

type Properties = {
  answer: string;
  isCorrect: boolean;
  onAnswer: (answer: string, isCorrect: boolean) => void;
};

const QuizAnswer: React.FC<Properties> = ({
  answer,
  isCorrect = false,
  onAnswer,
}: Properties) => {
  const onClick = () => {
    onAnswer(answer, isCorrect);
  };

  return (
    <button className={styles["button-answer"]} onClick={onClick}>
      <div className={styles["circle"]}></div>
      <h5 className={styles["answer"]}>{answer}</h5>
    </button>
  );
};

export { QuizAnswer };
