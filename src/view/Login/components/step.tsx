import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';



const StepOutBox = styled(Box)`
  ${mediaQueriesSize.marginb}
`

const StepBox = styled(Flex)`
justify-content: space-between;
align-items: center;
padding:16px 5px 30px;
  .active{
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  }
`

const StepItem = styled(Flex)`
position: relative;
font-size: 18px;
font-weight: bold;
justify-content: center;
align-items: center;
width: 50px;
height: 50px;
background: ${({ theme }) => theme.colors.disableStep};
border-radius: 50%;
`

const Line = styled.div`
width: 10vw;
height: 3px;
background: ${({ theme }) => theme.colors.disableStep};
`

const PositionText = styled(Text)`
position: absolute;
width: max-content;
bottom: -32px;
`
export const Step: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const loading = useStore(p => p.loginReducer.signinLoading);
  const nft = useStore(p => p.loginReducer.nft);
  const { singUpStep } = useStore(p => p.loginReducer);

  return (
    <StepOutBox>
      <Text
        fontSize="34px"
        marginBottom="29px"
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text>
      <StepBox>
        <StepItem className='active'>
          1
          <PositionText fontSize='18px' >{t('login Choose Avatar')}</PositionText>
        </StepItem>
        <Line className='active' />
        <StepItem className={singUpStep > 1 ? 'active' : ''}>2
          <PositionText fontSize='18px' >{t('login Set nickname')}</PositionText>
        </StepItem>
        <Line className={singUpStep > 1 ? 'active' : ''} />
        <StepItem className={singUpStep > 2 ? 'active' : ''} >3
          <PositionText fontSize='18px' >{t('login Complete registration')}</PositionText>
        </StepItem>
      </StepBox>
    </StepOutBox>
  );
});
