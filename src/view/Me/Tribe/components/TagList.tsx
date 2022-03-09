import React from 'react';
import { Icon, iocnType } from 'components';
import styled from 'styled-components';
import { Flex, Text, TextProps } from 'uikit';

const TopicsContentFlex = styled(Flex)`
  flex-wrap: wrap;
`;
export const Tag = styled(Flex)<{ cursor?: string; mr?: string; mb?: string }>`
  align-items: center;
  padding: 5px 10px;
  margin-right: ${({ mr }) => mr || '20px'};
  margin-bottom: ${({ mb }) => mb || '20px'};
  border: 1px solid ${({ theme }) => theme.colors.ThemeText};
  border-radius: 10px;
  text-align: center;
  cursor: ${({ cursor }) => cursor || 'default'};
  .text {
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: inherit;
    white-space: nowrap;
  }
  .icon-cancel {
    /* margin-left: 10px; */
    cursor: pointer;
  }
`;
type TagItem = {
  id: number;
  name: string;
};

export const CancleIcon: React.FC<Partial<iocnType>> = props => (
  <Icon
    className='icon-cancel'
    name='icon-guanbi2fill'
    size={13}
    margin='0 0 0 10px'
    color='textAssist'
    {...props}
  />
);

export const TagText: React.FC<TextProps> = props => (
  <Text className='text' {...props} />
);

const TagList: React.FC<{
  list?: Api.Tribe.TopicInfo[];
  onDelete?: (id: number) => void;
  mr?: string;
  mb?: string;
}> = React.memo(({ list, onDelete, mr, mb }) => {
  return (
    <TopicsContentFlex>
      {list.map(item => (
        <Tag mr={mr} mb={mb} key={item.id}>
          <TagText>{item.topic}</TagText>
          <CancleIcon
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
