import React, { useState } from 'react';
import { Flex, Text, Button } from 'uikit';
import { SortIcon } from 'view/Post/components';
import { CommentTitle } from 'view/Post/style';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';

const Tab = styled(Flex)`
  align-items: baseline;
  .tabFont {
    color: ${({ theme }) => theme.colors.textTips};
    font-size: 14px;
  }
  .active {
    color: ${({ theme }) => theme.colors.white_black};
    font-size: 18px;
    font-weight: bold;
  }
`;

const DetailTitle = () => {
  const { t } = useTranslation();
  const [ActiveTitle, setActiveTitle] = useState(1);
  const [sortTime, setSortTime] = useState(0);
  const [sortLike, setSortLike] = useState(1);

  const changeSortTime = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortTime(sortTime === 1 ? 2 : 1);
    setSortLike(0);
    // initList();
  };
  const changeSortLike = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortLike(sortLike === 1 ? 2 : 1);
    setSortTime(0);
    // initList();
  };

  return (
    <CommentTitle justifyContent='space-between' alignItems='center'>
      <Tab>
        <Text
          mr='36px'
          className={ActiveTitle === 1 ? 'active' : 'tabFont'}
          onClick={() => setActiveTitle(1)}
        >
          {t('homeTabAll')}
        </Text>
        <Text
          className={ActiveTitle === 2 ? 'active' : 'tabFont'}
          onClick={() => setActiveTitle(2)}
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
