import { useTranslation } from 'contexts';
import React from 'react';
import { Button, Flex } from 'uikit';

export const TribeCreateBtn: React.FC<{ hasNft?: boolean }> = React.memo(
  ({ hasNft }) => {
    const { t } = useTranslation();
    return (
      <Flex mb='20px' justifyContent='center'>
        {!hasNft ? (
          <Button width='250px'>{t('Get Tribe Tickets')}</Button>
        ) : (
          <Button type='submit' width='250px'>
            {t('Pay and Create')}
          </Button>
        )}
        {/* <Button disabled={pending}  onClick={async () => {
              const tokenId = 1011;
              setPending(true);
              try {
                await ApproveTribeTicketsNFT(tokenId);
              } catch (error) {
                console.log(error);
              } finally {
                setPending(false);
              }
            }}>
              { pending ? <Dots>{t('Approving')}</Dots> : t('Approve')}
            </Button> */}
      </Flex>
    );
  },
);
