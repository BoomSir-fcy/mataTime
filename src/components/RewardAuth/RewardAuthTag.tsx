import React, { useCallback } from 'react';
import styled from 'styled-components';
import { usePopper } from 'react-popper';
import { useImmer } from 'use-immer';
import { Flex, Box, Text, TextProps } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Icon } from '../Icon';
import RewardAuthModal from './RewardAuthModal';

// import useRewardAuth from 'contexts/RewardAuthContext/hooks/useRewardAuth';

const RewardAuthTagStyled = styled(Flex)`
  cursor: pointer;
  position: relative;
`;

export const RewardAuthTag: React.FC<RewardAuthProps> = ({ data }) => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    visible: false
  });
  const { visible } = state;
  const reward: reward[] = data.reward_stats || [];
  const ref = React.useRef(null);

  // const handleVisible = useCallback(() => {
  //   setState(p => {
  //     p.visible = false;
  //   });
  // }, []);

  // React.useEffect(() => {
  //   document.addEventListener('click', handleVisible);
  //   return () => {
  //     document.removeEventListener('click', handleVisible);
  //   };
  // }, []);

  return (
    <RewardAuthTagStyled
      ref={ref}
      onClick={() =>
        setState(p => {
          p.visible = true;
        })
      }
      alignItems="center"
    >
      <Icon color="red" margin="0 10px 0 0" name="icon-dashang" />
      {(reward?.length > 0 && reward[0]?.count) || 0}
      {visible && (
        <RewardAuthModal currentPost={data} avatar={data.user_avator_url} />
      )}
    </RewardAuthTagStyled>
  );
};

export default RewardAuthTag;
