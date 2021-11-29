import React, { useEffect, useRef, useState } from "react";
import useIm from "contexts/ImContext/hooks/useIm";
import observerOptions from "./options";

interface SpendTimeViewWithArticleProps {
  articleId: number
}
const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> = ({ articleId }) => {

  const imgRef = useRef<HTMLDivElement>(null);
  const { addArticleId, removeArticleId } = useIm()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (isLoaded) return
    if (imgRef.current) {
      observer = new IntersectionObserver((entries) => {
        console.log('===================')
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            addArticleId(articleId)
            setIsLoaded(true)
            // observer.disconnect();
          } else {
            // TODO:
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
  }, [articleId, removeArticleId, addArticleId]);

  return <div ref={imgRef}>articleId: {articleId}</div>
}

export default SpendTimeViewWithArticle