import React from 'react';
import { Box, Card, Flex, Text, Button, CardProps, BoxProps } from 'uikit';
import { useTranslation } from 'contexts';
interface DraftTipsProps extends BoxProps {
  onCancle: () => void;
  onConfirm: () => void;
  title: string;
}
const DraftTips: React.FC<DraftTipsProps> = ({
  onCancle,
  onConfirm,
  title,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Box width='200px' {...props}>
      <Card padding='16px' isRadius>
        <Text fontSize='14px'>
          {t(
            'There is "%title%" in the draft box. Do you want to restore it? Restore will overwrite the current content.',
            { title },
          )}
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
