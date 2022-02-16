import reactStringReplace from 'react-string-replace';
import { LETTER_ENGLISH_REGEXP, CONTENT_KEYWORD_REGEXP, CHINESE_WORD_REGEXP, SQUARE_REGEXP,
  HTTP_REGEXP,
  SYMBOL_REGEXP, } from "config/constants/regexp";

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
  getLanguageContent(content)
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(LETTER_ENGLISH_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  return flen / sLen < 0.8
}
export const isChineseContent = (content) => {
  const sameContent = content.replace(CONTENT_KEYWORD_REGEXP, '')
  const filterEnglishWordContent = sameContent.replace(CHINESE_WORD_REGEXP, '')
  const sLen = getPostBLen(sameContent)
  const flen = getPostBLen(filterEnglishWordContent)
  return flen / sLen < 0.9

}

  // 解析内容
  const parseText2 = (text = '') => {
    return text.replace(HTTP_REGEXP, '').replace(SYMBOL_REGEXP, '').replace(SQUARE_REGEXP, '')
  };

const serialize2 = (node, initVal) => {
  const { children } = node;
  let replacedText = initVal;
  switch (node.type) {
    case 'paragraph':
      children?.forEach((n, index) => {
        replacedText = serialize2(n, replacedText)
      })
      return replacedText;
    case 'topic':
      return initVal;
    case 'mention':
      return initVal;
    default:
      return `${initVal}${parseText2(node.text)}`;
  }
};

const getAllTextWithContent = (data, initVal) => {
  let replacedText = initVal;
  data.forEach((item: any, index) => {
    replacedText = serialize2(item, replacedText);
  })
  return replacedText
}

export const getLanguageContent = (content) => {
  try {
    let arr = Array.isArray(JSON.parse(content))
    ? JSON.parse(content)
    : [];
    const contentValue = getAllTextWithContent(arr, '');
    const filterEnglishWordContent = contentValue.replace(LETTER_ENGLISH_REGEXP, '')
    const filterChineseWordContent = contentValue.replace(CHINESE_WORD_REGEXP, '')
    const len = getBLen(contentValue)
    const eLen = getBLen(filterEnglishWordContent)
    const cLen = getBLen(filterChineseWordContent)

    const res = {
      isEnglish: eLen / len < 0.5, // 非英文成分小于0.5, 则判断文章是英文
      isChinese: cLen / len < 0.5,
      isEnglishRate: eLen / len,
      isChineseRate: cLen / len,
    }
    return res
  } catch (error) {
    console.error(error)
    return {
      isEnglish: false,
      isChinese: false,
      isEnglishRate: 1,
      isChineseRate: 1,
    }
  }
}

// let arr = Array.isArray(JSON.parse(props.content))
// ? JSON.parse(props.content)
// : [];