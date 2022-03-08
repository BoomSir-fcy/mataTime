import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Flex, Text, Button, BoxProps } from 'uikit';

interface NoPermissionProps extends BoxProps {
  refresh?: () => void;
  refreshing?: boolean;
  backHome?: boolean;
}

const NoPermission: React.FC<NoPermissionProps> = ({
  refresh,
  backHome,
  refreshing,
  ...props
}) => {
  const { goBack } = useHistory();
  const { t } = useTranslation();

  return (
    <Box {...props}>
      <Flex justifyItems='center' alignItems='center' flexDirection='column'>
        <Text mb='16px'>
          {t('You do not have permission to view the current page')}
        </Text>
        {refresh && (
          <Button
            disabled={refreshing}
            mb='16px'
            onClick={() => refresh()}
            width='200px'
          >
            {refreshing ? <Dots>{t('Refreshing')}</Dots> : t('Refresh')}
          </Button>
        )}
        <Button mb='16px' variant='secondary' width='200px' onClick={goBack}>
          {t('Go back')}
        </Button>

        {backHome && (
          <Link to='/'>
            <Button width='200px'>{t('Go HOME')}</Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default NoPermission;
