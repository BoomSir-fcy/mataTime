import React from 'react';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { Box } from 'uikit';
import { Icon, CommonInquiryModal, ReportModal } from 'components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

export const SubCommentAction: React.FC<{
  postUid: number;
  user_id: number;
  comment_id: number;
  delCallback: () => void;
}> = ({ postUid, user_id, comment_id, delCallback }) => {
  const userInof = useStore(p => p.loginReducer.userInfo);
  const { t } = useTranslation();
  const { uid } = userInof;
  const { toastSuccess } = useToast();
  const [state, setState] = useImmer({
    reportVisible: false,
    delCommentVisible: false,
  });

  const delComment = () => {
    Api.MeApi.removeContentDetail(comment_id).then(res => {
      if (Api.isSuccess(res)) {
        setState(p => {
          p.delCommentVisible = false;
        });
        delCallback();
        toastSuccess(t('moreDeleteSuccess'));
      }
    });
  };

  return (
    <React.Fragment>
      <Box>
        {uid === user_id || uid === postUid ? (
          <Icon
            color='textgrey'
            current
            name='icon-changyonggoupiaorenshanchu'
            onClick={() =>
              setState(p => {
                p.delCommentVisible = true;
              })
            }
          />
        ) : (
          <Icon
            color='textgrey'
            current
            name='icon-tousu'
            onClick={() =>
              setState(p => {
                p.reportVisible = true;
              })
            }
          />
        )}
      </Box>

      {/* 删除评论 */}
      <CommonInquiryModal
        show={state.delCommentVisible}
        type='deleteComment'
        onClose={() =>
          setState(p => {
            p.delCommentVisible = false;
          })
        }
        onQuery={debounce(() => delComment(), 1000)}
      />
      {/* 举报 */}
      <ReportModal
        show={state.reportVisible}
        pid={comment_id}
        type='comment'
        onClose={() =>
          setState(p => {
            p.reportVisible = false;
          })
        }
        onQuery={() => {
          setState(p => {
            p.reportVisible = false;
          });
        }}
      />
    </React.Fragment>
  );
};
