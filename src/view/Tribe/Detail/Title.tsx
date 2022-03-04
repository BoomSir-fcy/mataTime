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

interface DetailTitlePorps {
  TribeId: number;
  tabsChange?: (item) => void;
}
const DetailTitle: React.FC<DetailTitlePorps> = ({ TribeId, tabsChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortTime, setSortTime] = useState(1);
  const [sortLike, setSortLike] = useState(0);
  const { top } = useStore(p => p.tribe.postList);
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const qsValue = useParsedQueryString();
  const [ActiveTitle, setActiveTitle] = useState(Number(qsValue.active) || 0);

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

  useEffect(() => {
    tabsChange({
      ActiveTitle,
      sortTime,
      sortLike,
      top,
    });
  }, [ActiveTitle, sortTime, sortLike, top]);

  return (
    <CommentTitle justifyContent='space-between' alignItems='center'>
      <Tab>
        <Text
          mr='36px'
          className={ActiveTitle === 0 ? 'active' : 'tabFont'}
          onClick={() => {
            setActiveTitle(0);
            replace(`${pathname}?id=${TribeId}&active=0`);
          }}
        >
          {t('homeTabAll')}
        </Text>
        <Text
          className={ActiveTitle === 1 ? 'active' : 'tabFont'}
          onClick={() => {
            setActiveTitle(1);
            replace(`${pathname}?id=${TribeId}&active=1`);
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
    </CommentTitle>
  );
};

export default DetailTitle;
