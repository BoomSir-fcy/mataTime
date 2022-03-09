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
import { useWeb3React } from '@web3-react/core';
import useConnectWallet from 'hooks/useConnectWallet';

const MeTribeMemberNFT = () => {
  const { t } = useTranslation();
  const { toastError } = useToast();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
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
      toastError(
        `${t('Tribe name')} ${t(
          '6~30 characters (Support English, Chinese, numbers)',
        )}`,
      );
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      const len = getBLen(val);
                      if (!e.target.value.trim() || len < 6 || len > 30)
                        e.target.setCustomValidity(
                          t(
                            '6~30 characters (Support English, Chinese, numbers)',
                          ),
                        );
                      else e.target.setCustomValidity('');
                      if (len > 30) return false;
                      setState(p => {
                        p.name = val;
                      });
                    }}
                    onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                      e.target.setCustomValidity(
                        t(
                          '6~30 characters (Support English, Chinese, numbers)',
                        ),
                      );
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  if (!e.target.value.trim()) {
                    e.target.setCustomValidity(
                      t(
                        'Provide a detail description of your tribe member NFT',
                      ),
                    );
                  } else e.target.setCustomValidity('');
                  setState(p => {
                    p.introduction = e.target.value;
                  });
                }}
                onInvalid={(e: React.InvalidEvent<HTMLTextAreaElement>) => {
                  e.target.setCustomValidity(
                    t('Provide a detail description of your tribe member NFT'),
                  );
                }}
              />
            </FormItem>
            <Flex mt='20px' justifyContent='center'>
              {!account && (
                <Button
                  width='250px'
                  scale='md'
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    onConnectWallet();
                  }}
                >
                  {t('Connect Wallet')}
                </Button>
              )}
              {account && (
                <Button
                  width='250px'
                  scale='md'
                  type='submit'
                  disabled={pending}
                >
                  {pending ? <Dots>{t('Create')}</Dots> : t('Create')}
                </Button>
              )}
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
