import React from 'react';
import { Icon } from 'components';
import { Button } from 'uikit';

const BtnIcon: React.FC<{
  name: string;
  text: string;
}> = ({ name, text }) => {
  return (
    <Button
      minWidth='150px'
      startIcon={
        <Icon margin='0 18px 0 0' size={21} color='white' name={name} />
      }
    >
      {text}
    </Button>
  );
};

export default BtnIcon;
