// 转义长度
export const getBLen = str => {
  if (!Boolean(str)) return 0;
  return new Blob([str], { type: 'text/plain, charset=utf-8' }).size;
};

// 发布推文长度
export const getPostBLen = (str): number => {
  if (!Boolean(str)) return 0;
  return `${str}`.length;
  // return str.replace(/[^\x00-\xff]/g, '01').length;
};

export const isEnglishContent = (content) => {
  const bLen = getBLen(content)
  const len = getPostBLen(content)
  return len / bLen > 0.8
}