import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, ButtonProps, ButtonVariant } from 'uikit';
import debounce from 'lodash/debounce'
import { Avatar } from 'components';
import { mediaQueriesSize } from 'uikit/theme/base';

import { Certification } from './certification';
import { Api } from 'apis';
import { useTranslation } from 'contexts';

interface FollowBtnProps extends ButtonProps {
  attention: boolean
  uid: number
  onChanges?: (isAttention: boolean) => void
}

export const FollowBtn: React.FC<FollowBtnProps> = ({
  attention, uid, onChanges, ...props
}) => {
  const { t } = useTranslation()

  const [isAttention, setIsAttention] = useState(attention)
  const [foucs, setFoucs] = useState(false)
  const btnVariant: ButtonVariant = useMemo(() => {
    if (isAttention && foucs) return 'tertiary'
    if (isAttention) return 'secondary'
    return 'primary'
  }, [isAttention, foucs])

  const btnText = useMemo(() => {
    if (isAttention && foucs) return 'followCancelText'
    if (isAttention) return 'meFollowed'
    return 'followText'
  }, [isAttention, foucs])

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res) && onChanges) {
        onChanges(true)
      } else {
        // setIsAttention(prep => !prep)
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 取消关注
  const unFollowUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.unFollowUser(focus_uid);
      if (Api.isSuccess(res) && onChanges) {
        onChanges(false)
      } else {
        // setIsAttention(prep => !prep)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedOnChange = useMemo(
    () => debounce((isFollowing) => handleChangeState(isFollowing), 500),
    [],
  )

  const handleChangeState = useCallback(async (isFollowing) => {
    if (attention === isFollowing) return
    if (isFollowing) {
      await followUser(uid)
      return
    }
    await unFollowUser(uid)
  }, [uid, attention])

  const handleClick = useCallback(() => {
    setIsAttention(prep => {
      debouncedOnChange(!prep)
      return !prep
    })
  }, [setIsAttention])
  return (
    <Button
      onMouseEnter={() => setFoucs(true)}
      onMouseLeave={() => setFoucs(false)}
      onBlur={() => setFoucs(false)}
      variant={btnVariant}
      minWidth="110px"
      width="110px"
      ml="36px"
      onClick={handleClick}
      {...props}
    >
      {t(btnText)}
    </Button>
  )
}
