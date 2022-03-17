import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Input, Empty, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import dayjs from 'dayjs';
import { DeleteMemberModal, Crumbs, Icon } from 'components';
import BtnIcon from 'view/Tribe/components/BtnIcon';
import { shortenAddress } from 'utils/contract';
import { Api } from 'apis';
import { useTribeState } from 'store/tribe/hooks';
import { useToast } from 'hooks';
import {
  FetchRefundsAmount,
  FetchTokenApproveNum,
  useTribeMemberDelete,
} from './hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { TRIBE_FEE_BNB_TOKEN } from 'config';
import BigNumber from 'bignumber.js';
import { getTotalPage } from 'utils/pageHelpers';
import { addMuteUserId, removeMuteUserId } from 'store/mapModule/actions';
import { useStore } from 'store';

const CountBox = styled(Box)`
  /* ${({ theme }) => theme.mediaQueriesSize.padding} */
`;
const TableBox = styled(Box)`
  max-width: 100vw;
  overflow: auto;
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 600px;
  .head {
    background: ${({ theme }) => theme.colors.backgroundCard};
  }
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 32% 26% 30% 12%;
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const HeadText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  &:last-child {
    text-align: right;
  }
`;
const ItemText = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
`;
const LoadingAnimation = styled(Box)`
  width: 100%;
`;

const TextBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0;
  text-align: right;
  height: auto;
  &:hover {
    text-decoration: underline;
  }
`;

const InputStyled = styled.label`
  max-width: 200px;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 300px;
  }
`;
interface Info {
  add_time: number;
  address: string;
  fee_token: string;
  is_mute: number;
  nft_id: number;
  nick_name: string;
  symbol: string;
  uid: number;
}
interface init {}

