import React, { useCallback, useEffect, useState } from 'react';
import { Crumbs, Icon } from 'components';
import { useTranslation } from 'contexts';
import { useHistory } from 'react-router-dom';
import { Box, Divider, Text, Flex, Heading, Empty, Spinner, Link } from 'uikit';
import styled from 'styled-components';
import TradeLogo from 'view/Tribe/components/TradeCard/TradeLogo';
import {
  MyTribeHeaderFlex,
  HeadText,
  ItemText,
  LoadingAnimation,
  Row,
  StyledButton,
  Table,
  TableBox,
  MyTribeActionFlex,
  MemberActionFlex,
} from './styled';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { Api } from 'apis';
import { formatTime } from 'utils/timeFormat';
import { NftStatus } from 'store/tribe/type';
import { getTribeExtraInfo } from './hooks';
import {
  StakeButton,
  UnStakeButton,
  TransferButton,
  ClaimButton,
} from './components/actionNft';
import { fetchIsApproveStakeNft } from 'store/tribe';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import useConnectWallet from 'hooks/useConnectWallet';
import { getTribeAddress } from 'utils/addressHelpers';
import { getBscScanLink } from 'utils/contract';

const InfoBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const InfoFlex = styled(Flex)`
  padding: 16px 0;
  flex-wrap: wrap;
`;
const TabText = styled(Text).attrs({ small: true })`
  color: ${({ theme }) => theme.colors.textTips};
  cursor: pointer;
  &.active {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white_black};
  }
`;
const CenterFlex = styled(Flex)`
  margin-left: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 32px;
  }
`;
const NumberFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`;
const NumberItemFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;
const ManageButton = styled(Box)`
  position: relative;
  .tips-flex {
    position: absolute;
    top: -10px;
    left: 76px;
    padding: 5px 15px;
    background-color: ${({ theme }) => theme.colors.tipsBg};
    border-radius: 9px;
  }
