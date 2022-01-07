import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Avatar, Icon, Crumbs, List } from 'components';
import { Card, Box, Button, Flex, Text } from 'uikit';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';

const Msg = styled(Box)`
  color: #b5b5b5;
  font-size: 14px;
`;

const Content = styled(Card)`
  min-height: 500px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  max-width: calc(100vw - 8px);
  background-color: transparent;
`;

const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  float: left;
  margin-left: 22px;
`;

const ContentBox = styled(Box)`
  float: left;
  width: 100%;
  height: 60px;
  margin-bottom: 28px;
  button {
    background: ${({ theme }) => theme.colors.tertiary};
    float: right;
    margin-top: 15px;
  }
`;

const Shield = React.memo(() => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    total: 0,
    totalPage: 1,
    list: [],
  });

  const people = [
    {
      uname: '满克斯',
      dunpai: true,
      present: '@0x32...9239',
      isFollow: '取消屏蔽',
    },
    {
      uname: '乔布斯',
      dunpai: false,
      present: '巴里拉里',
      isFollow: '取消屏蔽',
    },
    {
      uname: '马克思',
      dunpai: true,
      present: '个人主页的介绍',
      isFollow: '取消屏蔽',
    },
  ];
  const [peopleState, setPeopleState] = useState(people);

  // 屏蔽列表
  const ShieldList = () => {
    // 屏蔽
    const shieldUser = async (pid: number) => {
      try {
        const res = await Api.MeApi.shieldUser(pid);
      } catch (error) {
        console.error(error);
      }
    };

    // 取消屏蔽
    const unShieldUser = async (pid: number) => {
      try {
        const res = await Api.MeApi.shieldUser(pid);
      } catch (error) {
        console.error(error);
      }
    };

    const setPeople = useCallback(
      index => {
        if (peopleState[index].isFollow) {
          peopleState.splice(index, 1);
        }
        const res = peopleState.map((item, subIndex) => {
          if (index === subIndex) {
            return {
              ...item,
            };
          }
          return {
            ...item,
          };
        });
        setPeopleState(res);
      },
      [peopleState],
    );

    return peopleState.map((item, index) => {
      return (
        <ContentBox>
          <Avatar scale='md' style={{ float: 'left' }} />
          <Column style={{ float: 'left' }}>
            <div>
              <span className='username'>{item.uname}</span>{' '}
              <Icon
                name={item.dunpai ? 'icon-dunpai' : null}
                margin='0 5px 0 5px'
                size={15}
                color='#699a4d'
              />{' '}
              <span className='msg'>@0x32...9239</span>
            </div>
            <Msg>{item.present}</Msg>
          </Column>
          <Button onClick={() => shieldUser(1)}>取消屏蔽</Button>
        </ContentBox>
      );
    });
  };

  return (
    <Box>
      <Crumbs title={t('meHome')}>
        <Flex>
          <Text fontWeight='bold' mr='10px' fontSize='14px'>
            {t('meHeaderShieldNumber')}
          </Text>
          <Text fontSize='14px'>
            {t('meHeaderPeople%value%', { value: 0 })}
          </Text>
        </Flex>
      </Crumbs>
      <Content isBoxShadow>{ShieldList()}</Content>
    </Box>
  );
});

export default Shield;
