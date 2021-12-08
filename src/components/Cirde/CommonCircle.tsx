import React from 'react';
import styled from 'styled-components';
import { Flex, Text, Box } from 'uikit';
import {
    E2center, AnimationE2center, E3center, AnimationE3center, CircleText,
    BgCircleIcon, AnimationBgCircleIcon, CenterCircleIcon, AnimationCenterCircleIcon
} from './HomeBanner/styledBanner';
import { CircleIconProps } from './HomeBanner/types';

const RoadMapCircleWrapper = styled.div`
    width: 100%;
    height: 100%;
`

const RoadMapCircleBox = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    left: 0;
    top: 0;
`
const BgImage = styled(Box) <CircleIconProps>`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${({ bgWidth }) => bgWidth || '64rem'};
    height: ${({ bgHeight }) => bgHeight || '36rem'};
    margin: ${({ bgMargin }) => bgMargin || '-18rem 0 0 -32rem'};
    background: url('/images/RingPoint.png');
    background-size: 102%;
`
const RoadMapCircleText = styled(CircleText) <CircleIconProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    margin: ${({ margin }) => margin};
`

export const Circle: React.FC<CircleIconProps> = ({ width, height, margin, isAnimation, children }) => {
    return (
        <>
            {
                isAnimation ?
                    <>
                        <AnimationE2center width={width} height={height} margin={margin}>
                            <AnimationBgCircleIcon color='white_black' />
                        </AnimationE2center>
                        <AnimationE3center width={width} height={height} margin={margin}>
                            <AnimationCenterCircleIcon color='white_black' />
                        </AnimationE3center>
                    </>
                    :
                    <>
                        <E2center width={width} height={height} margin={margin}>
                            <BgCircleIcon color='white_black' />
                        </E2center>
                        <E3center width={width} height={height} margin={margin}>
                            <CenterCircleIcon color='white_black' />
                        </E3center>
                    </>
            }
            {children}
        </>
    );
}

const CommonCircle: React.FC<CircleIconProps> = ({ bgWidth, bgHeight, bgMargin, hideBg, ...props }) => {
    return (
        <RoadMapCircleWrapper>
            <Flex height="100%" justifyContent="center">
                <RoadMapCircleBox>
                    {!hideBg && <BgImage bgWidth={bgWidth} bgHeight={bgHeight} bgMargin={bgMargin} />}
                    <Circle {...props} />
                </RoadMapCircleBox>
            </Flex>
        </RoadMapCircleWrapper>
    );
}


export default CommonCircle;