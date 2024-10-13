import { createContext } from "~/libs/components/components";
import {
  DEFAULT_TIMER_IN_SECOND,
  DEFAULT_TIMER_IN_STRING,
  START_SECOND,
  COUNTDOWN_STEP,
  ONE_SECOND_IN_MS,
} from "./constants/constants";
import { useState, useCallback } from "~/libs/hooks/hooks";
import {
  convertTimeStringToSeconds,
  convertSecondsToString,
} from "./helpers/helpers";

export type TimerContextType = {
  time: number;
  displayTime: string;
  isTimeOver: boolean;
  resetTimer: () => void;
  countdown: () => void;
  resumeDisplayTime: (resumeTime: string) => void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [time, setTime] = useState<string>(DEFAULT_TIMER_IN_STRING);
  const [, setSeconds] = useState<number>(convertTimeStringToSeconds(time));
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);

  const countdown = useCallback(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > START_SECOND) {
          const newSecond = prevSeconds - COUNTDOWN_STEP;
          setTime(convertSecondsToString(newSecond));
          return newSecond;
        } else {
          setIsTimeOver(true);
          clearInterval(interval);
          return START_SECOND;
        }
      });
    }, ONE_SECOND_IN_MS);
  }, [setSeconds, setTime, setIsTimeOver]);

  const resetTimer = () => {
    setTime(DEFAULT_TIMER_IN_STRING);
    setSeconds(convertTimeStringToSeconds(DEFAULT_TIMER_IN_STRING));
    setIsTimeOver(false);
  };

  const resumeDisplayTime = (resumeTime: string) => {
    setTime(resumeTime);
    setSeconds(convertTimeStringToSeconds(resumeTime));
    countdown();
  };

  const DEFAULT_TIMER_CONTEXT_VALUE: TimerContextType = {
    time: DEFAULT_TIMER_IN_SECOND,
    displayTime: time,
    isTimeOver,
    resetTimer,
    countdown,
    resumeDisplayTime,
  };

  return (
    <TimerContext.Provider value={DEFAULT_TIMER_CONTEXT_VALUE}>
      {children}
    </TimerContext.Provider>
  );
};
