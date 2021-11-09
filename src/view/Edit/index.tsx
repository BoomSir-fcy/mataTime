import React from 'react';
import styled from 'styled-components';
import { Header } from './center';
import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';
import { Avatar } from 'components';
import BgUpload from '../../components/BgUpload';
import { Route } from 'react-router-dom';

const FollowContainer = styled.div`
  padding: 36px;
`;

const FollowTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const FollowBody = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin: 25px 0 38px;
  line-height: 1.5;
  a {
    color: rgba(65, 104, 237, 1);
  }
`;

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
  );
};
const Edit: React.FC = () => {
  return (
    <div>
      <Route path="/" component={Header}></Route>
      <Route path="/" component={BgUpload}></Route>
      {/* <Route path="/" component={NftAvatar}></Route> */}
      <Route path="/" component={FormInput}></Route>
    </div>
  );
};

export default Edit;
