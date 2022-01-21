import React, { useState, useEffect } from 'react';
import { Box, Flex } from 'uikit';
import { useToast } from 'hooks';
import { Icon, ReplyModal, MoreOperatorEnum, TimeGain } from 'components';
import { MentionOperatorWrapper } from './style';
import { Api } from 'apis';
import RewardAuthTag from 'components/RewardAuth/RewardAuthTag';

import { useTranslation } from 'contexts/Localization';

// enum MentionObjEnum {
//   Article,
//   Comment
// }

type IProps = {
  itemData: any;
  hasLike?: boolean;
  hasTime?: boolean;
  hasReward?: boolean;
  type?: 'Article' | 'Comment';
  callback?: Function;
  history?: any;
  match?: any;
  replyType?: string;
  commentId?: string;
  postId?: string;
};

const MentionOperator: React.FC<IProps> = ({
  match,
  history,
  itemData,
  type = 'Article',
  hasLike = true,
  hasTime = true,
  hasReward = true,
  callback,
  replyType = 'comment',
  commentId = '',
  postId = '',
}) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [isLike, setIsLike] = useState<number>(itemData.is_like);
  const [replyVisible, setReplyVisible] = useState<boolean>(false);

  const changeLike = () => {
    if (type === 'Article') {
      Api.CommentApi[isLike === 0 ? 'clickLike' : 'cancelLike']({
        post_id: itemData.post_id,
      }).then(res => {
        if (Api.isSuccess(res)) {
          callback(
            {
              ...itemData,
              like_num:
                isLike === 1
                  ? itemData.post.like_num - 1
                  : itemData.post.like_num + 1,
              post: {
                ...itemData.post,
                like_num:
                  isLike === 1
                    ? itemData.post.like_num - 1
                    : itemData.post.like_num + 1,
                is_like: isLike === 1 ? 0 : 1,
              },
            },
            MoreOperatorEnum.LIKE,
          );
          setIsLike(isLike === 1 ? 0 : 1);
          // toastSuccess(
          //   isLike === 0
          //     ? t('commonMsgUnlikeSuccess')
          //     : t('commonMsgUnlikeError')
          // );
        } else if (res?.code === 30_006_006) {
          callback(
            {
              ...itemData,
              like_num: itemData.post.like_num + 1,
              post: {
                ...itemData.post,
                like_num: itemData.post.like_num + 1,
                is_like: 1,
              },
            },
            MoreOperatorEnum.LIKE,
          );
          setIsLike(1);
        } else if (res?.code === 30_006_007) {
          callback(
            {
              ...itemData,
              like_num: itemData.post.like_num - 1,
              post: {
                ...itemData.post,
                like_num: itemData.post.like_num - 1,
                is_like: 0,
              },
            },
            MoreOperatorEnum.LIKE,
          );
          setIsLike(0);
        }
      });
    }

    if (type === 'Comment') {
      Api.CommentApi[isLike === 1 ? 'commentCancelLike' : 'commentLike']({
        comment_id: itemData.id,
      }).then(res => {
        if (Api.isSuccess(res)) {
          setIsLike(isLike === 1 ? 0 : 1);
          callback(
            {
              ...itemData,
              is_like: isLike === 1 ? 0 : 1,
              like_num:
                isLike === 1 ? itemData.like_num - 1 : itemData.like_num + 1,
            },
            MoreOperatorEnum.LIKE,
          );
          // toastSuccess(res.data);
        }
      });
    }
  };

  useEffect(() => {
    setIsLike(itemData.is_like);
  }, [itemData.is_like]);

  return (
    <MentionOperatorWrapper>
      <Flex justifyContent='space-between' className='mention-operator'>
        <Flex>
          <Box
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setReplyVisible(true);
            }}
            className='operator-item'
          >
            <Icon
              name='icon-pinglun'
              margin='0 10px 0 0'
              size={18}
              color='textTips'
            />
            {itemData.comment_num || 0}
          </Box>
          {/* <Box className="operator-item">
            <Icon name="icon-retweet" margin="0 10px 0 0" color="textTips" />
            {itemData.share_num || 0}
          </Box> */}
          {hasLike && (
            <Box
              className='operator-item'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                changeLike();
              }}
            >
              {isLike === 1 ? (
                <Icon
                  size={18}
                  name='icon-aixin1'
                  margin='0 10px 0 0'
                  color='failure'
                />
              ) : (
                <Icon
                  size={18}
                  name='icon-aixin'
                  margin='0 10px 0 0'
                  color='textTips'
                />
              )}
              {itemData.like_num || 0}
            </Box>
          )}
          {hasTime && <TimeGain total={itemData.total_receive_time} />}
        </Flex>
        {hasReward && (
          <RewardAuthTag
            data={itemData}
            postType={type === 'Comment' ? 1 : 0}
          />
        )}
      </Flex>
      {/* 回复 */}
      <Box
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ReplyModal
          replyType={replyType}
          show={replyVisible}
          commentId={commentId}
          postId={postId}
          itemData={itemData}
          onSuccess={() => {
            setReplyVisible(false);
            callback(itemData, MoreOperatorEnum.COMMONT);
          }}
          onClose={() => {
            setReplyVisible(false);
          }}
        />
      </Box>
    </MentionOperatorWrapper>
  );
};

export default MentionOperator;
