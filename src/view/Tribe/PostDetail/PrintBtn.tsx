import React, { useCallback } from 'react';
import PrintGlobal from 'style/PrintGlobal';
import { Box, Text, Button, BoxProps } from 'uikit';

const PrintBtn: React.FC<BoxProps> = props => {
  const printHandle = useCallback(() => {
    window.print();
  }, []);
  return (
    <Box {...props}>
      <PrintGlobal />
      <Button onClick={printHandle}>打印保存</Button>
    </Box>
  );
};

export default PrintBtn;
