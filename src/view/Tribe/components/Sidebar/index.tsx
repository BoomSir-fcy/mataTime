import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Box } from 'uikit';
import { useStore } from 'store';

import Search from 'components/SearchInput';
import TribeInfo from './tribeInfo';
import TribeNft from './tribeNft';
import TribePro from './tribePro';
import TribeTags from './tribeTags';
import TribeFiles from './tribeFiles';

const SidebarStyled = styled(Box)`
  position: sticky;
  transition: all 0.2s ease-out;
  top: 0;
  display: none;
  padding-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

export const TribeSidebar = () => {
  const ref = React.useRef<HTMLDivElement | null>();
  const { pathname } = useLocation();

  const [scrollTop, setScrollTop] = React.useState(0);
  const [position, setPosition] = React.useState('top');
  const [maxPositionValue, setMaxPositionValue] = React.useState(0);
  const tribeId = useStore(p => p.tribe.tribeId);
  const handleScroll = React.useCallback(() => {
    const maxTop = ref.current.clientHeight - window.innerHeight;
    if (scrollTop > window.scrollY) {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
    setScrollTop(window.scrollY);
    setMaxPositionValue(maxTop);
  }, [scrollTop, ref.current]);

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <SidebarStyled
      style={{ [`${position}`]: `-${maxPositionValue}px` }}
      ref={ref}
    >
      <Search mt='15px' mb='15px' />
      <TribeInfo mb='15px' />
      <TribeNft mb='15px' />
      <TribePro mb='15px' />
      <TribeTags tribe_id={tribeId} mb='15px' />
      <TribeFiles mb='15px' />
    </SidebarStyled>
  );
};
