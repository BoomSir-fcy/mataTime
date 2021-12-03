import React, { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { toast } from 'react-toastify'
import { Container } from 'components'
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import { getFullDisplayBalance, formatDisplayBalance } from 'utils/formatBalance';


const RewardAuthModalStyled = styled(Box)`
  position: fixed;
  z-index: 99;
  width: 418px;
  height: 242px;
  padding-top: 8px;
  padding-bottom: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.tertiary};
  
`

interface RewardAuthModalProps {
  depositSymbol?: string
  onConfirm?: (amount: string) => void
  onDismiss?: () => void
}
const RewardAuthModal: React.FC<RewardAuthModalProps> = ({

}) => {
  const { t } = useTranslation()

  return (
    <RewardAuthModalStyled>
      1
    </RewardAuthModalStyled>
  )
}

export default RewardAuthModal;
