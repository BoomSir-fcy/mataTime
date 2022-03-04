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

const CountBox = styled(Box)`
  /* ${({ theme }) => theme.mediaQueriesSize.padding} */
`;
const TableBox = styled(Box)`
  width: 100%;
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
  max-width: 300px;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 20px;
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

export const getTotalPage = (totalNum, pageSize) => {
  if (pageSize != 0 && totalNum % pageSize == 0) {
    return parseInt(String(totalNum / pageSize));
  }
  if (pageSize != 0 && totalNum % pageSize != 0) {
    return parseInt(String(totalNum / pageSize)) + 1;
  }
};

const MeTribeMemberManagement: React.FC<init> = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { DeleteNFTFromTribe } = useTribeMemberDelete();

  const [InputVal, setInputVal] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(true);
  const [pending, setpending] = useState(false);
  const [MemberList, setMemberList] = useState([]);
  const parseQs = useParsedQueryString();
  const { toastSuccess, toastError } = useToast();
  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [RefundAmount, setRefundAmount] = useState(null);
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

  // 禁言
  const onPostMute = async (uid: number) => {
    const res = await Api.TribeApi.tribePostMute({ tribe_id: parseQs.i, uid });
    if (Api.isSuccess(res)) {
      toastSuccess(t('禁言成功'));
      getMemberList(page);
    }
  };

  // 取消禁言
  const onPostNotMute = async (uid: number) => {
    const res = await Api.TribeApi.tribePostNotMute({
      tribe_id: parseQs.i,
      uid,
    });
    if (Api.isSuccess(res)) {
      toastSuccess(t('取消禁言成功'));
      getMemberList(page);
    }
  };

  // 成员列表
  const getMemberList = async page => {
    try {
      const res = await Api.TribeApi.tribeMemberList({
        page,
        page_size: pageSize,
        tribe_id: parseQs.i,
        keyword: InputVal,
      });
      if (Api.isSuccess(res)) {
        const Data = res.data;
        setMemberList(Data.list);
        setPage(Data.page);
        setPageCount(getTotalPage(Data.total_count, pageSize));
      } else {
        throw new Error('errCode');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    setApproveNum(null);
    const num = await FetchTokenApproveNum(account, fee_token);
    setApproveNum(num);
  };

  // 删除
  const DeleteMember = useCallback(
    async (nft_id: number) => {
      setpending(true);
      try {
        await DeleteNFTFromTribe(nft_id);
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
    [DeleteNFTFromTribe, page],
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
    if (parseQs.i) getMemberList(1);
  }, [InputVal]);

  return (
    <CountBox>
      <Crumbs title='成员管理'>
        <InputStyled htmlFor='search-input'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Icon name='icon-sousuo' margin='0 10px' />
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
            <HeadText>{t('昵称')}</HeadText>
            <HeadText>{t('地址')}</HeadText>
            <HeadText>{t('加入时间')}</HeadText>
            <HeadText>{t('管理')}</HeadText>
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
                      {item.is_mute === 0 ? t('禁言') : t('取消禁言')}
                    </TextBtn>
                    <TextBtn
                      variant='text'
                      onClick={() => {
                        getApproveNum(item.fee_token);
                        getRefundsAmount(item.nft_id);
                        setUserInfo(item);
                        setCommonInqueryShow(true);
                      }}
                    >
                      {t('moreDelete')}
                    </TextBtn>
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
          DeleteMember(UserInfo.nft_id);
        }}
      />
    </CountBox>
  );
};

export default MeTribeMemberManagement;
