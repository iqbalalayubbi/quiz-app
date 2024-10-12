const convertSecondsToString = (seconds: number): string => {
  // 300 seconds = 05:00
  const MINUTE_IN_SECOND = 60;
  const MAX_TIME_FORMAT = 10;
  const minutes = Math.floor(seconds / MINUTE_IN_SECOND);
  const remainSeconds = seconds % MINUTE_IN_SECOND;
  return `${minutes < MAX_TIME_FORMAT ? `0${minutes}` : minutes}:${
    seconds < MAX_TIME_FORMAT ? `0${remainSeconds}` : remainSeconds
  }`;
};

export { convertSecondsToString };
