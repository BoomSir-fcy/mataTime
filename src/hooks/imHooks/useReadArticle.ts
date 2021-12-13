import { useCallback, useEffect, useState, useMemo } from 'react'
import debounce from 'lodash/debounce'
import useDebounce from 'hooks/useDebounce'
import { IM } from 'utils';
import useIm from './useIm'

// 视图范围优化
const VIEW_PADDING = {
  top: 200, // 忽略顶部200px的内容
  bottom: 200 // 忽略底部200px的内容
};

/**
 * @dev useReadArticle websocket向后端传当前阅读的评论或者id
 * 
 * FIXME:
 *  1.展开折叠需要重新计算高度
 *  2.删除、屏蔽帖子等操作, 需要重新计算高度
 *  3.图片加载需要获得高度
 *  4.如果后续评论显示在帖子里 需要重新计算高度
 *  5.如果有一万条帖子 计算高度的时候是否需要全部重新计算
 *  6.现在发帖会刷新列表 如果后续发帖不刷新整个列表 只在最前面新加帖子 需要计算高度
 *  
 */
const useReadArticle = (nonce?: number | boolean) => {
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
    Object.keys(articleIds).forEach(type => {
      if (articleIds[type] && articleIds[type].length) {
        im?.send(im.messageProtocol.WSProtocol_Spend_Time, {
          commit_time: fetchReadTime, // 提交时间
          read_type: Number(type), // 文章阅读
          read_uid: articleIds[type], // id数组 推文或者评论的
          time_step: timeStep, // 推送时间间隔
        })
      }
    })
  }, [articleIds, fetchReadTime])

  useEffect(() => {
    if (nowTime === fetchReadTime) return
    setFetchReadTime(nowTime)
    fetchHandle()
  }, [nowTime, articleIds, fetchReadTime, fetchHandle])


  const handleScroll = useCallback(() => {
    if (!Object.keys(articlePositions).length) return // 页面刷新的时候可能会触发onScroll 事件, 排除这种情况
    // const offsetTopOverflow = Math.min(...Object.values(articlePositions).map(item => item[0]))
    const top = window.scrollY + VIEW_PADDING.top
    const bottom = top + window.innerHeight - VIEW_PADDING.top - VIEW_PADDING.bottom
    const topViews = {}
    Object.keys(articlePositions).forEach(item => {
      const { offsetTop, offsetBottom, readType, articleId } = articlePositions[item]
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
        offsetTop >= (top) && (bottom) >= offsetTop
        ||
        offsetBottom >= (top) && (bottom) >= offsetBottom
      ) {
        // if (topViews[readType]); topViews[readType] = []; topViews[readType].push
        (topViews[readType] || (topViews[readType] = [])).push(Number(articleId))
      } else if (top >= (offsetTop) && (offsetBottom) >= top) {
        (topViews[readType] || (topViews[readType] = [])).push(Number(articleId))
      }
    })
    setArticleIds(topViews)
  }, [articlePositions, setArticleIds])

  const debouncedOnChange = useMemo(
    () => debounce(() => handleScroll(), 300),
    [handleScroll],
  )

  // 初始化显示阅读文章及监听其他可能更改高度的操作, 防抖 1s
  const flagDebounce = useDebounce(nonce, 1000)
  useEffect(() => {
    handleScroll()
  }, [handleScroll, flagDebounce])

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnChange);

    return () => {
      window.removeEventListener('scroll', debouncedOnChange)
    };
  }, [debouncedOnChange])

}

export default useReadArticle