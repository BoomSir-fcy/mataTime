import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Editor, Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';
import { CommentList } from './CommentList';
import { Api } from 'apis';
import useReadArticle from 'contexts/ImContext/hooks/useReadArticle';
import { useStore } from 'store';
import { MeItemWrapper } from 'view/News/Me/style';
import { PageContainer } from './style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { ReadType } from 'contexts/ImContext/types';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';

type Iprops = {
  [name: string]: any;
};
export const ArticleDetilsLayout: React.FC = (props: Iprops) => {
  const { t } = useTranslation();
  const [itemData, setItemData] = useState<any>({});
  const [refresh, setRefresh] = useState(1);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  useReadArticle()

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

  const getArticleDetail = () => {
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
          <SpendTimeViewWithArticle readType={ReadType.COMMENT} articleId={itemData?.id} />
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
          callback={() => {
            getArticleDetail()
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
      <CommentList key={refresh} itemData={itemData} />
    </PageContainer>
  );
};
export default ArticleDetilsLayout;
