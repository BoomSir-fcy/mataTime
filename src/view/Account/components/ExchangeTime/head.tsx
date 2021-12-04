import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js'
import { Flex, Box, Text } from 'uikit';
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
  align-items: flex-start;
`;

const ScaleBox = styled(Box)`
  width: max-content;
  img{
    width: 32px;
  }
`;
const Placeholder = styled(Box)`
  width: 70px;
  height: 32px;
`;


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
          <Box>
            <Text fontSize='30px' bold>Now Round</Text>
            <Text fontSize='24px'>Price</Text>
          </Box>
          <ScaleBox>
            <Flex alignItems='center'>
              <Box style={{ textAlign: 'right' }}>
                <img src="/images/tokens/DSG.svg" alt="" />
                <Text fontSize='18px' bold>1 DSG</Text>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Placeholder />
                <Text textAlign='center' fontSize='18px' bold>=</Text>
              </Box>
              <Box style={{ textAlign: 'left' }}>
                <img src="/images/tokens/TIME.svg" alt="" />
                <Text fontSize='18px' bold>{formatDisplayApr(new BigNumber(Number(NowTime)).div(Number(NowDsg)).toNumber())} Time</Text>
              </Box>
            </Flex>
          </ScaleBox>
        </RoundBox>
        <RoundBox>
          <Box>
            <Text fontSize='30px' bold>Next Round</Text>
            <Text fontSize='24px'>Price</Text>
          </Box>
          <ScaleBox>
            <Flex alignItems='center'>
              <Box style={{ textAlign: 'right' }}>
                <img src="/images/tokens/DSG.svg" alt="" />
                <Text fontSize='18px' bold>1 DSG</Text>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Placeholder />
                <Text textAlign='center' fontSize='18px' bold>=</Text>
              </Box>
              <Box style={{ textAlign: 'left' }}>
                <img src="/images/tokens/TIME.svg" alt="" />
                <Text fontSize='18px' bold>{formatDisplayApr(new BigNumber(Number(NextTime)).div(Number(NextDsg)).toNumber())} Time</Text>
              </Box>
            </Flex>
          </ScaleBox>
        </RoundBox>
      </Flex>
    </Card>
  );
});
