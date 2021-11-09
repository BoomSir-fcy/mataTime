import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useTranslation } from 'contexts/Localization';
import { useThemeManager, useLanguange, useNotification } from 'store/app/hooks';
import { Flex, Box, Text, Toggle } from 'uikit';
import { Select } from 'components';
import { languages } from 'config/localization';
import { Api } from 'apis';

const NoticeSetBox = styled.div`
  height: 707px;
  background: #191f2d;
  margin-top: 16px;
  padding: 27px 29px;
  border-radius: 10px;
`;
const Title = styled.div`
  color: #fff;
  font-weight: bold;
  margin-bottom: 12px;
`;
const Msg = styled(Text)`
  color: #b5b5b5;
  font-size: 16px;
`;
const Rows = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;
const Column = styled(Flex)`
  justify-content: space-between;
  padding-bottom: 23px;
  margin-bottom: 22px;
  border-bottom: 1px solid #4d535f;
`;

const LikeSet: React.FC = () => {
  const [isDark, toggleThemeHandle] = useThemeManager();
  const [notification, setNotification] = useNotification();
  const [languange, setUseLanguage] = useLanguange();
  const [state, setState] = useImmer({
    isDeep: true,
    isRemind: true,
    isTranslation: false
  });
  const { t } = useTranslation();

  // 偏好设置
  const getLikeSet = async (params: Api.Set.likeSetParams) => {
    try {
      const res = await Api.SetApi.likeSet(params)
      console.log('偏好设置', res);
    } catch (error) {
      console.log(error);
    }
  }

  // 自动翻译
  const setTranslation = () => {
    setState(p => {
      p.isTranslation = !p.isTranslation;
    });
  };

  useEffect(() => {
    getLikeSet({ color_model: 1, msg_remind: 2, language: 3, translation: 2 })
  }, [])

  return (
    <NoticeSetBox>
      <Column>
        <Rows>
          <Title>{t('Dark')}</Title>
          <Msg>可切换为深色模式，夜间浏览更舒服</Msg>
        </Rows>
        <Toggle checked={isDark} onClick={toggleThemeHandle} />
      </Column>
      <Column>
        <Rows>
          <Title>消息红点提醒</Title>
          <Msg>有新消息时通过红点提醒</Msg>
        </Rows>
        <Toggle checked={notification} onClick={setNotification} />
      </Column>
      <Column alignItems="center">
        <Rows>
          <Title>默认显示语言</Title>
          <Msg>显示更符合你的语言</Msg>
        </Rows>
        <Select
          options={[
            {
              id: 1,
              label: 'English（EN）',
              value: languages['en-US']
            },
            {
              id: 2,
              label: '简体中文（CN）',
              value: languages['zh-CN']
            }
          ]}
          defaultId={languange.id}
          onChange={(val: any) => setUseLanguage(val)}
        />
      </Column>
      <Column>
        <Rows>
          <Title>信息自动翻译</Title>
          <Msg>浏览其他人的内容时，自动翻译成你选择的默认显示语言 </Msg>
        </Rows>
        <Toggle checked={state.isTranslation} onClick={setTranslation} />
      </Column>
    </NoticeSetBox>
  );
};

export default LikeSet;
