import { getLanguageCodeFromLS } from "contexts/Localization/helpers";
import { EN, ZHTW } from 'config/localization';
import { isEnglishContent, isChineseContent, getLanguageContent } from "./utils";
  
const checkTranslateIds = (posts: Api.Home.post[], postIdKey = 'id') => {
  const codeFromStorage = getLanguageCodeFromLS();
  const ids = []
  posts.forEach(item => {
    const { isChinese, isEnglish, isChineseRate, isEnglishRate } = getLanguageContent(item.content)
    if (isEnglish && codeFromStorage !== EN.locale) {
      ids.push(item[postIdKey])
    }
    if (isChinese && codeFromStorage !== ZHTW.locale) {
      ids.push(item[postIdKey])
    }
  })
  return ids
}

export default checkTranslateIds;
