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
import { getBLen } from 'utils';

type InfoParams = {
  name: string;
  logo: string;
  introduction: string;
  width?: number;
  height?: number;
};

const TribeInfoForward = (props, ref) => {
  const { t } = useTranslation();
  const { info, actionType } = props;

  const [state, setState] = useImmer<InfoParams>({
    name: '',
    logo: '',
    introduction: '',
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (info?.name) {
      setState(p => {
        p.name = info.name;
        p.logo = info.logo;
        p.introduction = info.introduction;
      });
    }
  }, [info]);

  useImperativeHandle(ref, () => ({
    getInfoFrom() {
      return state;
    },
  }));

  // 临时数据
  useEffect(() => {
    if (props.handleTempInfo) props.handleTempInfo(state);
  }, [state]);

  const uploadSuccess = useCallback((url, width, height) => {
    setState(p => {
      p.logo = url;
      p.width = width;
      p.height = height;
    });
  }, []);

  return (
    <FormFlex>
      <FormItem>
        <Label required>{t('Tribe name')}</Label>
        <Flex flexDirection='column'>
          <InputPanelStyle>
            <Input
              name='required-input-name'
              disabled={actionType === actionTypes.EDIT}
              noShadow
              required
              scale='sm'
              maxLength={30}
              // pattern='^[0-9a-zA-Z\u4e00-\u9fa5]{1,30}$'
              value={state.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                const len = getBLen(val);
                if (!e.target.value.trim() || len < 6 || len > 30)
                  e.target.setCustomValidity(
                    t('6~30 characters (Support English, Chinese, numbers)'),
                  );
                else e.target.setCustomValidity('');
                if (len > 30) return false;
                setState(p => {
                  p.name = val;
                });
              }}
              onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                e.target.setCustomValidity(
                  t('6~30 characters (Support English, Chinese, numbers)'),
                );
              }}
            />
          </InputPanelStyle>
          <Text mt='5px' small color='textTips'>
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
        <Label required>{t('Tribal Logo')}</Label>
        <UploadSingle
          disabled={actionType === actionTypes.EDIT}
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
        <Label required>{t('Tribal Profile')}</Label>
        <TextArea
          showCount
          required
          rows={5}
          disabled={props.disabled}
          value={state.introduction}
          placeholder={t('Please fill in the brief introduction of the tribe')}
          maxLength={ARTICLE_POST_MAX_LEN}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const val = e.target.value;
            if (!e.target.value.trim()) {
              e.target.setCustomValidity(
                t('Please fill in the brief introduction of the tribe'),
              );
            } else e.target.setCustomValidity('');
            setState(p => {
              p.introduction = val;
            });
          }}
          onInvalid={(e: React.InvalidEvent<HTMLTextAreaElement>) => {
            e.target.setCustomValidity(
              t('Please fill in the brief introduction of the tribe'),
            );
          }}
        />
      </FormItem>
    </FormFlex>
  );
};
export const TribeInfo = React.forwardRef(TribeInfoForward);
