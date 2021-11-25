import React from 'react'
import styled from 'styled-components'
import { BoxProps } from 'pancake-uikit'

export interface GradientValueProps extends BoxProps {
  value?: string
  fontSize?: string
  fontSizeSM?: string
  background?: string
  textAlign?: string
  color?: string
  bold?: boolean
}

const GradientValueStyled = styled.div<{
  fontSize?: string,
  fontSizeSM?: string,
  bold?: boolean,
  background?: string
  textAlign?: string
  color?: string
}>`
  flex: 1;
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: ${props => props.color ? 'inherit' : ({ theme }) => theme.colors.text};
    display: block;
    font-weight: ${({ bold }) => bold ? 600 : 400};
    font-size: ${({ fontSizeSM }) => fontSizeSM};
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: ${({ fontSize }) => fontSize};
    }
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    /* to right, */
    background: linear-gradient(
      ${({ textAlign }) => textAlign === 'right' ? 'to left' : 'to right'},
      ${({ theme, background }) => theme.colors[background] || theme.colors.backgroundCard}00,
      ${({ theme, background }) => theme.colors[background] || theme.colors.backgroundCard}E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: ${({ textAlign }) => textAlign === 'right' ? 'auto' : '0'};
    left: ${({ textAlign }) => textAlign === 'right' ? '0' : 'auto'};
    top: 0;
    width: 60px;
  }
`


const InputStyled = styled.input<{ bold?: boolean, fontSize?: string, textAlign?: string, fontSizeSM?: string, color?: string }>`
  background: transparent;
  border: 0;
  color: ${props => props.color ? 'inherit' : ({ theme }) => theme.colors.text};
  display: block;
  font-weight: ${({ bold }) => bold ? 600 : 400};
  font-size: ${({ fontSizeSM }) => fontSizeSM};
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ fontSize }) => fontSize};
  }
  padding: 0;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign};
  /* padding-right: ${({ textAlign }) => textAlign === 'right' ? '20px' : ''}; */
  &:focus {
    outline: 0;
  }
`

const GradientValue: React.FC<GradientValueProps> = ({ value, textAlign, bold = true, fontSize = '16px', fontSizeSM = '16px', color, ...props }) => {
  return (
    <GradientValueStyled bold={bold} textAlign={textAlign} fontSize={fontSize} fontSizeSM={fontSizeSM} title={value} color={color} {...props}>
      <InputStyled textAlign={textAlign} type="text" fontSizeSM={fontSizeSM} readOnly value={value} color={color} />
    </GradientValueStyled>
  )
}

export default GradientValue
