import React, { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Heading, Card, Box, Button, Flex, Text } from 'uikit';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'contexts/Localization';
import { stuffLable } from 'config/constants/stuffImages';
import { MobileHide, MobileShow } from '../Styled';
import { useStore } from 'store';

const PageContainer = styled(Box)`
  width: 100%;
  /* position: relative; */
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 214px;
    min-width: 184px;
  }
`;

const CardStyled = styled(Card)`
  width: 100%;
  min-width: 100%;
  height: 100%;
  display: none;
  background: ${({ theme }) => theme.colors.primaryDark};
  min-height: 100vh;
  border: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
    border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

const PaddingBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const ImgBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.paddingsm}
  img {
    width: 100%;
  }
`;

const BoxCardStyled = styled(Flex)`
  width: 100%;
  min-width: 100%;
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
  position: sticky;
  top: 200px;
`;

const TabBoxStyled = styled(Flex)`
  width: 100%;
  overflow: auto;
  /* flex-wrap: wrap; */
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
  ::-webkit-scrollbar {
    height: 4px;
  }
  .active {
    background: ${({ theme }) => theme.colors.backgroundCard};
  }
`;

const ButtonStyled = styled(Button)`
  padding-left: 16px;
  padding-right: 16px;
  height: 42px;
  border-radius: 42px;
  font-weight: 400;
  margin-top: 4px;
  flex-shrink: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 80%;
  }
  /* text-align: left; */
  justify-content: start; // HACK: text-align: left;
`;

interface Props {
  activeIndex: number;
  onClick?: (type: number) => void;
}

const Tabbar: React.FC<Props> = ({ activeIndex, onClick }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();

  const { stuffRes } = useStore(p => p.pickNft);

  const stuffLableRenderData = useMemo(() => {
    return stuffRes.map(item => ({
      lable: item[0].lable,
      length: item.length,
      // length: item[0].isBase ? item.length : item.length -1
    }));
  }, [stuffRes]);

  return (
    <PageContainer>
      <MobileHide>
        <CardStyled>
          <ImgBox>
            <img src='/images/LOGO2.svg' alt='' />
          </ImgBox>
          <PaddingBox>
            <Heading scale='md' pl='14px'>
              {t('Synthesize')}
            </Heading>
            <TabBoxStyled mt='8px'>
              {stuffLableRenderData.map((item, index) => (
                <ButtonStyled
                  className={activeIndex === index ? 'active' : ''}
                  variant='text'
                  color={activeIndex === index ? 'primary' : 'text'}
                  scale='sm'
                  key={item.lable}
                  onClick={() => onClick(index)}
                >
                  <Text color={activeIndex === index ? 'white' : 'text'}>
                    {t(item.lable)} ({item.length})
                  </Text>
                  {/* {t(item.lable)} ({item.length}) */}
                </ButtonStyled>
              ))}
            </TabBoxStyled>
          </PaddingBox>
        </CardStyled>
      </MobileHide>
      <MobileShow>
        <BoxCardStyled>
          <TabBoxStyled mt='8px'>
            {stuffLable.map((item, index) => (
              <ButtonStyled
                variant='text'
                scale='sm'
                key={item.lable}
                onClick={() => onClick(index)}
              >
                <Text color={activeIndex === index ? 'primary' : 'text'}>
                  {t(item.lable)} ({item.length})
                </Text>
              </ButtonStyled>
            ))}
          </TabBoxStyled>
        </BoxCardStyled>
      </MobileShow>
    </PageContainer>
  );
};

export default Tabbar;
