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
  // getLanguageContent(content)
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(LETTER_ENGLISH_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  // console.log('isEnglishContent', flen / sLen, content)
  return flen / sLen < 0.8
}
export const isChineseContent = (content) => {
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(CHINESE_WORD_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  // console.log('isChineseContent', flen / sLen, content)
  return flen / sLen < 0.9

}

// const getAllTextWithContent = (data, initVal) => {
//   if (data.chi)
// }

export const getLanguageContent = (content) => {
  try {
    let arr = Array.isArray(JSON.parse(content))
    ? JSON.parse(content)
    : [];
    console.log(arr)
  } catch (error) {
    
  }
}

// let arr = Array.isArray(JSON.parse(props.content))
// ? JSON.parse(props.content)
// : [];