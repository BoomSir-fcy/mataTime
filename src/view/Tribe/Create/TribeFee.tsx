import React, {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Select } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Card, Input } from 'uikit';
import { useImmer } from 'use-immer';
import {
  FormFlex,
  FormItem,
  FormColumnItem,
  Label,
  LabelFlex,
  InputPanelStyle,
} from './style';
import RadioGroup from 'uikit/components/Radio/RadioGroup';
import {
  PATTERN_AMOUNT,
  PATTERN_NUMBER,
  PATTERN_ONE_ONEHUNDRED,
  PATTERN_ZERO_ONEHUNDRED,
} from './utils/pattern';
import {
  TRIBE_FEE_DEFAULT_CREATOR_REWARD,
  TRIBE_FEE_DEFAULT_MASTER_REWARD,
  TRIBE_FEE_DEFAULT_MEMBER_REWARD,
  TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME,
} from 'config';
import QuestionHelper from 'components/QuestionHelper';
import { parseInt } from 'lodash';
import { useTribeState } from 'store/tribe/hooks';
import { FeeType, Timing, TribeType } from 'store/tribe/type';
import { actionTypes } from './type';
import { getMatterAddress } from 'utils/addressHelpers';
import { getValidDateSecond, getValidDateDay } from 'store/tribe/utils';
import { getDecimalAmount } from './hooks';

