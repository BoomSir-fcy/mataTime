import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
  &-overlay {
    z-index: 98 !important;
  }
  &-content {
    width: 150px !important;
    height: auto;
    border-radius: 10px;
    padding: 0;
    border: 0;
    background-color: transparent;
    z-index: 99 !important;
  }
`;

const PopupWrapModal = (props, ref) => {
  return (
    <StyledPopup
      ref={ref}
      trigger={props.trigger}
      nested
      keepTooltipInside
      closeOnDocumentClick
      position="bottom center"
      arrowStyle={props.arrowStyle}
    >
      {props.children}
    </StyledPopup>
  );
};

export const PopupWrap = React.forwardRef(PopupWrapModal);
