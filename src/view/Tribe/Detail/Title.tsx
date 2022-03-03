import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from 'uikit';
import { SortIcon } from 'view/Post/components';
import { CommentTitle } from 'view/Post/style';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { useStore } from 'store';
import { fetchTribePostAsync } from 'store/tribe';
import { useDispatch } from 'react-redux';

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
  // page_size: number;
  tabsChange?: (item) => void;
}
const DetailTitle: React.FC<DetailTitlePorps> = ({ TribeId, tabsChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ActiveTitle, setActiveTitle] = useState(0);
  const [sortTime, setSortTime] = useState(1);
  const [sortLike, setSortLike] = useState(0);
  const { top } = useStore(p => p.tribe.postList);

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
          }}
        >
          {t('homeTabAll')}
        </Text>
        <Text
          className={ActiveTitle === 1 ? 'active' : 'tabFont'}
          onClick={() => {
            setActiveTitle(1);
          }}
        >
          {t('精选')}
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
