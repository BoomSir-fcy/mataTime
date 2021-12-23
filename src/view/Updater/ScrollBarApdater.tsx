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

export const useScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/') {
      try {
        let scrollY = sessionStorage.getItem(pathname);
        let scroll =
          Number(scrollY) === 0
            ? 0
            : document.body.scrollHeight - Number(scrollY);
        setTimeout(() => {
          // document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
          window.scrollTo({
            behavior: 'smooth',
            top: Number(scroll),
          });
        }, 0);
      } catch (error) {
        console.log(error);
      }

      return () => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        sessionStorage.setItem(pathname, String(scrollTop));
      };
    }
  }, [pathname]);
};
