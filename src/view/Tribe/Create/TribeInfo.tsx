import React, { useCallback, useImperativeHandle } from 'react';
import { UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Input } from 'uikit';
import { useImmer } from 'use-immer';
import { FormFlex, FormItem, InputPanelStyle, Label } from './style';

type InfoParams = {
  name: string;
  url: string;
  introduction: string;
};
const TribeInfo = React.forwardRef((props, ref) => {
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
        <Label required>{t('部落名称')}</Label>
        <Flex flexDirection='column'>
          <InputPanelStyle>
            <Input
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
            {t('4~15个字符，支持中英文、数字')}
          </Text>
        </Flex>
      </FormItem>
      <FormItem>
        <Label required>{t('部落LOGO')}</Label>
        <UploadSingle
          url={state.url}
          tips={t('建议图片比例1:1')}
          uploadSuccess={uploadSuccess}
        />
      </FormItem>
      <FormItem>
        <Label required>{t('部落简介')}</Label>
        <textarea
          required
          value={state.introduction}
          placeholder={t('请填写部落的简介介绍')}
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
});

export default TribeInfo;
