import React, { useState } from 'react';
import { Crumbs, Icon } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Button, Flex, Card, Input } from 'uikit';
import { ContentBox } from './styled';

const TopicsCard = styled(Card)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const TopicsContentFlex = styled(Flex)`
  flex-wrap: wrap;
  margin-bottom: 30px;
  .icon-cancel {
    cursor: pointer;
  }
`;
const ContentTag = styled(Box)`
  min-width: 100px;
  padding: 5px 10px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ThemeText};
  border-radius: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: default;
`;
const InputStyled = styled(Input)`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  padding: 4px 20px;
`;
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
            <TopicsContentFlex>
              {list.map(item => (
                <Flex key={item.id} mr='20px' mb='10px' alignItems='center'>
                  <ContentTag>{item.name}</ContentTag>
                  <Icon
                    className='icon-cancel'
                    name='icon-guanbi2fill'
                    size={13}
                    color='#343434'
                    onClick={() => {
                      setList(p => {
                        return p.filter(v => v.id !== item.id);
                      });
                    }}
                  />
                </Flex>
              ))}
            </TopicsContentFlex>
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
            </Flex>
          </Flex>
        </TopicsCard>
      </ContentBox>
    </Box>
  );
};

export default MeTribeTopicsSetting;
