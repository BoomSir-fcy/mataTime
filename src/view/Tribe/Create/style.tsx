import styled from 'styled-components';
import { Box, Flex, InputPanel } from 'uikit';

export const FormFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
export const FormItem = styled(Flex)`
  flex-direction: column;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-top: 20px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
  &.mobile-wrap {
    align-items: flex-start;
    ${({ theme }) => theme.mediaQueries.md} {
      align-items: center;
    }
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
    width: 100%;
    height: 210px;
    color: ${({ theme }) => theme.colors.textTips};
    padding: 15px;
    border-radius: 10px;
    border: none;
    outline: none;
    resize: none;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 80%;
    }
  }
`;
export const FormColumnItem = styled(Flex)`
  flex-direction: column;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
  }
`;
export const LabelFlex = styled(Flex)`
  /* min-width: 110px; */
  /* max-width: 290px; */
  max-width: 100%;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    /* margin-bottom: 0px; */
    max-width: 100%;
  }
  label {
    width: auto;
  }
`;
export const Label = styled.label<{ required?: boolean }>`
  width: auto;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
    width: 120px;
  }
  ${({ required }) =>
    required &&
    `
    ::before {
      content: '*';
      margin-right: 5px;
      display: inline-block;
    }
  `}

  &.tribe-setting {
    width: auto;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 100px;
    }
  }
`;

export const InputPanelStyle = styled(InputPanel)<{ width?: string }>`
  width: 100%;
  max-width: ${({ width }) => width || '320px'};
  border-radius: 10px;
  padding: 4px 20px;
  input:disabled {
    background-color: ${({ theme }) => theme.colors.input};
  }
`;

export const LogoIcon = styled(Flex)`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  border-radius: 50%;
`;
export const BtnFlex = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