const TribeCard = styled(Card)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const TribeFeeForward = (props, ref) => {
  const { t } = useTranslation();
  const { feeCoinList } = useTribeState();
  const { info, disabled, actionType } = props;
  const [tribeType, setTribeType] = useState(1);
  const [tribeFeeType, setTribeFeeType] = useState(1);
  const [feeToken, setFeeToken] = useState('');
  const [state, setState] = useImmer({
    feeAmount: '',
    timing: 1,
    validDate: '',
    perTime: TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME,
    ownerPercent: TRIBE_FEE_DEFAULT_MASTER_REWARD,
    authorPercent: TRIBE_FEE_DEFAULT_CREATOR_REWARD,
    memberPercent: TRIBE_FEE_DEFAULT_MEMBER_REWARD,
  });
  const typeOptions = [
    { value: TribeType.BASIC, label: t('Basic') },
    { value: TribeType.PRO, label: t('Pro') },
  ];
  const feeTypeOptions = [
    { value: FeeType.DEFAULT, label: t('Default') },
    { value: FeeType.CUSTOMIZE, label: t('Customize') },
  ];
  const timingOptions = [
    { value: Timing.FOREVER, label: t('permanent') },
    {
      value: Timing.JOIN_TRIBE,
      label: t('Timed by the time of joining the clan'),
    },
  ];

  useEffect(() => {
    setFeeToken(feeCoinList[0]?.tokenAddress);
  }, [feeCoinList[0]?.tokenAddress]);

  useEffect(() => {
    if (info?.feeToken) {
      setState(p => {
        p.feeAmount = info.feeAmount;
        p.timing =
          Number(info.validDate) === 0 ? Timing.FOREVER : Timing.JOIN_TRIBE;
        p.validDate = getValidDateDay(info.validDate).toString();
        p.perTime = info.perTime;
        p.ownerPercent = info.ownerPercent;
        p.authorPercent = info.authorPercent;
        p.memberPercent = info.memberPercent;
      });

      setTribeType(
        getMatterAddress().indexOf(info.feeToken) !== -1
          ? TribeType.BASIC
          : TribeType.PRO,
      );
      setFeeToken(info.feeToken);
    }
  }, [info]);

  const CoinOptions = useMemo(() => {
    return feeCoinList.map(item => {
      return {
        id: item.tokenAddress,
        value: item.tokenAddress,
        label: item.name,
      };
    });
  }, [feeCoinList]);

  const getFeeDecimal = () => {
    return feeCoinList.find(item => item.tokenAddress === feeToken)[0]?.decimal;
  };

  useImperativeHandle(ref, () => ({
    getFeeFrom() {
      const params = {
        tribeType,
        feeToken: tribeType === TribeType.BASIC ? getMatterAddress() : feeToken,
        feeAmount:
          tribeType === TribeType.BASIC
            ? 0
            : getDecimalAmount(state.feeAmount, getFeeDecimal()),
        validDate:
          tribeType === TribeType.BASIC || state.timing === Timing.FOREVER
            ? 0
            : getValidDateSecond(state.validDate),
      };
      return { ...state, ...params };
    },
  }));

  return (
    <FormFlex>
      {/* 部落类型 */}
      <FormItem>
        <LabelHelper
          required
          label={t('Tribe Type')}
          helper={
            <>
              <Text small>
                {t(
                  'Basic Tribe cannot set the fee feeAmount and validity days;',
                )}
              </Text>
              <Text small>
                {t(
                  'Pro Tribe can set the fee feeAmount and validity days, the joining fee belongs to the tribe host.',
                )}
              </Text>
              <Flex>
                <Text small color='warning'>
                  {t('Note:')}
                </Text>
                <Text small>{t('The tribe type cannot be changed.')}</Text>
              </Flex>
            </>
          }
        />
        <FormColumnItem flexDirection='column'>
          <RadioGroup
            mb='20px'
            disabled={actionType === actionTypes.EDIT}
            value={tribeType}
            options={typeOptions}
            onChange={val => {
              setTribeType(val);
            }}
          />
          {tribeType === 2 && (
            <TribeCard isRadius>
              <FormItem className='mobile-nowrap' alignItems='center'>
                <LabelHelper
                  colon
                  label={t('Charge settings')}
                  helper={
                    <Text small>
                      {t(
                        'The fee all belongs to the tribe host; can be changed.',
                      )}
                    </Text>
                  }
                />
                <InputPanelStyle>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Input
                      disabled={actionType === actionTypes.EDIT && disabled}
                      noShadow
                      required
                      scale='sm'
                      placeholder={t('Please enter the amount')}
                      inputMode='decimal'
                      pattern={PATTERN_AMOUNT}
                      value={state.feeAmount}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || e.currentTarget.validity.valid) {
                          setState(p => {
                            p.feeAmount = val;
                          });
                        }
                      }}
                    />
                    <Select
                      scale='xs'
                      disabled={actionType === actionTypes.EDIT && disabled}
                      options={CoinOptions}
                      defaultId={feeToken}
                      onChange={(val: any) => setFeeToken(val.value)}
                    />
                  </Flex>
                </InputPanelStyle>
              </FormItem>
              <FormItem className='mobile-nowrap' alignItems='center'>
                <LabelHelper
                  colon
                  label={t('Timing method')}
                  helper={
                    <Text small>
                      {t('Pro Tribe validity days can be changed')}
                    </Text>
                  }
                />
                <RadioGroup
                  disabled={actionType === actionTypes.EDIT && disabled}
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
                <Label>{t('Effective time')}：</Label>
                <InputPanelStyle>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Input
                      disabled={
                        state.timing === 1 ||
                        (actionType === actionTypes.EDIT && disabled)
                      }
                      noShadow
                      required
                      scale='sm'
                      placeholder={t('Please enter the number of days')}
                      inputMode='decimal'
                      pattern={PATTERN_NUMBER}
                      value={state.timing === 1 ? 0 : state.validDate}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || e.currentTarget.validity.valid) {
                          setState(p => {
                            p.validDate = val;
                          });
                        }
                      }}
                    />
                    <Text>{t('tribeDays')}</Text>
                  </Flex>
                </InputPanelStyle>
              </FormItem>
            </TribeCard>
          )}
        </FormColumnItem>
      </FormItem>
      {/* 阅读计费 */}
      <FormItem>
        <LabelHelper
          required
          label={t('Read Billing')}
          helper={
            <>
              <Text small>
                {t(
                  'Reading billing rules can be set for both Basic/Pro Tribes.',
                )}
              </Text>
              <Flex>
                <Text small color='warning'>
                  {t('Note:')}
                </Text>
                <Text small>
                  {t('Reading billing rules cannot be changed.')}
                </Text>
              </Flex>
            </>
          }
        />
        <FormColumnItem>
          {actionType !== actionTypes.EDIT && (
            <RadioGroup
              mb='20px'
              disabled={actionType === actionTypes.EDIT}
              value={tribeFeeType}
              options={feeTypeOptions}
              onChange={val => {
                setTribeFeeType(val);
                if (val === 1) {
                  setState(p => {
                    p.perTime = TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME;
                    p.ownerPercent = TRIBE_FEE_DEFAULT_MASTER_REWARD;
                    p.authorPercent = TRIBE_FEE_DEFAULT_CREATOR_REWARD;
                    p.memberPercent = TRIBE_FEE_DEFAULT_MEMBER_REWARD;
                  });
                }
              }}
            />
          )}
          <TribeCard isRadius>
            <FormItem justifyContent='space-between'>
              <Flex flexDirection='column'>
                <LabelHelper
                  label={t('Consumes TIME per second')}
                  helper={
                    <Text small>
                      {t(
                        'The rules for burning TIME when browsing for reading in this tribe; cannot be changed.',
                      )}
                    </Text>
                  }
                />
                <Flex flexDirection='column' alignItems='flex-end'>
                  <InputPanelStyle>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Input
                        disabled={
                          tribeFeeType === 1 || actionType === actionTypes.EDIT
                        }
                        noShadow
                        required
                        scale='sm'
                        placeholder='1~100'
                        inputMode='decimal'
                        pattern={PATTERN_ONE_ONEHUNDRED}
                        value={state.perTime}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.perTime = val;
                            });
                          }
                        }}
                      />
                      <Text>TIME</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text mt='5px' color='textTips'>
                    {t('(MAX 100)')}
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDirection='column'>
                <Text mb='10px'>
                  {t('Each piece of content consumes up to TIME')}
                </Text>
                <Flex flexDirection='column' alignItems='flex-end'>
                  <InputPanelStyle>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Input
                        disabled
                        noShadow
                        required
                        scale='sm'
                        placeholder='60s'
                        inputMode='decimal'
                        pattern={PATTERN_NUMBER}
                        value={parseInt(state.perTime) * 60}
                      />
                      <Text>TIME</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text mt='5px' color='textTips'>
                    {t('(*60s)')}
                  </Text>
                </Flex>
              </Flex>
            </FormItem>
            <Flex flexDirection='column' width='100%' margin='20px 0'>
              <LabelHelper
                required
                label={t('Content Producer TIME Reward Distribution')}
                helper={
                  <Text small>
                    {t(
                      'TIME rewards earned by this tribe, which can be distributed independently; cannot be changed.',
                    )}
                  </Text>
                }
              />
              <Flex flexWrap='wrap' mt='20px'>
                <Flex mb='10px' mr='20px' alignItems='center'>
                  <InputPanelStyle width='120px'>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Input
                        disabled={
                          tribeFeeType === 1 || actionType === actionTypes.EDIT
                        }
                        noShadow
                        scale='sm'
                        required
                        inputMode='decimal'
                        pattern={PATTERN_ZERO_ONEHUNDRED}
                        value={state.ownerPercent}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.ownerPercent = val;
                            });
                          }
                        }}
                      />
                      <Text>%</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text ml='10px' style={{ whiteSpace: 'nowrap' }}>
                    {t('Tribal Lord')}
                  </Text>
                </Flex>
                <Flex mb='10px' mr='20px' alignItems='center'>
                  <InputPanelStyle width='120px'>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Input
                        disabled={
                          tribeFeeType === 1 || actionType === actionTypes.EDIT
                        }
                        noShadow
                        required
                        scale='sm'
                        inputMode='decimal'
                        pattern={PATTERN_ZERO_ONEHUNDRED}
                        value={state.authorPercent}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.authorPercent = val;
                            });
                          }
                        }}
                      />
                      <Text>%</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text ml='10px' style={{ whiteSpace: 'nowrap' }}>
                    {t('Creator')}
                  </Text>
                </Flex>
                <Flex mb='10px' alignItems='center'>
                  <InputPanelStyle width='120px'>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Input
                        disabled={
                          tribeFeeType === 1 || actionType === actionTypes.EDIT
                        }
                        noShadow
                        required
                        scale='sm'
                        inputMode='decimal'
                        pattern={PATTERN_ZERO_ONEHUNDRED}
                        value={state.memberPercent}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.memberPercent = val;
                            });
                          }
                        }}
                      />
                      <Text>%</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text ml='10px' style={{ whiteSpace: 'nowrap' }}>
                    {t('Tribe members')}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </TribeCard>
        </FormColumnItem>
      </FormItem>
    </FormFlex>
  );
};

const LabelHelper: React.FC<{
  required?: boolean;
  colon?: boolean;
  label?: string;
  helper?: ReactNode;
}> = ({ required, colon = false, label, helper }) => {
  return (
    <LabelFlex>
      <Label required={required}>{label}</Label>
      <QuestionHelper
        margin='2px 8px'
        color='white_black'
        text={helper}
        placement='auto'
      />
      {colon && <Text ml='4px'>：</Text>}
    </LabelFlex>
  );
};

export const TribeFee = React.forwardRef(TribeFeeForward);