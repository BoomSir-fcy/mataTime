import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js'
import { Flex, Box, Text, AnimationRingIcon } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import BgImg from 'assets/images/myWallet/TimeHeaderBg.png'
import { formatDisplayApr } from 'utils/formatBalance';
import { TimeInfo } from 'store/wallet/type';


const Card = styled(Box)`
  background-image: url(${BgImg});
  min-height: 294px;
  display: flex;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  ${({ theme }) => theme.mediaQueriesSize.marginb}
`;
const RoundBox = styled(Box)`
  width: max-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 50px;
`;

const ScaleBox = styled(Box)`
  position: absolute;
  bottom: -20px;
  left: -24px;
  width: max-content;
  img{
    width: 32px;
  }
`;
const Placeholder = styled(Box)`
  width: 70px;
  height: 32px;
`;
const FaqBox = styled(Box)`
width: max-content;
`
const WhiteText = styled(Text)`
color:${({ theme }) => theme.colors.white};
`

interface init {
  nowRound: TimeInfo
  NextRound: TimeInfo
}
export const TimeHeader: React.FC<init> = React.memo(({ nowRound, NextRound }) => {
  const { t } = useTranslation();
  const { max_dsg_token: NowDsg } = nowRound
  const { max_time_token: NowTime } = nowRound
  const { max_dsg_token: NextDsg } = NextRound
  const { max_time_token: NextTime } = NextRound
  return (
    <Card>
      <Flex width='100%' justifyContent='space-around' alignItems='center'>
        <RoundBox>
          <AnimationRingIcon bgColor active3 active1 isRotate width="8rem">
            <FaqBox>
              <WhiteText fontSize='30px' bold>Now Round</WhiteText>
              <WhiteText fontSize='24px'>Price</WhiteText>
            </FaqBox>
          </AnimationRingIcon>
          <ScaleBox>
            <Flex alignItems='center'>
              <Box style={{ textAlign: 'right' }}>
                <img src="/images/tokens/DSG.svg" alt="" />
                <WhiteText fontSize='18px' bold>1 DSG</WhiteText>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Placeholder />
                <WhiteText textAlign='center' fontSize='18px' bold>=</WhiteText>
              </Box>
              <Box style={{ textAlign: 'left' }}>
                <img src="/images/tokens/TIME.svg" alt="" />
                <WhiteText fontSize='18px' bold>{formatDisplayApr(new BigNumber(Number(NowTime)).div(Number(NowDsg)).toNumber())} Time</WhiteText>
              </Box>
            </Flex>
          </ScaleBox>
        </RoundBox>
        <RoundBox>
          <AnimationRingIcon active2 isRotate width="8rem">
            <FaqBox>
              <WhiteText fontSize='30px' bold>Next Round</WhiteText>
              <WhiteText fontSize='24px'>Price</WhiteText>
            </FaqBox>
          </AnimationRingIcon>
          <ScaleBox>
            <Flex alignItems='center'>
              <Box style={{ textAlign: 'right' }}>
                <img src="/images/tokens/DSG.svg" alt="" />
                <WhiteText fontSize='18px' bold>1 DSG</WhiteText>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Placeholder />
                <WhiteText textAlign='center' fontSize='18px' bold>=</WhiteText>
              </Box>
              <Box style={{ textAlign: 'left' }}>
                <img src="/images/tokens/TIME.svg" alt="" />
                <WhiteText fontSize='18px' bold>{formatDisplayApr(new BigNumber(Number(NextTime)).div(Number(NextDsg)).toNumber())} Time</WhiteText>
              </Box>
            </Flex>
          </ScaleBox>
        </RoundBox>
      </Flex>
    </Card>
  );
});
