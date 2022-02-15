export const getValidDate = (date?: string) => {
  if (!date) return 0;
  return Number(date) * 24 * 60 * 60;
};
