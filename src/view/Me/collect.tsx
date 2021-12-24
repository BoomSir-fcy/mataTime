import React, { useState } from 'react';
import { Box, Flex, Text, Card } from 'uikit';
import { List, MoreOperatorEnum, TopicEmpty } from 'components';
import { useTranslation } from 'contexts/Localization';

import { CrumbsHead } from './components';

import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { Crumbs } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';
import useReadArticle from 'hooks/imHooks/useReadArticle';

import { Api } from 'apis';

// enum MoreOperatorEnum {
//   SHIELD = 'SHIELD', // 屏蔽
//   SETTOP = 'SETTOP',
//   DELPOST = 'DELPOST',
// }

const Collect = props => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [total, setTotal] = useState(0);
  const { t } = useTranslation();
  const currentUid = useStore(p => p.loginReducer.userInfo);

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  const init = async (current?: number) => {
    setLoading(true);
    try {
      const res = await Api.MeApi.collectList(current || page);
      setLoading(false);
      if (Api.isSuccess(res)) {
        setPage((current || page) + 1);
        setTotalPage(res.data.total_page);
        setTotal(res.data.total_num);
        setListData(
          current
            ? [...(res.data?.list || [])]
            : [...listData, ...(res.data?.list || [])],
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum) => {
    console.log(type);
    const {
      FOLLOW,
      CANCEL_FOLLOW,
      SETTOP,
      CANCEL_SETTOP,
      COMMONT,
      EXPAND,
      SHIELD,
      DELPOST,
      BOOKMARK,
    } = MoreOperatorEnum;
    const handleChangeList =
      type === SHIELD || type === DELPOST || type === BOOKMARK;
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
    listData.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除、取消收藏
      } else {
        arr.push(obj);
      }
    });
    setListData([...arr]);
    setTotal(arr.length);
    if (handleChangeList) {
      setNonce(prep => prep + 1);
    }
  };

  return (
    <Box>
      <Crumbs title={t('meHome')}>
        <Flex>
          <Text fontWeight='bold' mr='10px' fontSize='14px'>
            {t('meHeaderMyCollection')}
          </Text>
          <Text fontSize='14px'>
            {t('meHeaderNum%value%', { value: total })}
          </Text>
        </Flex>
      </Crumbs>
      <List
        marginTop={14}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          init();
        }}
      >
        {listData.map((item, index) => {
          return (
            <MeItemWrapper key={index}>
              {item.post_status === 2 ? (
                <TopicEmpty item={item} callback={() => init(1)} />
              ) : (
                <React.Fragment>
                  {
                    // 浏览自己的不扣费
                    currentUid?.uid !== item.user_id && (
                      <SpendTimeViewWithArticle
                        nonce={nonce}
                        setNonce={setNonce}
                        readType={ReadType.ARTICLE}
                        articleId={item.id}
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
                        ...item,
                        is_fav: 1,
                        user_id: item.uid,
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
                        ...item,
                        user_id: item.uid,
                        is_fav: 1,
                      },
                    }}
                    callback={(data, type) => {
                      updateList(data, type);
                    }}
                  />
                </React.Fragment>
              )}
            </MeItemWrapper>
          );
        })}
      </List>
    </Box>
  );
};

export default Collect;
