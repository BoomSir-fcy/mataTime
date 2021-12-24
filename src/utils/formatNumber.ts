export const formatHexadecimal = (num: number, radix = 10) => {
  const hex = Number.parseInt(`${num}`, radix)?.toString(16).toUpperCase();
  if (hex.length === 2) return hex;
  return `0${hex}`;
};
