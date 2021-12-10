import styled from "styled-components";
import { Button } from "uikit";

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
MenuButton.defaultProps = {
  variant: "text",
  size: "sm",
};

export default MenuButton;
