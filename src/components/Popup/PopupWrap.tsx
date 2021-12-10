import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Flex } from 'uikit';
import { Icon } from 'components';

const StyledPopup = styled(Popup)`
  &-overlay {
    z-index: 98;
  }
  &-content {
    width: 150px !important;
    height: auto;
    border-radius: 10px;
    padding: 0;
    border: 0;
    background-color: transparent;
    z-index: 99;
  }
`;

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

export const PopupWrap: React.FC<{
  arrowStyle: any;
}> = ({ arrowStyle, children }) => (
  <StyledPopup
    trigger={
      <PopupButton>
        <Icon name="icon-gengduo" current={1} color="#7E7E7E" />
      </PopupButton>
    }
    nested
    keepTooltipInside
    closeOnDocumentClick
    position="bottom center"
    arrowStyle={arrowStyle}
  >
    {children}
  </StyledPopup>
);
