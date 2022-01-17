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
  const { id } = props.match.params;
  let { name } = props.match.params;
  try {
    name = decodeURIComponent(name);
  } catch (error) {}
  const { toastError } = useToast();
  const [state, setState] = useImmer({
    tagName: '',
    loading: false,
    page: 1,
    totalPage: 1,
    listData: [],
  });

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);
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
        topic_name: name,
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum) => {
    console.log(type, 'type---');

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
      BLOCKUSER,
    } = MoreOperatorEnum;
    const handleChangeList = type === SHIELD || type === DELPOST;
    let arr = [];

    if (
      type === FOLLOW ||
      type === CANCEL_FOLLOW ||
      type === SETTOP ||
      type === CANCEL_SETTOP ||
      // type === COMMONT ||
      type === BLOCKUSER
    ) {
      getList(1);
      return;
    }

    // 折叠
    if (type === EXPAND) return setNonce(prep => prep + 1);
    state.listData.forEach((item: any) => {
      let obj = item;

      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除
      } else {
        arr.push(obj);
      }
    });
    setState(p => {
      p.listData = [...arr];
    });

    if (handleChangeList) {
      setNonce(prep => prep + 1);
    }
  };
  return (
    <Box key={props.location.key}>
      <Crumbs back centerTitle={`#${name}`} zIndex={1005} />
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
                <SpendTimeViewWithArticle
                  setNonce={setNonce}
                  nonce={nonce}
                  readType={ReadType.ARTICLE}
                  articleId={item?.id}
                />
              )
            }
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                add_time: item.add_time_desc,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(data, _type) => {
                // if (_type === MoreOperatorEnum.EXPAND) {
                //   setNonce(prep => prep + 1);
                //   return;
                // }
                // getList(1);
                updateList(data, _type);
              }}
            />
            <MentionOperator
              {...props}
              replyType='twitter'
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(data, _type) => {
                // if (_type === MoreOperatorEnum.EXPAND) {
                //   setNonce(prep => prep + 1);
                //   return;
                // }
                // getList(1);
                updateList(data, _type);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
};

export default withRouter(TopicList);
