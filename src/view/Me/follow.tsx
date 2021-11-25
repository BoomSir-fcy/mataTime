import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { Avatar, List, CancelAttentionModal } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { Api } from 'apis';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

import { CrumbsHead } from './components';

const Content = styled(Card)`
  min-height: 700px;
  padding: 29px 19px;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  min-height: 60px;
  margin-left: 22px;
  width: calc(100% - 108px);
`;
const ContentBox = styled(Flex)`
  min-height: 60px;
  margin-bottom: 28px;
  justify-content: space-between;
  align-content: center;
`;
const WrapText = styled(Text)`
  word-wrap: break-word;
`;
const MinWidthButton = styled(Button)`
  width: max-content;
`;

const Follow = React.memo(() => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: ''
    },
    hoverIndex: 0,
    hoverStatus: false,
    loading: false,
    page: 1,
    total: 0,
    totalPage: 0,
    list: []
  });
  const { loading, page, totalPage, list } = state;

  const getFollowList = async (offest?: number) => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await Api.MeApi.followList(offest || page);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = offest
            ? [...(res.data.list || [])]
            : [...state.list, ...(res.data.list || [])];
          p.page = offest || state.page + 1;
          p.total = res.data.total_num;
          p.cancelFollow = false;
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
        getFollowList(1);
        toast.success(t('commonMsgFollowSuccess') || res.data);
      } else {
        toast.error(t('commonMsgUnFollowError') || res.data);
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
        getFollowList(1);
        toast.success(t('commonMsgFollowError') || res.data);
      } else {
        toast.error(t('commonMsgUnFollowError') || res.data);
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
          <Text
            fontWeight="bold"
            mr="10px"
            fontSize="14px"
            style={{ textTransform: 'capitalize' }}
          >
            {t('meHeaderFollow')}
          </Text>
          <Text fontSize="14px">
            {t('meHeaderPeople%value%', { value: state.total })}
          </Text>
        </Flex>
      </CrumbsHead>
      <Content isBoxShadow>
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
                  p.list = [...list, ...(res.data.list || [])];
                });
              }
            });
          }}
        >
          {state.list.map((item, index) => {
            return (
              <ContentBox key={item.uid}>
                <Flex
                  as={Link}
                  to={`/me/profile/${item.uid}`}
                  style={{ width: 'calc(100% - 140px)' }}
                >
                  <Avatar src={item.nft_image} scale="md" />
                  <Column>
                    <Flex>
                      <Text color="white_black" mr="13px">
                        {item.nick_name}
                      </Text>
                      <Text color="textTips">
                        @{shortenAddress(item.address)}
                      </Text>
                    </Flex>
                    <WrapText color="textTips">{item.introduction}</WrapText>
                  </Column>
                </Flex>
                {item.attention_status === 0 ? (
                  <React.Fragment>
                    {state.hoverStatus && state.hoverIndex === index ? (
                      <MinWidthButton
                        onClick={() => followUser(item.uid)}
                        onMouseLeave={() =>
                          setState(p => {
                            p.hoverIndex = 0;
                            p.hoverStatus = false;
                          })
                        }
                      >
                        {t('meFocusOn')}
                      </MinWidthButton>
                    ) : (
                      <MinWidthButton
                        onClick={debounce(() => followUser(item.uid), 1000)}
                        onMouseEnter={() =>
                          setState(p => {
                            p.hoverIndex = index;
                            p.hoverStatus = true;
                          })
                        }
                        variant="secondary"
                      >
                        {t('meNotFollowed')}
                      </MinWidthButton>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {state.hoverStatus && state.hoverIndex === index ? (
                      <MinWidthButton
                        onClick={() =>
                          setState(p => {
                            p.cancelFollow = true;
                            p.cancelParams = item;
                          })
                        }
                        variant="tertiary"
                        onMouseLeave={() =>
                          setState(p => {
                            p.hoverIndex = 0;
                            p.hoverStatus = false;
                          })
                        }
                      >
                        {t('meUnsubscribe')}
                      </MinWidthButton>
                    ) : (
                      <MinWidthButton
                        onClick={() => unFollowUser(item.uid)}
                        onMouseEnter={() =>
                          setState(p => {
                            p.hoverIndex = index;
                            p.hoverStatus = true;
                          })
                        }
                      >
                        {t('meFollowed')}
                      </MinWidthButton>
                    )}
                  </React.Fragment>
                )}
              </ContentBox>
            );
          })}
        </List>
      </Content>
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={state.cancelFollow}
        params={state.cancelParams}
        confirm={debounce(() => unFollowUser(state.cancelParams.uid), 1000)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
    </Box>
  );
});

export default Follow;
