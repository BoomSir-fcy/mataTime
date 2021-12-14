import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useImmer } from 'use-immer';
import { debounce } from 'lodash';
import { useToast } from 'hooks';
import { Flex, Button, Box, Card } from 'uikit';
import { CancelAttentionModal, ReportUserModal, PopupWrap } from 'components';
import { Api } from 'apis';

import { copyContent } from 'utils';
import { useTranslation } from 'contexts/Localization';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;
const PopupIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const PopupContentWrapper = styled(Card)`
  width: 150px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  button {
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    line-height: 36px;
    color: ${({ theme }) => theme.colors.white};
    padding: 0;
    &:disabled {
      opacity: 0.5;
    }
  }
`;

export const Popup: React.FC<{
  user: any;
  onCallback: Function;
}> = React.memo(({ user, onCallback }) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [state, setState] = useImmer({
    reportVisible: false,
    cancelFollow: false
  });
  const popupRefs = React.useRef(null);
  const theme = useTheme();

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        onCallback();
        popupRefs?.current?.close();
        toastSuccess(t('commonMsgFollowSuccess') || res.data);
      } else {
        toastError(t('commonMsgUnFollowError') || res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.unFollowUser(focus_uid);
      if (Api.isSuccess(res)) {
        onCallback();
        popupRefs?.current?.close();
        setState(p => {
          p.cancelFollow = false;
        });
        toastSuccess(t('commonMsgFollowError') || res.data);
      } else {
        toastError(t('commonMsgUnFollowError') || res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <PopupWrap
        ref={popupRefs}
        trigger={
          <PopupButton>
            <PopupIcon src={require('assets/images/social/more.png').default} />
          </PopupButton>
        }
        arrowStyle={{
          color: theme.colors.tertiary,
          stroke: theme.colors.tertiary
        }}
      >
        <PopupContentWrapper>
          <Button variant="text" disabled>
            {t('mePopupMenuPrivateLetters')}
          </Button>
          {/* 关注取消 */}
          <React.Fragment>
            {user.is_attention === 1 ? (
              <Button
                variant="text"
                onClick={() =>
                  setState(p => {
                    p.cancelFollow = true;
                  })
                }
              >
                {t('meUnsubscribe')}
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={debounce(() => followUser(user.uid), 1000)}
              >
                {t('meFocusOn')}
              </Button>
            )}
          </React.Fragment>
          <Button
            variant="text"
            onClick={() => {
              copyContent(window.location.href || '');
              popupRefs?.current?.close();
              toastSuccess(t('copySuccess'));
            }}
          >
            {t('mePopupMenuCopyAddress')}
          </Button>
          <Button
            variant="text"
            onClick={() =>
              setState(p => {
                p.reportVisible = !state.reportVisible;
              })
            }
          >
            {t('mePopupMenuComplainAgainstUsers')}
          </Button>
        </PopupContentWrapper>
      </PopupWrap>
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={state.cancelFollow}
        params={user}
        confirm={debounce(() => unFollowUser(user.uid), 1000)}
        onClose={() => {
          popupRefs?.current?.close();
          setState(p => {
            p.cancelFollow = false;
          });
        }}
      />
      <ReportUserModal
        visible={state.reportVisible}
        userInfo={user}
        onClose={() => {
          popupRefs?.current?.close();
          setState(p => {
            p.reportVisible = false;
          });
        }}
      />
    </Box>
  );
});
