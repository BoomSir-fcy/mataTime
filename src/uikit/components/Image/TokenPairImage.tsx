import React from "react";
import { TokenPairImageProps, variants } from "./types";
import { StyledPrimaryImage, StyledSecondaryImage } from "./styles";
import Wrapper from "./Wrapper";

const TokenPairImage: React.FC<TokenPairImageProps> = ({
  primarySrc = '',
  secondarySrc = '',
  primarySrcs,
  secondarySrcs,

  width,
  height,
  variant = variants.DEFAULT,
  primaryImageProps = {},
  secondaryImageProps = {},
  ...props
}) => {
  // const secondaryImageSize = Math.floor(width / 2);
  const primarys = primarySrcs ? [...primarySrcs, primarySrc] : [primarySrc]
  const secondarys = secondarySrcs ? [...secondarySrcs, secondarySrc] : [secondarySrc]
  return (
    <Wrapper width={width} height={height} {...props}>
      <StyledPrimaryImage
        shadow
        variant={variant}
        srcs={primarys}
        width={width}
        height={height}
        {...primaryImageProps}
      />
      <StyledSecondaryImage
        shadow
        variant={variant}
        srcs={secondarys}
        width={width}
        height={width}
        {...secondaryImageProps}
      />
    </Wrapper>
  );
};

export default TokenPairImage;
