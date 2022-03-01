import styled from 'styled-components';
import { Card, Box } from 'uikit';

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

export const ContentEllipsis = styled(Box)`
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.white_black};
`;
