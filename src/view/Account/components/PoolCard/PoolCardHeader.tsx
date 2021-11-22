import React, { useState } from 'react';
import { Flex, Box, Heading, LinkExternal, Card } from 'uikit';
import { Container } from 'components'
import { TokenPairImage } from 'components';
import { getBscScanLink } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

interface PoolCardHeader {
  singleToken?: boolean
  primaryAddress?: string
  secondaryAddress?: string
  secondarySymbol?: string
  primarySymbol?: string
  lpAddress?: string
}

const PoolCardHeader: React.FC<PoolCardHeader> = ({
  singleToken,
  primaryAddress,
  secondaryAddress,
  primarySymbol,
  secondarySymbol,
  lpAddress,
}) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Container>
        <Flex>
          {singleToken ? (
            <TokenPairImage variant="binary" primaryAddress={primaryAddress} secondaryAddress={secondaryAddress} width={55} height={55} />
          ) : (
            <TokenPairImage variant="inverted" primaryAddress={primaryAddress} secondaryAddress={secondaryAddress} width={55} height={55} />
          )}
          <Box ml="8px">
            <Heading>{primarySymbol}-{secondarySymbol}</Heading>
            <LinkExternal fontSize="16px" href={getBscScanLink(lpAddress, 'token')}>
              {t('View Contract')}
            </LinkExternal>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default PoolCardHeader;
