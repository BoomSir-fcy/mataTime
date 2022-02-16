import React, { useCallback, useRef, useState } from 'react';
import { Crumbs } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import styled, { ThemeConsumer } from 'styled-components';
import { Box, Flex, Input, Text, Divider, Button } from 'uikit';
import SubHeader from '../components/SubHeader';
import { Tag, CancleIcon, TagText } from 'view/Me/Tribe/components/TagList';
import { tags } from './mock';
import InputTag from './InputTag';

const BoxStyled = styled(Box)`
  padding: ${({ theme }) => theme.mediaQueriesSize.padding};
  margin: ${({ theme }) => theme.mediaQueriesSize.margin};
`;

const LableBoxStyled = styled(Text)`
  width: 85px;
  line-height: 50px;
  margin-right: 8px;
`;

const InputStyled = styled(Input)<{ background?: string; pl?: string }>`
  padding-left: ${({ pl }) => pl || '16px'};
  height: 50px;
  background-color: ${({ background, theme }) =>
    background || theme.colors.input};
`;

const Post = () => {
  const [selectTags, setSelectTags] = useState([]);

  const handleSendPost = useCallback(() => {}, []);

  return (
    <Box>
      <Crumbs back />
      <SubHeader title='帖子信息' />
      <BoxStyled>
        <Flex mb='22px'>
          <LableBoxStyled>* 部落</LableBoxStyled>
          <Box>
            <InputStyled
              background='transparent'
              noShadow
              pl='0'
              readOnly
              value='部落名TODO'
            />
          </Box>
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标题</LableBoxStyled>
          <Box>
            <InputStyled noShadow value='232132' />
          </Box>
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标签</LableBoxStyled>
          <InputTag onChange={value => setSelectTags(value)} />
        </Flex>
        <LableBoxStyled mb='22px'>* 正文</LableBoxStyled>
        <RichTextEditor />
        <Flex mt='44px' justifyContent='flex-end'>
          <Button variant='secondary'>保存草稿</Button>
          <Button ml='35px' width='260px'>
            POST
          </Button>
        </Flex>
      </BoxStyled>
    </Box>
  );
};

export default Post;
