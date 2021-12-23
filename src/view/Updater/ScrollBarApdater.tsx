import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollBarApdater() {
  const { pathname } = useLocation();
  // useEffect(() => {
  //   // XXX: 不加滚动条会不滚动 卧液布值道定理
  //   setTimeout(() => {
  //     // document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
  //     window.scrollTo({
  //       behavior: 'smooth',
  //       top: 0,
  //     });
  //   }, 0);
  // }, [pathname]);
  return null;
}

export const useReStoreScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      let scrollY = sessionStorage.getItem(pathname);
      setTimeout(() => {
        // document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
        window.scrollTo({
          behavior: 'smooth',
          top: Number(scrollY),
        });
      }, 0);
    } catch (error) {
      console.log(error);
    }

    return () => {
      try {
        console.log(window.scrollY);
        sessionStorage.setItem(pathname, String(window.scrollY));
      } catch (error) {
        console.log(error);
      }
    };
  }, [pathname]);
};
