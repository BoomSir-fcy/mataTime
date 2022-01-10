import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from './config';

export const NavItemStyled = styled(Flex)<{ isactive?: number }>`
  align-items: center;
  width: max-content;
  /* height: 40px; */
  cursor: pointer;
  vertical-align: middle;
  transition: background 0.3s;
  background: ${({ isactive, theme }) =>
    isactive ? theme.colors.backgroundThemeCard : 'transparent'};
  border-radius: 18px;
  margin-bottom: 20px;
  padding: 7px 30px 7px 14px;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.backgroundThemeCard};
  }
`;

export const IconBox = styled(Box)`
  position: relative;
  width: 24px;
  /* height: 24px; */
`;
export const Badge = styled(Text)`
  position: absolute;
  background: ${({ theme }) => theme.colors.textOrigin};
  height: 14px;
  min-width: 18px;
  max-width: 26px;
  border-radius: 5px;
  padding: 0 1px;
  top: -6px;
  right: -8px;
  font-size: 12px;
  line-height: 12px;
  display: block;
  text-align: center;
`;

const StyledPanel = styled.div<{
  isPushed: boolean;
  showMenu: boolean;
  isMobile: boolean;
  padding?: boolean;
}>`
  position: fixed;
  padding-top: ${({ padding }) => (padding ? 0 : '22px')};
  padding-left: 8px;
  padding-right: 8px;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  /* background-color: ${({ theme }) => theme.nav.background}; */
  background: ${({ theme }) => theme.colors.primaryDark};
  width: ${({ isPushed }) => (isPushed ? `${SIDEBAR_WIDTH_FULL}px` : 0)};
  height: 100%;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'hidden')};
  transform: translate3d(0, 0, 0);
  ${({ isPushed }) => !isPushed && 'white-space: nowrap;'};

  ${({ theme }) => theme.mediaQueries.nav} {
    width: ${SIDEBAR_WIDTH_FULL}px;
  }
`;

interface Props {
  showMenu: boolean;
  isPushed: boolean;
  isMobile: boolean;
  padding?: boolean;
}

export const Panel: React.FC<Props> = ({
  isPushed,
  showMenu,
  isMobile,
  children,
  padding,
}) => {
  return (
    <StyledPanel
      isMobile={isMobile}
      isPushed={isPushed}
      showMenu={showMenu}
      padding={padding}
    >
      {children}
    </StyledPanel>
  );
};
