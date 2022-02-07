import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, ButtonProps, ButtonVariant } from 'uikit';
import debounce from 'lodash/debounce';
import { Avatar, CancelAttentionModal } from 'components';
import { mediaQueriesSize } from 'uikit/theme/base';

import { Certification } from './certification';
import { Api } from 'apis';
import { useTranslation } from 'contexts';

interface FollowBtnProps extends ButtonProps {
  attention: boolean;
  uid: number;
  address: string;
  nft_image: string;
  onChanges: (attention: boolean) => void;
}

export const FollowBtn: React.FC<FollowBtnProps> = ({
  attention,
  uid,
  onChanges,
  address,
  nft_image,
  ...props
}) => {
  const { t } = useTranslation();

  const [visibility, setVisibility] = useState(false);
  const [foucs, setFoucs] = useState(false);
  const btnVariant: ButtonVariant = useMemo(() => {
    if (attention && foucs) return 'tertiary';
    if (attention) return 'secondary';
    return 'primary';
  }, [attention, foucs]);

  const btnText = useMemo(() => {
    if (attention && foucs) return 'followCancelText';
    if (attention) return 'meFollowed';
    return 'followText';
  }, [attention, foucs]);

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        // onChanges(true)
      } else {
        onChanges(false);
      }
    } catch (error) {
      onChanges(false);
      console.error(error);
    }
  };

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      onChanges(false);
      setVisibility(false);
      const res = await Api.MeApi.unFollowUser(focus_uid);
      if (Api.isSuccess(res) && onChanges) {
      } else {
        onChanges(true);
      }
    } catch (error) {
      onChanges(true);
      console.error(error);
    }
  };

  const handleClick = useCallback(
    event => {
      if (!attention) {
        onChanges(!attention);
        followUser(uid);
      } else {
        setVisibility(true);
      }
      // if (props.onClick) {
      //   props.onClick(event);
      // }
    },
    [attention, onChanges, uid, setVisibility, props.onClick],
  );

  return (
    <>
      <Button
        onMouseEnter={() => setFoucs(true)}
        onMouseLeave={() => setFoucs(false)}
        onBlur={() => setFoucs(false)}
        variant={btnVariant}
        minWidth='110px'
        width='110px'
        ml='36px'
        onClick={handleClick}
        {...props}
      >
        {props.variant === 'text' ? (
          <Text color={attention ? 'textTips' : 'textPrimary'}>
            {t(btnText)}
          </Text>
        ) : (
          t(btnText)
        )}
      </Button>
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={visibility}
        params={{
          uid,
          address,
          nft_image,
        }}
        confirm={() => unFollowUser(uid)}
        onClose={() => setVisibility(false)}
      />
    </>
  );
};
