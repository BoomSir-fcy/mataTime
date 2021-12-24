import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
  &-overlay {
    z-index: 98 !important;
  }
  &-content {
  }
`;

const PopupWrapModal = (props, ref) => {
  const handsScroller = React.useCallback(() => {
    ref?.current?.close();
  }, []);

  React.useEffect(() => {
    document.addEventListener('scroll', handsScroller);
    return () => document.removeEventListener('scroll', handsScroller);
  }, []);

  return (
    <StyledPopup
      ref={ref}
      trigger={props.trigger}
      nested
      closeOnDocumentClick
      contentStyle={{
        width: '150px',
        height: 'auto',
        borderRadius: '10px',
        padding: 0,
        border: '0',
        backgroundColor: 'transparent',
        zIndex: 99,
      }}
      keepTooltipInside='.popupBoundary'
      position={props.position || 'bottom right'}
      arrowStyle={props.arrowStyle}
    >
      {props.children}
    </StyledPopup>
  );
};

export const PopupWrap = React.forwardRef(PopupWrapModal);
