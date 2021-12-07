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
  cursor: pointer;
  padding: 6px 9px;
  min-width: 100px;
  height: 50px;
  margin-bottom: 12px;
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
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
              共{postInfo.total_user || 0}人已打赏这篇帖子
            </Text>
          </Flex>
        ) : (
          <Flex>
            <Text textAlign="center">还没有人打赏您的帖子</Text>
          </Flex>
        )}
        <Tips>
          <QuestionHelper
            mt="5px"
            ml="5px"
            text={
              <>
                <Text fontSize="14px">
                  链上打赏并支持作者的创作，您的支持将会鼓励作者更大的创作热情
                </Text>
                <Text fontSize="14px" color="textTips">
                  *平台将收取0.3%的交易手续费
                </Text>
              </>
            }
          />
        </Tips>
      </Content>
      {data.length > 0 && (
        <Flex justifyContent="center" mt="20px">
          <Button onClick={() => history.push('/account/reward')}>
            查看收益
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
  const { toastSuccess, toastError } = useToast();
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
              <Dots>授权 {current[2]}</Dots>
            ) : (
              ` 授权 ${current[2]}`
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
                <Flex ml="3px" flexDirection="column" style={{ flex: 1 }}>
                  <Text bold ml="5px" style={{ lineHeight: 'normal' }}>
                    {item}
                  </Text>
                  <Text fontSize="14px" style={{ lineHeight: 'normal' }}>
                    ${new BigNumber(price).times(item).toString()}
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
