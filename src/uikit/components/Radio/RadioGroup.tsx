import React, { ReactNode, useCallback, useState } from 'react';
import { BoxProps, Flex, Radio, RadioProps, Text } from 'uikit';

type ValueType = string | number;

interface RadioGroupProps extends BoxProps {
  defaultValue?: ValueType;
  value?: ValueType;
  options: Array<RadioItemProps>;
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
  value,
  label,
  checked,
  onChange,
}) => {
  const radioId = `radio_${value}_${Date.now()}`;
  return (
    <Flex mr='20px'>
      <Radio
        scale='sm'
        type='radio'
        id={radioId}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={radioId}>
        <Text ml='12px'>{label}</Text>
      </label>
    </Flex>
  );
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  defaultValue,
  value,
  options,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value || defaultValue);

  const onRadioChange = useCallback(
    e => {
      e.stopPropagation();
      const val =
        typeof value === 'number' ? Number(e.target.value) : e.target.value;
      console.log(val, '=========', currentValue);
      setCurrentValue(val);
      if (onChange && currentValue !== val) {
        onChange(val);
      }
    },
    [currentValue],
  );
  return (
    <Flex>
      {options.map(item => (
        <RadioItem
          key={item.value}
          value={item.value}
          label={item.label}
          checked={currentValue === item.value}
          onChange={onRadioChange}
        />
      ))}
    </Flex>
  );
};

export default RadioGroup;
