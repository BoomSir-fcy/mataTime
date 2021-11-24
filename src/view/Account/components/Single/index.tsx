import React, { useMemo, useState } from 'react';
import { Flex, Box, Text, Spinner } from 'uikit';
import { Container, FlexAutoWarpper, FlexLayout } from 'components'
import { useFetchSinglePool, useSinglePoolState } from 'store/pools/hooks';
import PoolCard from '../PoolCard/PoolCard';

const Single: React.FC = () => {

  useFetchSinglePool()
  const { data, loaded, userDataMap, userStakesMap } = useSinglePoolState()
  console.log(userDataMap)

  const poolsMemoized = useMemo(() => {
    return data
  }, [data])

  return (
    <Container>
      {
        loaded
          ?
          (
            <FlexLayout>
              <FlexAutoWarpper>
                {
                  poolsMemoized.map(poolInfo => (
                    <PoolCard
                      key={poolInfo.pid}
                      poolInfo={poolInfo}
                      userData={userDataMap[poolInfo.pid]}
                      userStakes={userStakesMap[poolInfo.pid]}
                    />
                  ))
                }
              </FlexAutoWarpper>
            </FlexLayout>
          )
          :
          <Flex justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
      }

    </Container>
  )
}

export default Single;
