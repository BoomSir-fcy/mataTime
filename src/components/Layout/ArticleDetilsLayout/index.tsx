import React, { useState, useEffect } from 'react';
import { Editor, Crumbs, MoreOperatorEnum, Loading } from 'components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';

import { CommentList } from './CommentList';
import { MeItemWrapper } from 'view/News/Me/style';
import { PageStyle } from './style';

import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { Spinner, Empty } from 'uikit';

type Iprops = {
  [name: string]: any;
};
export const ArticleDetilsLayout: React.FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const [itemData, setItemData] = useState<any>({
    id: 0,
  });
  const [refresh, setRefresh] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  const sendArticle = (
    res,
    image_urls,
    remind_user,
    reset,
    first_comment_id,
  ) => {
    if (!res) return;
    Api.CommentApi.createComment({
      pid: itemData.id,
      comment: res,
      remind_user,
      first_comment_id: 0,
    }).then(res => {
      if (Api.isSuccess(res)) {
        reset && reset();
        toastSuccess(t('comment success'));
        setRefresh(refresh === 1 ? 2 : 1);
      }
    });
  };

  const getArticleDetail = (_type?: MoreOperatorEnum) => {
    // 折叠
    if (_type === MoreOperatorEnum.EXPAND) {
      setNonce(prep => prep + 1);
      return;
    }
    setLoaded(false);
    Api.HomeApi.articleFindById({ id: props.match.params.id }).then(res => {
      setLoaded(true);
      if (Api.isSuccess(res)) {
        setItemData(res.data);
        // setRefresh(refresh === 1 ? 2 : 1);
      } else {
        setItemData({});
      }
    });
  };

  useEffect(() => {
    getArticleDetail();
  }, []);

  return (
    <PageStyle>
      <Crumbs back title={t('newsBack')} />
      {Boolean(itemData.id) ? (
        <>
          {
            // 浏览自己的不扣费
            currentUid?.uid !== itemData?.user_id && itemData?.id && (
              <SpendTimeViewWithArticle
                readType={ReadType.ARTICLE}
                articleId={itemData?.id}
                setNonce={setNonce}
                nonce={nonce}
              />
            )
          }
          <MeItemWrapper>
            <MentionItem
              {...props}
              itemData={{
                ...itemData,
                post_id: itemData.id,
                post: {
                  ...itemData,
                  post_id: itemData.id,
                },
              }}
              callback={(_data, _type) => {
                getArticleDetail(_type);
              }}
              more={true}
            />
            <MentionOperator
              replyType='twitter'
              postId={itemData.id}
              itemData={{
                ...itemData,
                post_id: itemData.id,
                post: {
                  ...itemData,
                },
              }}
              callback={data => setItemData(data)}
            />
          </MeItemWrapper>
          {/* <ArticleList data={[{}]} {...props} style={{marginBottom:'15px'}}></ArticleList> */}
          <Editor type='comment' sendArticle={sendArticle} />
          <CommentList
            nonce={nonce}
            setNonce={setNonce}
            key={refresh}
            itemData={itemData}
          />
        </>
      ) : loaded ? (
        <Empty title={t('http-error-30001001')} />
      ) : (
        <Spinner />
      )}
    </PageStyle>
  );
};
export default ArticleDetilsLayout;
