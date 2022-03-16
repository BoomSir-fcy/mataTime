import React, { useCallback, useEffect, useState } from 'react';
import { Crumbs, Icon } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Button, Flex, Card, Input } from 'uikit';
import { ContentBox } from './styled';
import TagList from './components/TagList';
import { Api } from 'apis';
import { useFetchTribeTopicList } from 'store/tribe/helperHooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { FetchStatus } from 'config/types';
import { AppDispatch } from 'libs/mini-swap/state';

const TopicsCard = styled(Card)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const InputStyled = styled(Input)`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  padding: 4px 20px;
`;

const TRIBE_TOPICS_MAX = 100;

const MeTribeTopicsSetting = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Api.Tribe.TopicInfo[]>([]);
  const [inputVal, setInputVal] = useState('');
  const { i } = useParsedQueryString();
  const tribe_id = Number(i);

  const { data: topicData, updateList } = useFetchTribeTopicList(tribe_id);

  useEffect(() => {
    if (topicData.fetchStatus === FetchStatus.SUCCESS) {
      setList(topicData.list);
    }
  }, [topicData.fetchStatus, topicData.list]);

  const handleAddTopic = useCallback(async () => {
    const res = await Api.TribeApi.tribeTopicCreate({
      tribe_id,
      topics: [inputVal],
    });
    if (Api.isSuccess(res)) {
      updateList(tribe_id);
    }
  }, [tribe_id, inputVal, updateList]);

  const handleDelTopic = useCallback(
    async id => {
      const res = await Api.TribeApi.tribeTopicDel({ tribe_id, ids: [id] });
      if (Api.isSuccess(res)) {
        updateList(tribe_id);
      }
    },
    [tribe_id, updateList],
  );

  return (
    <Box>
      <Crumbs title={t('Topics Setting')} />
      <ContentBox>
        <TopicsCard isRadius>
          <Flex flexDirection='column'>
            <TagList
              list={list}
              onDelete={id => {
                handleDelTopic(id);
              }}
            />
            <Flex alignItems='center'>
              <InputStyled
                noShadow
                maxLength={20}
                placeholder={t('Please enter a subject')}
                value={inputVal}
                onChange={e => {
                  setInputVal(e.target.value);
                }}
              />
              <Button
                ml='20px'
                onClick={() => {
                  if (inputVal.trim()) {
                    handleAddTopic();
                    // const arr = [...list];
                    // arr.push({ id: arr.length + 1, name: inputVal });
                    // setList(arr);
                    setInputVal('');
                  }
                }}
              >
                {t('Add To')}
              </Button>
              <Text
                ml='10px'
                color='textTips'
                small
              >{`${list.length}/${TRIBE_TOPICS_MAX}`}</Text>
            </Flex>
          </Flex>
        </TopicsCard>
      </ContentBox>
    </Box>
  );
};

export default MeTribeTopicsSetting;
