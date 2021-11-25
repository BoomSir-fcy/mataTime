import React from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "../Box";
import { Image } from "../Image";
import { SpinnerProps } from "./types";


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(20px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const Container = styled(Box)`
  position: relative;
`;

const RotatingPancakeIcon = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${rotate} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const FloatingPanIcon = styled(Image)`
  animation: ${float} 2s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container width={size} height={size}>
      {/* <RotatingPancakeIcon width={`${size * 0.5}px`} />
      <FloatingPanIcon width={`${size}px`} /> */}
      <FloatingPanIcon width={size} height={size} src="/images/loding.PNG" />
    </Container>
  );
};

export default Spinner;
