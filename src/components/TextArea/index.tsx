import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps, Text } from 'uikit';

interface TextAreaProps {
  maxLength?: number;
  showCount?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  [propName: string]: any;
}

const TextareaStyled = styled(Box)<TextAreaProps>`
  position: relative;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  .textarea-content-length {
    position: absolute;
    right: 24%;
    bottom: 8%;
  }
`;

const TextArea: React.FC<TextAreaProps> = ({
  disabled,
  value = '',
  maxLength,
  showCount = false,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <TextareaStyled disabled={disabled}>
      <textarea
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        {...props}
      />
      {showCount && (
        <Text
          className='textarea-content-length'
          color='textTips'
          small
        >{`${value.length}/${maxLength}`}</Text>
      )}
    </TextareaStyled>
  );
};

export default TextArea;
