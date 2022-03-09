import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Card, Flex, Box, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useTribeInfoById } from 'store/mapModule/hooks';

const Group = styled(Box)``;
const GroupRows = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TribeInformation = ({ ...props }) => {
  const { t } = useTranslation();
  const tribeInfo = useTribeInfoById(props.tribe_id);
  const { detail } = tribeInfo || {};

  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        {t(`${detail?.type === 1 ? 'FeeInformation' : 'ProInformation'}`)}
      </Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>{t('FeesToJoinThisTribe')}</Text>
          <Text>
            {new BigNumber(detail?.charge)
              .dividedBy(new BigNumber(10).pow(18))
              .toString()}{' '}
            {detail?.symbol}
          </Text>
        </GroupRows>
      </Group>
      <Group>
        <GroupRows>
          <Text color='textTips'>{t('ValidityDays')}</Text>
          <Text>
            {detail?.valid_time > 0
              ? t('ValidityDaysUnit', {
                  value: detail?.valid_time / 60 / 60 / 24,
                })
              : t('ValidityDaysForver')}
          </Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>{t('TIMEBurned')}</Text>
          <Text>{t('TIMEBurnedUnit', { value: detail?.spend_time || 0 })}</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>{t('TIMEMAXBurned/Post')}</Text>
          <Text fontSize='16px'>
            {t('TIMEMAXBurned/PostUnit', {
              value: detail?.spend_max_time || 0,
            })}
          </Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>
            {t('TIMERewardDistributionforContentProducers')}
          </Text>
        </GroupRows>
      </Group>
      <Text>{t('TIMETribeHost', { value: detail?.reward_master || 0 })}</Text>
      <Text>{t('TIMEPoster', { value: detail?.reward_author || 0 })}</Text>
      <Text>{t('TIMEMembers', { value: detail?.reward_member || 0 })}</Text>
    </Card>
  );
};

export default TribeInformation;