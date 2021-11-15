import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Avatar, Icon, List } from 'components';
import { Box, Button, Flex, Card, Text } from 'uikit';
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
  margin-top: 10px;
  overflow: hidden;
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

const Fans = React.memo(() => {
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    total: 0,
    totalPage: 0,
    list: []
  });
  const { loading, page, total, totalPage, list } = state;

  const getFansList = async () => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.fansList(page);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = [...state.list, ...(res.data.list || [])];
          p.page = state.page + 1;
          p.total = res.data.total_num;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (res.code === 1) {
        getFansList();
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
      if (res.code === 1) {
        getFansList();
        toast.success(res.data);
      } else {
        toast.warning(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getFansList();
  }, []);

  return (
    <Box>
      <CrumbsHead>
        <Flex>
          <Text fontWeight="bold" mr="10px" fontSize="14px">
            我的粉丝
          </Text>
          <Text fontSize="14px">{total}人</Text>
        </Flex>
      </CrumbsHead>
      <Content>
        <List
          marginTop={13}
          loading={loading}
          renderList={() => {
            if (loading || page > totalPage) return false;
            setState(p => {
              p.loading = true;
            });
            Api.MeApi.followList(page).then(res => {
              setState(p => {
                p.loading = false;
              });
              if (Api.isSuccess(res)) {
                setState(p => {
                  p.page = page + 1;
                  p.list = [...list, ...res.data.list];
                });
              }
            });
          }}
        >
          {list.map((item, index) => {
            return (
              <ContentBox key={index}>
                <Avatar src={item.nft_image} scale="md" style={{ float: 'left' }} />
                <Column>
                  <div>
                    <Text color="white_black" mr="13px">
                      {item.nick_name}
                    </Text>
                    <Text color="textTips">{item.present}</Text>
                  </div>
                  <Msg>{item.introduction}</Msg>
                </Column>
                {item.attention_status_name === '相互关注' && (
                  <Button onClick={() => unFollowUser(item.uid)} style={{ background: '#4168ED' }}>
                    {item.attention_status_name}
                  </Button>
                )}
                {item.attention_status_name !== '相互关注' && (
                  <Button onClick={() => followUser(item.uid)} style={{ background: '#4168ED' }}>
                    {item.attention_status_name}
                  </Button>
                )}
              </ContentBox>
            );
          })}
        </List>
      </Content>
    </Box>
  );
});

export default Fans;
