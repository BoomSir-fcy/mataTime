import React, { useCallback, useEffect, useState } from 'react'
import { IM } from 'utils';



interface ArticlePositions {
  // [number, number] =  [top, bottom], 当前文章边界
  [articleId: number]: [number, number],
}
interface ProviderState {
  im: IM
  articleIds: number[]
  setArticleIds: React.Dispatch<React.SetStateAction<number[]>>,
  articlePositions: ArticlePositions,
  setArticlePositions: React.Dispatch<React.SetStateAction<ArticlePositions>>,
  addArticleId: (id: number) => void
  removeArticleId: (id: number) => void
  rendered: boolean
  setRendered: React.Dispatch<React.SetStateAction<boolean>>
}


const ImContext = React.createContext({ } as ProviderState)

const ImContextProvider = ({ children }) => {

  const [im, setWs] = useState<IM>(null)
  const [articleIds, setArticleIds] = useState<number[]>([])
  const [articlePositions, setArticlePositions] = useState<ArticlePositions>({})
  const [rendered, setRendered] = useState(false) // 是否渲染元素

  const addArticleId = useCallback((id: number) => {
    if (articleIds.includes(id)) return
    setArticleIds([...articleIds, id])
  }, [articleIds, setArticleIds])

  const removeArticleId = useCallback((id: number) => {
    if (!articleIds.includes(id)) return
    setArticleIds([...articleIds].filter(item => item !== id))
  }, [articleIds, setArticleIds])

  const initSocket = () => {
    const instantMessageing = new IM();
    setWs(instantMessageing)
  };

  React.useEffect(() => {
    initSocket();
  }, []);

  return (
    <ImContext.Provider value={{
      im,
      articleIds,
      setArticleIds,
      addArticleId,
      removeArticleId,
      articlePositions,
      setArticlePositions,
      rendered,
      setRendered,
    }}>
      {children}
    </ImContext.Provider>
  )
}

export { ImContext,
  ImContextProvider }
