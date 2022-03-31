import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';
import { TribeInfo, NftStatus, TribeNftStatus } from 'store/tribe/type';

import TribeDetail from './tribeInfo';
import TribeNft from './tribeNft';
import TribePro from './tribePro';
import TribeTags from './tribeTags';
import TribeFiles from './tribeFiles';
import ChatRoom from '../chatRoom';

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

export const TribeSidebar: React.FC<{
  tribe_info: TribeInfo;
  tribe_id: number;
}> = ({ tribe_info, tribe_id }) => {
  const ref = React.useRef<HTMLDivElement | null>();
  const [scrollTop, setScrollTop] = React.useState(0);
  const [position, setPosition] = React.useState('top');
  const [maxPositionValue, setMaxPositionValue] = React.useState(0);
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
      <TribeDetail tribe_id={tribe_id} mb='15px' />
      <TribePro
        tribe_id={tribe_id}
        isClose={
          tribe_info?.status === NftStatus.Staked &&
          tribe_info?.expire !== TribeNftStatus.expire
        }
        mb='15px'
      />
      {/* TODO: 聊天室 */}
      {/* {tribe_info?.status === NftStatus.Staked &&
        tribe_info?.expire !== TribeNftStatus.expire && (
          <ChatRoom
            tribe_id={tribe_id}
            tribeHost={tribe_info?.tribe?.owner_address}
            isMember={tribe_info?.status === NftStatus.Staked}
            mb='15px'
          />
        )} */}
      <TribeNft tribe_id={tribe_id} mb='15px' />
      <TribeTags tribe_id={tribe_id} mb='15px' />
      {tribe_info?.status === NftStatus.Staked &&
        tribe_info?.expire !== TribeNftStatus.expire && (
          <TribeFiles tribe_id={tribe_id} mb='15px' />
        )}
    </SidebarStyled>
  );
};
