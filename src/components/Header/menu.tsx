import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Svg } from 'uikit';

const HeaderMenuItem = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0 38px;
`

const HeaderLine = styled.div`
  width: 2px;
  height: 90px;
  margin: 0 13px;
  background: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`

const WalletButton = styled(Button)`
  background: #FFFFFF;
  color: #5A7CF9;
`

export const Menu = React.memo(() => {
  return(
    <Flex alignItems="center">
      <HeaderMenuItem as={Link} to="/">
        <Svg viewBox="0 0 60 60" width="30px">
          <image xlinkHref={require('./images/icon_home.png').default}/>
        </Svg>
        首页
      </HeaderMenuItem>
      <HeaderMenuItem as={Link} to="/">
        <Svg viewBox="0 0 60 60" width="30px">
          <image xlinkHref={require('./images/icon_star.png').default}/>
        </Svg>
        星球
      </HeaderMenuItem>
      <HeaderMenuItem as={Link} to="/">
        <Svg viewBox="0 0 60 60" width="30px">
          <image xlinkHref={require('./images/icon_news.png').default}/>
        </Svg>
        快讯
      </HeaderMenuItem>
      <HeaderMenuItem as={Link} to="/login">
        <Svg viewBox="0 0 60 60" width="30px">
          <image xlinkHref={require('./images/icon_other.png').default}/>
        </Svg>
        其他
      </HeaderMenuItem>
      <HeaderLine />
      <WalletButton scale="ld">Connerct Wallet</WalletButton>
    </Flex>
  )
})

