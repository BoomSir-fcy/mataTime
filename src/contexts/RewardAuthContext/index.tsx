import React, { useCallback, useEffect, useState } from 'react'
import RewardAuthModal from '../../components/RewardAuth/RewardAuthModal'



interface ArticlePositions {
  // [number, number] =  [top, bottom], 当前文章边界
  [articleId: number]: [number, number],
}
interface ProviderState {
  visible,
  setVisible,
}


const RewardAuthContext = React.createContext({} as ProviderState)

const RewardAuthContextProvider = ({ children }) => {

  const [visible, setVisible] = useState(true)

  return (
    <RewardAuthContext.Provider value={{
      setVisible,
      visible,
    }}>
      {visible && (<RewardAuthModal />)}
      {children}
    </RewardAuthContext.Provider>
  )
}

export {
  RewardAuthContext,
  RewardAuthContextProvider
}
