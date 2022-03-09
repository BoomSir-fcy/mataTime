export const getValidDateSecond = (date?: string) => {
  if (!date) return '';
  // return Number(date) * 24 * 60 * 60;
  // 测试用
  return date;
};
export const getValidDateDay = (date?: number) => {
  if (!date) return 0;
  // return date / 60 / 60 / 24;
  // 测试用
  return date;
};
