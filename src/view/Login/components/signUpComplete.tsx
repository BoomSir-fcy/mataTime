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
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SignUpcomplete = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const redict = (location?.state as any)?.from?.pathname;
  const { t } = useTranslation();
  const followRefs = React.useRef(null);

  const complete = () => {
    dispatch(fetchThunk.fetchUserInfoAsync());
    dispatch(storeAction.changeReset());
    history.replace(`${redict || '/'}`);
  };

  return (
    <Box>
      <Text
        fontSize='34px'
        marginBottom='26px'
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginFollow')}
      </Text>
      <Box>
        <Follow ref={followRefs} />
      </Box>
      <FlexButton paddingBottom='20px'>
        <Button
          mr='20px'
          scale='ld'
          onClick={debounce(() => followRefs?.current?.reload(), 1000)}
        >
          {t('loginSignUpChangeBatch')}
        </Button>
        <CompleteButton variant='secondary' scale='ld' onClick={complete}>
          {t('loginSignUpComplete')}
        </CompleteButton>
      </FlexButton>
    </Box>
  );
});
