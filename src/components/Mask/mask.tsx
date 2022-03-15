import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';

const MaskContainer = styled(Box)`
  width: 100%;
  padding-top: 78px;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 100%
  );
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  z-index: 10;
`;

export const MaskModal = () => {
  return <MaskContainer></MaskContainer>;
};
