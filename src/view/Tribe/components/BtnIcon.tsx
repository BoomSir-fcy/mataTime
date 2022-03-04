import React from 'react';
import { Icon } from 'components';
import { Button, ButtonProps } from 'uikit';

interface BtnIconProps extends ButtonProps {
  name: string;
  text: string;
}
const BtnIcon: React.FC<BtnIconProps> = ({ name, text, ...props }) => {
  return (
    <Button
      minWidth='150px'
      startIcon={
        <Icon margin='0 18px 0 0' size={21} color='white' name={name} />
      }
      {...props}
    >
      {text}
    </Button>
  );
};

export default BtnIcon;
