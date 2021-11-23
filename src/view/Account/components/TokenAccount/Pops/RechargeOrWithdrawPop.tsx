import React, { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Text } from 'uikit'
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';

/* eslint-disable */

interface ModalProps {
  onDismiss?: () => void
  account: string
}

const RechargeOrWithdrawPop: React.FC<ModalProps> = ({ onDismiss, account }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [pengdingType, setpengdingType] = useState(false)
  useEffect(() => {
  }, [account])
  return (
    <Flex title={t('提现')}>
      1213
    </Flex>
  )
}

export default RechargeOrWithdrawPop
