import React, { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import ReactLoading from 'react-loading';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import styled from 'styled-components';
import { DropDown } from 'components';
import { Flex, Box, Text, Card, Button, InputPanel, Image } from 'uikit';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { AvatarCard } from '../Avatar/AvatarCard';
import { Avatar } from '../Avatar';
import { CoinItem, Reward } from './components';

import { getDecimalAmount } from 'utils/formatBalance';

import { getBnbAddress } from 'utils/addressHelpers';
import {
  RewardAuthorContract,
  GetCoinPrice,
  GetPostRewardAuthor
} from './hook';

import QuestionHelper from 'components/QuestionHelper';

import { useImmer } from 'use-immer';

const RewardAuthModalStyled = styled(Box)<{ top: number; left: number }>`
  position: absolute;
  z-index: 99;
  width: 418px;
  height: 242px;
  padding: 8px 20px 16px;
  padding-bottom: 16px;
  border-radius: 10px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background: ${({ theme }) => theme.colors.tertiary};
`;
const CoinSelectStyled = styled(Button)`
  width: 100px;
  height: 35px;
  padding: 0;
`;

const JiantouStyled = styled.div<{ open: boolean }>`
  border: 6px solid transparent;
  border-top-color: #fff;
  transition: all 0.3s;
  transform: ${({ open }) =>
    open ? 'rotateZ(180deg) translateY(3px)' : 'rotateZ(0) translateY(3px)'};
  transform-origin: center;
`;

const RowsToken = styled(Flex)`
  align-items: center;
  padding: 10px;
`;

interface RewardAuthModalProps {
  currentPost: Api.Home.post;
  depositSymbol?: string;
  onConfirm?: (amount: string) => void;
  onDismiss?: () => void;
  userName?: string;
  address?: string;
  avatar?: string;
  offsetTop?: number;
  offsetLeft?: number;
}

const RewardAuthModal: React.FC<RewardAuthModalProps> = ({
  currentPost,
  avatar,
  offsetLeft,
  offsetTop
}) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const { toastSuccess } = useToast();
  const [open, setOpen] = useState(false);
  const [state, setState] = useImmer({
    loading: true,
    isOnApprove: true,
    authorization: [],
    currentToken: [],
    current_price: '0',
    tokenList: []
  });
  const { getTokens, approve, rewardUsers } = RewardAuthorContract();
  const { getPrice } = GetCoinPrice();
  const { getInfo } = GetPostRewardAuthor();
  const { currentToken, current_price, tokenList } = state;

  const init = async () => {
    try {
      const res = await getTokens();
      const isApprove = await approve(
        account,
        res.map(item => item[0])
      );
      const price = await getPrice(res[0][0]);
      setState(p => {
        p.tokenList = res;
        p.currentToken = res[0];
        p.current_price = price.current_price || '0.12345';
        p.authorization = isApprove;
        p.isOnApprove = isApprove[0] > 0 ? false : true;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  const getPost = async () => {
    try {
      const res = await getInfo(1, currentPost.id);
      console.log(res);
    } catch (error) {}
  };

  // 切换币种
  const changeCoinChecked = async (rows: string[], index) => {
    try {
      const res = await getPrice(rows[0]);
      setState(p => {
        p.currentToken = rows;
        p.current_price = res.current_price || '0.12345';
        p.isOnApprove = state.authorization[index] > 0 ? false : true;
      });
    } catch (error) {}
  };

  // 打赏用户
  const changeRewardUser = async (amount: number) => {
    try {
      const res = await rewardUsers(
        currentPost.user_address,
        currentToken[0],
        1,
        currentPost.id,
        getDecimalAmount(new BigNumber(amount)).toString(),
        getBnbAddress() === currentToken[0]
      );
      if (res === 1) {
        toastSuccess('打赏成功');
      } else if (res === 4001) {
        toastSuccess('已经取消打赏');
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (account) {
      init();
      getPost();
    }
  }, [account]);

  return (
    <RewardAuthModalStyled left={offsetLeft} top={offsetTop}>
      {state.loading ? (
        <ReactLoading type={'cylon'} />
      ) : (
        <React.Fragment>
          <Flex alignItems="center" justifyContent="space-between">
            <AvatarCard
              userName={currentPost.user_name}
              avatar={avatar}
              address={currentPost.user_address}
            />
            <Flex alignItems="center">
              <Box width="100px">
                <CoinSelectStyled
                  onClick={e => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                >
                  <CoinItem token={currentToken} />
                  <JiantouStyled open={open} />
                </CoinSelectStyled>
                <DropDown
                  fillWidth
                  isOpen={open}
                  scale="xs"
                  setIsOpen={setOpen}
                >
                  {tokenList.map((item, index) => (
                    <RowsToken
                      key={index}
                      onClick={() => changeCoinChecked(item, index)}
                    >
                      <CoinItem token={item} />
                    </RowsToken>
                  ))}
                </DropDown>
              </Box>
              <QuestionHelper
                ml="15px"
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
            </Flex>
          </Flex>
          <Box minHeight="120px" mt="12px">
            {currentToken[1] && (
              <Reward
                current={currentToken}
                price={current_price}
                isOnApprove={state.isOnApprove}
                onApprove={() =>
                  setState(p => {
                    p.isOnApprove = false;
                  })
                }
                onCallBack={event => changeRewardUser(event)}
              />
            )}
          </Box>
          {/* <Flex flexWrap="wrap" mt="12px" justifyContent="space-between">
            {RewardAuthorList.map(item => (
              <InputPanelStyled onClick={() => changeRewardUser(item)}>
                <Flex>
                  <Box width="20px">
                    <TokenImage
                      width={20}
                      height={20}
                      tokenAddress={currentToken[1]}
                    />
                  </Box>
                  <Flex ml="3px" flexDirection="column">
                    <Text bold ml="5px" style={{ lineHeight: 'normal' }}>
                      {item}
                    </Text>
                    <Text fontSize="14px" style={{ lineHeight: 'normal' }}>
                      ${new BigNumber(current_price).times(item).toString()}
                    </Text>
                  </Flex>
                </Flex>
              </InputPanelStyled>
            ))}
          </Flex> */}
          <Flex mt="4px" alignItems="center">
            <Flex ml="1em">
              {[1, 2, 3].map(item => (
                <Box width="24px" style={{ marginLeft: '-1em' }}>
                  <Avatar
                    scale="md"
                    style={{ width: '24px', height: '24px' }}
                  />
                </Box>
              ))}
            </Flex>
            <Text ml="11px" fontSize="14px" color="textTips">
              共81人已打赏这篇帖子
            </Text>
          </Flex>
        </React.Fragment>
      )}
    </RewardAuthModalStyled>
  );
};

export default RewardAuthModal;
