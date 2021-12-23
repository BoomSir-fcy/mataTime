import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollBarApdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    // XXX: 不加滚动条会不滚动 卧液布值道定理
    setTimeout(() => {
      // document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }, 0);
  }, [pathname]);
  return null;
}

export const useReStoreScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      let scrollY = sessionStorage.getItem(pathname);
      scrollY && window.scrollTo(0, parseInt(scrollY, 10));
    } catch (error) {
      console.log(error);
    }

    return () => {
      try {
        //这里使用scrollY是获取文档window在垂直页面
        console.log(window.scrollY);
        sessionStorage.setItem(pathname, window.scrollY.toString());
      } catch (error) {
        console.log(error);
      }
    };
  }, [pathname]);
};
