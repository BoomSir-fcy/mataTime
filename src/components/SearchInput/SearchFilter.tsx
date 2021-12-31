import React, { useState } from 'react';
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Text, Radio, Card, CardProps } from 'uikit';
import { useDispatch } from 'react-redux';
import { storeAction, useStore } from 'store';

const SearchFilter: React.FC<CardProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  const [select, setSelect] = useState(1)

  const { filterUser } = useStore(p => p.search);

  return (
    <Card isRadius padding="18px" {...props}>
      <Text>{t('Search filters')}</Text>
      <Flex mt="18px">
        <Radio
          scale="sm"
          type="radio"
          id="gs1"
          checked={filterUser === 1}
          onChange={() => {
            dispatch(storeAction.changeSearchUserFilter(1))
          }}
          value="1"
        />
        <label htmlFor="gs1">
          <Text ml="12px">{t('From anyone')}</Text>
        </label>
      </Flex>
      <Flex mt="18px">
        <Radio
          scale="sm"
          type="radio"
          id="gs2"
          checked={filterUser === 2}
          onChange={() => {
            dispatch(storeAction.changeSearchUserFilter(2))
          }}
          value="1"
        />
        <label htmlFor="gs2">
          <Text ml="12px">{t('People you follow')}</Text>
        </label>
      </Flex>
    </Card>
  )
}

export default SearchFilter
