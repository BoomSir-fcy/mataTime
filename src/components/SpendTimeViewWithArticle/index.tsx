import React, { useCallback, useEffect, useRef, useState } from "react";
import useIm from "hooks/imHooks/useIm";
import { ReadType } from 'hooks/imHooks/types';
import { Text, Button } from "uikit";
import observerOptions from "./options";
import styled from "styled-components";
import { ARTICLE_IMAGE_CLASS_NAME } from "config";
import useDebounce from "hooks/useDebounce";

interface SpendTimeViewWithArticleProps {
  articleId: number
  readType: ReadType
  nonce?: number // 有导致高度变化的操作更改这个值进行刷新高度操作
  setNonce?: React.Dispatch<React.SetStateAction<number>>
  index?: number // 帖子显示序号 TODO: 后期优化操作, 当index 小于 
  nonceIndex?: number // 更改时变化的帖子的index
}

// 浏览扣费组件
const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> = React.memo(({ articleId, readType, nonce, setNonce }) => {

  const imgRef = useRef<HTMLDivElement>(null);
  const { setArticlePositions, rendered, setRendered } = useIm()
  const [isLoaded, setIsLoaded] = useState(false);

  // 解决图片加载后文章高度改变
  const handleListenImageLoad = useCallback((dom: HTMLElement) => {
    const images = dom?.getElementsByClassName(ARTICLE_IMAGE_CLASS_NAME)
    if (images.length > 0) {
      (Array.from(images) as HTMLImageElement[]).forEach((item) => {
        item.addEventListener('load', () => {
          setNonce(prep => prep + 1)
        })
      })
    }
  }, [setNonce])

  const flagDebounce = useDebounce(nonce, 500)

  useEffect(() => {
    if (imgRef.current) {
      handleListenImageLoad(imgRef.current?.parentElement)
      const offsetHeight = imgRef.current?.parentElement?.offsetHeight
      const offsetTop = imgRef.current?.parentElement?.offsetTop
      // const { offsetTop } = imgRef.current
      setArticlePositions(prep => {
        return {
          ...prep,
          [`${articleId}_${readType}`]: { articleId, readType, offsetTop, offsetBottom: offsetTop + offsetHeight },
        }
      })
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
  }, [articleId, readType, rendered, flagDebounce, setRendered, setArticlePositions]);


  return <div ref={imgRef} />
  // return <div ref={imgRef}>
  //   <Text>articleId: {articleId}</Text>
  // </div>
})

export default SpendTimeViewWithArticle