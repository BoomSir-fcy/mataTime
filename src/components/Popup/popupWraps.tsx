import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
  &-overlay {
    z-index: 98 !important;
  }
  &-content {
    width: 150px;
    height: auto;
    border-radius: 10px;
    padding: 0;
    border: 0;
    background-color: transparent;
    z-index: 99 !important;
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
      keepTooltipInside
      closeOnDocumentClick
      position={props.position || 'bottom right'}
      arrowStyle={props.arrowStyle}
    >
      {props.children}
    </StyledPopup>
  );
};

export const PopupWrap = React.forwardRef(PopupWrapModal);
