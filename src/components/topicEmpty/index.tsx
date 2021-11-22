import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Flex, Text, Button } from 'uikit';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';

const Wrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FlexButton = styled(Flex)`
  width: 100%;
  justify-content: center;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const TopicEmpty: React.FC<{
  item: any;
  type?: string;
  callback: Function;
}> = React.memo(({ item, type, callback }) => {
  const { t } = useTranslation();

  // 取消收藏
  const onFavCancelRequest = async () => {
    const res = await Api.ContentApi.onFavCancel(item.post_id);
    if (Api.isSuccess(res)) {
      callback();
      toast.success(t('moreCancelCollectionSuccess'));
    } else {
      toast.error(t('moreCancelCollectionError') || res.data);
    }
  };

  // 取消点赞
  const onLikeCancelRequest = () => {
    Api.CommentApi.cancelLike({
      post_id: item.post_id
    }).then(res => {
      if (Api.isSuccess(res)) {
        callback();
        toast.success(t('commonMsgUnUnlikeSuccess') || res.data);
      } else {
        toast.error(t('commonMsgUnUnlikeError') || res?.data);
      }
    });
  };

  return (
    <Wrapper>
      <Text pb="15px">{t('commonunCollection')}</Text>
      <FlexButton>
        {type === 'like' ? (
          <Button variant="text" onClick={onLikeCancelRequest}>
            {t('commonUnlike')}
          </Button>
        ) : (
          <Button variant="text" onClick={onFavCancelRequest}>
            {t('moreCancelCollection')}
          </Button>
        )}
      </FlexButton>
    </Wrapper>
  );
});
