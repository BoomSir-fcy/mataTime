import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { Flex, Box, Button, Text, useTooltip } from 'uikit';
import { Icon, ForwardModal } from 'components';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;
const PopupContent = styled(Flex)`
  flex-direction: column;
  min-width: 80px;
  /* min-height: 80px; */
  padding: 0 9px 0 0;
  background: ${({ theme }) => theme.colors.greyBackground};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.radii.card};
`;

const Rows = styled(Button)`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  height: auto;
  padding: 14px 0 14px 9px;
  + button {
    padding-top: 0;
  }
`;

export const Forward: React.FC<{
  type: string;
  total: number;
  data: Api.Home.post;
  onSuccess: (type: string) => void;
}> = React.memo(({ type, total, data, onSuccess }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { toastSuccess, toastLink } = useToast();
  const [state, setState] = useImmer({
    visible: false,
    forward_type: 1 as 1 | 2,
  });
  const userinfo = useStore(p => p.loginReducer.userInfo);

  const submitForward = async (res?: string, forward_type?: 1 | 2) => {
    try {
      const forward_content = Boolean(res) ? JSON.parse(res) : [];
      // todo 优化传值类型
      Api.HomeApi.setForward({
        forward_type: forward_type ? forward_type : state.forward_type,
        forward_content_type: type === 'post' ? 1 : 2,
        forward_id: data.id,
        forward_content: forward_content.length > 0 ? res : '',
      }).then(res => {
        if (Api.isSuccess(res)) {
          setState(p => {
            p.visible = false;
          });
          onSuccess('FORWARD');
          // 跳转url参数
          const params = {
            pathname: `/articledetils/${res.data}`,
            state: { name: 'forward' },
          };
          forward_type
            ? toastSuccess(t('Repost Successfully'))
            : toastLink(t('Repost Successfully'), params, t('View'));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 取消快转
  const cancelForward = async () => {
    try {
      const res = await Api.HomeApi.cancelForward({
        forward_id: data.forward_id,
        forward_content_type: type === 'post' ? 1 : 2,
      });
      if (Api.isSuccess(res)) {
        onSuccess('UNFORWARD');
        toastSuccess(t('unRepost Successfully'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { targetRef, tooltip, tooltipVisible, close } = useTooltip(
    <PopupContent
      onClick={event => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {/* {userinfo.uid === data.forwardUid ? (
        <Rows
          variant='text'
          onClick={() => {
            close();
            cancelForward();
          }}
        >
          <Icon name='icon-retweet' margin='0 5px 0 0' color='textTips' />
          <Text color='textTips' fontSize='14px'>
            {t('Undo Repost')}
          </Text>
        </Rows>
      ) : (
        <Rows
          variant='text'
          onClick={() => {
            close();
            submitForward('', 2);
          }}
        >
          <Icon name='icon-retweet' margin='0 5px 0 0' color='textTips' />
          <Text color='textTips' fontSize='14px'>
            {t('Repost')}
          </Text>
        </Rows>
      )} */}

      <Rows
        variant='text'
        onClick={() => {
          close();
          setState(p => {
            p.visible = true;
            p.forward_type = 1;
          });
        }}
      >
        <Icon name='icon-bianji' margin='0 5px 0 0' color='textTips' />
        <Text color='textTips' fontSize='14px'>
          {t('Quote Post')}
        </Text>
      </Rows>
    </PopupContent>,
    {
      placement: 'bottom-start',
      trigger: 'click',
      stylePadding: '0',
      invert: false,
      tooltipPadding: 0,
      tooltipOffset: [0, 5],
      background: theme.colors.greyBackground,
    },
  );
  return (
    <Box>
      <PopupButton ref={targetRef} title={t('editorTime')}>
        <Icon name='icon-retweet' margin='0 10px 0 0' color='textTips' />
        <Text color='textTips'>{total}</Text>
      </PopupButton>
      {tooltipVisible && tooltip}
      {/* 转发 */}
      <ForwardModal
        visible={state.visible}
        forwardType={state.forward_type}
        type={type}
        data={data}
        onSuccess={submitForward}
        close={() =>
          setState(p => {
            p.visible = false;
          })
        }
      />
    </Box>
  );
});
