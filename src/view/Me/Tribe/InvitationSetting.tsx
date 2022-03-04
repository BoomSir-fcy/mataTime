import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Timing } from 'store/tribe/type';
import { useFeeTokenList, useTribeState } from 'store/tribe/hooks';
import { useTribeNft } from './hooks';
import { fetchGetTribeBaseInfo } from 'store/tribe';
import { useDispatch } from 'react-redux';
import { getValidDateDay } from 'store/tribe/utils';
import { getBalanceNumber } from 'utils/formatBalance';
import { BigNumber } from 'bignumber.js';
import useParsedQueryString from 'hooks/useParsedQueryString';

const MeTribeInvitationSetting = () => {
  useFeeTokenList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [feeToken, setFeeToken] = useState('');
  const [state, setState] = useImmer({
    feeAmount: '',
    timing: 2,
    validDate: '',
    rate: '0',
  });
  const { feeCoinList, tribeBaseInfo } = useTribeState();
  const { onSettingInvitation } = useTribeNft();

  const timingOptions = [
    { value: Timing.FOREVER, label: t('permanent') },
    {
      value: Timing.JOIN_TRIBE,
      label: t('Timed by the time of joining the clan'),
    },
  ];

  useEffect(() => {
    if (parseQs.i) dispatch(fetchGetTribeBaseInfo({ tribeId: parseQs.i }));
  }, [parseQs]);

  useEffect(() => {
    if (tribeBaseInfo?.feeToken) {
      setState(p => {
        p.feeAmount = getBalanceNumber(
          new BigNumber(tribeBaseInfo.feeAmount),
          getFeeDecimal(tribeBaseInfo.feeToken),
        ).toString();
        p.timing =
          Number(tribeBaseInfo.validDate) === 0
            ? Timing.FOREVER
            : Timing.JOIN_TRIBE;
        p.validDate = getValidDateDay(tribeBaseInfo.validDate).toString();
      });
      setFeeToken(tribeBaseInfo.feeToken);
    }
  }, [tribeBaseInfo]);

  const getFeeDecimal = useCallback(
    (token: string) => {
      return feeCoinList.find(
        item => item.tokenAddress.toLowerCase() === token.toLowerCase(),
      )?.decimal;
    },
    [feeCoinList],
  );

  const CoinOptions = useMemo(() => {
    return feeCoinList.map(item => {
      return {
        id: item.tokenAddress,
        value: item.tokenAddress,
        label: item.name,
      };
    });
  }, [feeCoinList]);

  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await onSettingInvitation(parseQs.i, state.rate);
          setIsEdit(false);
        }}
        action=''
      >
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
              <Button type='submit'>{t('TribeSave')}</Button>
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
                  disabled
                  noShadow
                  required
                  scale='sm'
                  placeholder={t('Please enter the amount')}
                  inputMode='decimal'
                  pattern={PATTERN_AMOUNT}
                  value={state.feeAmount}
                  onChange={e => {
                    const val = e.target.value;
                    if (e.currentTarget.validity.valid) {
                      setState(p => {
                        p.feeAmount = val;
                      });
                    }
                  }}
                />
                <Select
                  scale='xs'
                  disabled
                  options={CoinOptions}
                  defaultId={feeToken}
                  onChange={(val: any) => setFeeToken(val.value)}
                />
              </Flex>
            </InputPanelStyle>
          </FormItem>
          <FormItem className='mobile-nowrap' alignItems='center'>
            <Label>{t('Timing method')}</Label>
            <RadioGroup
              disabled
              value={state.timing}
              options={timingOptions}
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
                  disabled
                  noShadow
                  required
                  scale='sm'
                  placeholder={t('Please enter the number of days')}
                  inputMode='decimal'
                  pattern={PATTERN_NUMBER}
                  value={state.timing === 1 ? '-' : state.validDate}
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
                    value={state.rate}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === '' || e.currentTarget.validity.valid) {
                        setState(p => {
                          p.rate = val;
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
      </form>
    </Box>
  );
};

export default MeTribeInvitationSetting;
