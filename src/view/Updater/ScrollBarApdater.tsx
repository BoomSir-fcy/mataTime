import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const homepath = '/'
const listenPaths = ['/topicList']

export default function ScrollBarApdater() {
  const { pathname } = useLocation();
  const { listen } = useHistory();
  const [scrollState, setScrollState] = useState({})
  const [oldPath, setOldPath] = useState('/')

  useEffect(() => {
    const unListen = listen((location) => {
      if (pathname === homepath || listenPaths.some(item => item.includes(pathname))) {
        setScrollState(state => ({
          ...state,
          [pathname]: {
            y: window.scrollY,
          },
        }))
      }
    })
    return unListen
  }, [pathname])

  useEffect(() => {
    if (oldPath !== pathname) {
      setOldPath(pathname)
      window.scrollTo({
        // behavior: scrollState[pathname]?.y ? 'auto' : 'smooth',
        behavior: 'auto',
        top: scrollState[pathname]?.y || 0,
      });
    }
  }, [pathname, scrollState, oldPath]);
  return null;
}
