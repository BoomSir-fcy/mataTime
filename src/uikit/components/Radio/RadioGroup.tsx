import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { BoxProps, Flex, Radio, RadioProps, Text } from 'uikit';

type ValueType = string | number;

interface RadioGroupProps extends BoxProps {
  defaultValue?: ValueType;
  value?: ValueType;
  options: Array<RadioItemProps>;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
interface RadioItemProps extends RadioProps {
  value: ValueType;
  label: string | ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export const RadioItem: React.FC<RadioItemProps> = ({
  scale = 'sm',
  value,
  label,
  checked,
  disabled,
  onChange,
}) => {
  const radioId = `radio_${value}_${Date.now()}`;
  return (
    <Flex mr='20px' alignItems='center'>
      <Radio
        scale={scale}
        type='radio'
        id={radioId}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={radioId} style={{ minWidth: '50px', flex: 1 }}>
        <Text ml='12px'>{label}</Text>
      </label>
    </Flex>
  );
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  defaultValue,
  value,
  options,
  disabled,
  onChange,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const onRadioChange = useCallback(
    e => {
      e.stopPropagation();
      const val =
        typeof value === 'number' ? Number(e.target.value) : e.target.value;
      setCurrentValue(val);
      if (onChange && currentValue !== val) {
        onChange(val);
      }
    },
    [currentValue],
  );
  return (
    <Flex {...props}>
      {options.map(item => (
        <RadioItem
          key={item.value}
          value={item.value}
          label={item.label}
          checked={currentValue === item.value}
          disabled={disabled}
          onChange={onRadioChange}
        />
      ))}
    </Flex>
  );
};

export default RadioGroup;
