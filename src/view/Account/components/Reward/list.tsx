import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Loading } from 'components';
import { Flex, Box } from 'uikit';
import { useStore } from 'store';
import { WalletHead } from '../../head';
import { Tabs } from './tabs';
import { TableList } from './table';

import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const Title = styled(Flex)`
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white_black};
  ${mediaQueriesSize.paddingxs}
`;

const RewardList = () => {
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer({
    loading: true,
    income: [],
    list: [],
    page: 1,
    total: 0,
    pageCount: 0
  });
  const { t } = useTranslation();
  const { loading, list, page } = state;

  const getAllIncome = async () => {
    try {
      const res = await Api.AccountApi.getIncome();
      if (Api.isSuccess(res)) {
        setState(p => {
          p.income = res.data;
        });
      }
    } catch (error) {}
  };

  const init = async () => {
    try {
      const res = await Api.AccountApi.getRewardList({
        page,
        target: userInfo.uid
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
          p.list = res.data.list || [];
          p.total = res.data.total_num;
          p.pageCount = res.data.total_page;
        });
      }
    } catch (error) {
      setState(p => {
        p.loading = false;
      });
    }
  };

  React.useEffect(() => {
    getAllIncome();
  }, []);

  React.useEffect(() => {
    if (userInfo.uid) {
      init();
    }
  }, [state.page, userInfo]);

  return (
    <React.Fragment>
      <Loading visible={loading} />
      <WalletHead title={t('rewardAutherWallet')} />
      <Tabs data={state.income} />
      <Box>
        <Title>{t('rewardAutherList')}</Title>
        <TableList
          data={list}
          pageCount={state.pageCount}
          onchangePage={event =>
            setState(p => {
              p.loading = true;
              p.page = event;
            })
          }
        />
      </Box>
    </React.Fragment>
  );
};

export default RewardList;
