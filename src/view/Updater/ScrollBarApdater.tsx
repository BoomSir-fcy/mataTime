import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const homepath = '/';
const listenPaths = ['/topiclist'];

export default function ScrollBarApdater() {
  const { pathname } = useLocation();
  const { listen } = useHistory();
  const [scrollState, setScrollState] = useState({});
  const [oldPath, setOldPath] = useState('/');

  useEffect(() => {
    const unListen = listen(location => {
      if (
        pathname === homepath ||
        listenPaths.some(item => item.includes(pathname))
      ) {
        setScrollState(state => ({
          ...state,
          [pathname]: {
            y: window.scrollY,
          },
        }));
      }
    });
    return unListen;
  }, [pathname, listen]);

  useEffect(() => {
    if (oldPath !== pathname) {
      setOldPath(pathname);
      window.scrollTo({
        // behavior: scrollState[pathname]?.y ? 'auto' : 'smooth',
        behavior: 'auto',
        top: scrollState[pathname]?.y || 0,
      });
      // XXX: 有时候上面这个滚动定位不准 所以用下面这个方法hack一下
      // 期待m您的优化
      setTimeout(() => {
        window.scrollTo({
          // behavior: scrollState[pathname]?.y ? 'auto' : 'smooth',
          behavior: 'auto',
          top: scrollState[pathname]?.y || 0,
        });
      }, 0);
    }
  }, [pathname, scrollState, oldPath]);
  return null;
}
