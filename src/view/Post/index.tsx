import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Crumbs, Editor } from 'components';
import { Box } from 'uikit';
import { fetchThunk, useStore } from 'store';
import { Api } from 'apis';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';

const Post = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postParams = useStore(p => p.post);
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;

  const sendArticle = async (
    content: string,
    image_urls,
    remind_user,
    reset,
  ) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createArticle({
        content: content,
        image_urls: image_urls,
        remind_user,
      });
      if (Api.isSuccess(res)) {
        reset && reset();
        history.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(
        fetchThunk.fetchPostAsync({
          attention: postParams.attention,
          page: 1,
          per_page: pageSize,
          user_tags1: postParams.user_tags1,
          user_tags2: postParams.user_tags2,
        }),
      );
    };
  }, []);

  return (
    <Box>
      <Crumbs title='发帖' back />
      <Editor type='post' sendArticle={sendArticle} />
    </Box>
  );
};

export default Post;
