import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { escapeRegExp } from '../../utils'

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 16px;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  &:disabled {
    /* background-color: ${({ theme }) => theme.colors.backgroundDisabled}; */
    box-shadow: none;
    /* color: ${({ theme }) => theme.colors.textDisabled}; */
    cursor: not-allowed;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  decimals,
  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  error?: boolean
  disabled?: boolean
  fontSize?: string
  decimals?: number
  align?: 'right' | 'left'
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = useCallback((event) => {
    if (event.currentTarget.validity.valid) {
      const nextUserInput = event.target.value.replace(/,/g, '.')
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        onUserInput(nextUserInput)
      }
    }
  }, [onUserInput])

  const { t } = useTranslation()
  return (
    <StyledInput
      {...rest}
      // universal input options
      pattern={`^[0-9]*[.,]?[0-9]{0,${decimals || 18}}$`}
      inputMode="decimal"
      title={t('Token Amount')}
      value={value}
      onChange={enforcer}
      // text-specific options
      type="text"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})

export default Input
