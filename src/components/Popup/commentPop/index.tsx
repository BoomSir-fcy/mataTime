import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  const { data = {}, callback = () => {}, postUserId = '' } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [inqueryType, setInqueryType] = useState<string>('deleteComment');

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
    Api.MeApi.reportComment(data.id, 'ssss').then(res => {
      if (Api.isSuccess(res)) {
        console.log(res);
        callback();
        toast.success(t('ReportModalSuccess'));
      } else {
        toast.success(t('ReportModalError'));
      }
    });
  };

  useEffect(() => {
    const fn = e => {
      setVisible(false);
    };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  });

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
        ) : null}
        <Text
          textTransform="capitalize"
          onClick={() => {
            setInqueryType('reportComment');
            setCommonInqueryShow(true);
          }}
        >
          {t('moreReport')}
        </Text>
      </PopupWrapper>

      {/* 统一询问框 */}
      <CommonInquiryModal
        show={commonInqueryShow}
        type={inqueryType}
        onClose={() => {
          setCommonInqueryShow(false);
          setVisible(false);
        }}
        onQuery={() => {
          if (inqueryType === 'deleteComment') {
            delComment();
          }
          if (inqueryType === 'reportComment') {
            reportComment();
          }
          setCommonInqueryShow(false);
          setVisible(false);
        }}
      ></CommonInquiryModal>
    </>
  );
});