const MeTribeMemberManagement: React.FC<init> = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const { DeleteNFTFromTribe } = useTribeMemberDelete();
  const parseQs = useParsedQueryString();
  const [InputVal, setInputVal] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(true);
  const [pending, setpending] = useState(false);
  const [MemberList, setMemberList] = useState([]);
  const { toastSuccess, toastError } = useToast();
  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [RefundAmount, setRefundAmount] = useState<BigNumber>();
  const [ApproveNum, setApproveNum] = useState(null);
  const [UserInfo, setUserInfo] = useState<Info>({
    add_time: null,
    address: '',
    fee_token: '',
    is_mute: null,
    nft_id: null,
    nick_name: '',
    symbol: '',
    uid: null,
  });
  const [TribeId, setTribeId] = useState(null);

  // 禁言
  const onPostMute = async (uid: number) => {
    const res = await Api.TribeApi.tribePostMute({ tribe_id: TribeId, uid });
    if (Api.isSuccess(res)) {
      dispatch(addMuteUserId(uid));
      toastSuccess(t('Mute successfully'));
      getMemberList(page);
    }
  };

  // 取消禁言
  const onPostNotMute = async (uid: number) => {
    const res = await Api.TribeApi.tribePostNotMute({
      tribe_id: TribeId,
      uid,
    });
    if (Api.isSuccess(res)) {
      dispatch(removeMuteUserId(uid));
      toastSuccess(t('Unmuted successfully'));
      getMemberList(page);
    }
  };

  // 成员列表
  const getMemberList = useCallback(
    async page => {
      try {
        const res = await Api.TribeApi.tribeMemberList({
          page,
          page_size: pageSize,
          tribe_id: TribeId,
          keyword: InputVal,
        });
        if (Api.isSuccess(res)) {
          const Data = res.data;
          setMemberList(Data.list);
          setPage(Data.page);
          setPageCount(getTotalPage(Data.total_count, pageSize));
        }
        //  else {
        //   throw new Error('errCode');
        // }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        throw error;
      }
    },
    [
      pageSize,
      TribeId,
      InputVal,
      setMemberList,
      setPage,
      setPageCount,
      setLoading,
    ],
  );

  // 退回币种
  const getSymbol = async item => {
    try {
      const res = await Api.TribeApi.tribeDeleteMemberSymbol(item.nft_id);
      if (Api.isSuccess(res)) {
        const obj = { ...item, symbol: res.data.symbol };
        setUserInfo(obj);
      } else {
        throw new Error('errCode');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // 获取退回费用
  const getRefundsAmount = async (nft_id: number) => {
    setRefundAmount(null);
    const num = await FetchRefundsAmount(nft_id);
    setRefundAmount(num);
  };
  // 获取授权数量
  const getApproveNum = async (fee_token: string) => {
    if (fee_token.toLocaleLowerCase() === TRIBE_FEE_BNB_TOKEN) {
      setApproveNum(100);
      return;
    }
    setApproveNum(null);
    const num = await FetchTokenApproveNum(account, fee_token);
    setApproveNum(num);
  };

  // 删除
  const DeleteMember = useCallback(
    async (nft_id: number, Amount?: BigNumber) => {
      setpending(true);
      try {
        await DeleteNFTFromTribe(nft_id, Amount);
        toastSuccess(t('moreDeleteSuccess'));
      } catch (e) {
        console.error(e);
        toastError(t('moreDeleteError'));
      } finally {
        setpending(false);
        setCommonInqueryShow(false);
        getMemberList(page);
      }
    },
    [DeleteNFTFromTribe, getMemberList, page],
  );

  const handlePageClick = event => {
    setLoading(true);
    const changePage = event.selected + 1;
    getMemberList(changePage);
  };

  // 输入框搜索
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setInputVal(e.currentTarget.value);
      }
    },
    [setInputVal],
  );
  useEffect(() => {
    if (TribeId) getMemberList(1);
  }, [InputVal, TribeId]);

  useEffect(() => {
    if (parseQs.i) {
      setTribeId(Number(parseQs.i));
    }
  }, [parseQs]);

  return (
    <CountBox>
      <Crumbs title={t('Member Management')}>
        <InputStyled htmlFor='search-input'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Icon color='white_black' name='icon-sousuo' margin='0 10px' />
            <Input
              id='search-input'
              noShadow
              scale='sm'
              value={InputVal}
              onChange={handleChange}
              placeholder={t('SearchPlaceholder')}
            />
          </Flex>
        </InputStyled>
      </Crumbs>
      <TableBox>
        <Table>
          <Row className='head'>
            <HeadText>{t('Nickname')}</HeadText>
            <HeadText>{t('Address')}</HeadText>
            <HeadText>{t('Joined Time')}</HeadText>
            <HeadText>{t('Manage')}</HeadText>
          </Row>
          {MemberList.length
            ? MemberList.map((item, index) => (
                <Row key={`${item.nick_name}${index}`}>
                  <ItemText>{item.nick_name}</ItemText>
                  <ItemText>{shortenAddress(item.address)}</ItemText>
                  <ItemText>
                    {dayjs(item.add_time * 1000).format('YY-MM-DD HH:mm')}
                  </ItemText>
                  <Flex justifyContent='space-between'>
                    {userInfo?.address !== item.address && (
                      <>
                        <TextBtn
                          variant='text'
                          onClick={() => {
                            if (item.is_mute === 0) {
                              onPostMute(item.uid);
                            } else {
                              onPostNotMute(item.uid);
                            }
                          }}
                        >
                          {item.is_mute === 0
                            ? t('Banned')
                            : t('Cancel the prohibition')}
                        </TextBtn>
                        <TextBtn
                          variant='text'
                          onClick={() => {
                            getSymbol(item);
                            getApproveNum(item.fee_token);
                            getRefundsAmount(item.nft_id);
                            setCommonInqueryShow(true);
                          }}
                        >
                          {t('moreDelete')}
                        </TextBtn>
                      </>
                    )}
                  </Flex>
                </Row>
              ))
            : !Loading && <Empty />}
          {Loading && (
            <LoadingAnimation>
              <Spinner />
            </LoadingAnimation>
          )}
        </Table>
      </TableBox>

      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text className='totalPage' fontSize='14px' color='textTips'>
          {t('Account Total %page% page', { page: pageCount })}
        </Text>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          forcePage={page - 1}
          disableInitialCallback={true}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel='<'
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>

      {/* 统一询问框 */}
      <DeleteMemberModal
        show={commonInqueryShow}
        UserInfo={UserInfo}
        RefundAmount={RefundAmount}
        ApproveNum={ApproveNum}
        pending={pending}
        setpending={setpending}
        onClose={() => {
          setCommonInqueryShow(false);
        }}
        onQuery={() => {
          if (UserInfo.fee_token.toLocaleLowerCase() === TRIBE_FEE_BNB_TOKEN) {
            DeleteMember(UserInfo.nft_id, RefundAmount);
          } else {
            DeleteMember(UserInfo.nft_id);
          }
        }}
        upDateApproveNum={() => {
          getApproveNum(UserInfo.fee_token);
        }}
      />
    </CountBox>
  );
};

export default MeTribeMemberManagement;
