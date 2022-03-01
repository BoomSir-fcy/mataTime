import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { debounce } from 'lodash';
import {
  List,
  Avatar,
  ModalWrapper,
  FollowButton,
  CancelAttentionModal,
} from 'components';
import { Box, Flex, Text } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

const FastContent = styled(Box)`
  width: 100%;
  min-width: 350px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 600px;
    width: 600px;
  }
  padding-bottom: 20px;
`;

const ForwardInfo: React.FC<{
  data: Api.Attention.forwardData;
  index: number;
  onCallback: (uid: number) => void;
}> = ({ data, index, onCallback }) => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
  });

  // 关注用户
  const followRequest = async () => {
    const res = await Api.AttentionApi.onAttentionFocus(data.uid);
    if (Api.isSuccess(res)) {
      onCallback(data.uid);
    }
  };

  // 取消关注
  const unFollowRequest = async () => {
    try {
      const res = await Api.MeApi.unFollowUser(data.uid);
      if (Api.isSuccess(res)) {
        onCallback(data.uid);
        setState(p => {
          p.cancelFollow = false;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex mb='30px' justifyContent='space-between'>
      <Flex width='80%'>
        <Avatar disableFollow src={data.nft_image} scale='md' />
        <Box ml='23px'>
          <Flex alignItems='center' mb='9px'>
            <Text fontSize='18px' fontWeight='bold' color='white_black'>
              {data.nick_name}
            </Text>
            <Text ml='18px' fontSize='14px' color='textTips'>
              @{shortenAddress(data.user_address)}
            </Text>
          </Flex>
          <Box>
            <Text maxLine={2}>{data.introduction}</Text>
          </Box>
        </Box>
      </Flex>
      <FollowButton
        data={data}
        followFunc={debounce(() => followRequest(), 1000)}
        unFollowFunc={() =>
          setState(p => {
            p.cancelFollow = true;
            p.cancelParams = data;
          })
        }
      />

      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={state.cancelFollow}
        params={state.cancelParams}
        confirm={debounce(() => unFollowRequest(), 1000)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
    </Flex>
  );
};

export const ForwardFastModal: React.FC<{
  pid: number;
  visible: boolean;
  onClose: () => void;
}> = ({ pid, visible, onClose }) => {
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    page_size: 10,
    total: 0,
    list: [] as Api.Attention.forwardData[],
  });
  const { loading, list, page, page_size } = state;

  const init = async () => {
    try {
      const res = await Api.AttentionApi.getForwardList({
        page,
        page_size,
        pid,
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.page = page + 1;
          p.total = res.data.total_count;
          p.list = page > 1 ? [...res.data.list, ...list] : res.data.list;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  // 查询是否关注
  const getCurrentState = async () => {
    const uids = state.list.map(({ uid }) => uid);
    try {
      const res = await Api.AttentionApi.getFollowState(uids);
      if (Api.isSuccess(res)) {
        const considerFocus = res.data;
        const followTemp = state.list.map(row => {
          if (considerFocus[row.uid]) {
            return { ...row, attention_status: 1 };
          }
          return { ...row, attention_status: 0 };
        });
        setState(p => {
          p.list = followTemp;
        });
      }
    } catch (error) {}
  };

  // React.useEffect(() => {
  //   init();
  // }, []);

  return (
    <ModalWrapper
      creactOnUse
      visible={visible}
      setVisible={onClose}
      title='Reposted by'
      top='20%'
    >
      <FastContent>
        <List
          loading={loading}
          renderList={type => {
            if ((type === 1 && state.list?.length !== 0) || loading) {
              return;
            }
            init();
          }}
        >
          {(state.list ?? []).map((item: Api.Attention.forwardData, index) => (
            <ForwardInfo
              data={{
                ...item,
                address: item.user_address,
                attention_status: item.attention_status,
              }}
              index={index}
              key={index}
              onCallback={() => getCurrentState()}
            />
          ))}
        </List>
      </FastContent>
    </ModalWrapper>
  );
};
