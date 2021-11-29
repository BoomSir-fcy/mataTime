import React, { useCallback, useEffect, useRef, useState } from "react";
import useIm from "contexts/ImContext/hooks/useIm";
import { Text, Button } from "uikit";
import observerOptions from "./options";

interface SpendTimeViewWithArticleProps {
  articleId: number
}
const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> = ({ articleId }) => {

  const imgRef = useRef<HTMLDivElement>(null);
  const { addArticleId, removeArticleId } = useIm()
  const [isLoaded, setIsLoaded] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log('=========================qqqqqqqqqq')
    let observer: IntersectionObserver;
    if (imgRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            // addArticleId(articleId)
            // setIsLoaded(true)
            // setActive(true)
            // observer.disconnect();
          } else if (active) {
            // setActive(false)
            // removeArticleId(articleId)
          }
        });
      }, observerOptions);
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [articleId,addArticleId]);

  const remove = useCallback((articleId) => {
    removeArticleId(articleId)
  }, [removeArticleId])
  const add = useCallback((articleId) => {
    addArticleId(articleId)
  }, [addArticleId])

  return <div ref={imgRef}>
    <Text>articleId: {articleId}</Text>
    <Button onClick={() => add(articleId)}>add</Button>
    <Button onClick={() => remove(articleId)}>remove</Button>
  </div>
}

export default SpendTimeViewWithArticle