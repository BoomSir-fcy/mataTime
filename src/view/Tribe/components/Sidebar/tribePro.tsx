import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Card, Flex, Box, Text } from 'uikit';
import { Collapse } from 'components';
import { useTranslation } from 'contexts';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { TribeType } from 'store/tribe/type';

const Group = styled(Box)``;
const GroupRows = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TribePro = ({ ...props }) => {
  const { t } = useTranslation();
  const tribeInfo = useTribeInfoById(props.tribe_id);
  const { detail, baseInfo } = tribeInfo || {};

  return (
    <>
      <Collapse
        title={t(
          `${
            detail?.type === TribeType.BASIC
              ? 'FeeInformation'
              : 'ProInformation'
          }`,
        )}
        {...props}
      >
        <Group>
          <GroupRows>
            <Text color='textTips'>{t('FeesToJoinThisTribe')}</Text>
            <Text>
              {detail?.type === TribeType.PRO
                ? new BigNumber(detail?.charge)
                    .dividedBy(new BigNumber(10).pow(18))
                    .toString()
                : baseInfo?.serviceCharge ?? 0}{' '}
              {detail?.symbol}
            </Text>
          </GroupRows>
          {detail?.valid_time === 0 && detail?.type !== TribeType.PRO && (
            <GroupRows>
              <Text color='textTips'>{t('TimingMethod')}</Text>
            </GroupRows>
          )}
        </Group>
        <Text mb='14px'>{t('TimedByJoiningTheTribe')}</Text>
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
            <Text>
              {t('TIMEBurnedUnit', { value: detail?.spend_time || 0 })}
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
      </Collapse>
    </>
  );
};

export default TribePro;
