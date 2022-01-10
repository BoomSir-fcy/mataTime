import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CreateShowCard from './create';
import RegisterShowCard from './register';

const ShowCard: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname === '/create') {
    return <CreateShowCard />;
  }
  return <RegisterShowCard />;
};

export default ShowCard;
