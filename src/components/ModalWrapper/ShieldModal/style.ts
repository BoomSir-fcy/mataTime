import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit';
export const ModalOperatorWrapper = styled(Box)`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

export const ModalOperatorQueryWrapper = styled(Button)`
  width: 100px;
  height: 35px;
  background: ${({ theme }) => theme.colors.greyBackground};
  border-radius: 10px;
`;
export const ModalOperatorCancerWrapper = styled(Button)`
  width: 100px;
  height: 35px;
  border-radius: 10px;
`;

export const ShieldContentWrapper = styled(Box)`
  width: 100%;
  display: flex;
  margin-top: 25px;
  margin-bottom: 30px;
  .img-box {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: #f0f0f0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .des-box {
    flex: 1;
    font-size: 16px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white_black};
    margin-left: 28px;
    a {
      color: ${({ theme }) => theme.colors.ThemeText};
    }
  }
`;
