import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Button, Box, Card } from 'uikit';
import { CancelAttentionModal } from 'components';
import { Api } from 'apis';

import { copyContent } from 'utils';
import { useTranslation } from 'contexts/Localization';

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

export const Popup = React.memo(() => {
  const { t } = useTranslation();

  const [state, setState] = useImmer({
    visible: false,
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: ''
    }
  });

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.unFollowUser(focus_uid);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Button>取消关注</Button>
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
                私信
              </Button>
              <Button
                variant="text"
                onClick={() => copyContent(window.location.href || '')}
              >
                复制主页地址
              </Button>
              {/* <Button variant="text">投诉用户</Button> */}
            </PopupContentWrapper>
          )}
        </PopupContainer>
      </Flex>
      <CancelAttentionModal
        title="是否取消关注Ta？"
        show={state.cancelFollow}
        params={state.cancelParams}
        confirm={() => unFollowUser(state.cancelParams.uid)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
    </Box>
  );
});
