import React, { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import ReactLoading from 'react-loading';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { DropDown, Avatar, Loading, ConnectWalletButton } from 'components';
import { Flex, Box, Text, Button, light, dark } from 'uikit';
import { useToast } from 'hooks';
import { useStore, storeAction } from 'store';
import { useTranslation } from 'contexts/Localization';
import { AvatarCard } from '../Avatar/AvatarCard';

import { RewardIncome, CoinItem } from './components';
import { RewardInput } from './RewardInput';

import { getDecimalAmount } from 'utils/formatBalance';
import { getBnbAddress } from 'utils/addressHelpers';

import {
  RewardAuthorContract,
  GetCoinPrice,
  GetPostRewardAuthor,
} from './hook';

import QuestionHelper from 'components/QuestionHelper';

const invertTheme = (currentTheme: DefaultTheme) => {
  if (currentTheme.isDark) {
    return light;
  }
  return dark;
};

const RewardAuthModalStyled = styled(Box)`
  width: 100%;
  margin: auto;
  min-height: 80px;
  padding: 8px 20px 16px;
  padding-bottom: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.greyBackground};
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: -100px;
    width: 418px;
  }
`;
const CoinSelectStyled = styled(Button)`
  width: 100px;
  height: 35px;
  padding: 0;
  div {
    color: #fff;
  }
  svg {
    fill: #fff;
  }
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
  postType: 0 | 1;
  depositSymbol?: string;
  userName?: string;
  address?: string;
  avatar?: string;
  offsetTop?: number;
  offsetLeft?: number;
  onConfirm?: (amount: string) => void;
  onDismiss?: () => void;
  onClose?: (event: Event) => void;
}

const RewardAuthModal: React.FC<RewardAuthModalProps> = ({
  currentPost,
  postType,
  avatar,
  offsetLeft,
  offsetTop,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [open, setOpen] = useState(false);
  const [state, setState] = useImmer({
    loading: true,
    submitLoading: false,
    isOnApprove: true,
    currentToken: [],
    current_price: '0',
    tokenList: [],
    reward_post: {
      total_user: 0,
      my_rewards: [],
      users: [],
    },
  });
  const { getTokens, approve, rewardUsers } = RewardAuthorContract();
  const { getPrice } = GetCoinPrice();
  const { getInfo } = GetPostRewardAuthor();
  const { currentToken, current_price, tokenList, reward_post } = state;
  const tokenViewList = useStore(p => p.appReducer.supportTokenViews);
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const reward: reward[] = currentPost.reward_stats || [];

  const init = async () => {
    try {
      let newArr;
      if (!tokenViewList.length) {
        const res = await getTokens();
        const isApprove = await approve(
          account,
          res.map(item => item[0]),
        );
        newArr = res.map((item, index) => [
          ...item.toString().split(','),
          isApprove[index].toString(),
        ]);
        dispatch(storeAction.setSupportToken(newArr));
      } else {
        newArr = tokenViewList;
      }
      const price = await getPrice(newArr[0][0]);
      setState(p => {
        p.tokenList = newArr;
        p.currentToken = newArr[0];
        p.current_price = price.current_price || '0';
        p.isOnApprove = newArr[0][4] > 0 ? false : true;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  const getPost = async () => {
    try {
      const res = await getInfo(postType, currentPost.reward_id);
      setState(p => {
        p.reward_post = res;
      });
    } catch (error) {}
  };

  // ????????????
  const changeCoinChecked = async (rows: string[], index) => {
    try {
      const res = await getPrice(rows[0]);
      setState(p => {
        p.currentToken = rows;
        p.current_price = res.current_price || '0';
        p.isOnApprove = tokenList[index][4] > 0 ? false : true;
      });
    } catch (error) {}
  };

  // ????????????
  const changeRewardUser = async (amount: string, evnet) => {
    try {
      setState(p => {
        p.submitLoading = true;
      });
      const res = await rewardUsers(
        currentPost.user_address,
        currentToken[0],
        postType,
        currentPost.reward_id,
        getDecimalAmount(new BigNumber(amount)).toString(),
        getBnbAddress() === currentToken[0],
      );
      if (res === 1) {
        onClose(evnet);
        toastSuccess(t('rewardAutherSuccess'));
      } else if (res === 4001) {
        toastError(t('rewardAutherCancel'));
      } else if (res === 400001) {
        toastError(t('rewardAutherTransferAmountExceedsBlanceError'));
      } else {
        toastError(t('rewardAutherError'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.submitLoading = false;
      });
    }
  };

  const getString = (rewards, tokenList) => {
    const text = rewards.map(({ token, amount }) => {
      let tokenName = tokenList.find(item => item[0].toLowerCase() === token);
      let text;
      if (tokenName) {
        text = `${amount} ${tokenName[2]}`;
      }
      return text;
    });
    return text.join('???');
  };

  React.useEffect(() => {
    if (userInfo.uid === currentPost.user_id) {
      getPost();
    } else if (account) {
      init();
      getPost();
    } else if (!account) {
      setState(p => {
        p.loading = false;
      });
    }
  }, [account]);

  React.useEffect(() => {
    const handOpen = () => {
      setOpen(false);
    };
    document.addEventListener('click', handOpen, true);
    return () => {
      document.removeEventListener('click', handOpen, true);
    };
  }, []);

  return (
    <RewardAuthModalStyled
      onClick={event => {
        event.stopPropagation();
        event.preventDefault();
      }}
      right={offsetLeft}
      bottom={offsetTop}
    >
      {/* ???????????????????????? */}
      {userInfo.uid === currentPost.user_id ? (
        <RewardIncome data={reward} postInfo={reward_post} />
      ) : (
        <React.Fragment>
          {state.loading ? (
            <ReactLoading type={'cylon'} />
          ) : (
            <React.Fragment>
              {account ? (
                <React.Fragment>
                  <Loading visible={state.submitLoading} />
                  <Flex
                    alignItems='center'
                    justifyContent='space-between'
                    width='100%'
                  >
                    <AvatarCard
                      userName={
                        currentPost.user_name ||
                        currentPost.send_name ||
                        (currentPost as any).nick_name
                      }
                      avatar={avatar}
                      address={currentPost.user_address}
                    />
                    <Flex alignItems='center'>
                      <Box width='100px'>
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
                          scale='xs'
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
                        ml='15px'
                        color='white_black'
                        text={
                          <>
                            <Text fontSize='14px'>
                              {t('rewardAutherTipsText1')}
                            </Text>
                            <Text fontSize='14px' color='textTips'>
                              {t('rewardAutherTipsText2')}
                            </Text>
                          </>
                        }
                        placement='auto'
                      />
                    </Flex>
                  </Flex>
                  <Box minHeight='100px' mt='25px'>
                    <RewardInput
                      current={currentToken}
                      price={current_price}
                      isOnApprove={state.isOnApprove}
                      onApprove={() =>
                        setState(p => {
                          p.isOnApprove = false;
                        })
                      }
                      onCallBack={(amount, event) =>
                        changeRewardUser(amount, event)
                      }
                    />
                    {/* {currentToken[1] && (
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
                )} */}
                  </Box>
                  {reward?.length > 0 && (
                    <Flex mt='4px' alignItems='center'>
                      <Flex ml='1em'>
                        {reward_post?.users?.map(item => (
                          <Box
                            key={item.uid}
                            as={Link}
                            to={`/me/profile/${item.uid}`}
                            width='24px'
                            style={{ marginLeft: '-1em' }}
                          >
                            <Avatar
                              disableFollow
                              src={item.nft_image}
                              scale='md'
                              style={{ width: '24px', height: '24px' }}
                            />
                          </Box>
                        ))}
                      </Flex>
                      <Text ml='11px' fontSize='14px' color='textTips' ellipsis>
                        {t('rewardAutherAlreadyText1', {
                          value: reward_post?.total_user || 0,
                        })}
                      </Text>
                    </Flex>
                  )}
                  {/* ?????????????????????????????? */}
                  {reward_post?.my_rewards?.length > 0 && (
                    <Text color='textTips' fontSize='14px' mt='12px' ellipsis>
                      {t('rewardAutherAlreadyText2', {
                        value: getString(reward_post.my_rewards, tokenList),
                      })}
                    </Text>
                  )}
                </React.Fragment>
              ) : (
                <Flex height='56px' justifyContent='center' alignItems='center'>
                  <ConnectWalletButton />
                </Flex>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </RewardAuthModalStyled>
  );
};

export default RewardAuthModal;
