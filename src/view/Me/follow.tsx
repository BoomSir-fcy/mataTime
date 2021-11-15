import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Avatar, Icon } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { Api } from 'apis';
import { toast } from 'react-toastify';

import { CrumbsHead } from './components';

const Msg = styled(Box)`
  color: #b5b5b5;
  font-size: 14px;
`;
const Content = styled(Card)`
  width: 100%;
  height: 705px;
  padding: 29px 19px;
  background: #191f2d;
  margin-top: 13px;
  .msg {
    color: #b5b5b5;
    font-size: 14px;
  }
  .username {
    color: #fff;
  }
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  float: left;
  margin-left: 22px;
`;

const ContentBox = styled(Box)`
  float: left;
  width: 100%;
  height: 60px;
  margin-bottom: 28px;
  button {
    float: right;
    margin-top: 15px;
  }
`;

const Follow = React.memo(() => {
  const [followAry, setFollowAry] = useState([]);

  const FollowList = () => {
    const getFollowList = async () => {
      try {
        const res = await Api.MeApi.followList();
        setFollowAry(res.data.list || []);
      } catch (error) {
        console.log(error);
      }
    };

    // 关注用户
    const followUser = async (focus_uid: number) => {
      try {
        const res = await Api.MeApi.followUser(focus_uid);
        if (res.code === 1) {
          getFollowList();
          toast.success(res.data);
        } else {
          toast.warning(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 取消关注
    const unFollowUser = async (focus_uid: number) => {
      try {
        const res = await Api.MeApi.unFollowUser(focus_uid);
        console.log('取消关注', res);
        if (res.code === 1) {
          getFollowList();
          toast.success(res.data);
        } else {
          toast.warning(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getFollowList();
    }, []);

    return (
      <div>
        {followAry.map(item => {
          return (
            <ContentBox key={item.uid}>
              <Avatar src={item.nft_image} scale="md" style={{ float: 'left' }} />
              <Column>
                <div>
                  <span className="username">{item.nick_name}</span> <Icon name={item.dunpai ? 'icon-dunpai' : null} margin="0 5px 0 5px" size={15} color="#699a4d" />{' '}
                  <span className="msg"> @0x32...9239</span>
                </div>
                <Msg>{item.introduction}</Msg>
              </Column>
              {item.attention_status_name === '已关注' && (
                <Button onClick={() => unFollowUser(item.uid)} style={{ background: '#4168ED' }}>
                  {item.attention_status_name}
                </Button>
              )}
              {item.attention_status_name !== '已关注' && (
                <Button onClick={() => followUser(item.uid)} style={{ background: '#4168ED' }}>
                  {item.attention_status_name}
                </Button>
              )}
            </ContentBox>
          );
        })}
      </div>
    );
  };
  return (
    <Box>
      <CrumbsHead>
        <Flex>
          <Text fontWeight="bold" mr="10px" fontSize="14px">
            我的关注
          </Text>
          <Text fontSize="14px">{followAry.length}人</Text>
        </Flex>
      </CrumbsHead>
      <Content>{FollowList()}</Content>
    </Box>
  );
});

export default Follow;
