import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Box, Button, Text, useTooltip } from 'uikit';
import { Icon, ForwardModal } from 'components';
import { useTranslation } from 'contexts/Localization';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;
const PopupContent = styled(Flex)`
  flex-direction: column;
  min-width: 80px;
  min-height: 80px;
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
`;

export const Forward: React.FC<{
  type: string;
  total: number;
  data: Api.Home.post;
}> = React.memo(({ type, total, data }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    visible: false,
  });

  const { targetRef, tooltip, tooltipVisible, close } = useTooltip(
    <PopupContent
      onClick={event => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <Rows variant='text'>
        <Icon name='icon-retweet' margin='0 5px 0 0' color='textTips' />
        <Text color='textTips'>{t('Repost')}</Text>
      </Rows>
      <Rows
        variant='text'
        onClick={() => {
          close();
          setState(p => {
            p.visible = true;
          });
        }}
      >
        <Icon name='icon-bianji' margin='0 5px 0 0' color='textTips' />
        <Text color='textTips'>{t('Quote Post')}</Text>
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
        type={type}
        data={data}
        close={() =>
          setState(p => {
            p.visible = false;
          })
        }
      />
    </Box>
  );
});
