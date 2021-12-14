import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { useStore } from 'store';
import { Box } from 'uikit';
import { Crumbs, List, MoreOperatorEnum } from 'components';
import { Api } from 'apis';

import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';

const TopicList = props => {
  const listRef: any = React.useRef<HTMLDivElement | null>();
  const { id, name } = props.match.params;
  const { toastError } = useToast();
  const [state, setState] = useImmer({
    tagName: '',
    loading: false,
    page: 1,
    totalPage: 1,
    listData: []
  });

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0)
  useReadArticle(nonce)
  const currentUid = useStore(p => p.loginReducer.userInfo);

  const { loading, page, totalPage, listData } = state;

  const getList = async (current?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.HomeApi.findByHotTopicIdList({
        page: current || page,
        per_page: MAX_SPEND_TIME_PAGE_TATOL,
        topic_id: id === 'empty' ? null : id,
        topic_name: name
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
          p.tagName = name;
          p.page = (current || page) + 1;
          p.totalPage = res.data.total_page;
          p.listData = current
            ? [...(res.data?.List || [])]
            : [...listData, ...(res.data?.List || [])];
        });
      } else {
        toastError(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box key={props.location.key}>
      <Crumbs back centerTitle={`#${name}#`} />
      <List
        ref={listRef}
        marginTop={0}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return;
          Boolean(state.tagName) && state.tagName === name
            ? getList()
            : getList(1);
        }}
      >
        {listData.map((item, index) => (
          <MeItemWrapper key={`${item.id}_${index}`}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item?.user_id && item?.id && (
                <SpendTimeViewWithArticle setNonce={setNonce} nonce={nonce} readType={ReadType.ARTICLE} articleId={item?.id} />
              )
            }
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(data, _type) => {
                if (_type === MoreOperatorEnum.EXPAND) {
                  setNonce(prep => prep + 1)
                  return
                }
                getList(1);
              }}
            />
            <MentionOperator
              {...props}
              replyType="twitter"
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(data, _type) => {
                if (_type === MoreOperatorEnum.EXPAND) {
                  setNonce(prep => prep + 1)
                  return
                }
                getList(1);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
};

export default withRouter(TopicList);
