import React, { useCallback, useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Link, useHistory } from 'react-router-dom';
import {
  Box,
  Divider,
  Text,
  Button,
  Flex,
  Heading,
  Empty,
  Spinner,
} from 'uikit';
import styled from 'styled-components';
import TradeLogo from 'view/Tribe/components/TradeCard/TradeLogo';
import {
  HeadText,
  ItemText,
  LoadingAnimation,
  Row,
  StyledButton,
  Table,
  TableBox,
} from './styled';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { Api } from 'apis';
import { formatTime } from 'utils/timeFormat';
import { NftStatus } from 'store/tribe/type';
import { useTribeNft } from './hooks';
import {
  StakeButton,
  UnStakeButton,
  TransferButton,
} from './components/actionNft';
import { fetchIsApproveStakeNft } from 'store/tribe';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { BASE_IMAGE_URL } from 'config';
import { storeAction } from 'store';

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
    color: ${({ theme }) => theme.colors.white};
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

const MyTribe = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [activeType, setActiveType] = useState(1);

  useEffect(() => {
    dispatch(fetchIsApproveStakeNft({ account }));
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
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const { onClaimOwnerNft } = useTribeNft();

  // 1 未领取 2已领取 3 取消质押 4 已质押 5已过期
  const getMyTribeList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.TribeApi.MyTribeList({
        page: 1,
        page_size: 10,
      });
      if (Api.isSuccess(res)) {
        setList(res.data?.list);
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

  // 领取
  const handleClaimOwnerNft = useCallback(async (info: any) => {
    try {
      await onClaimOwnerNft(info.id);
      updateTribeList({ ...info, status: NftStatus.Received });
      getMyTribeList();
    } catch (error) {
      console.log(error);
    }
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
                  logo={`${BASE_IMAGE_URL}${item?.tribe_info?.tribe?.logo}`}
                  scales='sm'
                  pro={item?.tribe_info?.tribe?.type}
                />
                <CenterFlex
                  flex='1'
                  flexDirection='column'
                  justifyContent='space-between'
                >
                  <Flex
                    mt='8px'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Heading ellipsis scale='md'>
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
                  </Flex>
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
                <Flex flexDirection='column' justifyContent='space-between'>
                  {/* 1 未领取 2已领取 3 取消质押 4 已质押 5已过期 */}
                  {item?.status <= NftStatus.UnReceive && (
                    <StyledButton
                      disabled={pending}
                      onClick={() => {
                        handleClaimOwnerNft(item);
                      }}
                    >
                      {/* {pending ? (
                        <Dots>{t('Time Claiming')}</Dots>
                      ) : ( */}
                      {t('Time Claim')}
                      {/* )} */}
                    </StyledButton>
                  )}
                  {item?.status === NftStatus.Received ||
                  item?.status === NftStatus.UnStake ? (
                    <>
                      <StakeButton
                        tribeId={item.tribe_id}
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
                            return p.filter(v => v.tribe_id !== item?.tribe_id);
                          });
                        }}
                      />
                    </>
                  ) : null}
                  {item?.status === NftStatus.Staked && (
                    <>
                      <UnStakeButton
                        tribeId={item.tribe_id}
                        nftType={1}
                        callback={() => {
                          updateTribeList({
                            ...item,
                            status: NftStatus.UnStake,
                          });
                        }}
                      />
                      <Button
                        onClick={() => {
                          history.push(`/me/tribe/info`);
                          dispatch(storeAction.setTribeId(item.id));
                        }}
                      >
                        {t('Manage')}
                      </Button>
                    </>
                  )}
                </Flex>
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
  const [pageSize, setpageSize] = useState(10);
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
        setMemberNftList(res.data?.list);
        setTotal(res.data?.total_count || 1);
      }
      setLoading(false);
    } catch (error) {
      setMemberNftList([]);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    getMyMemberTribeList();
  }, []);

  const updateTribeList = useCallback((info: any) => {
    setMemberNftList(p => {
      return p.map(item => {
        return item.tribe_id === info?.tribe_id ? info : item;
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
            <HeadText>{t('Member NFT')}</HeadText>
            <HeadText>{t('BelongTribe')}</HeadText>
            <HeadText>{t('Validity Date')}</HeadText>
            <HeadText>{t('Manage')}</HeadText>
          </Row>
          {loading ? (
            <LoadingAnimation>
              <Spinner />
            </LoadingAnimation>
          ) : !memberNftList.length ? (
            <Empty />
          ) : (
            memberNftList.map(item => (
              <Row key={item.tribe_id}>
                <Flex alignItems='center'>
                  <TradeLogo
                    scales='xs'
                    logo={item?.image}
                    pro={item?.tribe_info?.tribe?.type}
                  />
                  <ItemText ml='10px'>#{item?.nft_id}</ItemText>
                </Flex>
                <ItemText
                  ellipsis
                  onClick={() => {
                    history.push(`/me/tribe/info?i=${item.tribe_id}`);
                  }}
                >
                  {item?.name}
                </ItemText>
                <ItemText>
                  {formatTime(item?.add_time, 'YYYY-MM-DD HH:mm')} ~
                  {formatTime(item?.add_time, 'YYYY-MM-DD HH:mm')}
                </ItemText>
                <Flex justifyContent='flex-end' alignItems='center'>
                  {item?.status === NftStatus.Received ||
                  item?.status === NftStatus.UnStake ? (
                    <>
                      <StakeButton
                        scale='sm'
                        mr='8px'
                        tribeId={item.tribe_id}
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
                            return p.filter(v => v.tribe_id !== item?.tribe_id);
                          });
                        }}
                      />
                    </>
                  ) : null}
                  {item?.status === NftStatus.Staked && (
                    <UnStakeButton
                      scale='sm'
                      tribeId={item.tribe_id}
                      nftType={2}
                      callback={() => {
                        updateTribeList({
                          ...item,
                          status: NftStatus.UnStake,
                        });
                      }}
                    />
                  )}
                </Flex>
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
