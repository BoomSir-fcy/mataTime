import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Heading, Text, Box, Image } from 'uikit';
import styled from 'styled-components';
import TradeLogo from '../components/TradeCard/TradeLogo';
import BtnIcon from '../components/BtnIcon';
import { useTranslation } from 'contexts/Localization';

const InfoFlex = styled(Flex)`
  padding: 26px 14px 26px 26px;
  flex-wrap: wrap;
`;

const RightFlex = styled(Flex)`
  /* min-height: 100px; */
  margin-left: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 32px;
  }
`;

const NumberFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`;

interface HeaderProps {
  Avatar?: string;
}
const DetailHeader: React.FC<HeaderProps> = ({ Avatar }) => {
  const { t } = useTranslation();

  return (
    <InfoFlex>
      <TradeLogo />
      <RightFlex flex='1' flexDirection='column' justifyContent='space-between'>
        <Box>
          <Heading scale='lg'>时光机</Heading>
          <NumberFlex mt='28px' justifyContent='space-between'>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px' color='textTips'>
                成员
              </Text>
            </Box>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px' color='textTips'>
                帖子
              </Text>
            </Box>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px' color='textTips'>
                精选
              </Text>
            </Box>
          </NumberFlex>
        </Box>
        <Flex justifyContent='space-between' alignItems='center'>
          <Flex alignItems='center'>
            <TradeLogo scales='ld' round logo={Avatar} />
            <Text ml='10px' bold>
              Oline
            </Text>
          </Flex>
          <Link to='/tribe/post'>
            <BtnIcon name='icon-zhifeiji' text={t('sendBtnText')} />
          </Link>
          {/* <Button>加入部落</Button> */}
        </Flex>
      </RightFlex>
    </InfoFlex>
  );
};

export default DetailHeader;