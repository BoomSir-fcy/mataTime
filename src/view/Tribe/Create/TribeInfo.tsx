import React, { useCallback, useImperativeHandle } from 'react';
import { UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Input } from 'uikit';
import { useImmer } from 'use-immer';
import {
  FormFlex,
  FormItem,
  InputPanelStyle,
  Label,
  TextareaStyled,
} from './style';
import { ARTICLE_POST_MAX_LEN } from 'config';
import TextArea from 'components/TextArea';

type InfoParams = {
  name: string;
  url: string;
  introduction: string;
};

const TribeInfoForward = (props, ref) => {
  const { t } = useTranslation();

  const [state, setState] = useImmer<InfoParams>({
    name: '',
    url: '',
    introduction: '',
  });

  useImperativeHandle(ref, () => ({
    getInfoFrom() {
      return state;
    },
  }));

  const uploadSuccess = useCallback(url => {
    console.log('上传成功=======》', url);
    setState(p => {
      p.url = url;
    });
  }, []);
  return (
    <FormFlex>
      <FormItem>
        <Label required>{t('Tribe name')}</Label>
        <Flex flexDirection='column'>
          <InputPanelStyle>
            <Input
              disabled={props.disabled}
              noShadow
              required
              scale='sm'
              maxLength={30}
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
        <Label required>{t('Tribal Logo')}</Label>
        <UploadSingle
          disabled={props.disabled}
          url={state.url}
          tips={t(
            'The recommended size is less than 5MB, and the image size is 100x100',
          )}
          uploadSuccess={uploadSuccess}
        />
      </FormItem>
      <FormItem>
        <Label required>{t('Tribal Profile')}</Label>
        <TextArea
          showCount
          required
          rows={5}
          disabled={props.disabled}
          value={state.introduction}
          placeholder={t('Please fill in the brief introduction of the tribe')}
          maxLength={ARTICLE_POST_MAX_LEN}
          onChange={e =>
            setState(p => {
              p.introduction = e.target.value;
            })
          }
        />
      </FormItem>
    </FormFlex>
  );
};
export const TribeInfo = React.forwardRef(TribeInfoForward);
