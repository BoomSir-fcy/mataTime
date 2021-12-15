import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollBarApdater() {
  const { pathname } = useLocation()
  useEffect(() => {

    // XXX: 不加滚动条会不滚动 卧液布值道定理
    setTimeout(() => {
      document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
    }, 0)
  }, [pathname])
  return null;
}
