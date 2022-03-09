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
import { getValidDateDay } from 'store/tribe/utils';
import { getBalanceNumber } from 'utils/formatBalance';
import { BigNumber } from 'bignumber.js';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';
import Dots from 'components/Loader/Dots';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';
import { useDispatch } from 'react-redux';

const MeTribeInvitationSetting = () => {
  useFeeTokenList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [feeToken, setFeeToken] = useState('');
  const [state, setState] = useImmer({
    feeAmount: '',
    timing: 2,
    validDate: '',
    rate: '0',
  });
  const { feeCoinList } = useTribeState();
  const { onSettingInvitation } = useTribeNft();
  const tribeId = parseQs.i;
  const tribeInfo = useTribeInfoById(tribeId);

  const timingOptions = [
    { value: Timing.FOREVER, label: t('permanent') },
    {
      value: Timing.JOIN_TRIBE,
      label: t('Timed by the time of joining the clan'),
    },
  ];

  useEffect(() => {
    if (tribeInfo?.baseInfo?.feeToken) {
      setState(p => {
        p.feeAmount = getBalanceNumber(
          new BigNumber(tribeInfo?.baseInfo?.feeAmount),
          getFeeDecimal(tribeInfo?.baseInfo?.feeToken),
        ).toString();
        p.timing =
          Number(tribeInfo?.baseInfo?.validDate) === 0
            ? Timing.FOREVER
            : Timing.JOIN_TRIBE;
        p.validDate = getValidDateDay(
          tribeInfo?.baseInfo?.validDate,
        ).toString();
        p.rate = tribeInfo?.nftInfo?.invitationRate.toString();
      });
      setFeeToken(tribeInfo?.baseInfo?.feeToken);
    }
  }, [tribeInfo]);

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
          try {
            setPending(true);
            await onSettingInvitation(tribeId, state.rate);
            dispatch(fetchTribeInfoAsync(tribeId));
            setIsEdit(false);
            setPending(false);
          } catch (error) {
            console.error(error);
            setPending(false);
          }
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
              <Button type='submit'>
                {pending ? <Dots>{t('TribeSave')}</Dots> : t('TribeSave')}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      if (!val.trim())
                        e.target.setCustomValidity(t('Please enter this'));
                      else e.target.setCustomValidity('');
                      if (val === '' || e.currentTarget.validity.valid) {
                        setState(p => {
                          p.rate = val;
                        });
                      }
                    }}
                    onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                      e.target.setCustomValidity(t('Please enter this'));
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
