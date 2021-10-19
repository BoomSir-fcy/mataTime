import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button } from 'uikit'
import styled from "styled-components";
import useAuth from 'hooks/useAuth'
import { toast } from 'react-toastify';
// import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import WalletModal from './WalletModal'


const WalletButton = styled(Button)`
  background: #FFFFFF;
  color: #5A7CF9;
`

export const ConnectWalletButton: React.FC = (props) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const changeHandler = () => {
      console.log(211)
      setShow(false)
    }
    document.body.addEventListener('click', changeHandler)
    return () => document.body.removeEventListener('click', changeHandler)
  }, [])

  return (
    <Box>
      <WalletButton onClick={(e) => {
        console.log(444)
        setShow(!show);
        e.stopPropagation()
      }} {...props}>
        {t('Connect Wallet')}
      </WalletButton>
      <WalletModal onClick={(e) => e.preventDefault()} show={show} />
    </Box>
  )
}

// export ConnectWalletButton
