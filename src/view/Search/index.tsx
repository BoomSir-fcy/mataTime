import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Box, Text, Flex } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Crumbs, UserFlowItem } from 'components'
import SearchInput from 'components/SearchInput'
import Tabs from 'components/Tabs'
import { useStore } from 'store'

const tabDatas = [
  {
    lable: '用户',
    type: 'user',
  },
  {
    lable: '话题',
    type: 'topic',
  },
]

const Search = () => {
  const { t } = useTranslation()

  const { resultListOfPeoples, resultListOfTopic } = useStore(p => p.search);

  const [activeType, setActiveType] = useState(tabDatas[0].type)

  return (
    <Box>
      <Crumbs
        top
        back
        zIndex={1005}
        hideBorder={false}
        callBack={() => {

        }}
        title={t('homeHeaderTitle')}
      >
        <Flex alignItems='center' flex='1' >
          <SearchInput ml='44px' width='100%' />
          {/* <Box width="100%">
          </Box> */}
        </Flex>
      </Crumbs>
      <Box>
        <Tabs
          pl='16px'
          pb='8px'
          mt='12px'
          keys='type'
          active={activeType}
          datas={tabDatas}
          onChange={(tab) => {
            setActiveType(tab.type)
          }}
        />
        <Box>
          {
            resultListOfPeoples.map(item => {
              return (
                <UserFlowItem
                  padding="10px 29px 10px 19px"
                  uid={item.uid}
                  address={item.address}
                  is_attention={item.is_attention}
                  nft_image={item.nft_image}
                  introduction={item.introduction}
                  nick_name={item.nick_name}
                  onChanges={() => {

                  }}
                />
              )
            })
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Search
