import { useCallback, useEffect, useState, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { IM } from 'utils';
import useIm from './useIm'

const VIEW_PADDING = 120;
const useReadArticle = () => {
  const { im, articleIds, articlePositions, rendered, setArticleIds } = useIm()
  const timeStep = 1 // 推送时间间隔
  const [initLoad, setInitLoad] = useState(false)
  const [nowTime, setNowTime] = useState(0)
  const [fetchReadTime, setFetchReadTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Math.floor(new Date().getTime() / 1000 / timeStep))
    }, 1000);
    return () => clearInterval(timer)
  }, [])

  const fetchHandle = useCallback(() => {
    im?.send(im.messageProtocol.WSProtocol_Spend_Time, {
      commit_time: fetchReadTime, // 提交时间
      read_type: 1, // 文章阅读
      read_uid: articleIds, // id数组 推文或者评论的
      time_step: timeStep, // 推送时间间隔
    })
  }, [articleIds, fetchReadTime])

  useEffect(() => {
    if (nowTime === fetchReadTime) return
    setFetchReadTime(nowTime)
    fetchHandle()
  }, [nowTime, articleIds, fetchReadTime, fetchHandle])


  const handleScroll = useCallback(() => {
    const top = window.scrollY
    const bottom = top + window.innerHeight
    const topViews = []
    const offsetTopOverflow = Math.min(...Object.values(articlePositions).map(item => item[0]))
    Object.keys(articlePositions).forEach(item => {
      let [articleTop, articleBottom] = articlePositions[item]
      articleTop = Number(articleTop) - offsetTopOverflow
      articleBottom = Number(articleBottom) - offsetTopOverflow
      // 碰撞检测
      /**
       * @dev 碰撞检测
       * A. 文章上边距 大于 (视窗顶部 + 模糊距离) = 文章上边距在视窗顶部下方
       * B. (视窗底部 - 模糊距离) 大于 文章下边距 = 文章上边距在视窗底部上方
       * C. A && B => 文章上边距在视窗范围内
       * D: 文章下边距同理, 当一边在视窗内代表当前文章在阅读中
       * 
       * 第二个if判断：
       * 1. 当文章过长以后 判断上边距和文章碰撞检测
       */
      if (
        articleTop >= (top + VIEW_PADDING) && (bottom - VIEW_PADDING) >= articleTop
        ||
        articleBottom >= (top + VIEW_PADDING) && (bottom - VIEW_PADDING) >= articleBottom
      ) {
        topViews.push(Number(item))
      } else if (top >= (articleTop + VIEW_PADDING) && (articleBottom - VIEW_PADDING) >= top) {
        topViews.push(Number(item))
      }
    })
    setArticleIds([...topViews])
  }, [articlePositions, setArticleIds])

  const debouncedOnChange = useMemo(
    () => debounce(() => handleScroll(), 300),
    [handleScroll],
  )

  // 初始化显示阅读文章
  useEffect(() => {
    if (rendered && !initLoad) {
      handleScroll()
      setInitLoad(true)
    }
  }, [rendered, handleScroll, initLoad, setInitLoad])

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnChange);

    return () => {
      window.addEventListener('scroll', debouncedOnChange)
    };
  }, [debouncedOnChange])

}

export default useReadArticle