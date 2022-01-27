import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Crumbs, Editor, VerifyCode } from 'components';
import { Box } from 'uikit';
import { useToast } from 'hooks';
import { fetchThunk, useStore } from 'store';
import { Api } from 'apis';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { useTranslation } from 'contexts/Localization';

const Post = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const postParams = useStore(p => p.post);
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;
  // 用户输入验证码
  const { toastError } = useToast();

  const verifyRef = React.useRef(null);
  const [verifyState, setVerifyState] = React.useState({
    verifyVisible: false,
    id: '',
    verify: '',
    post: {
      content: '',
      image_urls: [],
      remind_user: '',
    } as any,
  });

  const sendArticle = async (
    content: string,
    image_urls,
    remind_user,
    reset,
    id,
    verify,
  ) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createV2Article({
        content: content,
        image_urls: image_urls,
        remind_user,
        id,
        verify,
      });
      if (Api.isSuccess(res)) {
        reset && reset();
        history.push('/');
      } else if (res.code === 30004019) {
        setVerifyState({
          ...verifyState,
          verifyVisible: true,
          post: {
            content: content,
            image_urls: image_urls,
            remind_user,
            reset,
          },
        });
      } else if (res.code === 30004020) {
        toastError(t('verifyError'));
        verifyRef.current?.reload();
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
      <Crumbs back />
      <Editor type='post' sendArticle={sendArticle} />
      {verifyState.verifyVisible && (
        <VerifyCode
          ref={verifyRef}
          visible={verifyState.verifyVisible}
          onClose={() =>
            setVerifyState({
              ...verifyState,
              verifyVisible: false,
            })
          }
          onSubmit={data =>
            sendArticle(
              verifyState.post.content,
              verifyState.post.image_urls,
              verifyState.post.remind_user,
              verifyState.post.reset,
              data.id,
              data.verify,
            )
          }
        />
      )}
    </Box>
  );
};

export default Post;
