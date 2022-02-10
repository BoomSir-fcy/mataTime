import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Select, UploadSingle } from 'components';
import { useTranslation } from 'contexts';
import styled from 'styled-components';
import { Box, Text, Flex, Card, Input } from 'uikit';
import { useImmer } from 'use-immer';
import {
  FormFlex,
  FormItem,
  FormColumnItem,
  Label,
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
  TRIBE_FEE_DEFAULT_MAX_CONSUMES_TIME,
  TRIBE_FEE_DEFAULT_MEMBER_REWARD,
  TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME,
} from 'config';

const TribeCard = styled(Card)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const actionTypes = {
  SAVE: 'save',
  EDIT: 'edit',
} as const;

type ActionType = typeof actionTypes[keyof typeof actionTypes];

const TribeFeeForward = (props, ref) => {
  const { t } = useTranslation();
  const { disabled, actionType } = props;
  const [tribeType, setTribeType] = useState(2);
  const [tribeFeeType, setTribeFeeType] = useState(2);
  const [state, setState] = useImmer({
    amount: '',
    timing: 1,
    validDate: '',
    secondConsumesTime: TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME,
    maxConsumesTime: TRIBE_FEE_DEFAULT_MAX_CONSUMES_TIME,
    tribalMasterReward: TRIBE_FEE_DEFAULT_MASTER_REWARD,
    creatorReward: TRIBE_FEE_DEFAULT_CREATOR_REWARD,
    memberReward: TRIBE_FEE_DEFAULT_MEMBER_REWARD,
  });
  const typeOptions = [
    { value: 1, label: t('Basic') },
    { value: 2, label: t('Pro') },
  ];
  const feeTypeOptions = [
    { value: 1, label: t('Default') },
    { value: 2, label: t('Customize') },
  ];
  const CoinOptions = [
    { value: 1, label: t('BNB') },
    { value: 2, label: t('USDT') },
  ];

  useImperativeHandle(ref, () => ({
    getFeeFrom() {
      return state;
    },
  }));

  return (
    <FormFlex>
      {/* 部落类型 */}
      <FormItem>
        <Label required>{t('Tribe Type')}</Label>
        <FormColumnItem flexDirection='column'>
          <RadioGroup
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
                <Label>{t('Charge settings')}</Label>
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
                      disabled={actionType === actionTypes.EDIT && disabled}
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
                  disabled={actionType === actionTypes.EDIT && disabled}
                  value={state.timing}
                  options={[
                    { value: 1, label: t('permanent') },
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
                      disabled={actionType === actionTypes.EDIT && disabled}
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
        <Label required>{t('Read Billing')}</Label>
        <FormColumnItem>
          <RadioGroup
            disabled={actionType === actionTypes.EDIT}
            value={tribeFeeType}
            options={feeTypeOptions}
            onChange={val => {
              setTribeFeeType(val);
              if (val === 1) {
                setState(p => {
                  p.secondConsumesTime = TRIBE_FEE_DEFAULT_SECOND_CONSUMES_TIME;
                  p.maxConsumesTime = TRIBE_FEE_DEFAULT_MAX_CONSUMES_TIME;
                  p.tribalMasterReward = TRIBE_FEE_DEFAULT_MASTER_REWARD;
                  p.creatorReward = TRIBE_FEE_DEFAULT_CREATOR_REWARD;
                  p.memberReward = TRIBE_FEE_DEFAULT_MEMBER_REWARD;
                });
              }
            }}
          />
          <TribeCard isRadius>
            <FormItem justifyContent='space-between'>
              <Flex flexDirection='column'>
                <Text mb='10px' color='textTips'>
                  {t('Consumes TIME per second')}
                </Text>
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
                        value={state.secondConsumesTime}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.secondConsumesTime = val;
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
                <Text mb='10px' color='textTips'>
                  {t('Each piece of content consumes up to TIME')}
                </Text>
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
                        placeholder='60s'
                        inputMode='decimal'
                        pattern={PATTERN_NUMBER}
                        value={state.maxConsumesTime}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.maxConsumesTime = val;
                            });
                          }
                        }}
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
              <Text>* {t('Content Producer TIME Reward Distribution')}</Text>
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
                        value={state.tribalMasterReward}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.tribalMasterReward = val;
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
                        value={state.creatorReward}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.creatorReward = val;
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
                        value={state.memberReward}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '' || e.currentTarget.validity.valid) {
                            setState(p => {
                              p.memberReward = val;
                            });
                          }
                        }}
                      />
                      <Text>%</Text>
                    </Flex>
                  </InputPanelStyle>
                  <Text ml='10px' style={{ whiteSpace: 'nowrap' }}>
                    {t('部落成员')}
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

export const TribeFee = React.forwardRef(TribeFeeForward);
