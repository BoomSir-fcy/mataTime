import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box, Flex } from 'uikit';
import { Icon, ReplyModal, MoreOperatorEnum } from 'components';
import { MentionOperatorWrapper } from './style';
import { Api } from 'apis';
import RewardAuthTag from 'components/RewardAuth/RewardAuthTag';

// enum MentionObjEnum {
//   Article,
//   Comment
// }

type IProps = {
  itemData: any;
  hasLike?: boolean;
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
  callback,
  replyType = 'comment',
  commentId = '',
  postId = ''
}) => {
  const [isLike, setIsLike] = useState<number>(itemData.is_like);
  const [replyVisible, setReplyVisible] = useState<boolean>(false);

  const changeLike = () => {
    if (type === 'Article') {
      Api.CommentApi[isLike === 0 ? 'clickLike' : 'cancelLike']({
        post_id: itemData.post_id
      }).then(res => {
        if (Api.isSuccess(res)) {
          callback({
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
              is_like: isLike === 1 ? 0 : 1
            }
          });
          setIsLike(isLike === 1 ? 0 : 1);
          toast.success(res.data);
        } else {
          toast.error(res?.data);
        }
      });
    }
    if (type === 'Comment') {
      Api.CommentApi[isLike === 1 ? 'commentCancelLike' : 'commentLike']({
        comment_id: itemData.id
      }).then(res => {
        if (Api.isSuccess(res)) {
          setIsLike(isLike === 1 ? 0 : 1);
          callback({
            ...itemData,
            like_num:
              isLike === 1 ? itemData.like_num - 1 : itemData.like_num + 1
          });
          toast.success(res.data);
        } else {
          toast.error(res.data);
        }
      });
    }
  };

  useEffect(() => {
    setIsLike(itemData.is_like);
  }, [itemData.is_like]);

  return (
    <MentionOperatorWrapper>
      <Flex justifyContent="space-between" className="mention-operator">
        <Flex>
          <Box className="operator-item">
            <Icon
              name="icon-pinglun"
              margin="0 10px 0 0"
              size={18}
              color="textTips"
              onClick={() => setReplyVisible(true)}
            />
            {itemData.comment_num || 0}
          </Box>
          {/* <Box className="operator-item">
            <Icon name="icon-retweet" margin="0 10px 0 0" color="textTips" />
            {itemData.share_num || 0}
          </Box> */}
          {hasLike && (
            <Box className="operator-item" onClick={changeLike}>
              {isLike === 1 ? (
                <Icon
                  size={18}
                  name="icon-aixin1"
                  margin="0 10px 0 0"
                  color="#EC612B"
                />
              ) : (
                <Icon
                  size={18}
                  name="icon-aixin"
                  margin="0 10px 0 0"
                  color="textTips"
                />
              )}
              {itemData.like_num || 0}
            </Box>
          )}
        </Flex>
        <RewardAuthTag />
      </Flex>
      {/* 回复 */}
      <ReplyModal
        replyType={replyType}
        show={replyVisible}
        commentId={commentId}
        postId={postId}
        itemData={itemData}
        onClose={() => {
          setReplyVisible(false);
          callback(itemData, MoreOperatorEnum.COMMONT);
        }}
      />
    </MentionOperatorWrapper>
  );
};

export default MentionOperator;
