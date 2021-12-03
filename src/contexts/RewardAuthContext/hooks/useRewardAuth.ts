import { useContext } from 'react';
import { RewardAuthContext } from '..';

const useRewardAuth = () => {
  const im = useContext(RewardAuthContext);
  if (im === undefined) {
    throw new Error('reward auth context is undefined');
  }
  return im;
};

export default useRewardAuth;
