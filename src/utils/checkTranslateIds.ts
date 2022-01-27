import { getLanguageCodeFromLS } from "contexts/Localization/helpers";
import { EN, ZHTW } from 'config/localization';
import { isEnglishContent, isChineseContent } from "./utils";
  
const checkTranslateIds = (posts: Api.Home.post[]) => {
  const codeFromStorage = getLanguageCodeFromLS();
  const ids = []
  posts.forEach(item => {
    if (isEnglishContent(item.content) && codeFromStorage !== EN.locale) {
      ids.push(item.id)
    }
    if (isChineseContent(item.content) && codeFromStorage !== ZHTW.locale) {
      ids.push(item.id)
    }
  })
  return ids
}

export default checkTranslateIds;
