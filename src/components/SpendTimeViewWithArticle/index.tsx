import React, { useCallback, useEffect, useRef, useState } from "react";
import useIm from "hooks/imHooks/useIm";
import { ReadType } from 'hooks/imHooks/types';
import { Text, Button } from "uikit";
import observerOptions from "./options";
import styled from "styled-components";

interface SpendTimeViewWithArticleProps {
  articleId: number
  readType: ReadType
  nonce?: number | string // 有导致高度变化的操作更改这个值进行刷新高度操作
  index?: number // 帖子显示序号 TODO: 后期优化操作, 当index 小于 
  nonceIndex?: number // 更改时变化的帖子的index
}

// 浏览扣费组件
const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> = React.memo(({ articleId, readType, nonce }) => {

  const imgRef = useRef<HTMLDivElement>(null);
  const { setArticlePositions, rendered, setRendered } = useIm()
  const [isLoaded, setIsLoaded] = useState(false);

  // FIXME: 当这个文章有图片等信息的时候 获取的高度不是真实高度 需要

  useEffect(() => {
    if (imgRef.current) {
      const offsetHeight = imgRef.current?.parentElement?.offsetHeight
      const offsetTop = imgRef.current?.parentElement?.offsetTop
      // const { offsetTop } = imgRef.current
      setArticlePositions(prep => {
        return {
          ...prep,
          [`${articleId}_${readType}`]: { articleId, readType, offsetTop, offsetBottom: offsetTop + offsetHeight },
        }
      })
      console.log({ articleId, readType, offsetTop, offsetBottom: offsetTop + offsetHeight }, '{ articleId, readType, offsetTop, offsetBottom: offsetTop + offsetHeight }')
      setIsLoaded(true)
      if (!rendered) setRendered(true)
    }
    return () => {
      setArticlePositions(prep => {
        const newArticlePositions = {
          ...prep
        }
        delete newArticlePositions[`${articleId}_${readType}`]
        return newArticlePositions
      })
    }
  }, [articleId, readType, rendered, nonce, setRendered, setArticlePositions]);


  // return <div ref={imgRef} />
  return <div ref={imgRef}>
    <Text>articleId: {articleId}</Text>
  </div>
})

export default SpendTimeViewWithArticle