import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Flex, Box } from 'uikit';
import { Menu } from './menu/menu';
import { mediaQueriesSize } from "uikit/theme/base";
import { Search, Swap, RecommendPeople, HotTopic, FooterCopyright } from '../Home/right';
import Header from "./Header";

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  justify-content: center;
`
const LeftCard = styled(Flex)`

`
const CenterCard = styled(Box)`
  flex: 1;
  ${mediaQueriesSize.marginLRmd}
`
const RightCard = styled.div`
  width: 375px;
`

export const Container = (props) => {
  console.log('props2', props);

  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Menu />
        </LeftCard>
        <CenterCard>
          <Header />
          {props.children}
        </CenterCard>
        <RightCard>
          <Route path="/" component={Search}></Route>
          <Route path="/" component={Swap}></Route>
          <Route path="/" component={RecommendPeople}></Route>
          <Route path="/" component={HotTopic}></Route>
          <Route path="/" component={FooterCopyright}></Route>
        </RightCard>
      </Flex>
    </PageContainer>
  )
}