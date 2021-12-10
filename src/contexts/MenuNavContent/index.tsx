import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { kebabCase } from 'lodash';
import { useMatchBreakpoints } from 'uikit'

interface MenuNavContentApi {
  isMobile: boolean
  isPushed: boolean
  setIsPushed: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuNavContent = React.createContext({} as MenuNavContentApi);
export const MenuNavContentProvider: React.FC = ({ children }) => {
  const { isXl, isXxl } = useMatchBreakpoints();
  const isMobile = isXl === false && isXxl === false;
  const [isPushed, setIsPushed] = useState(isMobile);

  return (
    <MenuNavContent.Provider value={{ isMobile, isPushed, setIsPushed }}>
      {children}
    </MenuNavContent.Provider>
  );
};
