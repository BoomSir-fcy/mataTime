import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon, Flex, Image, Box } from 'pancake-uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        {/* <LogoIcon width={64} height={64} mb="8px" /> */}
        <Flex alignItems="center">
          <Text fontSize="60px" bold>4</Text>
          <Box width="50px">
            <Image width={120} height={160} src="/images/no-data.png" />
          </Box>
          <Text fontSize="60px" bold>4</Text>
        </Flex>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Button as="a" href="/" scale="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
