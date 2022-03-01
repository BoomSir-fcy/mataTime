import { HTTP_REGEXP } from 'config/constants/regexp'
import React, { useCallback, useMemo, useState } from 'react'
import { padding } from "styled-system"
import { Box, Button, Flex, Input } from "uikit"

interface LinkInsertProps {
  onCancle: () => void;
  onConfirm: (values: {
    text: string;
    url: string;
  }) => void;
}
const LinkInsert: React.FC<LinkInsertProps> = ({ onCancle, onConfirm }) => {

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
        <Input value={values.text} onChange={(event) => { handleChange(event, 'text') }} placeholder='请输入链接文本' />
      </Box>
      <Box mt='16px'>
        <Input value={values.url} onChange={(event) => { handleChange(event, 'url') }} placeholder='请输入链接地址' />
      </Box>
      {HTTP_REGEXP.test(values.url) ? 1 : 2}
      <Flex mt='24px' justifyContent='space-around'>
        <Button onClick={onCancle}>取消</Button>
        <Button onClick={() => onConfirm(values)} disabled={disabled}>确定</Button>
      </Flex>
    </Box>
  )
}

export default LinkInsert;