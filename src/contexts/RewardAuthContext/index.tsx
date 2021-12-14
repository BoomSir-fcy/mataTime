import React, { useCallback, useEffect, useState } from 'react';
import RewardAuthModal from '../../components/RewardAuth/RewardAuthModal';

interface ProviderState {
  visible;
  setVisible;
  setPosition;
  setCurrent;
}

const RewardAuthContext = React.createContext({} as ProviderState);

const RewardAuthContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<Api.Home.post>(null);
  const [positon, setPosition] = useState({
    top: 0,
    left: 0
  });

  // const getPosition = React.useCallback(ref => {
  //   return ref.getBoundingClientRect();
  // }, []);

  console.log(positon);
  return (
    <RewardAuthContext.Provider
      value={{
        setVisible,
        setPosition,
        setCurrent,
        visible
      }}
    >
      {visible && (
        <RewardAuthModal
          postType={0}
          currentPost={current}
          avatar={current.user_avator_url}
          offsetTop={positon.top}
          offsetLeft={positon.left}
        />
      )}
      {children}
    </RewardAuthContext.Provider>
  );
};

export { RewardAuthContext, RewardAuthContextProvider };
