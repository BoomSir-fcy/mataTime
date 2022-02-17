import React from 'react';
import { Box, Card, Flex, Text, Button, CardProps, BoxProps } from 'uikit';

interface DraftTipsProps extends BoxProps {
  onCancle: () => void;
  onConfirm: () => void;
}
const DraftTips: React.FC<DraftTipsProps> = ({
  onCancle,
  onConfirm,
  ...props
}) => {
  return (
    <Box width='200px' {...props}>
      <Card padding='16px' isRadius>
        <Text fontSize='14px'>
          草稿箱内有“显示上次的标题”，需要恢复吗？恢复将覆盖当前内容。
        </Text>
        <Flex justifyContent='flex-end' mt='16px'>
          <Button onClick={onCancle} scale='xs' variant='tertiary'>
            No
          </Button>
          <Button onClick={onConfirm} scale='xs' ml='8px'>
            Yes
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default DraftTips;
