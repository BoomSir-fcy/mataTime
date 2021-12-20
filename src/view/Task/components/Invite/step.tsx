import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';



const StepOutBox = styled(Box)`
  margin-left: 30px;
  ${mediaQueriesSize.marginb}
`

const StepBox = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding:16px 5px 30px;
  .active{
  background: ${({ theme }) => theme.colors.gradients.buttonBg};
  border-width: 1px;
  }
  .activeLine{
  background: ${({ theme }) => theme.colors.white};
  }
`

const StepItem = styled(Flex)`
  position: relative;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background: ${({ theme }) => theme.colors.disableStep};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
`

const Line = styled.div`
  width: 8vw;
  height: 3px;
  margin: 0 20px;
  background: ${({ theme }) => theme.colors.borderColor};
`

const PositionText = styled(Text)`
  position: absolute;
  width: max-content;
  top: 60px;
  max-width: 150px;
`
export const Step: React.FC<{ step?: number }> = React.memo(({ step }) => {
  const { t } = useTranslation();

  return (
    <StepOutBox>
      <StepBox>
        <StepItem className='active'>1
          <PositionText small>{t('分享给特别的朋友')}</PositionText>
        </StepItem>
        <Line className='activeLine' />
        <StepItem className="active">2
          <PositionText small>{t('朋友前往DSG创造喜欢的头像')}</PositionText>
        </StepItem>
        <Line className="activeLine" />
        <StepItem className="active" >3
          <PositionText small>{t('成功登录Metatime')}</PositionText>
        </StepItem>
      </StepBox>
    </StepOutBox>
  );
});
