import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Crumbs, Icon } from 'components';
import styled from 'styled-components';
import { Box, Text, Flex, Button, Empty } from 'uikit';
import { fetchTaskListAsync } from 'store/task/reducer';
import { useDispatch } from 'react-redux';
import {
  GetTaskTag,
  useFetchInviteFriendsList,
  useInviteCount,
} from 'view/Task/hooks/matter';
import { Variant, Group } from 'view/Task/type';
import StyledTag from '../TaskContent/StyledTag';
import TaskItem from '../TaskContent/TaskItem';
import { useTranslation } from 'contexts/Localization';
import { useTask } from 'store/task/hooks';
import { partition } from 'lodash';
import SpecialInvite from './SpecialInvite';
import FriendsList from './FriendsList';
import InviteModal from './InviteModal';
import { useWeb3React } from '@web3-react/core';
import { useToast } from 'hooks';
import { copyContent } from 'utils';
import { shortenAddress } from 'utils/contract';
import Header from '../Header';
import useMenuNav from 'hooks/useMenuNav';

const ContentBox = styled(Flex)`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const CardBox = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  border-radius: 10px;
  margin-bottom: 10px;
  &.left-card {
    max-width: 520px;
    width: 100%;
    ${({ theme }) => theme.mediaQueriesSize.padding};
  }
  &.right-card {
    max-width: 410px;
  }
  .text-title {
    min-width: 145px;
  }
  .top-card {
    ${({ theme }) => theme.mediaQueriesSize.padding};
    i:hover {
      cursor: pointer;
    }
  }
  .bottom-card {
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    ${({ theme }) => theme.mediaQueriesSize.padding};
  }
`;
const ItemFlex = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;
const ContentFlex = styled(Flex)`
  width: 244px;
  align-items: center;
  margin: 10px 0;
  transition: all 0.3s;
  @media (max-width: 415px) {
    max-width: 150px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 310px;
  }
  ${({ theme }) => theme.mediaQueriesSize.marginr}
`;
const ProgressBox = styled(Flex)`
  width: 244px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
  transition: all 0.3s;
  @media (max-width: 415px) {
    max-width: 150px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
  }
`;
const MatterFlex = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 10px 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 40px;
  }
`;
const BtnFlex = styled(Flex)`
  min-width: 125px;
  margin: 10px 0;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: center;
  }
