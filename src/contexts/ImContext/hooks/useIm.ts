import { useContext } from 'react';
import { ImContext } from '..';

const useIm = () => {
  const im = useContext(ImContext);
  if (im === undefined) {
    throw new Error('im context is undefined');
  }
  return im;
};

export default useIm;
