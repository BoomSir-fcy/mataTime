import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Crumbs } from 'components';
import { Box } from 'uikit';
import PostList from 'components/Post/PostList';

import { useMapModule } from 'store/mapModule/hooks';
import { useImmer } from 'use-immer';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

const ForwardList = () => {
  const { t } = useTranslation();
  const { postMap, blockUsersIds, deletePostIds, unFollowUsersIds } =
    useMapModule();
  const params = useParams() as { id: string };
  const [state, setState] = useImmer({
    list: [],
    page: 1,
    page_size: 10,
    total: 1,
    loading: false,
    isEnd: false,
  });
  const { loading, page, page_size, isEnd, list, total } = state;

  const Getlist = async (current = 0) => {
    if (list?.length >= total) return;
    try {
      const res = await Api.AttentionApi.getNormalForwardList({
        page: current || page,
        page_size,
        pid: params?.id,
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.page = page + 1;
          p.total = res.data.total_count;
          p.list = page > 1 ? [...list, ...res.data.list] : res.data.list;
          p.isEnd =
            [...list, ...res.data.list].length >= res.data.total_count
              ? true
              : false;
        });
      }
    } catch (error) {}
  };

  const getList = React.useCallback(
    (current?: number) => {
      Getlist(current);
    },
    [Getlist],
  );

  const renderList = React.useMemo(() => {
    const resPost = list.filter(item => {
      return (
        !blockUsersIds.includes(item.user_id) &&
        !unFollowUsersIds.includes(item.user_id) &&
        !deletePostIds.includes(item.id)
      );
    });
    return resPost;
  }, [list, blockUsersIds, unFollowUsersIds, deletePostIds]);

  return (
    <Box>
      <Crumbs back centerTitle={t('Quote Post')} zIndex={1005} />
      <PostList
        map={postMap}
        list={renderList}
        loading={loading}
        isEnd={isEnd}
        getList={getList}
        updateList={() => {}}
      />
    </Box>
  );
};

export default withRouter(ForwardList);
