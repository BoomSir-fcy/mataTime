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
import { FetchStatus } from "config/types";

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

  const handle = useCallback(async (params: {
    value: Descendant[];
    title: string;
    selectTags: Api.Tribe.TopicInfo[];
    tribe_id: number;
  }, verify?: {
    id: string;
    verify: string;
  }) => {
    if (loading) return
    const errorMsg = verifyValue(params.title, params.value)
    if (errorMsg) {
      toastError(t(errorMsg));
      return
    }
    setLoading(true)
    const content = JSON.stringify(params.value);
    const topic = params.selectTags.map(item => item.ID);
    console.log(params, topic)
    const remind_user = null;
    const res = await Api.TribeApi[method]({
      content,
      remind_user,
      tribe_id: params.tribe_id,
      title: params.title,
      topic,
      id: verify?.id,
      verify: verify?.verify,
    });
    setLoading(false)
    if (Api.isSuccess(res)) {
      toastSuccess(t('发布成功'));
      // TODO:
      return FetchStatus.SUCCESS
    }
    if (res.code === 30004019) {
      return FetchStatus.VERIFY

    }
    if (res.code === 30004020) {
      toastError(t('verifyError'));
      return FetchStatus.VERIFY_ERROR
    }
    return FetchStatus.FAILED
  }, [loading, setLoading, method])

  return {
    handle,
    loading,
  }
}