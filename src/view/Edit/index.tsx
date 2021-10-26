import React from 'react';
import styled from "styled-components";
import { Header } from './center';
import NftAvatar from './center/nftavatar';
import { Avatar } from 'components';
import BgUpload from '../../components/BgUpload';
import { Route } from 'react-router-dom';
import { Flex, Box } from 'uikit';
import { Menu } from './left';
import { Search, Swap, RecommendPeople, HotTopic, FooterCopyright } from '../Home/right';
import { mediaQueries, mediaQueriesSize } from "uikit/theme/base";
const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display:flex;
justify-content:center;
`
const LeftCard = styled(Flex)`
  // width: 375px;
`
const CenterCard = styled(Box)`
  // flex: 1;
  ${mediaQueriesSize.marginLRmd}
  // width:670px;
`
const RightCard = styled.div`
  width: 375px;
`

const FollowContainer = styled.div`
  padding: 36px;
`

const FollowTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
`

const FollowBody = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 25px 0 38px;
  line-height: 1.5;
  a {
    color: rgba(65, 104, 237, 1);
  }
`

const CancelFollow = () => {
  return (
    <FollowContainer>
      <FollowTitle>是否取消关注Ta?</FollowTitle>
      <FollowBody>
        <Avatar src="" />
        屏蔽用户<a>@0x5...684</a>，将无法获取查看Ta的最 新动态、信息，屏蔽后可在“个人主页”取消 屏蔽
      </FollowBody>
      <div className="button">
        <button>确认</button>
        <button>取消</button>
      </div>
    </FollowContainer>
  )
}
const Edit: React.FC = () => {
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <LeftCard>
          {/* <About /> */}
          <Menu></Menu>
        </LeftCard>
        <CenterCard>
          <Route path="/" component={Header}></Route>
          <Route path="/" component={BgUpload}></Route>
          <Route path="/" component={NftAvatar}></Route>
        </CenterCard>
        <RightCard>
          <Route path="/" component={Search}></Route>
          <Route path="/" component={Swap}></Route>
          <Route path="/" component={RecommendPeople}></Route>
          <Route path="/" component={HotTopic}></Route>
          <Route path="/" component={FooterCopyright}></Route>

        </RightCard>
      </Flex>
      {/* <button>Open Modal</button>
      <ModalWrapper>
        <CancelFollow />
      </ModalWrapper> */}
    </PageContainer>
  )
}

export default Edit;