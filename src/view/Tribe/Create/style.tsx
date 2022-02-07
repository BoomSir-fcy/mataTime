import styled from 'styled-components';
import { Flex, InputPanel } from 'uikit';

export const FormFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
export const FormItem = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueriesSize.margint}
  &:last-child {
    margin-bottom: 20px;
  }
  &.mobile-nowrap {
    flex-direction: row;
  }
  .select-header {
    height: 44px;
    border: 0;
    padding: 0px 16px;
    box-shadow: none;
    background: transparent;
  }
  .drop-svg {
    right: 0 !important;
    top: 50% !important;
  }
  textarea {
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    width: 80%;
    height: 210px;
    color: ${({ theme }) => theme.colors.textTips};
    padding: 15px;
    border-radius: 10px;
    border: none;
    outline: none;
    resize: none;
  }
`;
export const FormColumnItem = styled(Flex)`
  flex-direction: column;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
  }
`;
export const Label = styled.label<{ required?: boolean }>`
  width: 100px;
  color: ${({ theme }) => theme.colors.text};
  ${({ required }) =>
    required &&
    `
    ::before {
      content: '*';
      margin-right: 5px;
      display: inline-block;
    }
  `}
`;

export const InputPanelStyle = styled(InputPanel)`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  padding: 4px 20px;
`;

export const LogoIcon = styled(Flex)`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  border-radius: 50%;
`;

export const TextareaStyled = styled.textarea<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
`;
