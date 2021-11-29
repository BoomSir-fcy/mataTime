import styled from 'styled-components';
import { Card } from 'uikit';

export const NewsMeWrapper = styled.div`
  width: 100%;
`;

export const MeItemWrapper = styled(Card)`
  width: 100%;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 25px;
  overflow: visible;
  box-shadow: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
