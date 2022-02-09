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
            {t('4~15 characters, support Chinese and English, numbers')}
          </Text>
        </Flex>
      </FormItem>
      <FormItem>
        <Label required>{t('Tribal Logo')}</Label>
        <UploadSingle
          disabled={props.disabled}
          url={state.url}
          tips={t('The recommended image ratio is 1:1')}
          uploadSuccess={uploadSuccess}
        />
      </FormItem>
      <FormItem>
        <Label required>{t('Tribal Profile')}</Label>
        <TextareaStyled
          required
          disabled={props.disabled}
          value={state.introduction}
          placeholder={t('Please fill in the brief introduction of the tribe')}
          maxLength={140}
          rows={5}
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
