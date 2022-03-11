import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from 'uikit';
import { SortIcon } from 'view/Post/components';
import { CommentTitle } from 'view/Post/style';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { useStore } from 'store';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { getDecodeValue } from 'utils/urlQueryPath';

const Tab = styled(Flex)`
  align-items: baseline;
  .tabFont {
    color: ${({ theme }) => theme.colors.textTips};
    font-size: 14px;
    cursor: pointer;
  }
  .active {
    color: ${({ theme }) => theme.colors.white_black};
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const TabsContent = styled(CommentTitle)`
  padding-left: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
  }
`;

interface DetailTitlePorps {
  TribeId: number;
  TopicId: number;
  tabsChange?: (item) => void;
}
const DetailTitle: React.FC<DetailTitlePorps> = ({
  TribeId,
  TopicId,
  tabsChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { top } = useStore(p => p.tribe.postList);
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const qsValue = useParsedQueryString();
  const [sortTime, setSortTime] = useState(1);
  const [sortLike, setSortLike] = useState(0);
  const [ActiveTitle, setActiveTitle] = useState(Number(qsValue.active) || 0);
  const [SearchActiveTitle, setSearchActiveTitle] = useState(
    Number(qsValue.active) || 0,
  );
  // const [IsSearch, setIsSearch] = useState<boolean>(Boolean(qsValue.search));
  const IsSearch = Boolean(qsValue.search);

  const changeSortTime = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortTime(sortTime === 1 ? 2 : 1);
    setSortLike(0);
  };
  const changeSortLike = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortLike(sortLike === 1 ? 2 : 1);
    setSortTime(0);
  };

  const changeSearchTab = type => {
    if (SearchActiveTitle === type) return;
    setSearchActiveTitle(type);
    tabsChange({
      SearchActiveTitle: type,
      search: qsValue.search,
    });
    replace(
      `${pathname}?id=${TribeId}&active=${type}&search=${getDecodeValue(
        qsValue.search,
      )}`,
    );
  };

  const changeTab = type => {
    setActiveTitle(type);
    let url = '';
    if (TopicId) {
      url = `&topic=${TopicId}&topicName=${qsValue.topicName}`;
    }
    replace(`${pathname}?id=${TribeId}&active=${type}${url}`);
    setTimeout(() => {
      window.scrollTo({
        // behavior: scrollState[pathname]?.y ? 'auto' : 'smooth',
        behavior: 'auto',
        top: 0,
      });
    }, 0);
  };

  useEffect(() => {
    if (!IsSearch) {
      tabsChange({
        ActiveTitle,
        sortTime,
        sortLike,
        top,
        IsSearch,
      });
    }
  }, [ActiveTitle, sortTime, sortLike, top, IsSearch]);

  useEffect(() => {
    if (IsSearch) {
      setSearchActiveTitle(Number(qsValue.active) || 0);
    } else {
      setActiveTitle(Number(qsValue.active) || 0);
    }
  }, [IsSearch]);

  return (
    <CommentTitle justifyContent='space-between' alignItems='center'>
      {IsSearch ? (
        <>
          <Tab>
            <Text
              mr='36px'
              className={SearchActiveTitle === 0 ? 'active' : 'tabFont'}
              onClick={() => {
                changeSearchTab(0);
              }}
            >
              {t('Post')}
            </Text>
            <Text
              className={SearchActiveTitle === 1 ? 'active' : 'tabFont'}
              onClick={() => {
                changeSearchTab(1);
              }}
            >
              {t('People')}
            </Text>
          </Tab>
        </>
      ) : (
        <>
          <Tab>
            <Text
              mr='36px'
              className={ActiveTitle === 0 ? 'active' : 'tabFont'}
              onClick={() => {
                changeTab(0);
              }}
            >
              {t('homeTabAll')}
            </Text>
            <Text
              className={ActiveTitle === 1 ? 'active' : 'tabFont'}
              onClick={() => {
                changeTab(1);
              }}
            >
              {t('Featured')}
            </Text>
          </Tab>
          <Flex>
            <SortIcon
              text={t('detailHeat')}
              changeSort={changeSortLike}
              flag={sortLike}
            />
            <SortIcon
              text={t('detailTime')}
              changeSort={changeSortTime}
              flag={sortTime}
            />
          </Flex>
        </>
      )}
    </CommentTitle>
  );
};

export default DetailTitle;
