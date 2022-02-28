import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Crumbs, VerifyCode } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import { initialValue } from 'components/Editor/RichTextEditor/testdata';
import defaultValue from 'components/Editor/RichTextEditor/defaultValue';
import { useToast } from 'hooks';
import styled, { ThemeConsumer } from 'styled-components';
import { Box, Flex, Input, Text, Divider, Button } from 'uikit';
import SubHeader from '../components/SubHeader';
import { Tag, CancleIcon, TagText } from 'view/Me/Tribe/components/TagList';
import { tags } from './mock';
import InputTag from './InputTag';
import { Api } from 'apis';
import { Descendant, Node } from 'slate';
import useParsedQueryString from 'hooks/useParsedQueryString';
import {
  useFetchTribePostDraft,
  useFetchTribeTopicList,
} from 'store/tribe/helperHooks';
import { HUGE_ARTICLE_POST_MAX_LEN, HUGE_ARTICLE_TITLE_MAX_LEN } from 'config';
import { useTranslation } from 'contexts';
import Dots from 'components/Loader/Dots';
import DraftTips from './DraftTips';
import { FetchStatus } from 'config/types';
import { useSendPostOrDraft } from './hooks';
import { getDecodeValue } from 'utils/urlQueryPath';

const BoxStyled = styled(Box)`
  padding: ${({ theme }) => theme.mediaQueriesSize.padding};
  margin: ${({ theme }) => theme.mediaQueriesSize.margin};
`;

const LableBoxStyled = styled(Text)`
  width: 85px;
  line-height: 50px;
  margin-right: 8px;
`;

const InputStyled = styled(Input) <{
  background?: string;
  pl?: string;
  pr?: string;
}>`
  padding-left: ${({ pl }) => pl || '16px'};
  padding-right: ${({ pr }) => pr || '16px'};
  height: 50px;
  background-color: ${({ background, theme }) =>
    background || theme.colors.input};
`;

const Post = () => {
  const { toastSuccess, toastError } = useToast();
  const { t } = useTranslation();
  const [selectTags, setSelectTags] = useState<Api.Tribe.TopicInfo[]>([]);

  const { i, n } = useParsedQueryString();
  const tribe_id = Number(i);
  const tribeName = getDecodeValue(n);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [title, setTitle] = useState('');

  const [draft, setDraft] = useState(null);
  const [driftTipsVisible, setDriftTipsVisible] = useState(false);
  const { data, updateList } = useFetchTribePostDraft(tribe_id);

  useEffect(() => {
    if (data.fetchStatus === FetchStatus.SUCCESS && data.data) {
      setDriftTipsVisible(true);
    }
  }, [data.data, data.fetchStatus]);

  // 用户输入验证码
  const verifyRef = React.useRef(null);
  const editorRef = React.useRef(null);
  const [verifyVisible, setVerifyVisible] = useState(false);
  const { handle: handleSendPostAsync, loading: loadingSend } =
    useSendPostOrDraft('tribePostCreate');
  const { handle: handleCreateDraft, loading: loadingDraft } =
    useSendPostOrDraft('tribePostCreateDraft');

  const handleSendPost = useCallback(
    async (verify?: any) => {
      const status = await handleSendPostAsync(
        {
          value,
          title,
          selectTags,
          tribe_id,
        },
        verify,
      );
      if (status === FetchStatus.VERIFY) {
        setVerifyVisible(true);
      }
      if (status === FetchStatus.VERIFY_ERROR) {
        verifyRef.current?.reload();
        return;
      }
      if (status === FetchStatus.SUCCESS) {
        editorRef.current?.reSetEditor();
        setVerifyVisible(false);
      }
    },
    [value, title, selectTags, tribe_id],
  );

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
              value={tribeName}
            />
          </Box>
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标题</LableBoxStyled>
          <Flex flex={1} position='relative' alignItems='center'>
            {/* TODO: 移动端边距优化 */}
            <InputStyled
              onChange={event => {
                // if (event.target.value.length <= HUGE_ARTICLE_TITLE_MAX_LEN) {
                // }
                setTitle(event.target.value);
              }}
              noShadow
              value={title}
              placeholder='请输入帖子标题'
              pr='100px'
              width='100%'
            />
            <Box position='absolute' right='32px'>
              <Text
                color={
                  title.length > HUGE_ARTICLE_TITLE_MAX_LEN
                    ? 'failure'
                    : 'textTips'
                }
              >
                {title.length}/{HUGE_ARTICLE_TITLE_MAX_LEN}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex mb='22px'>
          <LableBoxStyled>* 标签</LableBoxStyled>
          <InputTag
            tribe_id={tribe_id}
            onChange={value => setSelectTags(value)}
          />
        </Flex>
        <LableBoxStyled mb='22px'>* 正文</LableBoxStyled>
        <RichTextEditor
          ref={editorRef}
          draft={draft}
          value={value}
          tribeId={tribe_id}
          setValue={setValue}
        />
        <Flex mt='44px' justifyContent='flex-end'>
          <Box position='relative'>
            {driftTipsVisible && (
              <DraftTips
                position='absolute'
                bottom='calc(100% + 8px)'
                right='16px'
                onCancle={() => {
                  setDriftTipsVisible(false);
                }}
                onConfirm={() => {
                  console.log(data.data);
                  // setDraft(JSON.parse(data.data.content));
                  editorRef.current?.reSetEditor(JSON.parse(data.data.content));
                  setTitle(data.data.title);
                  setDriftTipsVisible(false);
                }}
              />
            )}
            <Button
              onClick={() =>
                handleCreateDraft({ value, title, selectTags, tribe_id })
              }
              variant='secondary'
            >
              {loadingDraft ? <Dots>保存草稿</Dots> : '保存草稿'}
            </Button>
          </Box>
          <Button onClick={() => handleSendPost()} ml='35px' width='260px'>
            {loadingSend ? <Dots>POST</Dots> : 'POST'}
          </Button>
        </Flex>
      </BoxStyled>
      {verifyVisible && (
        <VerifyCode
          ref={verifyRef}
          visible={verifyVisible}
          onClose={() => setVerifyVisible(false)}
          onSubmit={data => handleSendPost(data)}
        />
      )}
    </Box>
  );
};

export default Post;
