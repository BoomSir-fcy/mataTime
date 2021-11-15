import React from 'react';
import styled from 'styled-components';
import { Flex, Card, Text, Button, Toggle } from 'uikit';
import { useImmer } from 'use-immer';

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
const Msg = styled(Text)`
  color: #b5b5b5;
  font-size: 16px;
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
  const [state, setState] = useImmer({
    isFilted: false,
    isNews: false,
    isEmail: false
  });

  // 质量过滤
  const filter = () => {
    setState(p => {
      p.isFilted = !p.isFilted;
    });
  };

  // 消息通知
  const newsNotice = () => {
    if (state.isNews === false) {
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
    setState(p => {
      p.isNews = !p.isNews;
    });
  };

  // 邮箱通知
  const emailNotice = () => {
    setState(p => {
      p.isEmail = !p.isEmail;
    });
  };

  return (
    <NoticeSetBox>
      <Column>
        <Rows>
          <Title>质量过滤</Title>
          <Toggle checked={state.isFilted} onClick={filter} />
        </Rows>
        <Text color="textTips" mt="11px">
          选择过滤重复或自动发送的文章等内容，将只会展示您喜欢的文章
        </Text>
      </Column>
      <Column>
        <Rows>
          <Title>消息通知</Title>
          <Toggle checked={state.isNews} onClick={newsNotice} />
        </Rows>
        <Text color="textTips" mt="11px">
          开启或关闭来自浏览器的授权消息通知，开启后将会通过浏览器的消息提醒您
        </Text>
      </Column>
      <Column>
        <Rows>
          <Title>电子邮件通知</Title>
          <Toggle checked={state.isEmail} onClick={emailNotice} />
        </Rows>
        <Text color="textTips" mt="11px">
          开启或关闭来自邮件的消息通知，但在这之前，您需绑定您的邮箱账号
        </Text>
      </Column>
    </NoticeSetBox>
  );
};

export default NoticeSet;
