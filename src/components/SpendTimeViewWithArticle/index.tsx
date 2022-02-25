import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import useIm from 'hooks/imHooks/useIm';
import debounce from 'lodash/debounce';
import { ReadType } from 'hooks/imHooks/types';
import { Text, Button } from 'uikit';
import observerOptions from './options';
import styled from 'styled-components';
import { ARTICLE_IMAGE_CLASS_NAME } from 'config';
import useDebounce from 'hooks/useDebounce';

interface SpendTimeViewWithArticleProps {
  articleId: number;
  readType: ReadType;
  nonce?: number; // 有导致高度变化的操作更改这个值进行刷新高度操作
  setNonce?: React.Dispatch<React.SetStateAction<number>>;
  index?: number; // 帖子显示序号 TODO: 后期优化操作, 当index 小于
  nonceIndex?: number; // 更改时变化的帖子的index
  forwardType?: number; // 转发类型
  forward?: Api.Home.forward;
}

// 浏览扣费组件
const SpendTimeViewWithArticle: React.FC<SpendTimeViewWithArticleProps> =
  React.memo(
    ({ articleId, readType, forwardType, forward, nonce, setNonce }) => {
      const imgRef = useRef<HTMLDivElement>(null);
      const { setArticlePositions, rendered, setRendered } = useIm();

      const [flag, setFlag] = useState(0);

      const debouncedOnChange = useMemo(
        () => debounce(() => setFlag(prep => prep + 1), 300),
        [setFlag],
      );

      // 解决图片加载后文章高度改变
      const handleListenImageLoad = useCallback(
        (dom: HTMLElement) => {
          const images = dom?.getElementsByClassName(ARTICLE_IMAGE_CLASS_NAME);
          if (images.length > 0) {
            (Array.from(images) as HTMLImageElement[]).forEach(item => {
              item.addEventListener('load', debouncedOnChange);
            });
          }
        },
        [debouncedOnChange],
      );

      useEffect(() => {
        if (flag) {
          setNonce(prep => prep + 1);
        }
      }, [flag]);

      // const flagDebounce = useDebounce(nonce, 500)

      useEffect(() => {
        if (imgRef.current) {
          handleListenImageLoad(imgRef.current?.parentElement);
          const offsetHeight = imgRef.current?.parentElement?.offsetHeight;
          const offsetTop = imgRef.current?.parentElement?.offsetTop;
          // const { offsetTop } = imgRef.current

          // 拼接转发内容
          let forwardReadInfo = {};
          if (readType === ReadType.ARTICLE) {
            forwardReadInfo = {
              post_id: articleId,
              forward_id:
                forwardType === 0
                  ? 0
                  : forwardType === 1
                    ? forward?.post_id
                    : forward?.forward_comment_id,
              forward_type: forward?.is_forward_del === 1 ? 0 : forwardType,
            };
          }

          setArticlePositions(prep => {
            // eslint-disable-next-line no-param-reassign
            prep[`${articleId}_${readType}`] = {
              articleId,
              readType,
              forwardType,
              forwardReadInfo,
              offsetTop,
              offsetBottom: offsetTop + offsetHeight,
            };
            return prep;
            // return {
            //   ...prep,
            //   [`${articleId}_${readType}`]: { articleId, readType, offsetTop, offsetBottom: offsetTop + offsetHeight },
            // }
          });
          /* 
              初始化时触发刷新数据 websocket推送 这个不能删哦
                ———— by @longxiaoai
          */
          setNonce(prep => {
            if (prep < 2) return prep + 1;
            return prep;
          });
          if (!rendered) setRendered(true);
        }
        return () => {
          setArticlePositions(prep => {
            // const newArticlePositions = {
            //   ...prep
            // }
            // eslint-disable-next-line no-param-reassign
            delete prep[`${articleId}_${readType}`];
            return prep;
          });
        };
      }, [articleId, readType, rendered, setRendered, setArticlePositions]);

      return <div ref={imgRef} />;
      // return <div ref={imgRef}>
      //   <Text>articleId: {articleId}</Text>
      // </div>
    },
  );

export default SpendTimeViewWithArticle;
