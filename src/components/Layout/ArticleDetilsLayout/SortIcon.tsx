import styled, { css } from 'styled-components';
import { Box } from 'uikit';

const SortBox = styled(Box)<{ flag: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
  i {
    display: inline-block;
    width: 0px;
    height: 0px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    &:first-child {
      border-bottom: 6px solid ${({ theme }) => theme.colors.textTips};
      margin-bottom: 2px;
    }
    &:last-child {
      border-top: 6px solid ${({ theme }) => theme.colors.textTips};
    }
  }
  ${({ flag }) =>
    Boolean(flag) &&
    flag === 2 &&
    css`
      i:first-child {
        border-bottom: 6px solid ${({ theme }) => theme.colors.textTips};
        margin-bottom: 2px;
      }
      i:last-child {
        border-top: 6px solid ${({ theme }) => theme.colors.ThemeText};
      }
    `}

  ${({ flag }) =>
    Boolean(flag) &&
    flag === 1 &&
    css`
      i:first-child {
        border-bottom: 6px solid ${({ theme }) => theme.colors.ThemeText};
        margin-bottom: 2px;
      }
      i:last-child {
        border-top: 6px solid ${({ theme }) => theme.colors.textTips};
      }
    `}
`;

export const SortIcon: React.FC<{
  changeSort: () => void;
  flag: number;
}> = ({ flag, changeSort }) => {
  return (
    <SortBox flag={flag} onClick={changeSort}>
      <i></i>
      <i></i>
    </SortBox>
  );
};
