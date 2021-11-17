import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { Avatar, List } from 'components';
import { Box, Button, Flex, Card, Text } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { Api } from 'apis';

import { CrumbsHead } from './components';

const Content = styled(Card)`
  width: 100%;
  height: 705px;
  padding: 29px 19px;
  margin-top: 10px;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  float: left;
  margin-left: 22px;
`;
const ContentBox = styled(Flex)`
  width: 100%;
  height: 60px;
  margin-bottom: 28px;
  justify-content: space-between;
  align-content: center;
`;

const Fans = React.memo(() => {
  const [state, setState] = useImmer({
    hoverIndex: 0,
    hoverStatus: false,
    loading: false,
    page: 1,
    total: 0,
    totalPage: 0,
    list: []
  });
  const { loading, page, total, totalPage, list } = state;

  const getFansList = async (offest?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.fansList(offest || page);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = offest
            ? [...(res.data.list || [])]
            : [...state.list, ...(res.data.list || [])];
          p.page = offest || state.page + 1;
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
      if (Api.isSuccess(res)) {
        getFansList(1);
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
      if (Api.isSuccess(res)) {
        getFansList(1);
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

  console.log(state.page);
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
                <Flex>
                  <Avatar
                    src={item.nft_image}
                    scale="md"
                    style={{ float: 'left' }}
                  />
                  <Column>
                    <Flex>
                      <Text color="white_black" mr="13px">
                        {item.nick_name}
                      </Text>
                      <Text color="textTips">
                        @{shortenAddress(item.address)}
                      </Text>
                    </Flex>
                    <Text color="textTips">{item.introduction}</Text>
                  </Column>
                </Flex>
                {item.attention_status === 0 ? (
                  <React.Fragment>
                    {state.hoverStatus && state.hoverIndex === index ? (
                      <Button
                        onClick={() => followUser(item.uid)}
                        onMouseLeave={() =>
                          setState(p => {
                            p.hoverIndex = 0;
                            p.hoverStatus = false;
                          })
                        }
                      >
                        +关注
                      </Button>
                    ) : (
                      <Button
                        onClick={() => followUser(item.uid)}
                        onMouseEnter={() =>
                          setState(p => {
                            p.hoverIndex = index;
                            p.hoverStatus = true;
                          })
                        }
                        variant="secondary"
                      >
                        未关注
                      </Button>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {state.hoverStatus && state.hoverIndex === index ? (
                      <Button
                        onClick={() => unFollowUser(item.uid)}
                        variant="tertiary"
                        onMouseLeave={() =>
                          setState(p => {
                            p.hoverIndex = 0;
                            p.hoverStatus = false;
                          })
                        }
                      >
                        取消关注
                      </Button>
                    ) : (
                      <Button
                        onClick={() => unFollowUser(item.uid)}
                        onMouseEnter={() =>
                          setState(p => {
                            p.hoverIndex = index;
                            p.hoverStatus = true;
                          })
                        }
                      >
                        相互关注
                      </Button>
                    )}
                  </React.Fragment>
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
