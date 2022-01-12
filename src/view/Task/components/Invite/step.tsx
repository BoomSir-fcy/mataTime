import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const StepOutBox = styled(Box)`
  ${mediaQueriesSize.marginb}
`;

const StepBox = styled(Flex)`
  width: 80%;
  height: 170px;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 5px 30px;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 130px;
    align-items: center;
  }
  .active {
    background: ${({ theme }) => theme.colors.gradients.buttonBg};
    border-width: 1px;
  }
  .activeLine {
    background: ${({ theme }) => theme.colors.white};
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
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
`;

const Line = styled.div`
  width: 8vw;
  height: 3px;
  margin: 0 20px;
  background: ${({ theme }) => theme.colors.white_black};
`;

const PositionText = styled(Text)`
  position: absolute;
  width: max-content;
  top: 50px;
  max-width: 100px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 60px;
    max-width: 180px;
  }
`;
export const Step: React.FC<{ step?: number }> = React.memo(({ step }) => {
  const { t } = useTranslation();

  return (
    <StepOutBox>
      <StepBox>
        <StepItem className='active'>
          1<PositionText small>{t('SpecialInvitationStep1')}</PositionText>
        </StepItem>
        <Line />
        <StepItem className='active'>
          2<PositionText small>{t('SpecialInvitationStep2')}</PositionText>
        </StepItem>
        <Line />
        <StepItem className='active'>
          3<PositionText small>{t('SpecialInvitationStep3')}</PositionText>
        </StepItem>
      </StepBox>
    </StepOutBox>
  );
});
