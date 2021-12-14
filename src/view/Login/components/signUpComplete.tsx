import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import { Follow } from 'components';
import { Box, Button, Flex, Text } from 'uikit';
import { useDispatch } from 'react-redux';
import { fetchThunk, storeAction } from 'store';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

const FlexButton = styled(Flex)`
  margin-top: 50px;
  justify-content: space-between;
  button {
    width: 205px;
  }
`;

const CompleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primaryDark};
`;

export const SignUpcomplete = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const redict = location?.state?.from?.pathname;
  const [state, setState] = useImmer({
    list: []
  });
  const { t } = useTranslation();

  const getManList = async () => {
    try {
      const res = await Api.UserApi.referrerMans({ num: 3 });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = res.data || [];
        });
      }
    } catch (error) {}
  };

  const complete = () => {
    dispatch(fetchThunk.fetchUserInfoAsync());
    dispatch(storeAction.changeReset());
    history.replace(`${redict || '/'}`);
  };

  React.useEffect(() => {
    getManList();
  }, []);

  return (
    <Box>
      <Text
        fontSize="34px"
        marginBottom="26px"
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginFollow')}
      </Text>
      <Box>
        {state.list.map((row, index: number) => (
          <Follow key={index} rows={row} getManList={getManList} />
        ))}
      </Box>
      <FlexButton>
        <Button scale="ld" onClick={debounce(() => getManList(), 1000)}>
          {t('loginSignUpChangeBatch')}
        </Button>
        <CompleteButton variant="secondary" scale="ld" onClick={complete}>
          {t('loginSignUpComplete')}
        </CompleteButton>
      </FlexButton>
    </Box>
  );
});
