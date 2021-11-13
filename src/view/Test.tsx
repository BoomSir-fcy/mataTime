import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Box, Text, Toggle, Card, Flex } from 'uikit'
import { languagesOptions } from 'config/localization';
import { useTranslation } from 'contexts/Localization'
import { Select } from 'components';
import { useLanguange, useThemeManager } from 'store/app/hooks';


const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CardStyled1 = styled(Card)`
  border-radius: 32px;
  background: ${({ theme }) => theme.isDark ? '#37cdc0' : '#f1d45f'};

`
const CardStyled2 = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`

const Test = () => {
  const { t } = useTranslation()
  const [languange, setUseLanguage] = useLanguange();
  const [isDark, toggleThemeHandle] = useThemeManager();

  const handleTest = useCallback(() => {
    console.debug('test')
  }, [])

  return (
    <StyledNotFound>
      <Flex>
        <Card padding="50px">1</Card>
        <CardStyled1 margin="0 20px" padding="50px">2</CardStyled1>
        <CardStyled2 padding="50px">3</CardStyled2>
      </Flex>
      <Box>
        <Text>{t('Example: This is a passage')}</Text>
        <Text>{t('Example: There is a variable: %variableA% here', { variableA: 1 })}</Text>
        <Text>{t('Example: There is variableA: %variableA% and variableB: %variableB%', { variableB: 23 })}</Text>
      </Box>
      <Button mt="16px" onClick={() => handleTest()} scale="sm">
        {t('Test')}
      </Button>
      <Box mt="16px">
        <Toggle checked={isDark} onClick={toggleThemeHandle} />
      </Box>
      <Box mt="16px">
        <Select
          options={languagesOptions}
          defaultId={languange.id}
          onChange={(val: any) => setUseLanguage(val)}
        />
      </Box>
    </StyledNotFound>
  )
}

export default Test
