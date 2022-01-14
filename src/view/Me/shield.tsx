import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { Avatar, Icon, Crumbs, List } from 'components';
import { Card, Box, Button, Flex, Text } from 'uikit';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { fetchThunk, storeAction, useStore } from 'store';
import { Api } from 'apis';

import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

const Content = styled(Card)`
  min-height: 500px;
  max-width: calc(100vw - 8px);
  background-color: transparent;
`;

const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  min-height: 60px;
  width: calc(100% - 70px);
  margin-left: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 22px;
  }
  .address {
    margin-left: 0;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 12px;
    }
  }
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

const Shield = React.memo(() => {
  const dispatch = useDispatch();
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;
  const postParams = useStore(p => p.post);
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToast();
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    total: 0,
    totalPage: 1,
    list: [],
  });

  const { loading, page, total, totalPage, list } = state;

  const getList = async (offest?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.getShieldList(offest || page);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = offest
            ? [...(res.data.list || [])]
            : [...state.list, ...(res.data.list || [])];
          p.page = (offest || state.page) + 1;
          p.totalPage = Math.ceil(res.data.totalCount / res.data.page_size);
          p.total = res.data.totalCount;
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

  // 取消屏蔽
  const unShield = async uid => {
    try {
      const res = await Api.MeApi.unShieldUser(uid);
      if (Api.isSuccess(res)) {
        getList(1);
        toastSuccess(t('shieldUserUnSuccess'));
      } else {
        toastError(t(`http-error-${res.code}`));
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(
        fetchThunk.fetchPostAsync({
          attention: postParams.attention,
          page: 1,
          per_page: pageSize,
          user_tags1: postParams.user_tags1,
          user_tags2: postParams.user_tags2,
        }),
      );
    };
  }, []);

  return (
    <Box>
      <Crumbs title={t('meHome')}>
        <Flex>
          <Text fontWeight='bold' mr='10px' fontSize='14px'>
            {t('meHeaderShieldNumber')}
          </Text>
          <Text fontSize='14px'>
            {t('meHeaderPeople%value%', { value: total })}
          </Text>
        </Flex>
      </Crumbs>
      <Content isBoxShadow>
        <List
          marginTop={13}
          loading={loading}
          renderList={() => {
            if (loading || page > totalPage) return false;
            getList();
          }}
        >
          {list.map((item, index) => (
            <ContentBox key={index}>
              <Flex
                as={Link}
                to={`/me/profile/${item.user_shield_id}`}
                alignItems='center'
                style={{ width: 'calc(100% - 140px)' }}
              >
                <Avatar
                  uid={item.user_shield_id}
                  src={item.nft_image}
                  scale='md'
                />
                <Column>
                  <NameFlex>
                    <NameText ellipsis color='white_black' mr='13px'>
                      {item.nick_name}
                    </NameText>
                    <Text className='address' color='textTips'>
                      @{shortenAddress(item.address)}
                    </Text>
                  </NameFlex>
                  <WrapText small color='textTips' ellipsis>
                    {item.introduction}
                  </WrapText>
                </Column>
              </Flex>
              <Button onClick={() => unShield(item.user_shield_id)}>
                {t('unShiled')}
              </Button>
            </ContentBox>
          ))}
        </List>
      </Content>
    </Box>
  );
});

export default Shield;
