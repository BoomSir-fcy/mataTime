import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Avatar, List } from 'components';
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
  min-height: 700px;
  padding: 29px 19px;
  margin-top: 13px;
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
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    total: 0,
    totalPage: 0,
    list: []
  });
  const { loading, page, totalPage, list } = state;

  const getFollowList = async () => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await Api.MeApi.followList(state.page);
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

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.unFollowUser(focus_uid);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = [];
          p.page = 1;
        });
        toast.success(res.data);
        getFollowList();
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowList();
  }, []);

  return (
    <Box>
      <CrumbsHead>
        <Flex>
          <Text fontWeight="bold" mr="10px" fontSize="14px">
            我的关注
          </Text>
          <Text fontSize="14px">{state.total}人</Text>
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
          {state.list.map(item => {
            return (
              <ContentBox key={item.uid}>
                <Avatar src={item.nft_image} scale="md" style={{ float: 'left' }} />
                <Column>
                  <Flex>
                    <Text color="white_black" mr="13px">
                      {item.nick_name}
                    </Text>
                    <Text color="textTips">@0x32...9239</Text>
                  </Flex>
                  <Msg>{item.introduction}</Msg>
                </Column>
                <Button onClick={() => unFollowUser(item.uid)} variant="tertiary">
                  取消关注
                </Button>
              </ContentBox>
            );
          })}
        </List>
      </Content>
    </Box>
  );
});

export default Follow;
