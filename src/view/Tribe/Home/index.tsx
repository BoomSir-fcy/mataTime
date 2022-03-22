import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Box, Text, Button, Flex, Card, Image, Spinner, Empty } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts';
import { Crumbs, List, LoadType } from 'components';
import Tabs from 'components/Tabs';
import useParsedQueryString from 'hooks/useParsedQueryString';
import TradeCard from '../components/TradeCard';
import { Sortable } from '../components/sort';
import { SearchTribe } from '../components/searchTribe';
import FlexAutoWarpper from 'components/Layout/FlexAutoWarpper';
// import { useTribeList } from 'store/tribe/hooks';
import { Api } from 'apis';
import { isApp } from 'utils/client';

const PaddingFlex = styled(Flex)`
  padding: 16px 10px;
`;

const LinkBox = styled(Box)`
  width: 48%;
  min-width: 184px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`;

const TAB_QUERY_KEY = 't';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const qsValue = useParsedQueryString();
  const { replace } = useHistory();
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const tabDatas = [
    {
      tLable: t('Joined'),
      value: 1,
    },
    {
      tLable: t('homeTabExplore'),
      value: 2,
    },
    {
      tLable: t('homeTabAll'),
      value: 3,
    },
  ];
  const [TribeList, setTribeList] = useState([]);
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [IsEnd, setIsEnd] = useState(false);
  const [avtiveTab, setAvtiveTab] = useState(
    Number(qsValue[TAB_QUERY_KEY]) || tabDatas[0].value,
  );
  const [state, setState] = useState({
    new: 1,
    hot: 0,
    keyword: '',
  });

  const getTribeList = useCallback(async () => {
    try {
      setLoading(true);
      console.log(state);
      const res = await Api.TribeApi.tribeList({
        page: page,
        page_size: page_size,
        tab: avtiveTab,
        ...state,
      });
      if (Api.isSuccess(res)) {
        const list = page === 1 ? res.data : TribeList.concat(res.data);
        setIsEnd(res.data.length < page_size);
        setPage(page + 1);
        setTribeList(list);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setTribeList([]);
    }
  }, [page, page_size, avtiveTab, TribeList, state]);

  useEffect(() => {
    getTribeList();
  }, [avtiveTab, state]);

  return (
    <Box>
      <Crumbs zIndex={1005} title={t('Tribe')} />
      <Tabs
        padding='8px'
        keys={'value'}
        active={avtiveTab}
        datas={tabDatas}
        onChange={tab => {
          setTribeList([]);
          setIsEnd(false);
          setPage(1);
          setAvtiveTab(Number(tab.value));
          replace(`${pathname}?${TAB_QUERY_KEY}=${tab.value}`);
        }}
      >
        <Flex flex='1' justifyContent='flex-end' alignItems='center'>
          {!isApp() && (
            <SearchTribe
              loading={loading}
              mr='10px'
              onEndCallback={evnet => {
                setState({
                  ...state,
                  keyword: evnet,
                });
                setPage(1);
              }}
            />
          )}

          <Link to={`${path}/create`}>
            <Button>{t('Create a tribe')}</Button>
          </Link>
        </Flex>
      </Tabs>
      <Sortable
        items={[
          {
            text: t('detailTime'),
            value: state.new,
            changeEvent: async () => {
              setState({
                ...state,
                new: state.new === 1 ? 2 : 1,
                hot: 0,
              });
              setPage(1);
            },
          },
          {
            text: t('detailHeat'),
            value: state.hot,
            changeEvent: async () => {
              setState({
                ...state,
                hot: state.hot === 1 ? 2 : 1,
                new: 0,
              });
              setPage(1);
            },
          },
        ]}
      />
      <PaddingFlex justifyContent='space-around' flexWrap='wrap'>
        <List
          loading={loading}
          renderList={type => {
            if (
              (type === LoadType.INIT && TribeList?.length !== 0) ||
              loading ||
              IsEnd
            ) {
              return;
            }
            getTribeList();
          }}
        >
          <Flex flexWrap='wrap' justifyContent='space-around'>
            <FlexAutoWarpper lineMax={2}>
              {TribeList.map((item, index) => (
                <LinkBox
                  key={`${item.id}-${index}`}
                  as={Link}
                  to={`${path}/detail?id=${item.id}`}
                >
                  {item.id && <TradeCard info={item} />}
                </LinkBox>
              ))}
            </FlexAutoWarpper>
            {!TribeList.length && !loading && <Empty />}
          </Flex>
        </List>
      </PaddingFlex>
    </Box>
  );
};

export default Home;