`;
const Invite: React.FC = () => {
  const { inviteInfo } = useInviteCount();
  const { list, pageNum, setPageNum, loading, total } =
    useFetchInviteFriendsList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const { taskList } = useTask();
  const { data } = taskList;
  const [inviteList, setInviteList] = useState([]);
  const [inviteType, setInviteType] = useState(1);
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMenuNav();

  useEffect(() => {
    if (data.length) {
      const inviteList = partition(data, ['task_group', Group.INVITE])[0];
      setInviteList(inviteList);
    } else {
      dispatch(fetchTaskListAsync({ isSignIn: false }));
    }
  }, [data.length, dispatch]);

  const handlePageClick = useCallback(
    event => {
      setPageNum(event.selected + 1);
    },
    [setPageNum],
  );

  // 复制链接
  const Url = `${window.location.origin}/login`;
  const copyUrl = `${Url}?InviteAddress=${account}`;
  const onCopyLink = useCallback(() => {
    // 普通邀请
    if (inviteType === 1) {
      copyContent(copyUrl);
      toastSuccess(t('CopyLinkSuccess'));
      setVisible(false);
    }
  }, [inviteType, copyUrl]);

  const tag: Variant = useMemo(() => GetTaskTag(Group.INVITE), []);

  return (
    <>
      <InviteHeader tag={tag} />
      <Box>
        <Box>
          <ContentBox justifyContent='space-between'>
            <ItemFlex>
              <ContentFlex>
                <Text>{t('Invite friends')}</Text>
              </ContentFlex>
              <ProgressBox>
                <Text>{t('Progress')}</Text>
              </ProgressBox>
            </ItemFlex>
            <ItemFlex>
              <MatterFlex>
                <Text>{t('MATTER')}</Text>
              </MatterFlex>
              <BtnFlex>
                <Text>{t('Status')}</Text>
              </BtnFlex>
            </ItemFlex>
          </ContentBox>
          {inviteList.length ? (
            inviteList?.map(item => (
              <TaskItem isDetail key={item.task_id} info={item} />
            ))
          ) : (
            <ContentBox>
              <Empty />
            </ContentBox>
          )}
        </Box>
        <ContentBox flexDirection='column'>
          <Text mb='10px'>{t('Invitation reward rules')}</Text>
          <Text>{t('InviteRuleContent1')}</Text>
          <Text>{t('InviteRuleContent2')}</Text>
        </ContentBox>
        {/* 普通邀请 */}
        <ContentBox flexDirection='column'>
          <Text mb='25px' fontSize='18px' bold>
            {t('Invitation Overview')}
          </Text>
          <Flex flexWrap='wrap' justifyContent='space-between'>
            <CardBox className='left-card'>
              <Flex mb='10px' alignItems='center'>
                <Text className='text-title' color='textTips' small>
                  {t('Number of invitees')}
                </Text>
                <Text fontSize='20px' bold>
                  {inviteInfo.invite_num}
                </Text>
              </Flex>
              <Flex mb='10px' alignItems='center'>
                <Text className='text-title' color='textTips' small>
                  {t('My Rewards(MATTER)')}
                </Text>
                <Text fontSize='20px' bold>
                  {inviteInfo.total_meta}
                </Text>
              </Flex>
              <Flex mb='10px' alignItems='center'>
                <Text className='text-title' color='textTips' small>
                  {t('My Rebate(TIME)')}
                </Text>
                <Text fontSize='20px' bold>
                  {inviteInfo.total_rebate}
                </Text>
              </Flex>
            </CardBox>
            <CardBox className='right-card'>
              <Box className='top-card'>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text mr='20px' small>
                    {t('My Address')}
                  </Text>
                  <Text mr='20px' color='textTips' small>
                    {account && shortenAddress(account, isMobile ? 5 : 10)}
                  </Text>
                  <Icon
                    name={'icon-fuzhi'}
                    color='textPrimary'
                    size={16}
                    fontWeight='bold'
                    onClick={() => {
                      copyContent(account);
                      toastSuccess(t('CopyAddressSuccess'));
                    }}
                  />
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text mr='20px' small>
                    {t('Invitation Link')}
                  </Text>
                  <Text mr='20px' color='textTips' small ellipsis>
                    {Url}
                  </Text>
                  <Icon
                    name={'icon-fuzhi'}
                    color='textPrimary'
                    size={16}
                    fontWeight='bold'
                    onClick={() => {
                      copyContent(copyUrl);
                      toastSuccess(t('CopyLinkSuccess'));
                    }}
                  />
                </Flex>
              </Box>
              <Box className='bottom-card'>
                <Flex justifyContent='space-between' alignItems='end'>
                  <Flex flexDirection='column'>
                    <Text color='textPrimary' fontSize='20px' bold>
                      {`${inviteInfo.proportion}%`}
                    </Text>
                    <Text small>{t('My commission(TIME)')}</Text>
                  </Flex>
                  <Button
                    onClick={() => {
                      setInviteType(1);
                      setVisible(true);
                    }}
                  >
                    {t('INVITE NOW')}
                  </Button>
                </Flex>
              </Box>
            </CardBox>
          </Flex>
        </ContentBox>
        {/* 特殊邀请 */}
        {/* <ContentBox>
          <Text fontSize="18px" bold>Special Invitation</Text>
        </ContentBox>
        <ContentBox>
          <SpecialInvite />
        </ContentBox> */}
        <ContentBox>
          <Text fontSize='18px' bold>
            {t('Invited Friends List')}
          </Text>
        </ContentBox>
        <ContentBox>
          <FriendsList
            loading={loading}
            list={list}
            total={total}
            pageNum={pageNum}
            handlePageClick={handlePageClick}
          />
        </ContentBox>

        {/* 复制链接弹窗 */}
        <InviteModal
          type={inviteType}
          t={t}
          visible={visible}
          setVisible={() => setVisible(false)}
          onCopyLink={onCopyLink}
        />
      </Box>
    </>
  );
};

const InviteHeader: React.FC<{ tag: Variant }> = React.memo(({ tag }) => {
  const source = window.location.search?.split('=')[1];
  const { t } = useTranslation();

  return (
    <>
      {source === 'TASK' ? (
        <Crumbs back>
          <Flex width='100%'>
            <StyledTag ml='20px' variant={tag}>
              <Text fontSize='18px' bold>
                {/* {tag.toUpperCase()} */}
                {t(`Task ${tag}`).toUpperCase()}
              </Text>
            </StyledTag>
          </Flex>
        </Crumbs>
      ) : (
        <>
          <Header />
          <ContentBox>
            <StyledTag ml='20px' variant={tag}>
              <Text fontSize='18px' bold>
                {t(`Task ${tag}`).toUpperCase()}
              </Text>
            </StyledTag>
          </ContentBox>
        </>
      )}
    </>
  );
});
export default Invite;
