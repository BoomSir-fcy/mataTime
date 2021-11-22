import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useImmer } from 'use-immer';
import { Flex, Card, Text, Toggle } from 'uikit';
import { useStore, fetchThunk } from 'store';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';

const NoticeSetBox = styled(Card)`
  height: 700px;
  margin-top: 13px;
  padding: 27px 29px;
`;
const Title = styled.div`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
`;
const Rows = styled(Flex)`
  justify-content: space-between;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 23px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const NoticeSet = () => {
  const dispatch = useDispatch();
  const setting = useStore(p => p.loginReducer.userInfo);
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    msg_remind: setting.msg_remind === 1 ? true : false
  });

  const setNotice = async (params: Api.Set.likeSetParams) => {
    const keys: any = Object.keys(params);
    try {
      const res = await Api.SetApi.likeSet(params);
      if (Api.isSuccess(res)) {
        setState(p => {
          p[keys] = params[keys] === 1 ? true : false;
        });
        dispatch(fetchThunk.fetchUserInfoAsync());
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoticeSetBox>
      {/* <Column>
        <Rows>
          <Title>质量过滤</Title>
          <Toggle />
        </Rows>
        <Text color="textTips" mt="11px">
          选择过滤重复或自动发送的文章等内容，将只会展示您喜欢的文章
        </Text>
      </Column> */}
      <Column>
        <Rows>
          <Title>{t('setMsgNotification')}</Title>
          <Toggle
            checked={state.msg_remind}
            onChange={() => setNotice({ msg_remind: state.msg_remind ? 2 : 1 })}
          />
        </Rows>
        <Text color="textTips" mt="11px">
          {t('setMsgNotificationTips')}
        </Text>
      </Column>
      {/* <Column>
        <Rows>
          <Title>电子邮件通知</Title>
          <Toggle />
        </Rows>
        <Text color="textTips" mt="11px">
          开启或关闭来自邮件的消息通知，但在这之前，您需绑定您的邮箱账号
        </Text>
      </Column> */}
    </NoticeSetBox>
  );
};

export default NoticeSet;
