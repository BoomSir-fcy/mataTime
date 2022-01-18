import dayjs from 'dayjs';

export const relativeTime = (time?: string) => {
  return dayjs(time || new Date()).fromNow();
};

export const formatUTC = (time?: string | number, format?: string) => {
  return dayjs(time || new Date()).utc().format(format);
}

export const  displayTime = (time: string | number) => {
  const current = dayjs();
  const dayTime = dayjs(time);
  const currentYear = current.year();
  const diffHour = current.diff(dayTime, 'hour');
  
  if (currentYear !== dayTime.year()) {
    return dayTime.format('YY-MM-DD HH:mm:ss');
  }
  if (diffHour < 24) {
    return dayTime.fromNow();
  }

  return dayTime.format('MM-DD HH:mm');
};