import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box, Button } from 'uikit';
import { Avatar, Icon } from 'components';
import { Api } from 'apis';
const RecommendPeopleBox = styled.div`
  margin-top: 15px;
  padding: 20px 18px;
  width: 298px;
  background: #191f2d;
  border-radius: 10px;
`;
const TitleText = styled.span`
  font-weight: bold;
  color: #ffffff;
  font-size: 18px;
`;
const MoreBtn = styled.span`
  font-size: 14px;
  color: #7393ff;
  cursor: pointer;
`;
const UserTitle = styled.div`
  margin: 0 12px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const UserDesc = styled.div`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 400;
  color: #b5b5b5;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const FollowBtn = styled(Button)`
  font-size: 14px;
  font-weight: bold;
`;
const UserInfo = styled(Box)``;
type Iprops = {
  // dataList:any[]
};
export const RecommendPeople: React.FC<Iprops> = props => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getManList();
  }, []);
  const getManList = () => {
    Api.UserApi.referrerMans({ num: 3 }).then(res => {
      if (Api.isSuccess(res)) {
        setList(res.data || []);
      }
    });
  };
  return (
    <RecommendPeopleBox>
      <Flex justifyContent="space-between">
        <TitleText>可能感兴趣的人</TitleText>
        <MoreBtn onClick={getManList}>更多</MoreBtn>
      </Flex>
      {list.map((item, index) => (
        <Flex key={item.uid} alignItems="center" justifyContent="space-between" style={{ marginTop: '17px' }}>
          <Flex>
            <Avatar src={item.nft_image} style={{ width: '50px', height: '50px' }} scale="md" />
            <UserInfo style={{ flex: 1 }}>
              <Flex>
                <UserTitle title={item.nick_name}>{item.nick_name}</UserTitle>
                <Icon name="icon-dunpai" margin="5px 0px 0px -10px" size={15} color="#699a4d"></Icon>
              </Flex>
              <UserDesc title={item.introduction}>{item.introduction}</UserDesc>
            </UserInfo>
          </Flex>
          <FollowBtn>+关注</FollowBtn>
        </Flex>
      ))}
    </RecommendPeopleBox>
  );
};
