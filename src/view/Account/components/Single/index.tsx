import React, { useMemo, useState } from 'react';
import styled from "styled-components";
import { Flex, Box, Text, Spinner } from 'uikit';
import { Container, FlexAutoWarpper, FlexLayout } from 'components'
import { useFetchSinglePool, useSinglePoolState } from 'store/pools/hooks';
import PoolCard from '../PoolCard/PoolCard';
import { useTranslation } from 'contexts/Localization';
import { boostData } from '../../datas/boost'

const FaqAnswerText = ({ children }) => <Text>{children}</Text>;

const AnswerRuleList = styled(Box)`
  margin-top: 28px;
  margin-bottom: 16px;
  padding: 16px 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  width: 100%;
  max-width: 580px;
  overflow: auto;
`
const AnswerRuleListBox = styled(Box)`
  width: 538px;
`

const Single: React.FC = () => {
  const { t } = useTranslation();

  useFetchSinglePool()
  const { data, loaded, userDataMap, userStakesMap, poolAprMap } = useSinglePoolState()

  const poolsMemoized = useMemo(() => {
    return data
  }, [data])

  return (
    <>
      <Box pt="16px">
        <Container>
          <Box mt="">
            <Text>
              TIME single token staking mining: both TIME and DSG tokens can be mined.
            </Text>
            <Text>
              The logic of acquiring TIME: 20% of the TIME tokens consumed by users are added to the staking pool every day for staking users to mine TIME
            </Text>
            <Text>
            The logic of acquiring DSG: 15% of the swapped DSG are directly distributed to the staking pool, 20% will go into value locked account, and will be released linearly in the next 6 months
            </Text>
          </Box>
          <Box mt="28px">
            <Text fontSize='14px' color="textTips">
              While staking TIME, you need to choose lock-up period.
              The sTIME acquired after the staking process is the certificate used for Metatime governance,
              it&apos;s also the certificate for calculating staking income.
              The longer the lock-up time, the more sTIME you can get from each TIME.
            </Text>
          </Box>
          <AnswerRuleList>
            <AnswerRuleListBox>
              <Flex>
                <Text width="25%">Vesting period</Text>
                {
                  boostData.map(item => {
                    return (
                      <Text key={item.lable} width="15%">{item.lable}</Text>
                    )
                  })
                }
                {/* <Text width="15%">30 days </Text>
                <Text width="15%">180 days</Text>
                <Text width="15%">1 year</Text>
                <Text width="15%">2 years</Text> */}
              </Flex>
              <Flex>
                <Text width="25%">Boost Factor</Text>
                {
                  boostData.map(item => {
                    return (
                      <Text key={item.value} width="15%">{item.value}</Text>
                    )
                  })
                }
                {/* <Text width="15%">0.2</Text>
                <Text width="15%">0.3 </Text>
                <Text width="15%">0.5</Text>
                <Text width="15%">1</Text>
                <Text width="15%">2</Text> */}
              </Flex>
            </AnswerRuleListBox>
          </AnswerRuleList>
        </Container>
        {
          loaded
            ?
            (
              <FlexLayout>
                {
                  poolsMemoized.map(poolInfo => (
                    <PoolCard
                      key={poolInfo.pid}
                      poolInfo={poolInfo}
                      userData={userDataMap[poolInfo.pid]}
                      userStakes={userStakesMap[poolInfo.pid]}
                      poolApr={poolAprMap[poolInfo.pid]}
                    />
                  ))
                }
              </FlexLayout>
            )
            :
            <Flex justifyContent="center" alignItems="center">
              <Spinner />
            </Flex>
        }

      </Box>
    </>
  )
}

export default Single;
