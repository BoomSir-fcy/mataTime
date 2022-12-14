import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Crumbs, Icon } from 'components';
import styled from 'styled-components';
import { Box, Text, Flex, Button, Empty, Spinner } from 'uikit';
import { fetchTaskListAsync } from 'store/task/reducer';
import { useDispatch } from 'react-redux';
import {
  getInvitedNftTokenAddress,
  GetTaskTag,
  useInviteCount,
  useNftBaseView,
} from 'view/Task/hooks/matter';
import { Variant, Group, InvitableNftInfo } from 'view/Task/type';
import StyledTag from '../TaskContent/StyledTag';
import TaskItem from '../TaskContent/TaskItem';
import { useTranslation } from 'contexts/Localization';
import { useTask } from 'store/task/hooks';
import { partition } from 'lodash';
import InviteModal from './InviteModal';
import { useWeb3React } from '@web3-react/core';
import { useToast } from 'hooks';
import { copyContent } from 'utils';
import { shortenAddress } from 'utils/contract';
import Header from '../Header';
import { useFetchNftList } from 'view/Login/hook';
import { Step } from './step';
import { StakeNFT } from '../NftList';
import useMenuNav from 'hooks/useMenuNav';
import { Link } from 'react-router-dom';
import { useStore } from 'store';

export const ContentBox = styled(Flex)`
  padding: 10px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 10px 14px;
  }
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
    flex: 1;
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
  useFetchNftList();
  const { tokenAddress, defaultCodeList, maxGendCodeCount } = useNftBaseView();
  const { inviteInfo } = useInviteCount();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const { taskList } = useTask();
  const { data } = taskList;
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMenuNav();
  const [inviteList, setInviteList] = useState([]);
  const [invitableNftList, setInvitableNftList] = useState<InvitableNftInfo[]>(
    [],
  );

  const nftLoading = useStore(p => p.loginReducer.nftLoading);
  const NftList = useStore(p => p.loginReducer.nftList);
  const userInfo: any = useStore(p => p.loginReducer.userInfo);

  useEffect(() => {
    // ??????????????????nft???????????????????????????nft??????????????????
    const getNftList = async () => {
      const nftList = NftList.filter(
        v => tokenAddress.toString().indexOf(v.properties.token) !== -1,
      ).map(item => {
        return {
          name: 'DSGAV',
          image: item.image,
          token: item.properties.token,
          token_id: item.properties.token_id,
        };
      });

      if (tokenAddress.toString().indexOf(userInfo.nft_address) !== -1) {
        nftList.unshift({
          name: 'DSGAV',
          image: userInfo.nft_image,
          token: userInfo.nft_address,
          token_id: userInfo.nft_id,
        });
      }
      setInvitableNftList(nftList);
    };
    if (tokenAddress && tokenAddress?.length) {
      getNftList();
    }
  }, [NftList, userInfo, tokenAddress]);

  useEffect(() => {
    dispatch(fetchTaskListAsync({ isSignIn: false }));
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      const inviteList = partition(data, ['task_group', Group.INVITE])[0];
      setInviteList(inviteList);
    }
  }, [data]);

  // ????????????
  const Url = `${window.location.origin}/login`;
  const copyUrl = `${Url}?InviteAddress=${account}`;

  const tag: Variant = useMemo(() => GetTaskTag(Group.INVITE), []);

  return (
    <>
      <InviteHeader tag={tag} isMobile={isMobile} />
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
        {/* ???????????? */}
        <ContentBox flexDirection='column'>
          <Flex justifyContent='space-between'>
            <Text mb='25px' fontSize='18px' bold>
              {t('Invitation Overview')}
            </Text>
            <Button as={Link} to='/task/friendsList'>
              {t('InvitationRecord')}
            </Button>
            {/* <Button as={Link} to='/account?readType=3'>
              {t('InvitationRecord')}
            </Button> */}
          </Flex>
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
                  <Flex>
                    <Text mr='20px' small>
                      {t('My Address')}
                    </Text>
                    <Text mr='20px' color='textTips' small>
                      {account && shortenAddress(account, isMobile ? 5 : 10)}
                    </Text>
                  </Flex>
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
                  <Flex>
                    <Text mr='20px' small>
                      {t('Invitation Link')}
                    </Text>
                    <Text mr='20px' color='textTips' small ellipsis>
                      {Url}
                    </Text>
                  </Flex>
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
                <Flex justifyContent='space-between' alignItems='flex-end'>
                  <Flex flexDirection='column'>
                    <Text color='textPrimary' fontSize='20px' bold>
                      {`${inviteInfo.proportion}%`}
                    </Text>
                    <Text small>{t('My commission(TIME)')}</Text>
                  </Flex>
                  <Button
                    onClick={() => {
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
        {/* ???????????? */}
        {!nftLoading ? (
          invitableNftList.length ? (
            <>
              <ContentBox>
                <Text fontSize='18px' bold>
                  {t('Special Invitation')}
                </Text>
              </ContentBox>
              <ContentBox>
                <Flex flexDirection='column'>
                  <Text>{t('SpecialInvitationDescribe')}</Text>
                  <Step />
                </Flex>
              </ContentBox>
              <StakeNFT
                nftList={invitableNftList}
                defaultCodeList={defaultCodeList}
                maxGendCodeCount={maxGendCodeCount}
              />
            </>
          ) : null
        ) : (
          <Flex justifyContent='center' alignItems='center'>
            <Spinner />
          </Flex>
        )}

        {/* ?????????????????? */}
        <InviteModal
          type={1}
          t={t}
          visible={visible}
          setVisible={() => setVisible(false)}
          onCopyLink={() => {
            copyContent(copyUrl);
            toastSuccess(t('CopyLinkSuccess'));
            setVisible(false);
          }}
        />
      </Box>
    </>
  );
};

const InviteHeader: React.FC<{ tag: Variant; isMobile: boolean }> = React.memo(
  ({ tag, isMobile }) => {
    const source = window.location.search?.split('=')[1];
    const { t } = useTranslation();

    const HeaderBox = useMemo(() => {
      return (
        <Flex width='100%' justifyContent='space-between' alignItems='center'>
          <StyledTag
            ml={source === 'TASK' && !isMobile ? '10px' : ''}
            variant={tag}
          >
            <Text color='primaryBright' fontSize='18px' bold>
              {t(`Task ${tag}`).toUpperCase()}
            </Text>
          </StyledTag>
          <Button
            style={{ maxWidth: isMobile ? '150px' : '' }}
            startIcon={
              <img
                src={require('assets/images/task/rankingIcon.png').default}
                alt=''
              />
            }
            as={Link}
            to={'/task/rankingList'}
          >
            {t('Invitation Leaderboard')}
          </Button>
        </Flex>
      );
    }, [source, isMobile, t, tag]);
    return (
      <>
        {source === 'TASK' ? (
          isMobile ? (
            <>
              <Crumbs back justifyContent='start' />
              <ContentBox>{HeaderBox}</ContentBox>
            </>
          ) : (
            <Crumbs back justifyContent='start'>
              {HeaderBox}
            </Crumbs>
          )
        ) : (
          <>
            <Header />
            <ContentBox>{HeaderBox}</ContentBox>
          </>
        )}
      </>
    );
  },
);
export default Invite;
