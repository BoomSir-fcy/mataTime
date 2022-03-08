import { HTTP_REGEXP } from 'config/constants/regexp'
import React, { useCallback, useMemo, useState } from 'react'
import { padding } from "styled-system"
import { Box, Button, Flex, Input } from "uikit"
import { useTranslation } from 'contexts';

interface LinkInsertProps {
  onCancle: () => void;
  onConfirm: (values: {
    text: string;
    url: string;
  }) => void;
}
const LinkInsert: React.FC<LinkInsertProps> = ({ onCancle, onConfirm }) => {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    text: '',
    url: '',
  })
  const [disabled, setDisable] = useState(false)

  const handleChange = useCallback((event, key: 'text' | 'url') => {
    console.log(event, key)
    setValues(prev => {
      return {
        ...prev,
        [key]: event.target.value,
      }
    });
    if (key === 'url') {
      setDisable(!HTTP_REGEXP.test(event.target.value))
    }
  }, [setValues])

  return (
    <Box padding='5px 0' width='350px' maxWidth='80vw'>
      <Box mt='8px'>
        <Input value={values.text} onChange={(event) => { handleChange(event, 'text') }} placeholder={t('Please enter link text')} />
      </Box>
      <Box mt='16px'>
        <Input value={values.url} onChange={(event) => { handleChange(event, 'url') }} placeholder={t('Please enter link url')} />
      </Box>
      <Flex mt='24px' justifyContent='space-around'>
        <Button onClick={onCancle}>{t('Cancel')}</Button>
        <Button onClick={() => onConfirm(values)} disabled={disabled}>{t('Confirm')}</Button>
      </Flex>
    </Box>
  )
}

export default LinkInsert;
