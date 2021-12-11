// 转义长度
export const getBLen = str => {
  if (!Boolean(str)) return 0;
  return str.replace(/[^\x00-\xff]/g, '01').length;
};
