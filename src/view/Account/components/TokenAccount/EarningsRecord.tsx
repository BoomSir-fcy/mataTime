/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  InputPanel,
  Input,
  Empty,
  Spinner
} from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import dayjs from 'dayjs';
import { GetTaskName, GetTaskTag } from 'view/Task/hooks/matter';
import { fetchMatterIncomeList, fetchIncomeList } from 'store/wallet/reducer';
import { Link } from 'react-router-dom';

const CountBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  .Reward {
    grid-template-columns: 60% 40%;
  }
  .matterStyle {
    grid-template-columns: 26% 27% 27% 20%;
  }
  .LinkRow {
    cursor: pointer;
  }
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  align-items: center;
  min-height: 30px;
`;
const HeadText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  margin-bottom: 10px;
  &:last-child {
    text-align: right;
  }
`;
const ItemText = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
  margin-bottom: 10px;
  &:first-child {
    margin-right: 10px;
    overflow: hidden;
  }
  &:last-child {
    text-align: right;
  }
  img {
    width: 50px;
    max-height: 50px;
  }
`;
const LoadingAnimation = styled(Box)`
  /* position: absolute; */
  width: 100%;
`;
// type 1 内容 2 打赏
interface init {
  type?: number;
  info: any;
}

const EarningsRecord: React.FC<init> = ({ type, info }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [pageSize, setpageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(true);
  const [TaskHistoryList, setTaskHistoryList] = useState([]);
  const [ContentHistoryList, setContentHistoryList] = useState([]);

  const getTotalPage = totalNum => {
    if (pageSize != 0 && totalNum % pageSize == 0) {
      return parseInt(String(totalNum / pageSize));
    }
    if (pageSize != 0 && totalNum % pageSize != 0) {
      return parseInt(String(totalNum / pageSize)) + 1;
    }
  };

  const getIcome = time => {
    const percent = info.creator_percent;
    const Icome = (time * percent) / 100;
    return Icome;
  };

  const handlePageClick = event => {
    setLoading(true);
    const changePage = event.selected + 1;
    if (type === 1) {
      dispatch(fetchIncomeList({ page: changePage, pageSize }));
    } else {
      dispatch(fetchMatterIncomeList({ page: changePage, pageSize }));
    }
  };

  const getItemTaskName = id => {
    const configInfo = GetTaskName(id);
    return configInfo?.count
      ? t(`${configInfo.name}`, { count: configInfo.count })
      : t(`${configInfo.name}`);
  };

  const stringArr = (newarr: any, stringArray: string[]) => {
    for (let i = 0; i < newarr.length; i++) {
      if (newarr[i].text) {
        stringArray.push(newarr[i].text);
      }
      if (newarr[i].children?.length > 0) {
        stringArr(newarr[i].children, stringArray);
      }
    }
    return stringArray;
  };

  useEffect(() => {
    if (type === 1) {
      if (info.record?.length) {
        setContentHistoryList(info.record);
        setPage(info.index);
        setPageCount(getTotalPage(info.total));
      } else {
        setPage(1);
        setPageCount(1);
      }
    } else {
      if (info.matter_history?.length) {
        setTaskHistoryList(info.matter_history);
        setPage(info.now_page);
        setPageCount(getTotalPage(info.total_size));
      } else {
        setPage(1);
        setPageCount(1);
      }
    }
    setLoading(false);
  }, [info, type]);

  return (
    <CountBox>
      {type === 2 ? (
        <Table>
          <Row className="matterStyle">
            <HeadText>{t('Account Date')}</HeadText>
            <HeadText>{t('Account Task type')}</HeadText>
            <HeadText>{t('Account Task details')}</HeadText>
            <HeadText>{t('Account Day income')}</HeadText>
          </Row>
          {TaskHistoryList.length
            ? TaskHistoryList.map((item, index) => (
                <Row
                  className="matterStyle"
                  key={`${item.create_time}${index}`}
                >
                  {item.task_type && (
                    <>
                      <ItemText>
                        {dayjs(item.create_time * 1000).format(
                          t('YYYY-MM-DD HH:mm:ss')
                        )}
                      </ItemText>
                      <ItemText>
                        {GetTaskTag(item.task_type).toUpperCase()}
                      </ItemText>
                      <ItemText>
                        {t(getItemTaskName(item.task_name_id))}
                      </ItemText>
                      <ItemText>{item.change}</ItemText>
                    </>
                  )}
                </Row>
              ))
            : !Loading && <Empty />}
          {Loading && (
            <LoadingAnimation>
              <Spinner />
            </LoadingAnimation>
          )}
        </Table>
      ) : (
        <Table>
          <Row>
            <HeadText>{t('Account Creation')}</HeadText>
            <HeadText>{t('Account Number of readers')}</HeadText>
            <HeadText>{t('Account Day income')}</HeadText>
            <HeadText>{t('Account Cumulative income')}</HeadText>
          </Row>
          {ContentHistoryList.map((item, index) => {
            const stringArray: any[] = [];
            let context: any[] = [];
            try {
              context = Array.isArray(JSON.parse(item.info.content))
                ? JSON.parse(item.info.content)
                : [];
            } catch (err) {
              console.error(err);
            }
            return (
              <Row
                className="LinkRow"
                key={`${item.read.post_id}${index}`}
                as={Link}
                to={`/articleDetils/${item.read.post_id}`}
              >
                <ItemText>
                  <Flex alignItems="center">
                    <Text ellipsis>
                      {stringArr(context, stringArray).join(',')}
                    </Text>
                    {item.info.image_list &&
                      item.info.image_list.map(item => (
                        <img key={item} src={item} alt="" />
                      ))}
                  </Flex>
                </ItemText>
                <ItemText ellipsis>{item.read.total_read_count}</ItemText>
                <ItemText ellipsis>
                  {getIcome(item.read.range_read_times)}
                </ItemText>
                <ItemText ellipsis>
                  {getIcome(item.read.total_read_times)}
                </ItemText>
              </Row>
            );
          })}
        </Table>
      )}

      <PaginateStyle alignItems="center" justifyContent="end">
        <Text mr="16px" fontSize="14px" color="textTips">
          {t('Account Total %page% page', { page: pageCount })}
        </Text>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          forcePage={page - 1}
          disableInitialCallback={true}
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>
    </CountBox>
  );
};

export default EarningsRecord;
