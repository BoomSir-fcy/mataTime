import styled from 'styled-components';
import { Card } from 'uikit';

export const MeItemWrapper = styled(Card)`
  width: 100%;
  width: 100%;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  padding-top: 40px;
  overflow: visible;
  box-shadow: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  /* background-color: ${({ theme }) => theme.colors.primaryDark}; */
  /* transition: background 0.3s; */
  /* &:hover {
    background: ${({ theme }) => theme.colors.hoverList};
  } */
`;
