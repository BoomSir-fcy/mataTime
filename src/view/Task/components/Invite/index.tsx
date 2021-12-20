import React, { useEffect, useState } from 'react';
import { Crumbs, Icon, ModalWrapper } from 'components';
import styled from 'styled-components';
import { Box, Text, Flex, Button } from 'uikit';
import { fetchTaskListAsync } from 'store/task/reducer';
import { useDispatch } from 'react-redux'
import { GetTaskTag } from 'view/Task/hooks/matter';
import { Variant, Group } from 'view/Task/type';
import StyledTag from '../TaskContent/StyledTag';
import TaskItem from '../TaskContent/TaskItem';
import { useTranslation } from 'contexts/Localization'
import { useTask } from 'store/task/hooks';
import { partition } from 'lodash';
import SpecialInvite from './SpecialInvite';
import FriendsList from './FriendsList';
import InviteModal from './InviteModal';


const ContentBox = styled(Flex)`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`

const CrumbsStyled = styled(Crumbs)`
  justify-content: flex-start;
`
const CardBox = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  border-radius: 10px;
  margin-bottom: 10px;
  &.left-card{
    max-width: 540px;
    width: 100%;
    ${({ theme }) => theme.mediaQueriesSize.padding};
  }
  .text-title{
    min-width: 145px;
  }
  .top-card{
    ${({ theme }) => theme.mediaQueriesSize.padding};
  }
  .bottom-card{
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    ${({ theme }) => theme.mediaQueriesSize.padding};
  }
`
const ItemFlex = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;
  ${({ theme }) => theme.mediaQueries.lg}{
    flex-direction: row;
  }
`
const ContentFlex = styled(Flex)`
  width: 244px;
  align-items: center;
  margin: 10px 0;
  transition: all 0.3s;
  @media (max-width: 415px){
    max-width: 180px;
  }
  ${({ theme }) => theme.mediaQueries.lg}{
    width: 310px;
  }
  ${({ theme }) => theme.mediaQueriesSize.marginr}
  
  
`
const ProgressBox = styled(Flex)`
  width: 244px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  transition: all 0.3s;
  @media (max-width: 415px){
    max-width: 180px;
  }
`
const MatterFlex = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 10px 0;
  ${({ theme }) => theme.mediaQueries.lg}{
    margin-right: 40px;
  }
`
const BtnFlex = styled(Flex)`
  min-width: 125px;
  margin: 10px 0;
  justify-content: center;
`
const Invite: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { taskList } = useTask();
  const { data } = taskList;
  const [inviteList, setInviteList] = useState([]);

  useEffect(() => {
    console.log('邀请详情');
    if (data.length) {
      const inviteList = partition(data, ['task_group', Group.INVITE])[0];
      setInviteList(inviteList);
    } else {
      dispatch(fetchTaskListAsync({ isSignIn: false }));
    }

  }, [data])

  const tag: Variant = GetTaskTag(Group.INVITE);
  return (
    <>
      <CrumbsStyled back>
        <StyledTag ml="20px" variant={tag}><Text fontSize="18px" bold>{tag.toUpperCase()}</Text></StyledTag>
      </CrumbsStyled>
      <Box>
        <ContentBox justifyContent="space-between">
          <ItemFlex>
            <ContentFlex><Text>{t('Invite friends')}</Text></ContentFlex>
            <ProgressBox><Text>{t('Progress')}</Text></ProgressBox>
          </ItemFlex>
          <ItemFlex>
            <MatterFlex><Text>{t('MATTER')}</Text></MatterFlex>
            <BtnFlex><Text>{t('Status')}</Text></BtnFlex>
          </ItemFlex>
        </ContentBox>
        {inviteList?.map(item => <TaskItem isDetail key={item.task_id} info={item} />)}
      </Box>
      <ContentBox flexDirection="column">
        <Text mb="10px">邀请奖励规则：</Text>
        <Text>1.A邀请了B，可以获得B消耗time的5%的奖励；若A质押的TIME总量大于10亿枚，则可以获得B消耗TIME的10%的奖励；</Text>
        <Text>2.若没有邀请，5%or10%TIME（根据质押量不同）则进入DAO（即原来预留的激励池）。</Text>
      </ContentBox>
      <ContentBox flexDirection="column" >
        <Text mb="25px" fontSize="18px" bold>Invitation Overview</Text>
        <Flex flexWrap="wrap" justifyContent="space-between">
          <CardBox className="left-card">
            <Flex alignContent="center">
              <Text className="text-title" color="textTips" small>Number of invitees</Text><Text fontSize="20px" bold>1</Text>
            </Flex>
            <Flex alignContent="center">
              <Text className="text-title" color="textTips" small>My Rewards(MATTER) </Text><Text fontSize="20px" bold>5</Text>
            </Flex>
            <Flex alignContent="center">
              <Text className="text-title" color="textTips" small>My Rebate(TIME) </Text><Text color="textPrimary" fontSize="20px" bold>26559556.36</Text>
            </Flex>
          </CardBox>
          <CardBox>
            <Box className="top-card">
              <Flex alignItems="center">
                <Text mr="20px" small>My Address </Text>
                <Text mr="20px" color="textTips" small>0x4eD1891d7z……eF10de464F</Text>
                <Icon name={'icon-fuzhi'} color="textPrimary" size={16} fontWeight="bold" />
              </Flex>
              <Flex alignItems="center">
                <Text mr="20px" small>Invitation Link </Text>
                <Text mr="20px" color="textTips" small>www.metatime.io/task/invitation</Text>
                <Icon name={'icon-fuzhi'} color="textPrimary" size={16} fontWeight="bold" />
              </Flex>
            </Box>
            <Box className="bottom-card">
              <Flex justifyContent="space-between" alignItems="end">
                <Flex flexDirection="column">
                  <Text color="textPrimary" fontSize="20px" bold>5%</Text>
                  <Text small>My commission(TIME)</Text>
                </Flex>
                <Button>INVITE NOW</Button>
              </Flex>
            </Box>
          </CardBox>
        </Flex>
      </ContentBox>
      <ContentBox>
        <Text fontSize="18px" bold>Special Invitation</Text>
      </ContentBox>
      <ContentBox>
        <SpecialInvite />
      </ContentBox>
      <ContentBox>
        <Text fontSize="18px" bold>Invited Friends List</Text>
      </ContentBox>
      <ContentBox>
        <FriendsList />
      </ContentBox>

      {/* 复制链接弹窗 */}
      <InviteModal title="Special Invitation" />
    </>
  );
}

export default Invite;

