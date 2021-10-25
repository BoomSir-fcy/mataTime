import React from 'react';
import styled from "styled-components";
import { LeftMenu, About, Avatar, Editor, ModalWrapper } from 'components';
import { Flex } from 'uikit';

import { mediaQueriesSize } from "uikit/theme/base";

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
`
const LeftCard = styled(Flex)`
  width: 200px;
`
export const CenterCard = styled(Flex)`
  flex: 1;
  ${mediaQueriesSize.marginLRmd}
`
const RightCard = styled(Flex)`
  width: 300px;
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

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <LeftCard>
          <LeftMenu />
        </LeftCard>
        <CenterCard>
          <Editor />
        </CenterCard>
        <RightCard>
          
        </RightCard>
      </Flex>
      {/* <button>Open Modal</button>
      <ModalWrapper>
        <CancelFollow />
      </ModalWrapper> */}
    </PageContainer>
  )
}

export default Home;