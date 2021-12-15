import React, { useMemo, useState } from 'react';
import { Flex, Box, Text, Spinner } from 'uikit';
import { Container, FlexAutoWarpper, FlexLayout } from 'components'
import { useFetchSinglePool, useSinglePoolState } from 'store/pools/hooks';
import PoolCard from '../PoolCard/PoolCard';
import { useTranslation } from 'contexts/Localization';

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
