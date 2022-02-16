import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { languagesOptions } from 'config/localization';
import { useTranslation } from 'contexts/Localization';
import {
  useThemeManager,
  // useLanguange,
  useNotification,
} from 'store/app/hooks';
import { Flex, Box, Text, Card, Toggle } from 'uikit';
import { Select } from 'components';
import { Api } from 'apis';
import { Dispatch, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { fetchAllPostTranslateAsync } from 'store/mapModule/reducer';

const NoticeSetBox = styled(Card)`
  /* height: 700px; */
  padding: 27px 0;
  background-color: transparent;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
`;

const Rows = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;
const Column = styled(Flex)`
  justify-content: space-between;
  padding: 0 30px 24px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const LikeSet: React.FC = () => {
  const [isDark, toggleThemeHandle] = useThemeManager();
  const [notification, setNotification] = useNotification();
  const dispatch = useDispatch();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  // const [languange, setUseLanguage] = useLanguange();
  // const { setLanguage, currentLanguage } = useTranslation();

  const [state, setState] = useImmer({
    isDeep: true,
    isRemind: true,
    translation: false,
  });
  const { t, currentLanguage, setLanguage } = useTranslation();

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
        if (!state[filed]) {
          dispatch(fetchAllPostTranslateAsync());
        }
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
    <NoticeSetBox isBoxShadow>
      <Column>
        <Rows>
          <Title>{t('Dark')}</Title>
          <Text color='textTips' mt='11px'>
            {t('settingDarkModText')}
          </Text>
        </Rows>
        <Toggle checked={isDark} onChange={toggleThemeHandle} />
      </Column>
      <Column>
        <Rows>
          <Title>{t('settingMsgtitle')}</Title>
          <Text color='textTips' mt='11px'>
            {t('settingMsgText')}
          </Text>
        </Rows>
        <Toggle checked={notification} onChange={setNotification} />
      </Column>
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
    </NoticeSetBox>
  );
};

export default LikeSet;
