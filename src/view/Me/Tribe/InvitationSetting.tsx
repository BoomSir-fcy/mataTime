import React, { useState } from 'react';
import { Crumbs, Select } from 'components';
import { Box, Text, Button, Flex, Input } from 'uikit';
import { FormItem, InputPanelStyle, Label } from 'view/Tribe/Create/style';
import { ContentBox } from './styled';
import { useTranslation } from 'contexts';
import RadioGroup from 'uikit/components/Radio/RadioGroup';
import {
  PATTERN_AMOUNT,
  PATTERN_NUMBER,
  PATTERN_ZERO_ONEHUNDRED,
} from 'view/Tribe/Create/utils/pattern';
import { useImmer } from 'use-immer';

const MeTribeInvitationSetting = () => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [state, setState] = useImmer({
    amount: '',
    timing: 2,
    validDate: '',
    chargeRatio: '50',
  });
  const CoinOptions = [
    { value: 1, label: t('BNB') },
    { value: 2, label: t('USDT') },
  ];
  return (
    <Box>
      <Crumbs title={t('Invitation Setting')}>
        {isEdit ? (
          <Flex>
            <Button
              mr='20px'
              onClick={() => {
                setIsEdit(false);
              }}
            >
              {t('TribeCancel')}
            </Button>
            <Button
              onClick={() => {
                console.log('保存');
                setIsEdit(false);
              }}
            >
              {t('TribeSave')}
            </Button>
          </Flex>
        ) : (
          <Button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            {t('TribeEdit')}
          </Button>
        )}
      </Crumbs>
      <ContentBox>
        <FormItem className='mobile-nowrap' alignItems='center'>
          <Label>{t('Charge settings')}</Label>
          <InputPanelStyle>
            <Flex justifyContent='space-between' alignItems='center'>
              <Input
                disabled={!isEdit}
                noShadow
                required
                scale='sm'
                placeholder={t('Please enter the amount')}
                inputMode='decimal'
                pattern={PATTERN_AMOUNT}
                value={state.amount}
                onChange={e => {
                  const val = e.target.value;
                  if (e.currentTarget.validity.valid) {
                    setState(p => {
                      p.amount = val;
                    });
                  }
                }}
              />
              <Select
                scale='xs'
                disabled={!isEdit}
                options={CoinOptions}
                defaultId={1}
                onChange={(val: any) => console.log(val)}
              />
            </Flex>
          </InputPanelStyle>
        </FormItem>
        <FormItem className='mobile-nowrap' alignItems='center'>
          <Label>{t('Timing method')}</Label>
          <RadioGroup
            disabled={!isEdit}
            value={state.timing}
            options={[
              {
                value: 2,
                label: t('Timed by the time of joining the clan'),
              },
            ]}
            onChange={val => {
              setState(p => {
                p.timing = val;
              });
            }}
          />
        </FormItem>
        <FormItem className='mobile-nowrap' alignItems='center'>
          <Label>{t('Effective time')}</Label>
          <InputPanelStyle>
            <Flex justifyContent='space-between' alignItems='center'>
              <Input
                disabled={!isEdit}
                noShadow
                required
                scale='sm'
                placeholder={t('Please enter the number of days')}
                inputMode='decimal'
                pattern={PATTERN_NUMBER}
                value={state.validDate}
                onChange={e => {
                  const val = e.target.value;
                  if (e.currentTarget.validity.valid) {
                    setState(p => {
                      p.validDate = val;
                    });
                  }
                }}
              />
              <Text>{t('d')}</Text>
            </Flex>
          </InputPanelStyle>
        </FormItem>
        <Flex flexDirection='column' width='100%' margin='40px 0'>
          <Text>
            *{' '}
            {t(
              'Members who are successfully invited will receive the current fee rate',
            )}
          </Text>
          <Flex mt='20px'>
            <InputPanelStyle width='120px'>
              <Flex justifyContent='space-between' alignItems='center'>
                <Input
                  disabled={!isEdit}
                  noShadow
                  scale='sm'
                  required
                  inputMode='decimal'
                  pattern={PATTERN_ZERO_ONEHUNDRED}
                  value={state.chargeRatio}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === '' || e.currentTarget.validity.valid) {
                      setState(p => {
                        p.chargeRatio = val;
                      });
                    }
                  }}
                />
                <Text>%</Text>
              </Flex>
            </InputPanelStyle>
          </Flex>
        </Flex>
      </ContentBox>
    </Box>
  );
};

export default MeTribeInvitationSetting;
