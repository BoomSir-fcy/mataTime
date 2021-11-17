import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useTranslation } from 'contexts/Localization';
import { useThemeManager, useLanguange, useNotification } from 'store/app/hooks';
import { Flex, Box, Text, Card, Toggle } from 'uikit';
import { Select } from 'components';
import { languages } from 'config/localization';

const NoticeSetBox = styled(Card)`
  height: 700px;
  margin-top: 13px;
  padding: 27px 29px;
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
  padding-bottom: 23px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary};
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

  // 自动翻译
  const setTranslation = () => {
    setState(p => {
      p.isTranslation = !p.isTranslation;
    });
  };

  return (
    <NoticeSetBox>
      <Column>
        <Rows>
          <Title>{t('Dark')}</Title>
          <Text color="textTips" mt="11px">
            可切换为深色模式，夜间浏览更舒服
          </Text>
        </Rows>
        <Toggle checked={isDark} onClick={toggleThemeHandle} />
      </Column>
      <Column>
        <Rows>
          <Title>消息红点提醒</Title>
          <Text color="textTips" mt="11px">
            有新消息时通过红点提醒
          </Text>
        </Rows>
        <Toggle checked={notification} onClick={setNotification} />
      </Column>
      <Column alignItems="center">
        <Rows>
          <Title>默认显示语言</Title>
          <Text color="textTips" mt="11px">
            显示更符合你的语言
          </Text>
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
      {/* <Column>
        <Rows>
          <Title>信息自动翻译</Title>
          <Text color="textTips" mt="11px">
            浏览其他人的内容时，自动翻译成你选择的默认显示语言{' '}
          </Text>
        </Rows>
        <Toggle checked={state.isTranslation} onClick={setTranslation} />
      </Column> */}
    </NoticeSetBox>
  );
};

export default LikeSet;
