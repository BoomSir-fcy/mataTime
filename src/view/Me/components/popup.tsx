import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Button, Box, Card } from 'uikit';
import { CancelAttentionModal, ReportUserModal } from 'components';
import { Api } from 'apis';

import { copyContent } from 'utils';
import { useTranslation } from 'contexts/Localization';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const PopupContainer = styled(Box)`
  position: relative;
`;
const PopupWrapper = styled(Button)`
  align-items: center;
  padding: 0;
`;
const PopupIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 10px;
`;
const PopupContentWrapper = styled(Card)`
  width: 150px;
  position: absolute;
  z-index: 9998;
  left: -60px;
  top: 30px;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  background-color: #4d535f;
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
  const [state, setState] = useImmer({
    visible: false,
    reportVisible: false,
    cancelFollow: false
  });

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        onCallback();
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
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
        setState(p => {
          p.cancelFollow = false;
        });
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex alignItems="center">
        {user.is_attention === 1 ? (
          <Button
            onClick={() =>
              setState(p => {
                p.cancelFollow = true;
              })
            }
          >
            {t('meUnsubscribe')}
          </Button>
        ) : (
          <Button onClick={debounce(() => followUser(user.uid), 1000)}>
            {t('meFocusOn')}
          </Button>
        )}
        <PopupContainer
          onMouseLeave={() =>
            setState(p => {
              p.visible = false;
            })
          }
        >
          <PopupWrapper
            variant="text"
            onMouseEnter={() =>
              setState(p => {
                p.visible = true;
              })
            }
          >
            <PopupIcon src={require('assets/images/social/more.png').default} />
          </PopupWrapper>
          {state.visible && (
            <PopupContentWrapper
              onMouseLeave={(e: any) => {
                e.stopPropagation();
                setState(p => {
                  p.visible = false;
                });
              }}
            >
              <Button variant="text" disabled>
                {t('mePopupMenuPrivateLetters')}
              </Button>
              <Button
                variant="text"
                onClick={() => copyContent(window.location.href || '')}
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
          )}
        </PopupContainer>
      </Flex>
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={state.cancelFollow}
        params={user}
        confirm={debounce(() => unFollowUser(user.uid), 1000)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
      <ReportUserModal
        visible={state.reportVisible}
        userInfo={user}
        onClose={() =>
          setState(p => {
            p.reportVisible = false;
          })
        }
      />
    </Box>
  );
});
