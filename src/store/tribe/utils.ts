export const getValidDateSecond = (date?: string) => {
  if (!date) return 0;
  // FIXME: 改回去
  return Number(date);
  // return Number(date) * 24 * 60 * 60;
};
export const getValidDateDay = (date?: number) => {
  if (!date) return 0;
  // FIXME: 改回去
  return date
  // return date / 60 / 60 / 24;
};
