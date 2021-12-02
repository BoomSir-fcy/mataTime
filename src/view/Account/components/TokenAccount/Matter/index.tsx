import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components';
import { getTimeAddress } from 'utils/addressHelpers';
import { useTokenBalance } from 'view/exchange/hook';
import { useFetchWalletInfo, useFetchApproveNum } from 'store/wallet/hooks';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';

const Content = styled(Box)`
  padding: 30px 18px;
${({ theme }) => theme.mediaQueries.md}{
  padding: 15px 14px;
}
`
const ContentTab = styled(Flex)`
align-items: center;
justify-content: space-between;
padding-bottom: 0;
padding-top: 0;
border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
.active{
    font-size: 18px;
    color:${({ theme }) => theme.colors.white_black};
    font-weight: bold;
  }
`
const TabText = styled(Text)`
  color:${({ theme }) => theme.colors.textTips};
  ${({ theme }) => theme.mediaQueriesSize.marginr}
  font-size: 14px;
  cursor: pointer;
`
const RightBox = styled(Flex)`
min-width: 23vw;
`
const IncomeBox = styled(Flex)`
align-items: center;
${({ theme }) => theme.mediaQueriesSize.marginr}
width: max-content;
`
const Img = styled.img`
width: 36px;
height: 36px;
`


const Matter: React.FC = () => {

  return (
    <Content>
      1232
    </Content>
  )
}

export default Matter;