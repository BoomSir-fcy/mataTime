import React, { useCallback, useEffect, useState } from 'react'
import { IM } from 'utils';

interface ProviderState {
  im: IM
  articleIds: number[]
  setArticleIds: React.Dispatch<React.SetStateAction<number[]>>,
  addArticleId: (id: number) => void
  removeArticleId: (id: number) => void
}

const ImContext = React.createContext({ } as ProviderState)

const ImContextProvider = ({ children }) => {

  const [im, setWs] = useState<IM>(null)
  const [articleIds, setArticleIds] = useState<number[]>([12,33, 4])

  const addArticleId = useCallback((id: number) => {
    console.log([...articleIds, id])
    console.log(id, Array.from(new Set([...articleIds, id])), 'Array.from(new Set([...articleIds, id]))')
    setArticleIds(Array.from(new Set([...articleIds, id])))
  }, [articleIds, setArticleIds])

  const removeArticleId = useCallback((id: number) => {
    console.log(id, articleIds.filter(item => item !== id), 'articleIds.filter(item => item !== id)')
    setArticleIds(articleIds.filter(item => item !== id))
  }, [articleIds, setArticleIds])


  const initSocket = () => {
    console.log(122121)
    const instantMessageing = new IM();
    setWs(instantMessageing)
    // instantMessageing.on('open', (event) => {
    //   console.log('=============open', event)
    // })
    // instantMessageing.on('message', (event) => {
    //   console.log('=======message======message', event)
    // })
    // instantMessageing.on('close', (event) => {
    //   console.log('=======close======close', event)
    // })
    // instantMessageing.on('error', (event) => {
    //   console.log('=======error======error', event)
    // })
  };

  React.useEffect(() => {
    initSocket();
  }, []);

  return (
    <ImContext.Provider value={{ im, articleIds, setArticleIds, addArticleId, removeArticleId }}>
      {children}
    </ImContext.Provider>
  )
}

export { ImContext, ImContextProvider }
