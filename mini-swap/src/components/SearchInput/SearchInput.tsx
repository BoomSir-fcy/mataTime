import React, { useState, useMemo, useEffect } from 'react'
import { Input } from 'pancake-uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'

export const scales = {
  LD: "ld",
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;

export type Scale = typeof scales[keyof typeof scales];

export const scaleVariants = {
  [scales.LD]: {
    minWidth: "108px",
    minWidthBig: "108px",
  },
  [scales.MD]: {
    minWidth: "148px",
    minWidthBig: "168px",
  },
  [scales.SM]: {
    minWidth: "80px",
    minWidthBig: "128px",
  },
  [scales.XS]: {
    minWidth: "60px",
    minWidthBig: "100px",
  },
};

const StyledInput = styled(Input)`
  border-radius: 16px;
  margin-left: auto;
`

const InputWrapper = styled.div<{ scale: Scale }>`
  position: relative;
  width: ${( { scale } ) => scaleVariants[scale].minWidth};
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    width: ${( { scale } ) => scaleVariants[scale].minWidthBig};
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onResetVal?: (value: string) => void
  placeholder?: string
  scale?: Scale
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, onResetVal, scale, placeholder = 'Search' }) => {
  const [toggled, setToggled] = useState(false)
  const [searchText, setSearchText] = useState('')

  const { t } = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  useEffect(() => {
    if (onResetVal && !searchText) {
      onResetVal('')
    }
  }, [onResetVal, searchText])

  return (
    <Container toggled={toggled}>
      <InputWrapper scale={scale}>
        <StyledInput
          value={searchText}
          onChange={onChange}
          placeholder={t(placeholder)}
          onBlur={() => setToggled(false)}
        />
      </InputWrapper>
    </Container>
  )
}


SearchInput.defaultProps = {
  scale: scales.MD
}

export default SearchInput
