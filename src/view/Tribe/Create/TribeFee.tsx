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

const TribeCard = styled(Card)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const PATTERN_ONE_ONEHUNDRED = '^([1-9][0-9]{0,1}|100)$';
const PATTERN_NUMBER = '^[1-9]d*$';
const PATTERN_AMOUNT = '^[0-9]*[.,]?[0-9]{0,18}$';

const TribeFee = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [tribeType, setTribeType] = useState(2);
  const [tribeFeeType, setTribeFeeType] = useState(2);
  const [state, setState] = useImmer({
    amount: '',
    timing: 1,
    validDate: '',
    secondConsumesTime: '',
    maxConsumesTime: '',
    tribalMasterReward: '',
    creatorReward: '',
  });
  const typeOptions = [
    { value: 1, label: t('Basic') },
    { value: 2, label: t('Pro') },
  ];
  const feeTypeOptions = [
    { value: 1, label: t('默认') },
    { value: 2, label: t('自定义') },
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
        <Label required>{t('部落类型')}</Label>
        <FormColumnItem flexDirection='column'>
          <RadioGroup
            value={tribeType}
            options={typeOptions}
            onChange={val => {
              setTribeType(val);
            }}
          />
          {tribeType === 2 && (
            <TribeCard isRadius>
              <FormItem className='mobile-nowrap' alignItems='center'>
                <Label>{t('收费设置：')}</Label>
                <InputPanelStyle>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Input
                      noShadow
                      required
                      scale='sm'
                      placeholder={t('请输入金额')}
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
                      options={CoinOptions}
                      defaultId={1}
                      onChange={(val: any) => console.log(val)}
                    />
                  </Flex>
                </InputPanelStyle>
              </FormItem>
              <FormItem className='mobile-nowrap' alignItems='center'>
                <Label>{t('计时方式：')}</Label>
                <RadioGroup
                  value={state.timing}
                  options={[
                    { value: 1, label: t('永久') },
                    { value: 2, label: t('以加入部落的时间计时') },
                    { value: 3, label: t('以创建部落时间计时') },
                  ]}
                  onChange={val => {
                    setState(p => {
                      p.timing = val;
                    });
                  }}
                />
              </FormItem>
              <FormItem className='mobile-nowrap' alignItems='center'>
                <Label>{t('有效时间：')}</Label>
                <InputPanelStyle>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Input
                      noShadow
                      required
                      scale='sm'
                      placeholder={t('请输入天数')}
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
                    <Text>{t('天')}</Text>
                  </Flex>
                </InputPanelStyle>
              </FormItem>
            </TribeCard>
          )}
        </FormColumnItem>
      </FormItem>
      {/* 阅读计费 */}
      <FormItem>
        <Label required>{t('阅读计费')}</Label>
        <FormColumnItem>
          <RadioGroup
            value={tribeFeeType}
            options={feeTypeOptions}
            onChange={val => {
              setTribeFeeType(val);
            }}
          />
          {tribeFeeType === 2 && (
            <TribeCard isRadius>
              <FormItem justifyContent='space-between'>
                <Flex flexDirection='column'>
                  <Text mb='10px' color='textTips'>
                    {t('每秒钟消耗TIME')}
                  </Text>
                  <Flex flexDirection='column' alignItems='flex-end'>
                    <InputPanelStyle>
                      <Flex justifyContent='space-between' alignItems='center'>
                        <Input
                          noShadow
                          required
                          scale='sm'
                          placeholder='1~100'
                          inputMode='decimal'
                          pattern={PATTERN_ONE_ONEHUNDRED}
                          value={state.secondConsumesTime}
                          onChange={e => {
                            const val = e.target.value;
                            if (e.currentTarget.validity.valid) {
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
                    {t('每条内容最多消耗TIME')}
                  </Text>
                  <Flex flexDirection='column' alignItems='flex-end'>
                    <InputPanelStyle>
                      <Flex justifyContent='space-between' alignItems='center'>
                        <Input
                          noShadow
                          required
                          scale='sm'
                          placeholder='60s'
                          inputMode='decimal'
                          pattern={PATTERN_NUMBER}
                          value={state.maxConsumesTime}
                          onChange={e => {
                            const val = e.target.value;
                            if (e.currentTarget.validity.valid) {
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
            </TribeCard>
          )}
        </FormColumnItem>
      </FormItem>
      <Flex flexDirection='column' width='100%' margin='20px 0'>
        <Text>{t('*内容生产者TIME奖励分配')}</Text>
        <Flex mt='20px'>
          <Flex mr='20px' alignItems='center'>
            <InputPanelStyle>
              <Flex justifyContent='space-between' alignItems='center'>
                <Input
                  noShadow
                  scale='sm'
                  required
                  placeholder='50'
                  inputMode='decimal'
                  pattern={PATTERN_ONE_ONEHUNDRED}
                  value={state.tribalMasterReward}
                  onChange={e => {
                    const val = e.target.value;
                    if (e.currentTarget.validity.valid) {
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
              {t('部落主')}
            </Text>
          </Flex>
          <Flex alignItems='center'>
            <InputPanelStyle>
              <Flex justifyContent='space-between' alignItems='center'>
                <Input
                  noShadow
                  required
                  scale='sm'
                  placeholder='50'
                  inputMode='decimal'
                  pattern={PATTERN_ONE_ONEHUNDRED}
                  value={state.creatorReward}
                  onChange={e => {
                    const val = e.target.value;
                    if (e.currentTarget.validity.valid) {
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
              {t('创作者')}
            </Text>
          </Flex>
        </Flex>
        <Text mt='20px' color='textTips' small>
          {t(
            '这是部落类型介绍/计费规则介绍Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus',
          )}
        </Text>
      </Flex>
    </FormFlex>
  );
});

export default TribeFee;
