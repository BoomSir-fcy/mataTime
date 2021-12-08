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
const useReadArticle = (flag?: number | boolean) => {
  const { im, articleIds, articlePositions, rendered, setArticleIds } = useIm()


}

export default useReadArticle