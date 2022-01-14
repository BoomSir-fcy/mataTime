import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Spinner, Empty } from 'uikit';
import { Container, FlexAutoWarpper, FlexLayout } from 'components';
import { useFetchSinglePool, useSinglePoolState } from 'store/pools/hooks';
import PoolCard from '../PoolCard/PoolCard';
import { useTranslation } from 'contexts/Localization';
import { boostData } from '../../datas/boost';

const FaqAnswerText = ({ children }) => <Text>{children}</Text>;

const AnswerRuleList = styled(Box)`
  margin-top: 28px;
  margin-bottom: 16px;
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  border-radius: 10px;
  width: 100%;
  max-width: 580px;
  overflow: auto;
`;
const AnswerRuleListBox = styled(Box)`
  width: 538px;
`;

const Single: React.FC = () => {
  const { t } = useTranslation();

  useFetchSinglePool();
  const { data, loaded, userDataMap, userStakesMap, poolAprMap } =
    useSinglePoolState();

  const poolsMemoized = useMemo(() => {
    return data;
  }, [data]);

  return (
    <>
      <Box pt='16px'>
        <Container>
          <Box mt=''>
            <Text>{t('walleteStakingText1')}</Text>
            <Text>{t('walleteStakingText2')}</Text>
            <Text>{t('walleteStakingText3')}</Text>
          </Box>
          <Box mt='28px'>
            <Text fontSize='14px' color='textTips'>
              {t('walleteStakingText4')}
            </Text>
          </Box>
          <AnswerRuleList>
            <AnswerRuleListBox>
              <Flex>
                <Text width='25%'>{t('walleteVesting period')}</Text>
                {boostData.map(item => {
                  return (
                    <Text key={item.lable} width='15%'>
                      {t(item.lableUnit, {
                        value: item.lable,
                        s: Number(item.lable) > 1 ? 's' : '',
                      })}
                    </Text>
                  );
                })}
                {/* <Text width="15%">30 days </Text>
                <Text width="15%">180 days</Text>
                <Text width="15%">1 year</Text>
                <Text width="15%">2 years</Text> */}
              </Flex>
              <Flex>
                <Text width='25%'>{t('walleteBoost Factor')}</Text>
                {boostData.map(item => {
                  return (
                    <Text key={item.value} width='15%'>
                      {item.value}
                    </Text>
                  );
                })}
                {/* <Text width="15%">0.2</Text>
                <Text width="15%">0.3 </Text>
                <Text width="15%">0.5</Text>
                <Text width="15%">1</Text>
                <Text width="15%">2</Text> */}
              </Flex>
            </AnswerRuleListBox>
          </AnswerRuleList>
        </Container>
        {loaded ? (
          <FlexLayout>
            {poolsMemoized.length ? (
              poolsMemoized.map(poolInfo => (
                <PoolCard
                  key={poolInfo.pid}
                  poolInfo={poolInfo}
                  userData={userDataMap[poolInfo.pid]}
                  userStakes={userStakesMap[poolInfo.pid]}
                  poolApr={poolAprMap[poolInfo.pid]}
                />
              ))
            ) : (
              <Empty />
            )}
          </FlexLayout>
        ) : (
          <Flex justifyContent='center' alignItems='center'>
            <Spinner />
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Single;
