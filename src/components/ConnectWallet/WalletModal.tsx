import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text, CloseIcon, Button } from 'uikit'
// import { Button } from 'uikit'
import useAuth from 'hooks/useAuth'
// import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import connectors, { walletLocalStorageKey, connectorLocalStorageKey } from 'config/wallet/config'
import { ConnectorNames } from 'config/wallet'
import WalletItem from './WalletItem'



const WalletModalStyled = styled.div<{ show?: boolean, onClick?: (e: Event) => void }>`
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 22px 26px;
  z-index: 10;
  /* TODO: 走theme配置文件 */
  background-color:#4D535F;
  border-radius: ${({ theme }) => theme.radii.card};
  transform: ${({ show }) => show ? 'translateX(0)' : 'translateX(500px)'};
  transition: 300ms transform;
`

export const Cover = styled(Box) <{ show?: boolean }>`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: ${({ show }) => show ? 'block' : 'none'};
  z-index: 9;
`

const WalletModal: React.FC<{ show?: boolean, onClick?: (e: any) => void }> = ({ show, onClick }) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()

  return (
    <WalletModalStyled onClick={onClick} show={show}>
      <Flex justifyContent="space-between">
        <Text>链接钱包</Text>
        {/* <CloseIcon /> */}
      </Flex>
      <Box>
        {
          connectors.map((item, index) => (
            <Box mt="12px" key={index}>
              <WalletItem walletConfig={item} login={login} />
            </Box>
          ))
        }
      </Box>
    </WalletModalStyled>
  )
}

export default WalletModal
