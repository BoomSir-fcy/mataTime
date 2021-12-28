import React, { useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { List, MoreOperatorEnum, TopicEmpty } from 'components';
import { Box, Button, Text, Card, Flex } from 'uikit';

import { Api } from 'apis';

import { CrumbsHead } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';

const Praise = React.memo(props => {
  const { t } = useTranslation();
  const currentUid = useStore(p => p.loginReducer.userInfo);

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);
  const perpage = MAX_SPEND_TIME_PAGE_TATOL;

  const [state, setState] = useImmer({
    loading: false,
    list: [],
    page: 1,
    totalPage: 1,
  });
  const { loading, page, totalPage, list } = state;

  const init = async (offset?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.praiseList(offset || page, perpage);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
        });
        if (Api.isSuccess(res)) {
          setState(p => {
            p.totalPage = res.data.total_page;
            p.page = (offset || page) + 1;
            p.list = offset
              ? [...(res.data.list || [])]
              : [...list, ...(res.data.list || [])];
          });
        }
      }
    } catch (error) { }
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum) => {
    const {
      FOLLOW,
      CANCEL_FOLLOW,
      SETTOP,
      CANCEL_SETTOP,
      COMMONT,
      EXPAND,
      SHIELD,
      DELPOST,
      LIKE,
    } = MoreOperatorEnum;
    const handleChangeList =
      type === SHIELD || type === DELPOST || type === LIKE;
    let arr = [];

    if (
      type === FOLLOW ||
      type === CANCEL_FOLLOW ||
      type === SETTOP ||
      type === CANCEL_SETTOP ||
      type === COMMONT
    ) {
      init(1);
      return;
    }

    // 折叠
    if (type === EXPAND) return setNonce(prep => prep + 1);
    state.list.forEach((item: any) => {
      let obj = item;

      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除、取消点赞
      } else {
        arr.push(obj);
      }
    });
    setState(p => {
      p.list = [...arr];
    });

    if (handleChangeList) {
      setNonce(prep => prep + 1);
    }
  };

  return (
    <Box>
      {/* <CrumbsHead>
        <Box>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </Box>
      </CrumbsHead> */}
      <Crumbs title={t('meHome')} />
      <List
        marginTop={13}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          init();
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
            {item.post_status === 2 ? (
              <TopicEmpty type='like' item={item} callback={() => init(1)} />
            ) : (
              <React.Fragment>
                {
                  // 浏览自己的不扣费
                  currentUid?.uid !== item.user_id && (
                    <SpendTimeViewWithArticle
                      nonce={nonce}
                      setNonce={setNonce}
                      readType={ReadType.ARTICLE}
                      articleId={item.post_id}
                    />
                  )
                }
                <MentionItem
                  {...props}
                  itemData={{
                    ...item,
                    is_like: item.like_status,
                    user_id: item.uid,
                    user_avator_url: item.nft_image,
                    post: {
                      user_id: item.uid,
                      ...item,
                    },
                  }}
                  callback={(data, type) => {
                    updateList(data, type);
                  }}
                />
                <MentionOperator
                  replyType='twitter'
                  type='Article'
                  postId={item.post_id}
                  itemData={{
                    ...item,
                    is_like: item.like_status,
                    user_id: item.uid,
                    user_avator_url: item.nft_image,
                    post: {
                      user_id: item.uid,
                      ...item,
                    },
                  }}
                  callback={(data, type) => {
                    updateList(data, type);
                  }}
                />
              </React.Fragment>
            )}
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
});

export default Praise;
