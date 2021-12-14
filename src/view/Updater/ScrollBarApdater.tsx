import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollBarApdater() {
  const { pathname } = useLocation()
  useEffect(() => {
    console.log(12222222)
    // document.body.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
  }, [pathname])
  return null;
}
