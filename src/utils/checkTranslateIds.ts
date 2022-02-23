import { getLanguageCodeFromLS } from "contexts/Localization/helpers";
import { EN, ZHTW } from 'config/localization';
import { isEnglishContent, isChineseContent, getLanguageContent } from "./utils";

const checkTranslateIds = (posts: Api.Home.post[], postIdKey = 'id', contentKey = 'content') => {
  const codeFromStorage = getLanguageCodeFromLS();
  const ids = []
  posts.forEach(item => {
    const { isChinese, isEnglish } = getLanguageContent(item[contentKey])
    if (isEnglish && codeFromStorage !== EN.locale) {
      ids.push(item[postIdKey])
    }
    if (isChinese && codeFromStorage !== ZHTW.locale) {
      ids.push(item[postIdKey])
    }
    if (item?.forward?.content && item?.forward?.post_id && !ids.includes(item?.forward?.post_id)) {
      const { isChinese: isChineseOfForward, isEnglish: isEnglishOfForward } = getLanguageContent(item?.forward?.content)
      if (isEnglishOfForward && codeFromStorage !== EN.locale) {
        ids.push(item?.forward?.post_id)
      }
      if (isChineseOfForward && codeFromStorage !== ZHTW.locale) {
        ids.push(item?.forward?.post_id)
      }
    }
  })
  return ids
}

export default checkTranslateIds;
