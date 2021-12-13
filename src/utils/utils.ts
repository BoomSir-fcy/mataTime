// 转义长度
export const getBLen = str => {
  if (!Boolean(str)) return 0;
  return new Blob([str], { type: 'text/plain, charset=utf-8' }).size
};
