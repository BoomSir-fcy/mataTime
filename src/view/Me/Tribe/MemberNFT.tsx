import React, { useCallback, useEffect, useState } from 'react';
import { Crumbs, UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, Image, Input, LinkExternal } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import { FormItem, InputPanelStyle, Label } from 'view/Tribe/Create/style';
import { useImmer } from 'use-immer';
import TextArea from 'components/TextArea';
import { ARTICLE_POST_MAX_LEN } from 'config';
import { useTribeNft } from './hooks';
import { useStore, storeAction } from 'store';
import { useToast } from 'hooks';
import { useDispatch } from 'react-redux';
import { fetchTribeNftInfo } from 'store/tribe';
import Dots from 'components/Loader/Dots';

const MeTribeMemberNFT = () => {
  const { t } = useTranslation();
  const { toastError } = useToast();
  const dispatch = useDispatch();
  const { onSetTribeMemberNFT } = useTribeNft();
  const [pending, setPending] = useState(false);
  const [state, setState] = useImmer({
    name: '',
    logo: '',
    introduction: '',
  });

  const isInitMemberNft = useStore(p => p.tribe.tribesNftInfo.initMemberNFT);
  const tribeId = useStore(p => p.tribe.tribeId);

  useEffect(() => {
    if (tribeId) dispatch(fetchTribeNftInfo({ tribeId }));
  }, [tribeId]);

  const handleCreateMemberNft = useCallback(async () => {
    if (!state.logo) {
      toastError(t('上传图片'));
      return false;
    }
    try {
      setPending(true);
      await onSetTribeMemberNFT({ tribeId, ...state });
      dispatch(fetchTribeNftInfo({ tribeId }));
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  }, [tribeId, state]);

  const uploadSuccess = useCallback(url => {
    setState(p => {
      p.logo = url;
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
                    maxLength={15}
                    pattern='^[0-9a-zA-Z\u4e00-\u9fa5]{6,30}$'
                    value={state.name}
                    onChange={e => {
                      const val = e.target.value;
                      setState(p => {
                        p.name = val;
                      });
                    }}
                  />
                </InputPanelStyle>
                <Text mt='10px' small color='textTips'>
                  {t('6~30 characters (Support English, Chinese, numbers)')}
                </Text>
              </Flex>
            </FormItem>
            <FormItem>
              <Label required>{t('NFT')}</Label>
              <UploadSingle
                url={state.logo}
                tips={t(
                  'The recommended size is less than 5MB, and the image size is 100x100',
                )}
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
          <CommonClaimNFT type='member' tribeId={tribeId} />
        )}
      </ContentBox>
    </Box>
  );
};

export default MeTribeMemberNFT;
