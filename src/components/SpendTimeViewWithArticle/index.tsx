import React, { useCallback, useEffect, useRef, useState } from "react";
import useIm from "contexts/ImContext/hooks/useIm";
import { Text, Button } from "uikit";
import observerOptions from "./options";
import styled from "styled-components";

interface SpendTimeViewWithArticleProps {
  articleId: number
}

const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> = ({ articleId }) => {

  const imgRef = useRef<HTMLDivElement>(null);
  const { setArticlePositions, rendered, setRendered } = useIm()
  const [isLoaded, setIsLoaded] = useState(false);

  // FIXME: 当这个文章有图片等信息的时候 获取的高度不是真实高度 需要

  useEffect(() => {
    if (imgRef.current && !isLoaded) {
      const offsetHeight = imgRef.current?.parentElement?.offsetHeight
      const offsetTop = imgRef.current?.parentElement?.offsetTop
      // const { offsetTop } = imgRef.current
      setArticlePositions(prep => {
        return {
          ...prep,
          [articleId]: [offsetTop, offsetTop + offsetHeight],
        }
      })
      setIsLoaded(true)
      if (!rendered) setRendered(true)
    }
  }, [articleId, rendered, setRendered, setArticlePositions]);


  // return <div ref={imgRef} />
  return <div ref={imgRef}>
    <Text>articleId: {articleId}</Text>
  </div>
}

export default SpendTimeViewWithArticle