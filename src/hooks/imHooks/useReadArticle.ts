import { useCallback, useEffect, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import useDebounce from 'hooks/useDebounce';
import useIsBrowserTabActive from 'hooks/useIsBrowserTabActive';
import useIm from './useIm';
import useInterval from '../useInterval';

// 视图范围优化
const VIEW_PADDING = {
  top: 100, // 忽略顶部100px的内容
  bottom: 100, // 忽略底部100px的内容
};

/**
 * @dev useReadArticle websocket向后端传当前阅读的评论或者id
 *
 */
const useReadArticle = (nonce?: number | boolean) => {
  const { im, articleIds, articlePositions, setArticleIds } = useIm();
  const timeStep = 1; // 推送时间间隔
  const isBrowserTabActiveRef = useIsBrowserTabActive();

  const fetchHandle = useCallback(() => {
    if (!isBrowserTabActiveRef.current) return;
    Object.keys(articleIds).forEach(type => {
      if (articleIds[type] && articleIds[type].length) {
        im?.send(
          im.messageProtocol.WSProtocol_Spend_Time,
          {
            commit_time: Math.floor(new Date().getTime() / 1000 / timeStep), // 提交时间
            read_type: Number(type), // 文章阅读
            read_uid: articleIds[type], // id数组 推文或者评论的
            time_step: timeStep, // 推送时间间隔
          },
          true,
        );
      }
    });
  }, [articleIds, isBrowserTabActiveRef, im]);

  useInterval(
    fetchHandle,
    isBrowserTabActiveRef.current ? timeStep * 1000 : null,
  );

  const articlePositionsVal = useDebounce(articlePositions, 1000);

  const handleScroll = useCallback(() => {
    if (!Object.keys(articlePositionsVal).length) {
      setArticleIds({});
      return;
    } // 页面刷新的时候可能会触发onScroll 事件, 排除这种情况
    // const offsetTopOverflow = Math.min(...Object.values(articlePositions).map(item => item[0]))
    const top = window.scrollY + VIEW_PADDING.top;
    const bottom =
      top + window.innerHeight - VIEW_PADDING.top - VIEW_PADDING.bottom;
    const topViews = {};
    Object.keys(articlePositionsVal).forEach(item => {
      const { offsetTop, offsetBottom, readType, articleId } =
        articlePositionsVal[item];
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
        (offsetTop >= top && bottom >= offsetTop) ||
        (offsetBottom >= top && bottom >= offsetBottom)
      ) {
        // if (topViews[readType]); topViews[readType] = []; topViews[readType].push
        (topViews[readType] || (topViews[readType] = [])).push(
          Number(articleId),
        );
      } else if (top >= offsetTop && offsetBottom >= top) {
        (topViews[readType] || (topViews[readType] = [])).push(
          Number(articleId),
        );
      }
    });
    setArticleIds(topViews);
  }, [articlePositionsVal, setArticleIds]);

  const debouncedOnChange = useMemo(
    () => debounce(() => handleScroll(), 300),
    [handleScroll],
  );

  // 初始化显示阅读文章及监听其他可能更改高度的操作, 防抖 1s
  const flagDebounce = useDebounce(nonce, 1000);
  useEffect(() => {
    handleScroll();
  }, [handleScroll, flagDebounce]);

  useEffect(() => {
    if (im) {
      im.removeSuspendTpl(im.messageProtocol.WSProtocol_Spend_Time);
    }
    return () => {
      setArticleIds({});
    };
  }, [im, setArticleIds]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnChange);

    return () => {
      window.removeEventListener('scroll', debouncedOnChange);
    };
  }, [debouncedOnChange]);
};

export default useReadArticle;
