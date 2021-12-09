import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import history from 'routerHistory';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { TokenImage, Avatar } from 'components';
import { Flex, Box, Text, Button, InputPanel } from 'uikit';

import { OnApprove, RewardAuthorList } from './hook';
import { useTranslation } from 'contexts/Localization';

import Dots from 'components/Loader/Dots';
import QuestionHelper from 'components/QuestionHelper';

const Rows = styled(Flex)`
  align-items: center;
`;
const InputPanelStyled = styled(InputPanel)`
  width: 33%;
  padding: 6px 9px;
  height: 50px;
  margin-bottom: 12px;
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
  cursor: pointer;
`;
const Content = styled(Flex)`
  position: relative;
  width: 100%;
  text-align: center;
  justify-content: center;
  padding-top: 20px;
`;
const Tips = styled(Box)`
  position: absolute;
  right: 0;
`;

// 查看自己发布帖子打赏
export const RewardIncome: React.FC<{
  data: reward[];
  postInfo: any;
}> = ({ data, postInfo }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Content>
        {data.length ? (
          <Flex alignItems="center">
            <Flex ml="1em">
              {postInfo?.users?.map(item => (
                <Box
                  key={item.uid}
                  as={Link}
                  to={`/me/profile/${item.uid}`}
                  width="25px"
                  style={{ marginLeft: '-1em' }}
                >
                  <Avatar
                    src={item.nft_image}
                    scale="md"
                    style={{ width: '25px', height: '25px' }}
                  />
                </Box>
              ))}
            </Flex>
            <Text ml="11px" fontSize="14px">
              {t('rewardAutherAlreadyText1', {
                value: postInfo.total_user || 0
              })}
            </Text>
          </Flex>
        ) : (
          <Flex>
            <Text textAlign="center">{t('rewardAutherAlreadyText3')}</Text>
          </Flex>
        )}
        <Tips>
          <QuestionHelper
            mt="5px"
            ml="5px"
            text={
              <>
                <Text fontSize="14px">{t('rewardAutherTipsText1')}</Text>
                <Text fontSize="14px" color="textTips">
                  {t('rewardAutherTipsText2')}
                </Text>
              </>
            }
          />
        </Tips>
      </Content>
      {data.length > 0 && (
        <Flex justifyContent="center" mt="20px">
          <Button onClick={() => history.push('/account/reward')}>
            {t('rewardAutherViewEarnings')}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export const CoinItem: React.FC<{
  token: string[];
}> = React.memo(({ token }) => {
  return (
    <Rows>
      <TokenImage tokenAddress={token[1]} width={20} height={20} />
      <Text ml="5px">{token[2]}</Text>
    </Rows>
  );
});

export const Reward: React.FC<{
  current: any;
  price: string;
  isOnApprove: boolean;
  onCallBack: (event: number) => void;
  onApprove: () => void;
}> = React.memo(({ current, price, isOnApprove, onCallBack, onApprove }) => {
  const { handleApprove } = OnApprove(current[0]);
  const { toastError } = useToast();
  const { t } = useTranslation();

  const [state, setState] = useImmer({
    loading: false
  });

  const ChangeApprove = React.useCallback(async () => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await handleApprove();
      if (Boolean(res)) {
        onApprove();
      } else {
        toastError(t('setNftAuthorizationFail'));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  }, [handleApprove]);

  return (
    <React.Fragment>
      {isOnApprove ? (
        <Flex
          width="100%"
          minHeight="120px"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={() => ChangeApprove()}>
            {state.loading ? (
              <Dots>
                {t('Account Approve')} {current[2]}
              </Dots>
            ) : (
              `${t('Account Approve')} ${current[2]}`
            )}
          </Button>
        </Flex>
      ) : (
        <Flex flexWrap="wrap" justifyContent="space-between">
          {RewardAuthorList.map(item => (
            <InputPanelStyled
              key={item}
              onClick={evnet => {
                evnet.stopPropagation();
                onCallBack(item);
              }}
            >
              <Flex>
                <Box width="20px">
                  <TokenImage
                    width={20}
                    height={20}
                    tokenAddress={current[1]}
                  />
                </Box>
                <Flex
                  ml="3px"
                  flexDirection="column"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Text bold ml="5px" style={{ lineHeight: 'normal' }} ellipsis>
                    {new BigNumber(item).div(price).toFixed(18)}
                  </Text>
                  <Text fontSize="14px" style={{ lineHeight: 'normal' }}>
                    ${item}
                  </Text>
                </Flex>
              </Flex>
            </InputPanelStyled>
          ))}
        </Flex>
      )}
    </React.Fragment>
  );
});
