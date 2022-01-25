import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useImmer } from 'use-immer';
import { Flex, Card, Text, Toggle } from 'uikit';
import { useToast } from 'hooks';
import { useStore, fetchThunk } from 'store';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';

const NoticeSetBox = styled(Card)`
  /* height: 700px; */
  padding: 27px 0;
  background-color: transparent;
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
  padding: 0 30px 24px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const NoticeSet = () => {
  const dispatch = useDispatch();
  const setting = useStore(p => p.loginReducer.userInfo);
  const { t } = useTranslation();
  const { toastSuccess, toastError, toastInfo } = useToast();
  const [state, setState] = useImmer({
    msg_remind: setting.msg_remind === 1 ? true : false,
  });

  const setNotice = async (params: Api.Set.likeSetParams) => {
    const keys: any = Object.keys(params);
    try {
      Notification.requestPermission(async (status: NotificationPermission) => {
        // var n = new Notification("title", { body: "notification body" }); // 显示通知
        if (status === 'granted') {
          const res = await Api.SetApi.likeSet(params);
          if (Api.isSuccess(res)) {
            setState(p => {
              p[keys] = params[keys] === 1 ? true : false;
            });
            dispatch(fetchThunk.fetchUserInfoAsync());
            toastSuccess(t('editSuccess'));
          }
          return;
        }
        if (status === 'default') {
          toastInfo(t('Please open browser notification'));
          return;
        }
        if (status === 'denied') {
          toastError(t('Please open browser notification'));
        }
      });
    } catch (error) {
      toastError(t('editFial'));
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (state.msg_remind) {
        Notification.requestPermission(status => {
          setState(p => {
            p.msg_remind = status === 'granted' ? true : false;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [state.msg_remind, setState]);

  return (
    <NoticeSetBox isBoxShadow>
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
        <Text color='textTips' mt='11px'>
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
