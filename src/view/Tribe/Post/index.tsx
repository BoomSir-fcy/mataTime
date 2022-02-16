import React from 'react';
import { Crumbs } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import styled, { ThemeConsumer } from 'styled-components';
import { Box, Flex, Input, Text, Divider, Card } from 'uikit';
import SubHeader from '../components/SubHeader';

const BoxStyled = styled(Box)`
  padding: ${({ theme }) => theme.mediaQueriesSize.padding};
  margin: ${({ theme }) => theme.mediaQueriesSize.margin};
`;

const LableBoxStyled = styled(Text)`
  width: 85px;
  line-height: 50px;
  margin-right: 8px;
`;

const InputStyled = styled(Input)<{ background?: string }>`
  padding-left: 16px;
  height: 50px;
  background-color: ${({ background, theme }) =>
    background || theme.colors.input};
`;

const TagBoxStyled = styled(Card)`
  background-color: ${({ theme }) => theme.colors.input};
`;

const Post = () => {
  return (
    <Box>
      <Crumbs back />
      <SubHeader title='帖子信息' />
      <BoxStyled>
        <Flex mb='22px'>
          <LableBoxStyled>* 部落</LableBoxStyled>
          <InputStyled
            background='transparent'
            noShadow
            readOnly
            value='部落名TODO'
          />
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标题</LableBoxStyled>
          <Box>
            <InputStyled noShadow pl='1.5em' value='' />
          </Box>
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标签</LableBoxStyled>
          <TagBoxStyled isRadius>
            <InputStyled noShadow pl='1.5em' value='' />
            <Divider color='borderThemeColor' />
            <Box>1212112</Box>
            {/* <InputStyled noShadow pl='1.5em' value='' /> */}
          </TagBoxStyled>
        </Flex>
        <LableBoxStyled mb='22px'>* 正文</LableBoxStyled>
        <RichTextEditor />
      </BoxStyled>
    </Box>
  );
};

export default Post;
