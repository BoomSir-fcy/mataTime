import React, { useCallback, useState } from 'react';
import { Crumbs, UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex, Image, Input, LinkExternal } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import {
  FormItem,
  InputPanelStyle,
  Label,
  TextareaStyled,
} from 'view/Tribe/Create/style';
import { useImmer } from 'use-immer';
import TextArea from 'components/TextArea';
import { ARTICLE_POST_MAX_LEN } from 'config';

const MeTribeMemberNFT = () => {
  const { t } = useTranslation();
  const [showNFTInfo, setShowNFTInfo] = useState(false);
  const [state, setState] = useImmer({
    name: '',
    url: '',
    introduction: '',
  });

  const uploadSuccess = useCallback(url => {
    console.log('上传成功=======》', url);
    setState(p => {
      p.url = url;
    });
  }, []);
  return (
    <Box>
      <Crumbs title={t('Member NFT')} />
      <ContentBox>
        {!showNFTInfo ? (
          <>
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
                    pattern='^[0-9a-zA-Z\u4e00-\u9fa5]{4,15}$'
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
                url={state.url}
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
              <Button
                width='250px'
                scale='md'
                onClick={() => {
                  setShowNFTInfo(true);
                }}
              >
                {t('Create')}
              </Button>
            </Flex>
          </>
        ) : (
          <CommonClaimNFT type='member' />
        )}
      </ContentBox>
    </Box>
  );
};

export default MeTribeMemberNFT;
