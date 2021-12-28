import React from 'react';
import { Button } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useImmer } from 'use-immer';

interface followProps {
  address: string;
  attention_status: number;
  display_format: number;
  introduction: string;
  location: string;
  nft_image: string;
  nick_name: string;
  uid: number;
}

export const FollowButton: React.FC<{
  data: followProps;
  followFunc: () => void;
  unFollowFunc: () => void;
}> = React.memo(({ data, followFunc, unFollowFunc }) => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
    hoverIndex: 0,
    hoverStatus: false,
  });

  return (
    <React.Fragment>
      {data.attention_status === 0 ? (
        <Button onClick={followFunc}>{t('meFocusOn')}</Button>
      ) : (
        <React.Fragment>
          {state.hoverStatus ? (
            <Button
              onClick={unFollowFunc}
              variant='tertiary'
              onMouseLeave={() =>
                setState(p => {
                  p.hoverIndex = 0;
                  p.hoverStatus = false;
                })
              }
            >
              {t('meUnsubscribe')}
            </Button>
          ) : (
            <Button
              onClick={unFollowFunc}
              onMouseEnter={() =>
                setState(p => {
                  p.hoverStatus = true;
                })
              }
            >
              {t('meFollowed')}
            </Button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
});
