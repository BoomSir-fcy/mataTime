import { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const useCountdownTime = (endTime: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState('00:00:00');
  const [IsEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const startCountdown = async () => {
      let duration = dayjs.duration(endTime - new Date().getTime());
      setIsEnd(endTime - new Date().getTime() <= 0);

      let hours = duration.hours();
      let minutes = duration.minutes();
      let seconds = duration.seconds();

      // let minutes =
      //   duration.minutes() % 60 < 10
      //     ? '0' + (duration.minutes() % 60)
      //     : duration.minutes() % 60;

      // let seconds =
      //   duration.seconds() % 60 < 10
      //     ? '0' + (duration.seconds() % 60)
      //     : duration.seconds() % 60;

      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(timer.current);
        setIsEnd(true);
        setSecondsRemaining('00:00:00');
      } else {
        // setSecondsRemaining(`${hours}:${minutes}:${seconds}`);
        setSecondsRemaining(duration.format('HH:mm:ss'));
      }
      setHour(hours);
      setMinute(Number(minutes));
      setSecond(Number(seconds));
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

  return [secondsRemaining, hour, minute, second, IsEnd];
};
