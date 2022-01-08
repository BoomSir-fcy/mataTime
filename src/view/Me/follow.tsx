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
import { Crumbs } from 'components';

import useParsedQueryString from 'hooks/useParsedQueryString';

const Content = styled(Card)`
  min-height: 500px;
  /* ${({ theme }) => theme.mediaQueriesSize.padding} */
  background-color: transparent;
  max-width: calc(100vw - 8px);
`;

const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  min-height: 60px;
  margin-left: 22px;
  width: calc(100% - 70px);
`;

const ContentBox = styled(Flex)`
  padding: 14px 8px;
  min-height: 60px;
  /* margin-bottom: 28px; */
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverList};
  }
`;

const WrapText = styled(Text)`
  word-wrap: break-word;
`;
const MinWidthButton = styled(Button)`
  width: max-content;
  min-width: 110px;
  max-width: 110px;
`;
const NameText = styled(Text)`
  max-width: 100%;
  width: max-content;
`;
const NameFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;
const Follow = React.memo(() => {
  const { t } = useTranslation();
  const parsedQs = useParsedQueryString();
  const [state, setState] = useImmer({
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
    hoverIndex: 0,
    hoverStatus: false,
    loading: false,
    page: 1,
    total: 0,
    totalPage: 1,
    list: [],
  });
  const { loading, page, totalPage, list } = state;

  const getFollowList = async (offest?: number) => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await Api.MeApi.followList(
        offest || page,
        null,
        parsedQs.uid,
      );
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = offest
            ? [...(res.data.list || [])]
            : [...state.list, ...(res.data.list || [])];
          p.page = (offest || state.page) + 1;
          p.totalPage = res.data.total_page;
          p.total = res.data.total_num;
          p.cancelFollow = false;
        });
      }
    } catch (error) {
      console.error(error);
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
        // toast.success(t('commonMsgFollowSuccess') || res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.unFollowUser(focus_uid);
      if (Api.isSuccess(res)) {
        getFollowList(1);
        // toast.success(t('commonMsgFollowError') || res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Crumbs title={t('meHome')}>
        <Flex>
          <Text
            fontWeight='bold'
            mr='10px'
            fontSize='14px'
            style={{ textTransform: 'capitalize' }}
          >
            {!parsedQs.uid ? t('meHeaderFollow') : t('meHeaderHerFollow')}
          </Text>
          <Text fontSize='14px'>
            {t('meHeaderPeople%value%', { value: state.total })}
          </Text>
        </Flex>
      </Crumbs>
      <Content isBoxShadow>
        <List
          marginTop={13}
          loading={loading}
          renderList={() => {
            if (loading || page > totalPage) return false;
            getFollowList();
          }}
        >
          {state.list.map((item, index) => {
            return (
              <ContentBox key={item.uid}>
                <Flex
                  as={Link}
                  to={`/me/profile/${item.uid}`}
                  alignItems='center'
                  style={{ width: 'calc(100% - 120px)' }}
                >
                  <Avatar uid={item.uid} src={item.nft_image} scale='md' />
                  <Column>
                    <NameFlex>
                      <NameText ellipsis color='white_black' mr='13px'>
                        {item.nick_name}
                      </NameText>
                      <Text color='textTips'>
                        @{shortenAddress(item.address)}
                      </Text>
                    </NameFlex>
                    <WrapText small color='textTips' ellipsis>
                      {item.introduction}
                    </WrapText>
                  </Column>
                </Flex>
                {!parsedQs.uid && (
                  <React.Fragment>
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
                            variant='secondary'
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
                            variant='tertiary'
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
                            onClick={() =>
                              setState(p => {
                                p.cancelFollow = true;
                                p.cancelParams = item;
                              })
                            }
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
