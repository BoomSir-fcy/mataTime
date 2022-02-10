import React from 'react';
import { Icon } from 'components';
import styled from 'styled-components';
import { Flex, Text } from 'uikit';

const TopicsContentFlex = styled(Flex)`
  flex-wrap: wrap;
`;
const Tag = styled(Flex)`
  align-items: center;
  padding: 5px 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.ThemeText};
  border-radius: 10px;
  text-align: center;
  .text {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: default;
  }
  .icon-cancel {
    cursor: pointer;
  }
`;
type TagItem = {
  id: number;
  name: string;
};

const TagList: React.FC<{ list?: TagItem[]; onDelete?: (id: number) => void }> =
  React.memo(({ list, onDelete }) => {
    return (
      <TopicsContentFlex>
        {list.map(item => (
          <Tag key={item.id}>
            <Text className='text'>{item.name}</Text>
            <Icon
              className='icon-cancel'
              name='icon-guanbi2fill'
              size={13}
              color='#343434'
              onClick={() => {
                onDelete(item.id);
              }}
            />
          </Tag>
        ))}
      </TopicsContentFlex>
    );
  });

export default TagList;
