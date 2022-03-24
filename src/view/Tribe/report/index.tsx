import React, { useCallback, useState } from 'react';
import { ModalWrapper, UploadMultiple, UploadSingle } from 'components';
import { Button, Flex, Input, Text } from 'uikit';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { TribeInfo } from 'store/tribe/type';
import { useToast } from 'hooks';
import { BASE_URL } from 'config';
import { Api } from 'apis';
import { AppDispatch } from 'libs/mini-swap/state';
import Dots from 'components/Loader/Dots';

const ContentFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 30vw;
  }
`;
const ItemFlex = styled(Flex)`
  flex-direction: column;
  margin-bottom: 16px;
`;
const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.card};
  border: none;
  outline: none;
  resize: none;
`;
const InputStyle = styled(Input)`
  padding: 0px 16px;
  color: ${({ theme }) => theme.colors.text};
  &::placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textTips};
  }
`;
export const ReportTribeModal: React.FC<{
  tribeInfo: TribeInfo;
  visible: boolean;
  onClose: () => void;
}> = React.memo(({ tribeInfo, visible, onClose }) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [pending, setPending] = useState(false);
  const [state, setState] = useImmer<Api.Tribe.ReportParams>({
    reason: '',
    image: '',
    post_title: '',
    post_url: '',
  });
  const onSubmit = useCallback(async () => {
    if (!state.reason.trim()) {
      toastError(t('Please fill in the reasons for reporting'));
      return false;
    }
    const url = state.post_url.trim();
    const title = state.post_title.trim();
    const postUrl = `${BASE_URL}tribe/postdetail?i=`;
    if (url && !title) {
      toastError(t('Please fill in the correct post title'));
      return false;
    }
    if (title && !url) {
      toastError(t('Please fill in the correct post link'));
      return false;
    }
    if (url && url.indexOf(postUrl) === -1) {
      toastError(t('Please fill in the correct post link'));
      return false;
    }
    setPending(true);
    let params = {
      ...state,
      tribe_id: Number(tribeInfo?.tribe_id),
    };
    let postId = '';
    if (url) {
      postId = url.substring(url.indexOf('?') + 1);
      postId = postId.substring(postId.indexOf('i') + 2);
      params = { ...params, post_id: Number(postId) };
    }
    try {
      const res = await Api.TribeApi.reportTribePost(params);
      if (Api.isSuccess(res)) {
        setState({
          reason: '',
          image: '',
          post_title: '',
          post_url: '',
        });
        toastSuccess(
          t('Submitted successfully, waiting for review to complete'),
        );
        onClose();
      }
      setPending(false);
    } catch (e) {
      setPending(false);
    }
  }, [tribeInfo, state]);

  return (
    <ModalWrapper
      creactOnUse
      title={t('ReportTribe', { value: tribeInfo?.tribe?.name || '' })}
      visible={visible}
      setVisible={onClose}
    >
      <ContentFlex>
        <ItemFlex>
          <Text mb='4px'>* {t('Reason for reporting')}</Text>
          <TextArea
            rows={6}
            maxLength={200}
            placeholder={t('Please fill in the reasons for reporting')}
            value={state.reason}
            onChange={e => {
              setState(p => {
                p.reason = e.target.value;
              });
            }}
          />
        </ItemFlex>
        <ItemFlex>
          <Text mb='4px'>{t('Additional pictures (optional)')}</Text>
          <UploadMultiple
            multiple
            scale='sm'
            maxNum={3}
            url={state.image ? state.image.split(',') : []}
            uploadSuccess={url => {
              setState(p => {
                p.image = url.join(',');
              });
            }}
          />
        </ItemFlex>
        <ItemFlex>
          <Text mb='4px'>{t('Report a post (optional)')}</Text>
          <InputStyle
            noShadow
            style={{ marginBottom: '8px' }}
            maxLength={50}
            placeholder={t('Please fill in the correct post title')}
            value={state.post_title}
            onChange={e => {
              setState(p => {
                p.post_title = e.target.value;
              });
            }}
          />
          <InputStyle
            noShadow
            placeholder={t('Please fill in the correct post link')}
            value={state.post_url}
            onChange={e => {
              setState(p => {
                p.post_url = e.target.value;
              });
            }}
          />
        </ItemFlex>
        <ItemFlex>
          <Text color='textTips' small>
            {t(
              'Note: Do not maliciously report! Sufficient submissions will facilitate processing.',
            )}
          </Text>
        </ItemFlex>
        <Flex justifyContent='center'>
          <Button disabled={pending} onClick={onSubmit}>
            {pending ? (
              <Dots>{t('confirm submission')}</Dots>
            ) : (
              t('confirm submission')
            )}
          </Button>
        </Flex>
      </ContentFlex>
    </ModalWrapper>
  );
});
