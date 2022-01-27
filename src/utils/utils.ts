import { LETTER_ENGLISH_REGEXP, CONTENT_KEYWORD_REGEXP, CHINESE_WORD_REGEXP } from "config/constants/regexp";

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
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(LETTER_ENGLISH_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  return flen / sLen < 0.5
}
export const isChineseContent = (content) => {
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(CHINESE_WORD_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  return flen / sLen < 0.5
}