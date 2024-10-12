import styles from "./styles.module.css";

type Properties = {
  answer: string;
  onAnswer: (answer: string) => void;
};

const QuizAnswer: React.FC<Properties> = ({ answer, onAnswer }: Properties) => {
  const onClick = () => {
    onAnswer(answer);
  };

  return (
    <button className={styles["button-answer"]} onClick={onClick}>
      <div className={styles["circle"]}></div>
      <h5
        className={styles["answer"]}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </button>
  );
};

export { QuizAnswer };
