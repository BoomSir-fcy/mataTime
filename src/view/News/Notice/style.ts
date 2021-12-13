import styled from 'styled-components';
import { Card, Box } from 'uikit';

export const NoticeWrapper = styled(Box)`
  width: 100%;
  .notice-content-wrapper {
    width: 100%;
    height: 700px;
    background: #191f2d;
    border-radius: 10px;
  }
`;

export const NoticeContentWrapper = styled(Card)`
  width: 100%;
  background-color: transparent;
  overflow: visible;
`;

export const NoticeItemWrapper = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 0 0 0;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
