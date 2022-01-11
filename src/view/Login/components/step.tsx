import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const StepOutBox = styled(Box)`
  ${mediaQueriesSize.marginb}
  .marginbot {
    ${({ theme }) => theme.mediaQueriesSize.marginb}
  }
`;

const StepBox = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 16px 5px 30px;
  .active {
    background: ${({ theme }) => theme.colors.gradients.buttonBg};
    border-width: 1px;
    color: ${({ theme }) => theme.colors.white};
  }
  .activeLine {
    background: ${({ theme }) => theme.colors.white_black};
  }
`;

const StepItem = styled(Flex)`
  position: relative;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.disableStep : theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white_black};
  border-radius: 50%;
`;

const Line = styled.div`
  width: 8vw;
  height: 3px;
  background: ${({ theme }) => theme.colors.borderColor};
`;

const PositionText = styled(Text)`
  position: absolute;
  width: max-content;
  bottom: -32px;
`;
export const Step: React.FC<{
  noTitle?: boolean;
}> = ({ noTitle }) => {
  const { t } = useTranslation();
  const loading = useStore(p => p.loginReducer.signinLoading);
  const nft = useStore(p => p.loginReducer.nft);
  const { singUpStep } = useStore(p => p.loginReducer);

  return (
    <StepOutBox>
      <Box className={noTitle ? 'noMargin' : 'marginbot'}>
        {!noTitle && (
          <Text
            fontSize='34px'
            marginBottom='29px'
            bold
            style={{ textTransform: 'capitalize' }}
          >
            {t('loginWelcome')}
          </Text>
        )}
        <StepBox>
          <StepItem className='active'>
            1
            <PositionText fontSize='18px'>
              {t('login Choose Avatar')}
            </PositionText>
          </StepItem>
          <Line className='activeLine' />
          <StepItem className={singUpStep > 1 ? 'active' : ''}>
            2
            <PositionText fontSize='18px'>
              {t('login Set nickname')}
            </PositionText>
          </StepItem>
          <Line className={singUpStep > 1 ? 'activeLine' : ''} />
          <StepItem className={singUpStep > 2 ? 'active' : ''}>
            3
            <PositionText fontSize='18px'>
              {t('login Complete registration')}
            </PositionText>
          </StepItem>
        </StepBox>
      </Box>
    </StepOutBox>
  );
};
