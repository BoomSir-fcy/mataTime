import React from 'react';
import { useTranslation } from 'contexts/Localization'
import { Button, Box, Text, ButtonProps } from 'uikit';
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';

interface RemoveHistoryBtnProps extends ButtonProps {
  searchId: string
}

const RemoveHistoryBtn: React.FC<RemoveHistoryBtnProps> = ({
  searchId,
  ...props }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  return (
    <Button onClick={(event) => {
      event.stopPropagation()
      event.preventDefault()
      dispatch(storeAction.removeSearchHistoryData(searchId))
    }} tabIndex={-1} padding="0" style={{ fontWeight: 400 }} variant='text' {...props}>
      <Text style={{
        transform: 'rotateZ(45deg)'
      }} fontSize='24px'>+</Text>
    </Button>
  )
}

export default RemoveHistoryBtn
