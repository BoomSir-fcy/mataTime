import { useTranslation } from 'contexts';
import React from 'react';
import { Button, Flex } from 'uikit';

export const TribeCreateBtn: React.FC<{ hasNft?: boolean }> = React.memo(
  ({ hasNft }) => {
    const { t } = useTranslation();
    return (
      <>
        <Flex mb='20px' justifyContent='center'>
          {hasNft ? (
            <Button type='submit' width='250px'>
              {t('批准')}
            </Button>
          ) : (
            <Button width='250px'>{t('Get Tribe Tickets')}</Button>
          )}
        </Flex>
      </>
    );
  },
);
