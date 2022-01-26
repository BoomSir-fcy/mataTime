import styled from 'styled-components';
import { Flex } from 'uikit';

export const FormFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
export const FormItem = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.margint}
  &:last-child {
    margin-bottom: 20px;
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
