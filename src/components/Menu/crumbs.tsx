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
  padding-bottom: 60px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: sticky;
    top: 0;
    z-index: 1005;
    padding-bottom: 0;
  }
`;

const Card = styled(Flex)<{ zIndex?: number; hideBorder?: boolean }>`
  align-items: center;
  width: 100%;
  min-height: 60px;
  border-bottom: 1px solid
    ${({ theme, hideBorder }) =>
      hideBorder ? 'transparent' : theme.colors.borderThemeColor};
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${({ zIndex }) => zIndex};
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
  top?: boolean;
  zIndex?: number;
  children?: any;
  hideBorder?: boolean;
  justifyContent?: string;
  callBack?: () => void;
}> = React.memo(
  ({
    back,
    top,
    title,
    centerTitle,
    zIndex = 1005,
    children,
    justifyContent,
    hideBorder,
    callBack,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const colors = theme.colors.white_black;
    const { isPushed, setIsPushed, isMobile } = useMenuNav();

    const goBack = () => {
      // document.referrer === '' ? history.replace('/') : history.goBack();
      window.history.length > 2 ? history.goBack() : history.replace('/');
    };

    const goTop = () => {
      if (top) {
        window.scrollTo({
          top: 0,
          // behavior: 'smooth',
        });
        callBack();
      }
    };

    return (
      <CrumbsWraper>
        <Card
          hideBorder={hideBorder}
          justifyContent={justifyContent ? justifyContent : 'space-between'}
          zIndex={zIndex}
        >
          <Flex alignItems='center' style={centerTitle && { width: '100%' }}>
            {!back && (
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
            )}
            {!back ? (
              <Text
                onClick={goTop}
                style={{ cursor: top ? 'pointer' : 'auto' }}
                className='text'
              >
                {title || '首页'}
              </Text>
            ) : (
              <Flex
                onClick={goBack}
                alignItems='center'
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Flex alignItems='center'>
                  <Icon
                    name={'icon-fanhui'}
                    size={20}
                    color={colors}
                    fontWeight='bold'
                  />
                  <Text
                    className='text'
                    ml='16px'
                    style={{ whiteSpace: 'nowrap' }}
                  >
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
  },
);
