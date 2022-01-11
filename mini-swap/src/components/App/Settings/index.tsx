import React from 'react'
import { Button, CogIcon, NotificationDot, useModal } from 'pancake-uikit'
import { useExpertModeManager } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import SettingsModal from './SettingsModal'

export default function SettingsTab() {
  const { t } = useTranslation()

  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const [expertMode] = useExpertModeManager()

  return (
    <NotificationDot show={expertMode}>
      <Button
        variant="text"
        p={0}
        onClick={onPresentSettingsModal}
        id="open-settings-dialog-button"
        title={t('titleSetting')}
      >
        <CogIcon color="primary" width="22px" />
      </Button>
    </NotificationDot>
  )
}
