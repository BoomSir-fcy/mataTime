import React, { useState } from 'react';
import { Crumbs, Icon } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Button, Flex, Card, Input } from 'uikit';
import { ContentBox } from './styled';
import TagList from './components/TagList';

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
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState('');
  return (
    <Box>
      <Crumbs title={t('Topics Setting')} />
      <ContentBox>
        <TopicsCard isRadius>
          <Flex flexDirection='column'>
            <TagList
              list={list}
              onDelete={id => {
                setList(p => {
                  return p.filter(v => v.id !== id);
                });
              }}
            />
            <Flex alignItems='center'>
              <InputStyled
                noShadow
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
                    const arr = [...list];
                    arr.push({ id: arr.length + 1, name: inputVal });
                    setList(arr);
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
