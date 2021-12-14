import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify'
import { Container } from 'components'
import { Flex, Box, Text, Card, Button, InputPanel, Input, Image, Heading } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import { getFullDisplayBalance, formatDisplayBalance } from 'utils/formatBalance';


const StakeModalBox = styled(Box)`
  width: 88vw;
  /* padding-top: 8px; */
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`

const ModalHeaderBox = styled(Box)`
  position: relative;
  height: 0;
`

const ModalHeader = styled(Flex)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
`

interface StakeModalProps {
  onConfirm?: () => void
  onSecondary?: () => void
  title: string
  tips: string
  onConfirmLable: string
  onSecondaryLable: string
}
const StakeModal: React.FC<StakeModalProps> = ({
  onConfirm,
  onSecondary,
  title,
  tips,
  onConfirmLable,
  onSecondaryLable,
}) => {
  const { t } = useTranslation()

  return (
    <StakeModalBox>
      <ModalHeaderBox>
        <ModalHeader justifyContent="center" alignItems="center">
          <Image src="/images/tokens/TIME.svg" width={76} height={76} />
        </ModalHeader>
      </ModalHeaderBox>
      <Flex justifyContent="center" pt="64px">
        <Heading>{title}</Heading>
      </Flex>
      <Text padding="22px 36px 32px">
        {tips}
      </Text>
      <Flex padding="0 36px" justifyContent="space-around">
        <Button onClick={onConfirm}>{onConfirmLable}</Button>
        <Button onClick={onSecondary} variant="tertiary">{onSecondaryLable}</Button>
      </Flex>
    </StakeModalBox>
  )
}

export default StakeModal;
