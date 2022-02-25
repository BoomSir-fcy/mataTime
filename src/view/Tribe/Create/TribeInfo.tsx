import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Input } from 'uikit';
import { useImmer } from 'use-immer';
import { FormFlex, FormItem, InputPanelStyle, Label } from './style';
import { ARTICLE_POST_MAX_LEN } from 'config';
import TextArea from 'components/TextArea';
import { actionTypes } from './type';

type InfoParams = {
  name: string;
  logo: string;
  introduction: string;
};

const TribeInfoForward = (props, ref) => {
  const { t } = useTranslation();
  const { info, actionType } = props;

  const [state, setState] = useImmer<InfoParams>({
    name: '',
    logo: '',
    introduction: '',
  });

  useEffect(() => {
    if (info?.name) {
      setState(p => {
        p.name = info.name;
        p.logo = info.logo;
        p.introduction = info.introduction;
      });
    }
  }, [props.info]);

  useImperativeHandle(ref, () => ({
    getInfoFrom() {
      return state;
    },
  }));

  const uploadSuccess = useCallback(url => {
    setState(p => {
      p.logo = url;
    });
  }, []);
  return (
    <FormFlex>
      <FormItem>
        <Label required>{t('Tribe name')}</Label>
        <Flex flexDirection='column'>
          <InputPanelStyle>
            <Input
              disabled={actionType === actionTypes.EDIT}
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
          disabled={actionType === actionTypes.EDIT}
          url={state.logo}
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
