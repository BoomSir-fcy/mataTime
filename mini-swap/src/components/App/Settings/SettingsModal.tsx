import React, { useState } from 'react'
import { Button, Text, Message, Modal, ModalBody, InjectedModalProps } from 'pancake-uikit'
import {
  // useAudioModeManager,
  // useExpertModeManager,
  useUserTransactionTTL,
  useUserSlippageTolerance,
  useUserUsePoly,
  useUserSingleHopOnly,
} from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'

// import { useSwapActionHandlers } from 'state/swap/hooks'
import { AutoColumn } from '../../Layout/Column'
// import QuestionHelper from '../../QuestionHelper'
// import { RowBetween, RowFixed } from '../../Layout/Row'
import TransactionSettings from './TransactionSettings'

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [userUsePoly, setUserUsePoly] = useUserUsePoly()

  const [ttl, setTtl] = useUserTransactionTTL()
  // const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  // const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  // const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <Modal
        title={t('Are you sure?')}
        onBack={() => setShowConfirmExpertModal(false)}
        onDismiss={onDismiss}
        style={{ maxWidth: '420px' }}
      >
        <ModalBody>
          <Message variant="warning" mb="24px">
            <Text>
              {t(
                "Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.",
              )}
            </Text>
          </Message>
          <Text mb="24px">{t('Only use this mode if you know what you’re doing.')}</Text>
          <Button
            variant="danger"
            id="confirm-expert-mode"
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                // toggleExpertMode()
                setShowConfirmExpertModal(false)
              }
            }}
          >
            {t('Turn On Expert Mode')}
          </Button>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <Modal title={t('Settings')} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      <ModalBody>
        <AutoColumn gap="md">
          {/* <Text bold fontSize="20px">
            {t('Transaction Settings')}
          </Text> */}
          <TransactionSettings
            rawSlippage={userSlippageTolerance}
            setRawSlippage={setUserslippageTolerance}
            deadline={ttl}
            setDeadline={setTtl}
            userUsePoly={userUsePoly}
            setUserUsePoly={setUserUsePoly}
            singleHopOnly={singleHopOnly}
            setSingleHopOnly={setSingleHopOnly}
          />
        </AutoColumn>
      </ModalBody>
    </Modal>
  )
}

export default SettingsModal
