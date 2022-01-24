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

export const isImageUrl = url => {
  if (!url) return false;
  // if (!isUrl(url)) return false
  // const ext = new URL(url).pathname.split('.').pop();
  // console.log(ext);
  // return imageExtensions.includes(ext)
};
