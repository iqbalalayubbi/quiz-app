const convertTimeStringToSeconds = (times: string): number => {
  const MINUTE_IN_SECOND = 60;
  const [minutes, seconds] = times.split(":").map(Number);
  return minutes * MINUTE_IN_SECOND + seconds;
};

export { convertTimeStringToSeconds };
