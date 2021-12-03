import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify'
import { Container } from 'components'
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import { getFullDisplayBalance, formatDisplayBalance } from 'utils/formatBalance';


const StakeModalBox = styled(Box)`
  width: 88vw;
  padding-top: 8px;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`

const ModalHeaderBox = styled(Box)`
  position: relative;
`

interface StakeModalProps {
  onConfirm?: (amount: string) => void
  onDismiss?: () => void
}
const StakeModal: React.FC<StakeModalProps> = ({
  onConfirm,
  onDismiss,
}) => {
  const { t } = useTranslation()

  return (
    <StakeModalBox>
      <Flex height="0" justifyContent="center">
        <Text>112222222222</Text>
      </Flex>
      <Text>
        Metatime 基于阅读时间扣费，1Time=1秒钟需要提前充值
        后方可浏览平台信息
      </Text>
      <Flex>
        <Button>前去充值</Button>
        <Button>登出账号</Button>
      </Flex>
    </StakeModalBox>
  )
}

export default StakeModal;
