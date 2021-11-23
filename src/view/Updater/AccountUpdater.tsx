import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';


export default function AccountUpdater() {
  const dispatch = useDispatch();

  const [accountFlag, setAccountFlag] = useState('')
  const { account } = useWeb3React();

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    dispatch(storeAction.resetLoginState)
  }, [dispatch])

  useEffect(() => {
    console.log(account, 'account')
    if (account && accountFlag && accountFlag !== account) {
      console.log(12121)
      setAccountFlag(account)
      handleReSetAccount()
    }
  }, [account, accountFlag])
  return null
}
