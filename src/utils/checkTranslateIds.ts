import { getLanguageCodeFromLS } from "contexts/Localization/helpers";
import { EN, ZHTW } from 'config/localization';
import { isEnglishContent, isChineseContent } from "./utils";
  
const checkTranslateIds = (posts: Api.Home.post[], postIdKey = 'id') => {
  const codeFromStorage = getLanguageCodeFromLS();
  const ids = []
  posts.forEach(item => {
    // console.log('isEnglishContent: ', isEnglishContent(item.content), item.content)
    // console.log('isChineseContent: ', isChineseContent(item.content), item.content)
    if (isEnglishContent(item.content) && codeFromStorage !== EN.locale) {
      ids.push(item[postIdKey])
    }
    if (isChineseContent(item.content) && codeFromStorage !== ZHTW.locale) {
      ids.push(item[postIdKey])
    }
  })
  return ids
}

export default checkTranslateIds;
