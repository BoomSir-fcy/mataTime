// const handleSendPost = useCallback(async () => {
//   if (!title) {
//     toastError(t('请输入标题'));
//     return;
//   }
//   const { length } = value.map(n => Node.string(n)).join('');
//   if (!length) {
//     toastError(t('请输入帖子内容'));
//     return;
//   }
//   if (length > HUGE_ARTICLE_POST_MAX_LEN) {
//     toastError(t('帖子内容过长'));
//     return;
//   }
//   setLoadings(prev => ({
//     ...prev,
//     create: true,
//   }));
//   const res = await Api.TribeApi.tribePostCreate({
//     content: JSON.stringify(value),
//     tribe_id,
//     title,
//     topic: selectTags.map(item => item.ID),
//   });
//   setLoadings(prev => ({
//     ...prev,
//     create: false,
//   }));
//   if (Api.isSuccess(res)) {
//     toastSuccess(t('发布成功'));
//     // TODO:
//   }
// }, [value, title, selectTags, tribe_id]);

import { useCallback, useState } from "react"
import { useTranslation } from "contexts/Localization";
import { useToast } from "hooks/useToast";
import { Descendant, Node } from 'slate';
import { HUGE_ARTICLE_POST_MAX_LEN } from "config";
import { Api } from "apis";

const verifyValue = (title, value) => {
    if (!title) {
      return '请输入标题';
    }
    const { length } = value.map(n => Node.string(n)).join('');
    if (!length) {
      return '请输入帖子内容';
    }
    if (length > HUGE_ARTICLE_POST_MAX_LEN) {
      return '帖子内容过长';
    }
    return ''
}



export const useSendPostOrDraft = (method: 'tribePostCreate' | 'tribePostCreateDraft') => {
  const { toastSuccess, toastError } = useToast();
  const { t } = useTranslation();
  
  const [loading, setLoading] = useState(false)

  const handle = useCallback(async (value: Descendant[], title: string, selectTags: Api.Tribe.TopicInfo[], tribe_id: number) => {
    if (loading) return
    const errorMsg = verifyValue(title, value)
    if (errorMsg) {
      toastError(t(errorMsg));
      return
    }
    setLoading(true)
    const res = await Api.TribeApi[method]({
      content: JSON.stringify(value),
      tribe_id,
      title,
      topic: selectTags.map(item => item.ID),
    });
    setLoading(false)
    if (Api.isSuccess(res)) {
      toastSuccess(t('发布成功'));
      // TODO:
    }
  }, [loading, setLoading, method])

  return {
    handle,
    loading
  }
}