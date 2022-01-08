import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Avatar, List, CancelAttentionModal } from 'components';
import { Box, Button, Flex, Card, Text } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';
import { Crumbs } from 'components';

import useParsedQueryString from 'hooks/useParsedQueryString';

import { CrumbsHead } from './components';

const Content = styled(Card)`
  min-height: 500px;
  /* ${({ theme }) => theme.mediaQueriesSize.padding} */
  max-width: calc(100vw - 8px);
  background-color: transparent;
  padding-bottom: 50px;
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
  min-width: 150px;
  max-width: 150px;
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
const Fans = React.memo(() => {
  const { t } = useTranslation();
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
  const { loading, page, total, totalPage, list } = state;
  const parsedQs = useParsedQueryString();

  const getFansList = async (offest?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.fansList(offest || page, null, parsedQs.uid);
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
        await getFansList(1);
        setState(p => {
          p.hoverIndex = 0;
          p.hoverStatus = false;
        });
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
        getFansList(1);
        setState(p => {
          p.cancelFollow = false;
        });
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
            {!parsedQs.uid ? t('meHeaderFans') : t('meHeaderHerFans')}
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
            getFansList();
          }}
        >
          {list.map((item, index) => {
            return (
              <ContentBox key={index}>
                <Flex
                  as={Link}
                  to={`/me/profile/${item.uid}`}
                  alignItems='center'
                  style={{ width: 'calc(100% - 140px)' }}
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
                            onClick={() => followUser(item.uid)}
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
                            {t('meMutualAttention')}
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
        confirm={() => unFollowUser(state.cancelParams.uid)}
        onClose={() =>
          setState(p => {
            p.cancelFollow = false;
          })
        }
      />
    </Box>
  );
});

export default Fans;
