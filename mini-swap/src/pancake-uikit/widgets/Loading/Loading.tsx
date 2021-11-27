import React, { memo, useMemo } from "react";
import { useTheme } from "styled-components";
import { BoxProps } from "../../components/Box";
import Overlay from "../../components/Overlay/Overlay";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, BoxAnimationStyled, WrapperAnimationStyled, ImageStyled, ChildrenWrapper, VideoStyled, LoadingContainer } from "./styles";
import { ModalProps, LoadingType } from "./types";

const VideoLoading = (<VideoStyled loop muted autoPlay src="/images/loading/harvest.mp4" />)

const ImageLoading = (<ImageStyled src="/images/loading/harvest-loop.png" />)

interface LoadingProps extends BoxProps {
  loadingType: LoadingType
  loaded: boolean
}

const Loading: React.FC<LoadingProps> = ({
  children,
  loadingType,
  loaded,
  ...props
}) => {
  const theme = useTheme();
  const renderLoadingType = () => {
    if (loaded) return null
    const time = new Date().getTime()
    switch (loadingType) {
      case LoadingType.HARVEST:
        return (<ImageStyled src={`/images/loading/harvest-loop.png?${time}`} />)
      case LoadingType.MEAT_MYSTERY:
        return (<ImageStyled src={`/images/loading/card_ending.png?${time}`} />)
      case LoadingType.EGG_MYSTERY:
        return (<ImageStyled src={`/images/loading/card_ending.png?${time}`} />)
      default:
        return (<ImageStyled src={`/images/loading/harvest-loop.png?${time}`} />)
    }
  }
  const renderLoadedType = useMemo(() => {
    if (!loaded) return null
    const time = new Date().getTime()
    switch (loadingType) {
      case LoadingType.HARVEST:
        return (<ImageStyled src={`/images/loading/harvest-loop.png?${time}`} />)
      case LoadingType.MEAT_MYSTERY:
        return (
          <ImageStyled zIndex={4} src={`/images/loading/card_loadng.png?${time}`} />
        )
      case LoadingType.EGG_MYSTERY:
        return (
          <ImageStyled zIndex={4} src={`/images/loading/card_loadng.png?${time}`} />
        )
      default:
        return (<ImageStyled src={`/images/loading/harvest-loop.png?${time}`} />)
    }
  }, [loaded, loadingType])
  return (
    <LoadingContainer {...props}>
      {renderLoadingType()}
      {/* {renderLoadedType()} */}
      {renderLoadedType}
      {/* <RenderLoadedType /> */}
      <ChildrenWrapper>
        {
          children && (
            <BoxAnimationStyled>
              {children}
            </BoxAnimationStyled>
          )
        }
      </ChildrenWrapper>
    </LoadingContainer>
  );
};

export default Loading;
