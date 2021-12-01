import dayjs from 'dayjs';

export const relativeTime = (time?: string) => {
  return dayjs(time || new Date()).fromNow();
};
