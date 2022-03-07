import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Crumbs, VerifyCode } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import { initialValue } from 'components/Editor/RichTextEditor/testdata';
import defaultValue from 'components/Editor/RichTextEditor/defaultValue';
import { useToast } from 'hooks';
import throttle from 'lodash/throttle';
import styled, { ThemeConsumer } from 'styled-components';
import { Box, Flex, Input, Text, Divider, Button, useTooltip } from 'uikit';
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
import parseContentInfo from 'components/Editor/RichTextEditor/tools/parseContentInfo';
import { useHistory } from 'react-router-dom';

const BoxStyled = styled(Box)`
  padding: ${({ theme }) => theme.mediaQueriesSize.padding};
  margin: ${({ theme }) => theme.mediaQueriesSize.margin};
`;

const LableBoxStyled = styled(Text)`
  width: 85px;
  line-height: 50px;
  margin-right: 8px;
`;

const InputStyled = styled(Input)<{
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

const TRIBE_POST_LOCAL_STORAGE_KEY = 'tribePostLocalStorage';

const getStorageData = () => {
  const storageDataStr = localStorage.getItem(TRIBE_POST_LOCAL_STORAGE_KEY);
  const storageData = storageDataStr ? JSON.parse(storageDataStr) : {};
  return storageData;
};
const storageData = getStorageData();
const setStorageData = (id, value) => {
  // if (value?.length > 1 || value.map(n => Node.string(n)).join('\n') > 1) {
  //   const data = getStorageData();
  //   localStorage.setItem(
  //     TRIBE_POST_LOCAL_STORAGE_KEY,
  //     JSON.stringify({
  //       ...data,
  //       [id]: value,
  //     }),
  //   );
  // }
  const data = getStorageData();
  localStorage.setItem(
    TRIBE_POST_LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...data,
      [id]: value,
    }),
  );
};

const Post = () => {
  const { toastSuccess, toastError } = useToast();
  const { t } = useTranslation();
  const [selectTags, setSelectTags] = useState<Api.Tribe.TopicInfo[]>([]);
  const { push } = useHistory();

  const { i, n } = useParsedQueryString();
  const tribe_id = Number(i);
  const tribeName = getDecodeValue(n);

  const [value, setValue] = useState<Descendant[]>(
    storageData[i] || defaultValue,
  );

  const handleSaveStorage = useCallback(
    throttle((id, value) => setStorageData(id, value), 1000 * 5),
    [],
  );
  useEffect(() => {
    if (value && i) {
      handleSaveStorage(i, value);
      // throttle(setStorageData, 1000 * 5)
      // setStorageData()
    }
  }, [i, value, handleSaveStorage]);

  const [title, setTitle] = useState('');

  const [draft, setDraft] = useState(null);
  const [driftTipsVisible, setDriftTipsVisible] = useState(false);
  const { data, updateList } = useFetchTribePostDraft(tribe_id);

  useEffect(() => {
    if (
      data.fetchStatus === FetchStatus.SUCCESS &&
      (data.data?.content || data.data?.title || data.data?.topics)
    ) {
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
      const { imageList, userIdList } = parseContentInfo(value);
      const status = await handleSendPostAsync(
        {
          value,
          title,
          selectTags,
          tribe_id,
          imageList,
          userIdList,
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
        setStorageData(tribe_id, '');
        push(`/tribe/detail?id=${tribe_id}`);
      }
    },
    [value, title, selectTags, tribe_id],
  );

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <DraftTips
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
    />,
    {
      placement: 'auto',
      trigger: 'click',
      stylePadding: '0',
      hideArrow: true,
      tooltipPadding: 0,
    },
  );

  return (
    <Box>
      <Crumbs back />
      <SubHeader title={t('Post information')} />
      <BoxStyled>
        <Flex mb='22px'>
          <LableBoxStyled>* {t('Tribe')}</LableBoxStyled>
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
          <LableBoxStyled>* {t('Title')}</LableBoxStyled>
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
              placeholder={t("Place enter the post's title")}
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
          <LableBoxStyled>* {t('Tag')}</LableBoxStyled>
          {/* <InputTag
            tribe_id={tribe_id}
            onChange={value => {
              console.log(value);
              setSelectTags(value);
            }}
          /> */}
        </Flex>
        <LableBoxStyled mb='22px'>* {t('Document')}</LableBoxStyled>
        <RichTextEditor
          ref={editorRef}
          draft={draft}
          value={value}
          tribeId={tribe_id}
          setValue={setValue}
        />
        <Flex mt='44px' justifyContent='flex-end'>
          <Box>
            {/* {driftTipsVisible && (
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
            )} */}
            {driftTipsVisible && tooltip}
            <span
              style={{ display: 'inline-block', paddingTop: '25px' }}
              ref={targetRef}
            ></span>
            <Button
              onClick={() =>
                handleCreateDraft({ value, title, selectTags, tribe_id })
              }
              variant='secondary'
            >
              {loadingDraft ? <Dots>{t('Saving')}</Dots> : t('Save draft')}
            </Button>
          </Box>
          <Button onClick={() => handleSendPost()} ml='35px' width='260px'>
            {loadingSend ? <Dots>{t('POSTING')}</Dots> : t('POST')}
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
