import React from 'react';
import { useHistory } from 'react-router-dom';
import { Crumbs, Editor } from 'components';
import { Box } from 'uikit';
import { Api } from 'apis';

const Post = () => {
  const history = useHistory();

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

  return (
    <Box>
      <Crumbs title='发帖' back />
      <Editor type='post' sendArticle={sendArticle} />
    </Box>
  );
};

export default Post;
