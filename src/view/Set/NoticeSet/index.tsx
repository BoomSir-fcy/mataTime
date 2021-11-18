import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useImmer } from 'use-immer';
import { Flex, Card, Text, Toggle } from 'uikit';
import { useStore, fetchThunk } from 'store';
import { Api } from 'apis';
import { toast } from 'react-toastify';

const NoticeSetBox = styled(Card)`
  height: 707px;
  margin-top: 16px;
  padding: 27px 29px;
  border-radius: 10px;
`;
const Title = styled.div`
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary};
`;

const NoticeSet = () => {
  const dispatch = useDispatch();
  const setting = useStore(p => p.loginReducer.userInfo);
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

  // 消息通知
  const newsNotice = () => {
    if (state.msg_remind === false) {
      // 用于检查浏览器是否支持这个API。
      if (window.Notification) {
        // 支持
      } else {
        // 不支持
      }

      // 检查当前浏览器是否支持Notification对象，并且当前用户准许使用该对象，然后调用Notification.requestPermission方法，向用户弹出一条通知
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function (status) {
          var n = new Notification('通知标题', { body: '这里是通知内容！' });
        });
      }

      // Notification.requestPermission方法用于让用户做出选择，到底是否接收通知。它的参数是一个回调函数，该函数可以接收用户授权状态作为参数。
      Notification.requestPermission(function (status) {
        if (status === 'granted') {
          var n = new Notification('Hi!');
          console.log('n', n);
        } else {
          alert('Hi!');
        }
      });
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
          <Title>消息通知</Title>
          <Toggle
            checked={state.msg_remind}
            onChange={() => setNotice({ msg_remind: state.msg_remind ? 2 : 1 })}
          />
        </Rows>
        <Text color="textTips" mt="11px">
          开启或关闭来自浏览器的授权消息通知，开启后将会通过浏览器的消息提醒您
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
