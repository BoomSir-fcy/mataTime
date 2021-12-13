import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Editor, Crumbs, MoreOperatorEnum } from 'components';
import { useTranslation } from 'contexts/Localization';
import { CommentList } from './CommentList';
import { Api } from 'apis';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { useStore } from 'store';
import { MeItemWrapper } from 'view/News/Me/style';
import { PageContainer } from './style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { ReadType } from 'hooks/imHooks/types';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';

type Iprops = {
  [name: string]: any;
};
export const ArticleDetilsLayout: React.FC = (props: Iprops) => {
  const { t } = useTranslation();
  const [itemData, setItemData] = useState<any>({});
  const [refresh, setRefresh] = useState(1);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0)
  useReadArticle(nonce)
  const sendArticle = res => {
    if (!res) return;
    Api.CommentApi.createComment({
      pid: itemData.id,
      comment: res
    }).then(res => {
      if (Api.isSuccess(res)) {
        toast.success(res.data);
        setRefresh(refresh === 1 ? 2 : 1);
      }
    });
  };

  const getArticleDetail = (_type?: MoreOperatorEnum) => {
    // 折叠
    if (_type === MoreOperatorEnum.EXPAND) {
      setNonce(prep => prep + 1)
      return
    }
    Api.HomeApi.articleFindById({ id: props.match.params.id }).then(res => {
      if (Api.isSuccess(res)) {
        setItemData(res.data);
        setRefresh(refresh === 1 ? 2 : 1);
      }
    });
  }

  useEffect(() => {
    getArticleDetail()
  }, []);

  return (
    <PageContainer>
      {
        // 浏览自己的不扣费
        currentUid?.uid !== itemData?.user_id && itemData?.id && (
          <SpendTimeViewWithArticle readType={ReadType.ARTICLE} articleId={itemData?.id} />
        )
      }
      <Crumbs back title={t('newsBack')} />
      <MeItemWrapper>
        <MentionItem
          {...props}
          itemData={{
            ...itemData,
            post_id: itemData.id,
            post: {
              ...itemData,
              post_id: itemData.id
            }
          }}
          callback={(_data, _type) => {
            getArticleDetail(_type)
          }}
          more={true}
        />
        <MentionOperator
          replyType="twitter"
          postId={itemData.id}
          itemData={{
            ...itemData,
            post_id: itemData.id,
            post: {
              ...itemData
            }
          }}
          callback={data => setItemData(data)}
        />
      </MeItemWrapper>
      {/* <ArticleList data={[{}]} {...props} style={{marginBottom:'15px'}}></ArticleList> */}
      <Editor type="comment" sendArticle={sendArticle} />
      <CommentList nonce={nonce} setNonce={setNonce} key={refresh} itemData={itemData} />
    </PageContainer>
  );
};
export default ArticleDetilsLayout;
