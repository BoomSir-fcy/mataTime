import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';
import useMenuNav from 'hooks/useMenuNav';
import { HamburgerCloseIcon, HamburgerIcon } from 'uikit/widgets/Menu/icons';

const Card = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  background: ${({ theme }) => theme.colors.background};
  ${mediaQueriesSize.paddingxs}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`;

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  height: 64px;
  margin-right: 0;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

interface init {
  title: string;
}
export const WalletHead: React.FC<init> = React.memo(({ title, children }) => {
  const { t } = useTranslation();
  const CurrentRound = useStore(p => p.wallet.CurrentRound);
  const { isPushed, setIsPushed, isMobile } = useMenuNav()

  return (
    <Card style={isMobile ? { justifyContent: 'start' } : {}}>
      <MenuButton size='sm' variant='text' aria-label="Toggle menu" onClick={() => setIsPushed(prep => !prep)} mr="24px">
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>
      <Text className="text">{title}</Text>
      {children}
    </Card>
  );
});
