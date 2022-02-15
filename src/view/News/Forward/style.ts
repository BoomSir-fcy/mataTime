import styled from 'styled-components';
import { Card } from 'uikit';

export const NewsMeWrapper = styled.div`
  width: 100%;
`;

export const MeItemWrapper = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  padding-top: 40px;
  overflow: visible;
  box-shadow: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  background-color: ${({ theme }) => theme.colors.background};
  transition: background 0.3s;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.hoverList};
    .icon-shield {
      opacity: 1;
    }
  }
  .icon-shield {
    opacity: 0;
  }
`;
