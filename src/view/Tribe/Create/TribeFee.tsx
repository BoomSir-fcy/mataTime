import React, { useCallback, useImperativeHandle, useState } from 'react';
import { UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Card, Input } from 'uikit';
import { useImmer } from 'use-immer';
import { FormFlex, FormItem, Label } from './style';
import RadioGroup from 'uikit/components/Radio/RadioGroup';

const TribeTypeCard = styled(Card)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const TribeFee = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [tribeType, setTribeType] = useState(2);
  const [proState, setProState] = useImmer({
    amount: 0,
    timing: 1,
    time: 0,
  });
  const typeOptions = [
    { value: 1, label: t('Basic') },
    { value: 2, label: t('Pro') },
  ];

  useImperativeHandle(ref, () => ({
    getFeeFrom() {
      return proState;
    },
  }));

  return (
    <FormFlex>
      <FormItem>
        <Label required>{t('部落类型')}</Label>
        <Flex maxWidth='calc(100% - 100px)' flexDirection='column'>
          <RadioGroup
            value={tribeType}
            options={typeOptions}
            onChange={val => {
              setTribeType(val);
            }}
          />
          {tribeType === 2 && (
            <TribeTypeCard isRadius>
              <FormItem alignItems='center'>
                <Label>{t('收费设置：')}</Label>
                <Input placeholder={t('请输入金额')} />
              </FormItem>
              <FormItem alignItems='center'>
                <Label>{t('计时方式：')}</Label>
                <RadioGroup
                  value={proState.timing}
                  options={[
                    { value: 1, label: t('永久') },
                    { value: 2, label: t('以加入部落的时间计时') },
                    { value: 3, label: t('以创建部落时间计时') },
                  ]}
                  onChange={val => {
                    setProState(p => {
                      p.timing = val;
                    });
                  }}
                />
              </FormItem>
              <FormItem alignItems='center'>
                <Label>{t('有效时间：')}</Label>
                <Input placeholder={t('请输入天数')} />
              </FormItem>
            </TribeTypeCard>
          )}
        </Flex>
      </FormItem>
    </FormFlex>
  );
});

export default TribeFee;
