import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Text } from 'uikit';
import {
  ReportModal,
  EditTwitterModal,
  CommonInquiryModal,
  CommentModal
} from 'components';

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';

const PopupWrapper = styled(Box)`
  width: 150px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px 30px;
  div {
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    cursor: pointer;
  }
`;

type Iprops = {
  data: any;
  callback?: Function;
  postUserId?: string | number;
};

export const CommentPop = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);
  const { data, callback, postUserId } = props;
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [inqueryType, setInqueryType] = useState<string>('deleteComment');
  const [state, setState] = useImmer({
    visible: false
  });

  // const [isShowDel, setIsShowDel] = useState<boolean>(false);
  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    setIsCurrentUser(UID === data.user_id || UID === postUserId);
  };

  const delComment = () => {
    Api.MeApi.removeContentDetail(data.id).then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback();
        toast.success(t('moreDeleteSuccess'));
      } else {
        toast.success(t('moreDeleteError'));
      }
    });
  };

  const reportComment = () => {
    console.log(data);
    // Api.MeApi.reportComment(data.id, 'ssss').then(res => {
    //   if (Api.isSuccess(res)) {
    //     console.log(res);
    //     callback();
    //     toast.success(t('ReportModalSuccess'));
    //   } else {
    //     toast.success(t('ReportModalError'));
    //   }
    // });
  };

  return (
    <>
      <PopupWrapper>
        {isCurrentUser ? (
          <Text
            textTransform="capitalize"
            onClick={() => {
              setInqueryType('deleteComment');
              setCommonInqueryShow(true);
            }}
          >
            {t('moreDelete')}
          </Text>
        ) : (
          <Text
            textTransform="capitalize"
            onClick={() =>
              setState(p => {
                p.visible = true;
              })
            }
          >
            {t('moreReport')}
          </Text>
        )}
      </PopupWrapper>

      {/* 举报 */}
      <ReportModal
        show={state.visible}
        pid={data.id}
        type={'comment'}
        onClose={() =>
          setState(p => {
            p.visible = false;
          })
        }
        onQuery={() => {
          setState(p => {
            p.visible = false;
          });
          callback();
        }}
      />

      {/* 统一询问框 */}
      <CommonInquiryModal
        show={commonInqueryShow}
        type={inqueryType}
        onClose={() => {
          setCommonInqueryShow(false);
        }}
        onQuery={() => {
          delComment();
          setCommonInqueryShow(false);
        }}
      />
    </>
  );
});
