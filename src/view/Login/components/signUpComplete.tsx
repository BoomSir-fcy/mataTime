import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import { Follow, Select } from 'components';
import { languagesOptions } from 'config/localization';
import { Box, Button, Flex, Text, Toggle } from 'uikit';
import { useDispatch } from 'react-redux';
import { fetchThunk, storeAction, useStore } from 'store';
import RefreshIcon from 'components/Loader/RefreshIcon';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

const FlexButton = styled(Flex)`
  margin-top: 50px;
  justify-content: center;
  /* justify-content: space-between; */
  button {
    width: 205px;
  }
`;

const CompleteButton = styled(Button)`
  /* color: ${({ theme }) => theme.colors.white}; */
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

const Column = styled(Flex)`
  justify-content: space-between;
  padding: 0;
  margin-top: 28px;
`;

const Rows = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
`;

export const SignUpcomplete = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const redict = (location?.state as any)?.from?.pathname;
  const { t, currentLanguage, setLanguage } = useTranslation();
  const followRefs = React.useRef(null);

  const complete = () => {
    dispatch(fetchThunk.fetchUserInfoAsync());
    dispatch(storeAction.changeReset());
    history.replace(`${redict || '/'}`);
  };

  const userInfo = useStore(p => p.loginReducer.userInfo);
  // const [languange, setUseLanguage] = useLanguange();
  // const { setLanguage, currentLanguage } = useTranslation();

  const [state, setState] = useImmer({
    isDeep: true,
    isRemind: true,
    translation: false,
  });

  const updateAllowStatus = async (filed: string) => {
    try {
      const res = await Api.UserApi.updateUserInfo({
        ...userInfo,
        [filed]: state[filed] ? 2 : 1,
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p[filed] = state[filed] ? false : true;
        });
        dispatch(
          storeAction.changeUpdateProfile({
            ...res.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // 1允许，2不允许
    setState(p => {
      p.translation = userInfo.translation === 1 ? true : false;
    });
  }, [userInfo?.translation, setState]);

  return (
    <Box>
      <Flex mb='26px' alignItems='center' justifyContent='space-between'>
        <Text fontSize='34px' bold style={{ textTransform: 'capitalize' }}>
          {t('recommendPeopleTitle')}
        </Text>
        <RefreshIcon
          margin='0'
          onClick={() => followRefs?.current?.reload()}
          color='white_black'
        />
      </Flex>
      <Box>
        <Follow ref={followRefs} />
      </Box>
      <Box>
        <Column alignItems='center'>
          <Rows>
            <Title>{t('settingLanguagetitle')}</Title>
            <Text color='textTips' mt='11px'>
              {t('settingLanguageText')}
            </Text>
          </Rows>
          <Select
            options={languagesOptions}
            defaultId={currentLanguage.code}
            idKey='code'
            onChange={(val: any) => setLanguage(val.value)}
          />
        </Column>
        <Column>
          <Rows>
            <Title>{t('Automatic translation of content')}</Title>
            <Text color='textTips' mt='11px'>
              {t(
                "Other users' content will be automatically translated into the default display language of your choice",
              )}
            </Text>
          </Rows>
          <Toggle
            checked={state.translation}
            onClick={() => updateAllowStatus('translation')}
          />
        </Column>
      </Box>
      <FlexButton paddingBottom='20px'>
        {/* <Button
          mr='20px'
          scale='ld'
          onClick={debounce(() => followRefs?.current?.reload(), 1000)}
        >
          {t('loginSignUpChangeBatch')}
        </Button> */}
        <CompleteButton variant='secondary' scale='ld' onClick={complete}>
          {t('loginSignUpComplete')}
        </CompleteButton>
      </FlexButton>
    </Box>
  );
});
