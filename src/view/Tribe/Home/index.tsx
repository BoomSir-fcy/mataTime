import React, { useState } from 'react';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { Box, Text, Button, Flex, Card, Image } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts';
import Crumbs from 'components/Layout/crumbs';
import Tabs from 'components/Tabs';
import useParsedQueryString from 'hooks/useParsedQueryString';
import TradeCard from '../components/TradeCard';
import FlexAutoWarpper from 'components/Layout/FlexAutoWarpper';

// lable?: string
// tLable?: string
// value?: string | number
// width?: string
// [key: string]: any

const PaddingFlex = styled(Flex)`
  padding: 16px 10px;
`;

const tabDatas = [
  {
    tLable: 'Joined',
    value: 'joined',
  },
  {
    tLable: 'Explore',
    value: 'explore',
  },
  {
    tLable: 'All',
    value: 'all',
  },
];

const TAB_QUERY_KEY = 't';

const Home = () => {
  const { t } = useTranslation();
  const qsValue = useParsedQueryString();
  const { replace } = useHistory();
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const [avtiveTab, setAvtiveTab] = useState(
    qsValue[TAB_QUERY_KEY] || tabDatas[0].value,
  );

  return (
    <Box>
      <Crumbs title={t('Tribe')} />
      <Tabs
        padding='8px'
        keys={'value'}
        active={avtiveTab}
        datas={tabDatas}
        onChange={tab => {
          console.log(tab);
          setAvtiveTab(tab.value);
          replace(`${pathname}?${TAB_QUERY_KEY}=${tab.value}`);
        }}
      >
        <Flex flex='1' justifyContent='flex-end'>
          <Link to={`${path}/create`}>
            <Button>创建部落</Button>
          </Link>
        </Flex>
      </Tabs>
      <PaddingFlex justifyContent='space-around' flexWrap='wrap'>
        <FlexAutoWarpper lineMax={2}>
          <Link to={`${path}/detail`}>
            <TradeCard />
          </Link>
          <Link to={`${path}/detail`}>
            <TradeCard />
          </Link>
          <Link to={`${path}/detail`}>
            <TradeCard />
          </Link>
        </FlexAutoWarpper>
      </PaddingFlex>
    </Box>
  );
};

export default Home;