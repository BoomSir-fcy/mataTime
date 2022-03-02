import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Card, Flex, Box, Text } from 'uikit';
import { useStore } from 'store';
import { useTranslation } from 'contexts';

const Group = styled(Box)``;
const GroupRows = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TribePro = ({ ...props }) => {
  const { t } = useTranslation();
  const tribeDetails = useStore(p => p.tribe.tribeDetails);

  return (
    <Card padding='16px' isRadius {...props}>
      <Text mb='20px' fontSize='18px' fontWeight='bold'>
        {t(`${tribeDetails.type === 1 ? 'FeeInformation' : 'ProInformation'}`)}
      </Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>{t('FeesToJoinThisTribe')}</Text>
          <Text>
            {new BigNumber(tribeDetails.charge)
              .dividedBy(new BigNumber(10).pow(18))
              .toString()}{' '}
            {tribeDetails.symbol}
          </Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>{t('TimingMethod')}</Text>
        </GroupRows>
      </Group>
      <Text mb='14px'>{t('TimedByJoiningTheTribe')}</Text>
      <Group>
        <GroupRows>
          <Text color='textTips'>{t('ValidityDays')}</Text>
          <Text>
            {tribeDetails.valid_time > 0
              ? t('ValidityDaysUnit', {
                  value: tribeDetails.valid_time / 60 / 60 / 24,
                })
              : t('ValidityDaysForver')}
          </Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>{t('TIMEBurned')}</Text>
          <Text>{t('TIMEBurnedUnit', { value: tribeDetails.spend_time })}</Text>
        </GroupRows>
        <GroupRows>
          <Text color='textTips'>
            {t('TIMERewardDistributionforContentProducers')}
          </Text>
        </GroupRows>
      </Group>
      <Text>{t('TIMETribeHost', { value: tribeDetails.reward_master })}</Text>
      <Text>{t('TIMEPoster', { value: tribeDetails.reward_author })}</Text>
      <Text>{t('TIMEMembers', { value: tribeDetails.reward_member })}</Text>
    </Card>
  );
};

export default TribePro;
