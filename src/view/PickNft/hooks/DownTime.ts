import { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const useCountdownTime = (endTime: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [secondsRemaining, setSecondsRemaining] = useState('00:10:00');

  useEffect(() => {
    const startCountdown = async () => {
      let duration = dayjs.duration(endTime * 1000 - new Date().getTime());
      let hours = duration.hours();

      let minutes =
        duration.minutes() % 60 < 10
          ? '0' + (duration.minutes() % 60)
          : duration.minutes() % 60;

      let seconds =
        duration.seconds() % 60 < 10
          ? '0' + (duration.seconds() % 60)
          : duration.seconds() % 60;

      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(timer.current);
        setSecondsRemaining('00:00:00');
      } else {
        setSecondsRemaining(`${hours}:${minutes}:${seconds}`);
      }
    };
    if (endTime > 0) {
      timer.current = setInterval(() => {
        startCountdown();
      }, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [setSecondsRemaining, endTime, timer]);

  return secondsRemaining;
};
