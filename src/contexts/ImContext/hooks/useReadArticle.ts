import { useEffect, useState } from 'react'
import useIm from './useIm'

const useReadArticle = () => {
  const { im, articleIds, addArticleId, removeArticleId } = useIm()
  const timeStep = 1 // 推送时间间隔
  const [nowTime, setNowTime] = useState(0)
  const [fetchReadTime, setFetchReadTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Math.floor(new Date().getTime() / 1000 / timeStep))
    }, 1000);
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (nowTime === fetchReadTime) return
    setFetchReadTime(nowTime)
    console.log(articleIds, 'articleIds')
  }, [nowTime, articleIds, fetchReadTime])
}

export default useReadArticle