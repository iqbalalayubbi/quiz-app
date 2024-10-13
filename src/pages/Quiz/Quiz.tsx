import {
  Flex,
  ClockCircleOutlined,
  LogoutOutlined,
  Spin,
} from "~/libs/components/components";
import { QuizContext, TimerContext } from "~/libs/context/contexts";
import {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "~/libs/hooks/hooks";
import {
  type QuizContextType,
  type TimerContextType,
} from "~/libs/context/types";
import { Question, Result } from "./libs/components/components";
import {
  DEFAULT_SCORE,
  CORRECT_POINT,
  START_QUESTION_NUMBER,
  QUESTION_STEP,
  NO_ANSWERED,
  START_QUESTION_INDEX,
  ZERO_TIMER,
} from "./libs/constants/constants";
import { QuizStorage, TokenStorage } from "~/libs/storage/storage";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
  const { displayTime, isTimeOver, resumeDisplayTime, resetTimer, countdown } =
    useContext(TimerContext) as TimerContextType;

  const { questions, quizData, isLoading, getQuizApi, updateQuestions } =
    useContext(QuizContext) as QuizContextType;

  const quizQuestion = questions[quizData.currentQuestion];
  const totalQuestion = questions.length;

  const [score, setScore] = useState<number>(DEFAULT_SCORE);
  const [isQuestionEnd, setIsQuestionEnd] = useState<boolean>(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(
    START_QUESTION_NUMBER
  );
  const [totalAnswer, setTotalAnswer] = useState<number>(NO_ANSWERED);

  const renderAfterCalled = useRef(false);

  const createNewQuestion = useCallback(() => {
    countdown();
    resetTimer();
    getQuizApi();
    quizData.currentQuestion = START_QUESTION_INDEX;
    setTotalAnswer(NO_ANSWERED);
    setCurrentQuestionNumber(START_QUESTION_NUMBER);
    setIsQuestionEnd(false);
    setScore(DEFAULT_SCORE);
  }, [
    setCurrentQuestionNumber,
    setIsQuestionEnd,
    setScore,
    quizData,
    countdown,
    resetTimer,
    getQuizApi,
  ]);

  const onAnswer = useCallback(
    (answer: string) => {
      setTotalAnswer((prevTotalAnswer) => prevTotalAnswer + QUESTION_STEP);

      if (answer === quizQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + CORRECT_POINT);
      }

      if (currentQuestionNumber < totalQuestion) {
        quizData.currentQuestion++;
        setCurrentQuestionNumber(
          (prevQuestionNumber) => prevQuestionNumber + START_QUESTION_NUMBER
        );
      } else {
        setIsQuestionEnd(true);
        resumeDisplayTime(ZERO_TIMER);
      }
    },
    [
      setScore,
      quizData,
      quizQuestion,
      currentQuestionNumber,
      totalQuestion,
      resumeDisplayTime,
    ]
  );

  const handleBeforeUnloaded = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!isTimeOver && !isQuestionEnd) {
        event.preventDefault();
        QuizStorage.setResumeQuiz({
          questions,
          displayTime,
          currentQuestionNumber,
          totalAnswer,
          score,
        });
        TokenStorage.removeToken();
        window.location.reload();
      }
    },
    [
      displayTime,
      isTimeOver,
      isQuestionEnd,
      questions,
      currentQuestionNumber,
      totalAnswer,
      score,
    ]
  );

  const resumeQuiz = useCallback(() => {
    const resumeQuizData = QuizStorage.getResumeQuiz();
    if (resumeQuizData) {
      updateQuestions(resumeQuizData.questions);
      setScore(resumeQuizData.score);
      setCurrentQuestionNumber(resumeQuizData.currentQuestionNumber);
      resumeDisplayTime(resumeQuizData.displayTime);
      setTotalAnswer(resumeQuizData.totalAnswer);
      setIsQuestionEnd(false);
    }
  }, [
    updateQuestions,
    setScore,
    setCurrentQuestionNumber,
    resumeDisplayTime,
    setTotalAnswer,
    setIsQuestionEnd,
  ]);

  useEffect(() => {
    const hasResumeQuiz = QuizStorage.hasResumeQuiz();
    if (!renderAfterCalled.current) {
      if (hasResumeQuiz) {
        resumeQuiz();
      } else {
        createNewQuestion();
      }
    }

    renderAfterCalled.current = true;
  }, [createNewQuestion, resumeQuiz]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnloaded);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnloaded);
    };
  }, [handleBeforeUnloaded]);

  return (
    <>
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
      {isQuestionEnd || isTimeOver ? (
        <Result
          score={score}
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
          createNewQuestion={createNewQuestion}
        />
      ) : isLoading ? (
        <Flex
          className={styles["loading-container"]}
          justify="center"
          align="center"
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Question
          currentQuestionNumber={currentQuestionNumber}
          totalQuestion={totalQuestion}
          quizQuestion={quizQuestion}
          onAnswer={onAnswer}
        />
      )}
    </>
  );
};

export { Quiz };
