import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Flex, Button, Image, Box, Text, Progress } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { GetTaskName, receive } from '../../hooks/matter';
import debounce from 'lodash/debounce';
import { useToast } from 'hooks';
import { Group, Status, TaskInfo } from '../../type';
import Dots from 'components/Loader/Dots';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import useConnectWallet from 'hooks/useConnectWallet';
import useMenuNav from 'hooks/useMenuNav';
import { useHistory } from 'react-router-dom';

const Item = styled(Flex)`
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 0px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  transition: all 0.3s;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.backgroundThemeCard};
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
    max-width: 180px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 310px;
  }
  ${({ theme }) => theme.mediaQueriesSize.marginr}
`;
const ProgressBox = styled(Flex)`
  width: 244px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  transition: all 0.3s;
  @media (max-width: 415px) {
    max-width: 180px;
  }
`;
const MatterFlex = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 40px;
  }
`;
const ReceiveButton = styled(Button)<{ disabled: boolean; status: number }>`
  width: 120px;
  ${({ theme, disabled, status }) =>
    status <= 2
      ? `
    background: ${
      disabled ? theme.colors.primaryDark : theme.colors.primaryGreen
    };
  `
      : `border-color: ${theme.colors.primary} !important`}
`;

const TaskItem: React.FC<{
  info: TaskInfo;
  isDetail?: boolean;
  taskGroupId?: number;
}> = React.memo(({ info, isDetail, taskGroupId }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { isMobile } = useMenuNav();
  const { onConnectWallet } = useConnectWallet();
  const { toastSuccess, toastError } = useToast();
  const [pengdingType, setpengdingType] = useState(false);

  const configInfo = GetTaskName(info.task_name_id);

  // ??????
  const handleReceive = debounce(async () => {
    try {
      setpengdingType(true);
      const res = await receive(dispatch, info.task_id);
      if (res.code === 1) {
        toastSuccess(t('Received successfully'));
      } else {
        toastError(t('Received failed'));
      }
    } catch (error) {
      // toastError(t('Received failed'));
    } finally {
      setpengdingType(false);
    }
  }, 150);

  const getIcon = () => {
    if (info.status === Status.Received) return 'finished';
    if (info.status === Status.Completed) return 'completed';
    if (info.status === Status.UnCompleted) return 'uncompleted';
    return 'uncompleted';
  };

  const getBtnText = () => {
    if (info.status === Status.Completed)
      return pengdingType ? <Dots>{t('Receiving')}</Dots> : t('Receive');
    if (info.status === Status.Received) return t('Completed');
    if (info.status === Status.UnCompleted) return t('UnCompleted');
    return t('UnCompleted');
  };

  // ??????
  const toPage = useCallback(() => {
    if (taskGroupId === Group.ACTIVITY) history.push('/account');
    if (taskGroupId === Group.CREATE) history.push('/');
    if (taskGroupId === Group.INVITE) history.push('/task/invite?source=TASK');
  }, [taskGroupId, history]);
  return (
    <Item onClick={toPage}>
      <ItemFlex>
        <ContentFlex>
          <Image
            mr='20px'
            src={require(`assets/images/task/${getIcon()}.png`).default}
            width={22}
            height={22}
          />
          <Flex flexDirection='column'>
            {!isDetail && (
              <Text mb='8px' fontWeight={500}>
                {configInfo?.count
                  ? t(`${configInfo.name}`, { count: configInfo.count })
                  : t(`${configInfo.name}`)}
              </Text>
            )}
            <Text small color='textTips'>
              {configInfo?.count
                ? t(`${configInfo.describe}`, { count: configInfo.count })
                : t(`${configInfo.describe}`)}
            </Text>
          </Flex>
        </ContentFlex>
        <ProgressBox>
          {info?.Expand && (
            <>
              <Flex width='100%' mb='13px' justifyContent='space-between'>
                <Text small color='textTips'>
                  {t('progress')}
                </Text>
                <Text
                  small
                  color='textTips'
                >{`${info.Expand.now}/${info.Expand?.max}`}</Text>
              </Flex>
              <Box width='100%'>
                <Progress
                  color='progressBar'
                  scale='sm'
                  variant='round'
                  primaryStep={(info.Expand?.now / info.Expand?.max) * 100}
                />
              </Box>
            </>
          )}
        </ProgressBox>
      </ItemFlex>
      <ItemFlex>
        <MatterFlex>
          {!isDetail && <Text small>MATTER</Text>}
          <Text bold>+{info.matter}</Text>
        </MatterFlex>
        {account ? (
          <ReceiveButton
            margin='10px 0'
            status={info.status}
            disabled={
              pengdingType ||
              info.status === Status.UnCompleted ||
              info.status === Status.Received
            }
            onClick={e => {
              e.stopPropagation();
              handleReceive();
            }}
            scale={isMobile ? 'sm' : 'md'}
          >
            <span>{getBtnText()}</span>
          </ReceiveButton>
        ) : (
          <Button
            margin='10px 0'
            scale={isMobile ? 'sm' : 'md'}
            onClick={e => {
              e.stopPropagation();
              onConnectWallet();
            }}
          >
            {t('Connect Wallet')}
          </Button>
        )}
      </ItemFlex>
    </Item>
  );
});

export default TaskItem;
