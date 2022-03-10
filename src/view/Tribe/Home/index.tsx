import React, { useState } from 'react';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { Box, Text, Button, Flex, Card, Image, Spinner, Empty } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts';
import { Crumbs } from 'components';
import Tabs from 'components/Tabs';
import useParsedQueryString from 'hooks/useParsedQueryString';
import TradeCard from '../components/TradeCard';
import FlexAutoWarpper from 'components/Layout/FlexAutoWarpper';
import { storeAction, useStore } from 'store';
import { useTribeList } from 'store/tribe/hooks';
import { useDispatch } from 'react-redux';
import { fetchTribeListAsync } from 'store/tribe';
import useBlockNumber from 'libs/mini-swap/state/application/hooks';

// lable?: string
// tLable?: string
// value?: string | number
// width?: string
// [key: string]: any

const PaddingFlex = styled(Flex)`
  padding: 16px 10px;
`;

const LinkBox = styled(Box)`
  width: 48%;
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
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [avtiveTab, setAvtiveTab] = useState(
    Number(qsValue[TAB_QUERY_KEY]) || tabDatas[0].value,
  );
  useTribeList(page, page_size, avtiveTab);
  const TribeList = useStore(p => p.tribe.tribeList);

  return (
    <Box>
      <Crumbs zIndex={1005} title={t('Tribe')} />
      <Tabs
        padding='8px'
        keys={'value'}
        active={avtiveTab}
        datas={tabDatas}
        onChange={tab => {
          setAvtiveTab(Number(tab.value));
          replace(`${pathname}?${TAB_QUERY_KEY}=${tab.value}`);
          dispatch(fetchTribeListAsync({ page, page_size, tab: tab.value }));
        }}
      >
        <Flex flex='1' justifyContent='flex-end'>
          <Link to={`${path}/create`}>
            <Button>{t('Create a tribe')}</Button>
          </Link>
        </Flex>
      </Tabs>
      <PaddingFlex justifyContent='space-around' flexWrap='wrap'>
        <FlexAutoWarpper lineMax={2}>
          {TribeList?.length ? (
            <>
              {TribeList.map((item, index) => (
                <LinkBox
                  key={item.id}
                  as={Link}
                  to={`${path}/detail?id=${item.id}`}
                >
                  {item.id && <TradeCard info={item} />}
                </LinkBox>
              ))}
            </>
          ) : (
            <Empty />
          )}
        </FlexAutoWarpper>
      </PaddingFlex>
    </Box>
  );
};

export default Home;
