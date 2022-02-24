export const getValidDateSecond = (date?: string) => {
  if (!date) return 0;
  return Number(date) * 24 * 60 * 60;
};
export const getValidDateDay = (date?: number) => {
  if (!date) return 0;
  return date / 60 / 60 / 24;
};
