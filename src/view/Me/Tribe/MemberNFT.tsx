import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Crumbs, UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, Input } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import { FormItem, InputPanelStyle, Label } from 'view/Tribe/Create/style';
import { useImmer } from 'use-immer';
import TextArea from 'components/TextArea';
import { ARTICLE_POST_MAX_LEN } from 'config';
import { useTribeNft } from './hooks';
import { useToast } from 'hooks';
import { useDispatch } from 'react-redux';
import Dots from 'components/Loader/Dots';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';
import { getBLen } from 'utils';

const MeTribeMemberNFT = () => {
  const { t } = useTranslation();
  const { toastError } = useToast();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const { onSetTribeMemberNFT } = useTribeNft();
  const [pending, setPending] = useState(false);
  const [state, setState] = useImmer({
    name: '',
    logo: '',
    introduction: '',
    width: 0,
    height: 0,
  });

  const tribeId = parseQs.i;
  const tribeInfo = useTribeInfoById(tribeId);

  const isInitMemberNft = useMemo(() => {
    return tribeInfo?.nftInfo?.initMemberNFT;
  }, [tribeInfo?.nftInfo?.initMemberNFT]);

  const handleCreateMemberNft = useCallback(async () => {
    const len = getBLen(state.name);
    if (len < 6 || len > 30) {
      toastError(t('6~30 characters (Support English, Chinese, numbers)'));
      return false;
    }
    if (!state.logo) {
      toastError(t('Please upload a picture'));
      return false;
    }
    try {
      setPending(true);
      await onSetTribeMemberNFT({ tribeId: tribeId, ...state });
      dispatch(fetchTribeInfoAsync(tribeId));
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  }, [parseQs, state]);

  const uploadSuccess = useCallback((url, width, height) => {
    setState(p => {
      p.logo = url;
      p.width = width;
      p.height = height;
    });
  }, []);
  return (
    <Box>
      <Crumbs title={t('Member NFT')} />
      <ContentBox>
        {!isInitMemberNft ? (
          <form
            onSubmit={async e => {
              e.preventDefault();
              handleCreateMemberNft();
            }}
            action=''
          >
            <FormItem>
              <Label required>{t('Member name')}</Label>
              <Flex flexDirection='column'>
                <InputPanelStyle>
                  <Input
                    noShadow
                    required
                    scale='sm'
                    placeholder={t('Please enter the member NFT name')}
                    maxLength={30}
                    // pattern='^[0-9a-zA-Z\u4e00-\u9fa5]{6,30}$'
                    value={state.name}
                    onChange={e => {
                      const val = e.target.value;
                      if (getBLen(val) > 30) return false;
                      setState(p => {
                        p.name = val;
                      });
                    }}
                  />
                </InputPanelStyle>
                <Text mt='10px' small color='textTips'>
                  {t('6~30 characters (Support English, Chinese, numbers)')}
                </Text>
                {state.name && (
                  <Text
                    color={getBLen(state.name) > 30 ? 'failure' : 'textTips'}
                    ellipsis
                  >
                    {t('loginCountCharacters', { value: getBLen(state.name) })}
                  </Text>
                )}
              </Flex>
            </FormItem>
            <FormItem>
              <Label required>{t('NFT')}</Label>
              <UploadSingle
                url={state.logo}
                tips={
                  <Flex mt='10px' flexDirection='column'>
                    {state.width !== state.height && (
                      <Text color='textOrigin' small>
                        {t('The recommended image ratio is 1:1')}
                      </Text>
                    )}
                    <Text color='textTips' small>
                      {t(
                        'The recommended size is less than 5MB, and the image size is 1000x1000',
                      )}
                    </Text>
                  </Flex>
                }
                uploadSuccess={uploadSuccess}
              />
            </FormItem>
            <FormItem>
              <Label required>{t('Introduction to NFTs')}</Label>
              <TextArea
                showCount
                required
                rows={5}
                value={state.introduction}
                placeholder={t(
                  'Provide a detail description of your tribe member NFT',
                )}
                maxLength={ARTICLE_POST_MAX_LEN}
                onChange={e =>
                  setState(p => {
                    p.introduction = e.target.value;
                  })
                }
              />
            </FormItem>
            <Flex mt='20px' justifyContent='center'>
              <Button width='250px' scale='md' type='submit' disabled={pending}>
                {pending ? <Dots>{t('Create')}</Dots> : t('Create')}
              </Button>
            </Flex>
          </form>
        ) : (
          <CommonClaimNFT
            type='member'
            tribeId={tribeId}
            nft_id={tribeInfo?.tribe?.nft_id}
            status={tribeInfo?.status}
            tribesNftInfo={tribeInfo?.member_nft}
          />
        )}
      </ContentBox>
    </Box>
  );
};

export default MeTribeMemberNFT;
