import React from 'react';
import styled, { useTheme } from 'styled-components';
import history from 'routerHistory';
import { Flex, Box, Text } from 'uikit';
import { Icon } from 'components';
import useMenuNav from 'hooks/useMenuNav';
import { HamburgerIcon, HamburgerCloseIcon } from 'uikit/widgets/Menu/icons';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';
import MenuButton from './MenuButton';

const CrumbsWraper = styled(Box)`
  padding-bottom: 70px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: sticky;
    top: 0;
    z-index: 1005;
    padding-bottom: 0;
  }
`;

const Card = styled(Flex)<{ zIndex?: number }>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${({ zIndex }) => zIndex || 1005};
  transform: translateZ(1px);
  ${({ theme }) => theme.mediaQueries.md} {
    position: sticky;
  }
  ${mediaQueriesSize.paddingxs}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`;

const CenterBox = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
`;

export const Crumbs: React.FC<{
  title?: string;
  centerTitle?: string;
  back?: boolean;
  zIndex?: number;
  children?: any;
}> = React.memo(({ back, title, centerTitle, zIndex, children }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme.colors.white_black;
  const { isPushed, setIsPushed, isMobile } = useMenuNav();

  const goBack = () => {
    document.referrer === '' ? history.replace('/') : history.goBack();
  };

  return (
    <CrumbsWraper>
      <Card zIndex={zIndex}>
        <Flex alignItems='center' style={centerTitle && { width: '100%' }}>
          <MenuButton
            aria-label='Toggle menu'
            onClick={() => setIsPushed(prep => !prep)}
            mr='24px'
          >
            {isPushed ? (
              <HamburgerCloseIcon width='24px' color='textSubtle' />
            ) : (
              <HamburgerIcon width='24px' color='textSubtle' />
            )}
          </MenuButton>
          {!back ? (
            <Text className='text'>{title || '首页'}</Text>
          ) : (
            <Flex
              onClick={goBack}
              alignItems='center'
              style={{ cursor: 'pointer', position: 'relative', width: '100%' }}
            >
              <Flex alignItems='center'>
                <Icon
                  name={'icon-fanhui'}
                  size={20}
                  color={colors}
                  fontWeight='bold'
                />
                <Text className='text' ml='16px'>
                  {t('newsBack')}
                </Text>
              </Flex>
              {centerTitle && (
                <CenterBox>
                  <Text className='text' ml='16px'>
                    {centerTitle.length > 20
                      ? centerTitle.slice(0, 20) + '...#'
                      : centerTitle}
                  </Text>
                </CenterBox>
              )}
            </Flex>
          )}
        </Flex>
        {children}
      </Card>
    </CrumbsWraper>
  );
});
