import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { Flex, Box, Text, Button } from 'uikit';
import { FollowButton, CancelAttentionModal } from 'components';
import { useToast } from 'hooks';
import { Api } from 'apis';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

import { Avatar } from '../Avatar';

const FolloWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const Name = styled(Text)`
  min-width: 0;
  font-size: 18px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const FollowContent = styled(Flex)`
  flex: 1;
  align-items: center;
`;

export const Follow = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [state, setState] = useImmer({
    list: [] as any,
    isRotate: false,
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
  });
  const { list } = state;

  React.useImperativeHandle(ref, () => ({
    reload() {
      return getManList();
    },
  }));

  const getManList = async () => {
    try {
      const res = await Api.UserApi.referrerMans({ num: 3 });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = res.data || [];
        });
      }
    } catch (error) {}
  };

  const getCurrentState = async () => {
    const uids = list.map(({ uid }) => uid);
    try {
      const res = await Api.AttentionApi.getFollowState(uids);
      if (Api.isSuccess(res)) {
        const considerFocus = res.data;
        const followTemp = list.map(row => {
          if (considerFocus[row.uid]) {
            return { ...row, attention_status: 1 };
          }
          return { ...row, attention_status: 0 };
        });
        setState(p => {
          p.list = followTemp;
          p.cancelFollow = false;
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getManList();
  }, []);

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        getCurrentState();
        // toastSuccess(t('commonMsgFollowSuccess') || res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 取消关注
  const unFollowRequest = async item => {
    try {
      const res = await Api.MeApi.unFollowUser(item.uid);
      if (Api.isSuccess(res)) {
        getCurrentState();
        toastSuccess(t('commonMsgFollowError') || res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {state.list.map((row, index: number) => (
        <FolloWarpper key={index}>
          <FollowContent>
            <Avatar disableFollow scale='md' src={row.nft_image} />
            <Flex
              flexDirection='column'
              paddingLeft='12px'
              style={{ minWidth: 0 }}
            >
              <Flex alignItems='center'>
                <Name>{row.nick_name}</Name>
              </Flex>
              <Text color='textTips'>@{shortenAddress(row.address)}</Text>
            </Flex>
          </FollowContent>
          <FollowButton
            key={index}
            data={row}
            followFunc={debounce(() => followUser(row.uid), 1000)}
            unFollowFunc={() =>
              setState(p => {
                p.cancelParams = { ...row, index };
                p.cancelFollow = true;
              })
            }
          />
        </FolloWarpper>
      ))}
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={state.cancelFollow}
        params={state.cancelParams}
        confirm={debounce(() => unFollowRequest(state.cancelParams), 1000)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
    </React.Fragment>
  );
});
