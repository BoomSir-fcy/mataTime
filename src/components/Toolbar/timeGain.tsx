import React from 'react';
import styled, { useTheme } from 'styled-components';
import BigNumber from 'bignumber.js';
import { Flex, Box, Text, Image } from 'uikit';
import { PopupWrap, Icon } from 'components';
import { formatDisplayApr } from 'utils/formatBalance';
import { useTranslation } from 'contexts/Localization';

const TimeIcon = styled(Image)``;
const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;
const PopupContent = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 40px;
  min-width: 0;
  padding: 0 13px;
  background: ${({ theme }) => theme.colors.greyBackground};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.radii.card};
`;

export const TimeGain: React.FC<{
  total: string;
}> = React.memo(({ total }) => {
  const theme = useTheme();
  const Popref = React.useRef(null);
  const { t } = useTranslation();

  return (
    <PopupWrap
      ref={Popref}
      trigger={
        <PopupButton>
          <Box width="18px" mr="10px">
            <TimeIcon width={18} height={18} src="/images/tokens/TIME.svg" />
          </Box>
          <Text color="textTips">
            {formatDisplayApr(parseFloat(new BigNumber(total).toFixed(2)))}
          </Text>
        </PopupButton>
      }
      position="top center"
      arrowStyle={{
        color: theme.colors.tertiary,
        stroke: theme.colors.tertiary
      }}
    >
      <PopupContent>
        <Text color="textTips" style={{ flex: 1, minWidth: 80 }}>
          Time {t('Time Rewards')}
        </Text>
        <Text fontWeight="bold" ellipsis>
          {formatDisplayApr(parseFloat(new BigNumber(total).toFixed(2)))}
        </Text>
      </PopupContent>
    </PopupWrap>
  );
});
