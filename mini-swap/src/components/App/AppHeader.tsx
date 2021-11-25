import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Heading, IconButton, ArrowBackIcon } from 'pancake-uikit'
import { Link } from 'react-router-dom'
import Settings from './Settings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle?: string
  helper?: string
  backTo?: string
  tips?: React.ReactNode
  noConfig?: boolean
  hideSetting?: boolean
}

const BoxStyled = styled(Box)`
  padding: 20px;
  width: 100%;
`
const AppHeaderContainer = styled(Flex)`
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, hideSetting, tips, noConfig = false }) => {
  return (
    <BoxStyled>
      <AppHeaderContainer>
        <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
          {backTo && (
            <IconButton as={Link} to={backTo}>
              <ArrowBackIcon color='primary' width="32px" />
            </IconButton>
          )}
          <Flex
            alignContent={subtitle ? '' : 'center'}
            justifyContent={subtitle ? '' : 'center'}
            flexDirection={subtitle ? 'column' : 'row'}
          >
            <Flex alignItems="center">
              <Heading as="h2" mb={subtitle ? '8px' : '0'}>
                {title}
              </Heading>
              {helper && <QuestionHelper placement="top-start" text={helper} ml="4px" mr="4px" />}
            </Flex>
            <Flex alignItems="center">
              <Text ml="0px" color="text" fontSize="14px">
                {subtitle}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {!noConfig && (
          <Flex>
            {hideSetting ? null : <Settings />}
            <Transactions />
          </Flex>
        )}
      </AppHeaderContainer>
      <Text mt="8px" ml="0px" color="text" fontSize="14px">
        {tips}
      </Text>
    </BoxStyled>
  )
}

export default AppHeader
