import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit';

export const ModalOperatorWrapper = styled(Box)`
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalOperatorQueryWrapper = styled(Button)`
  width: 100px;
  height: 35px;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
`;
export const ModalOperatorCancerWrapper = styled(Button)`
  width: 100px;
  height: 35px;
  background: #4168ed;
  border-radius: 10px;
`;

export const CancelAttentionContentWrapper = styled(Box)`
  width: 100%;
  display: flex;
  margin-top: 25px;
  margin-bottom: 30px;
  .des-box {
    flex: 1;
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white_black};
    margin-left: 28px;
  }
`;