`;

const MyTribe = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [activeType, setActiveType] = useState(1);

  useEffect(() => {
    if (account) {
      dispatch(fetchIsApproveStakeNft({ account }));
    }
  }, [account]);

  return (
    <Box>
      <Crumbs title=' '>
        <Flex width='100%' alignItems='center'>
          <TabText
            mr='30px'
            className={activeType === 1 ? 'active' : ''}
            onClick={() => {
              setActiveType(1);
            }}
          >
            {t('My Tribe')}
          </TabText>
          <TabText
            className={activeType === 2 ? 'active' : ''}
            onClick={() => {
              setActiveType(2);
            }}
          >
            {t('Member NFT')}
          </TabText>
        </Flex>
      </Crumbs>
      {activeType === 1 && <MyMasterNftTribe />}
      {activeType === 2 && <MemberNftTribe />}
    </Box>
  );
};

const MyMasterNftTribe = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1 未领取 2已领取 3 取消质押 4 已质押 5已过期
  const getMyTribeList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.TribeApi.MyTribeList({
        page: 1,
        page_size: 10,
      });
      if (Api.isSuccess(res)) {
        const list = res.data?.list || [];
        if (list.length) {
          const tribeIds = list.map(item => item.id);
          const newlist = await getTribeExtraInfo(tribeIds);
          const tribeList = list.map((item, i) => {
            return {
              ...item,
              initMemberNft: newlist[i]?.initMemberNFT,
            };
          });
          setList(tribeList);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setList([]);
    }
  }, []);

  useEffect(() => {
    getMyTribeList();
  }, []);

  const updateTribeList = useCallback((info: any) => {
    setList(p => {
      return p.map(item => {
        return item.id === info?.id ? info : item;
      });
    });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingAnimation>
          <Spinner />
        </LoadingAnimation>
      ) : !list.length ? (
        <Empty />
      ) : (
        list.map(item => (
          <Box key={item?.id}>
            <InfoBox>
              <InfoFlex>
                <TradeLogo
                  logo={item?.tribe_info?.tribe?.logo}
                  scales='sm'
                  pro={item?.tribe_info?.tribe?.type === 2}
                />
                <CenterFlex
                  flex='1'
                  flexDirection='column'
                  justifyContent='space-between'
                >
                  <MyTribeHeaderFlex>
                    <Heading
                      ellipsis
                      scale='md'
                      style={{ maxWidth: '190px', cursor: 'pointer' }}
                      onClick={() => {
                        history.push(`/tribe/detail?id=${item.id}`);
                      }}
                    >
                      {item?.name}
                    </Heading>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Text mr='20px' fontSize='14px' color='textTips'>
                        {formatTime(
                          item?.tribe_info?.tribe?.create_time,
                          'YYYY-MM-DD HH:mm',
                        )}
                      </Text>
                    </Flex>
                  </MyTribeHeaderFlex>
                  <NumberFlex justifyContent='space-between'>
                    <NumberItemFlex>
                      <Text bold>{item?.tribe_info?.member_count}</Text>
                      <Text fontSize='14px' color='textTips'>
                        {t('Member')}
                      </Text>
                    </NumberItemFlex>
                    <NumberItemFlex>
                      <Text bold>{item?.tribe_info?.post_count}</Text>
                      <Text fontSize='14px' color='textTips'>
                        {t('Post')}
                      </Text>
                    </NumberItemFlex>
                    <NumberItemFlex>
                      <Text bold>{item?.tribe_info?.selected_count}</Text>
                      <Text fontSize='14px' color='textTips'>
                        {t('Featured')}
                      </Text>
                    </NumberItemFlex>
                  </NumberFlex>
                </CenterFlex>
                <MyTribeActionFlex>
                  {/* 1 未领取 2已领取 3 取消质押 4 已质押 5已过期 */}
                  {!account && (
                    <StyledButton
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onConnectWallet();
                      }}
                    >
                      {t('Connect Wallet')}
                    </StyledButton>
                  )}
                  {account && item?.status <= NftStatus.UnReceive && (
                    <ClaimButton
                      tribeId={item.id}
                      nftType={1}
                      callback={() => {
                        // 领取nft成功后，不能从服务器拿到实时数据，有延迟，暂时屏蔽掉刷新方法
                        // getMyTribeList();
                      }}
                    />
                  )}
                  {account &&
                  (item?.status === NftStatus.Received ||
                    item?.status === NftStatus.UnStake) ? (
                    <>
                      <StakeButton
                        tribeId={item.id}
                        nftId={item.nft_id}
                        nftType={1}
                        callback={() => {
                          updateTribeList({
                            ...item,
                            status: NftStatus.Staked,
                          });
                        }}
                      />
                      <TransferButton
                        nftId={item.nft_id}
                        callback={() => {
                          setList(p => {
                            return p.filter(v => v.id !== item?.id);
                          });
                        }}
                      />
                    </>
                  ) : null}
                  {account && item?.status === NftStatus.Staked && (
                    <>
                      <UnStakeButton
                        tribeId={item.id}
                        nftType={1}
                        callback={() => {
                          updateTribeList({
                            ...item,
                            status: NftStatus.UnStake,
                          });
                        }}
                      />
                      <ManageButton>
                        <StyledButton
                          onClick={() => {
                            if (item.initMemberNft) {
                              history.push(`/me/tribe/info?i=${item.id}`);
                            } else {
                              history.push(`/me/tribe/member-nft?i=${item.id}`);
                            }
                          }}
                        >
                          {t('Manage')}
                        </StyledButton>
                        {!item.initMemberNft && (
                          <Flex className='tips-flex' alignItems='center'>
                            <Icon
                              name='icon-tishi'
                              size={16}
                              color='textOrigin'
                            />
                            <Text
                              ml='5px'
                              small
                              color='white'
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              {t('Please set member NFT')}
                            </Text>
                          </Flex>
                        )}
                      </ManageButton>
                    </>
                  )}
                </MyTribeActionFlex>
              </InfoFlex>
            </InfoBox>
            <Divider />
          </Box>
        ))
      )}
    </>
  );
});

const MemberNftTribe = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const { account } = useWeb3React();
  const tribeAddress = getTribeAddress();
  const { onConnectWallet } = useConnectWallet();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [memberNftList, setMemberNftList] = useState([]);

  const getMyMemberTribeList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.TribeApi.MyJoinedTribeList({
        page,
        page_size: pageSize,
      });
      if (Api.isSuccess(res)) {
        const list = ItemGroupBy(res.data?.list, 'id');
        setMemberNftList(list);
        setTotal(res.data?.total_count || 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMemberNftList([]);
    }
  }, [page, pageSize]);

  useEffect(() => {
    getMyMemberTribeList();
  }, []);

  // 分组结果为数组
  const ItemGroupBy = (list = [], field) => {
    let result = [],
      types = {};
    for (let i = 0; i < list.length; i++) {
      const cur = list[i];
      if (!(cur[field] in types)) {
        types[cur[field]] = { type: cur[field], data: [] };
        result.push(types[cur[field]]);
      }
      types[cur[field]].data.push(
        types[cur[field]].data.length >= 1
          ? { ...cur, repeat: true }
          : { ...cur, repeat: false },
      );
    }

    for (let i = 0; i < result.length; i++) {
      result[i].data[result[i].data.length - 1]['border'] = true;
    }
    return result.flatMap(item => item.data);
  };

  const updateTribeList = useCallback((info: any) => {
    setMemberNftList(p => {
      return p.map(item => {
        return item.nft_id === info?.nft_id ? info : item;
      });
    });
  }, []);

  const handlePageClick = useCallback(
    event => {
      setPage(event.selected + 1);
    },
    [setPage],
  );

  const getTotalPage = useCallback(() => {
    if (pageSize !== 0 && total % pageSize === 0) {
      return parseInt(String(total / pageSize));
    }
    if (pageSize !== 0 && total % pageSize !== 0) {
      return parseInt(String(total / pageSize)) + 1;
    }
  }, [total, pageSize]);
  return (
    <>
      <TableBox>
        <Table>
          <Row className='head'>
            <HeadText>{t('BelongTribe')}</HeadText>
            <HeadText>{t('Member NFT')}</HeadText>
            <HeadText>{t('Joined Time')}</HeadText>
            <HeadText>{t('Manage')}</HeadText>
          </Row>
          {loading ? (
            <LoadingAnimation>
              <Spinner />
            </LoadingAnimation>
          ) : !memberNftList.length ? (
            <Empty />
          ) : (
            memberNftList.map((item, i) => (
              <Row border={item.border} key={item.nft_id}>
                {!item.repeat ? (
                  <ItemText
                    // className='tribe-name'
                    ellipsis
                    onClick={() => {
                      history.push(`/tribe/detail?id=${item.id}`);
                    }}
                  >
                    {item?.name}
                  </ItemText>
                ) : (
                  <ItemText />
                )}
                <Flex flexWrap='wrap' alignItems='center'>
                  <TradeLogo
                    scales='xs'
                    logo={item?.image}
                    pro={item?.tribe_info?.tribe?.type}
                  />
                  <ItemText className='member-nft' ml='10px'>
                    <Link external href={getBscScanLink(tribeAddress, 'token')}>
                      #{item?.nft_id}
                    </Link>
                  </ItemText>
                </Flex>
                <ItemText>
                  {formatTime(item?.claim_time, 'YYYY-MM-DD HH:mm')}
                </ItemText>
                <MemberActionFlex>
                  {!account && (
                    <StyledButton
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onConnectWallet();
                      }}
                    >
                      {t('Connect Wallet')}
                    </StyledButton>
                  )}
                  {account &&
                  (item?.status === NftStatus.Received ||
                    item?.status === NftStatus.UnStake) ? (
                    <>
                      <StakeButton
                        className='stake-button'
                        scale='sm'
                        tribeId={item.id}
                        nftId={item.nft_id}
                        nftType={2}
                        callback={() => {
                          updateTribeList({
                            ...item,
                            status: NftStatus.Staked,
                          });
                        }}
                      />
                      <TransferButton
                        scale='sm'
                        nftId={item.nft_id}
                        callback={() => {
                          setMemberNftList(p => {
                            return p.filter(v => v.id !== item?.id);
                          });
                        }}
                      />
                    </>
                  ) : null}
                  {account && item?.status === NftStatus.Staked && (
                    <UnStakeButton
                      scale='sm'
                      tribeId={item.id}
                      nftType={2}
                      callback={() => {
                        updateTribeList({
                          ...item,
                          status: NftStatus.UnStake,
                        });
                      }}
                    />
                  )}
                </MemberActionFlex>
              </Row>
            ))
          )}
        </Table>
      </TableBox>

      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text className='totalPage' fontSize='14px' color='textTips'>
          {t('Account Total %page% page', { page: getTotalPage() })}
        </Text>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          forcePage={page - 1}
          disableInitialCallback={true}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={getTotalPage()}
          previousLabel='<'
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>
    </>
  );
});
export default MyTribe;
