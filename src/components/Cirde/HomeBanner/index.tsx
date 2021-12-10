import React, { useState, useCallback, useEffect } from 'react';
import { Box, Flex } from 'uikit';
import {
    HomeBannerBox, SceneButton, BeginBtn, BeginBtnInfo, BeginBtnButton, GointoBtn, BannerBox, MapBox,
    AnimationE2center, AnimationE3center, E4center, TipBtn, AnimationBgCircleIcon, AnimationCenterCircleIcon
} from './styledBanner'

const HomeBanner: React.FC = () => {

    const [isClick, setIsClick] = useState(false);
    const [noce, setNoce] = useState(0);

    const handleClick = useCallback(() => {
        setNoce(prep => prep + 1) // 1
        setTimeout(() => {
            setNoce(prep => prep + 1) // 2
        }, 200);

        setTimeout(() => {
            setNoce(prep => prep + 1) // 4
        }, 1000);

    }, [setNoce])

    return (
        <HomeBannerBox>
            <SceneButton noce={noce}>
                <BeginBtn>
                    <BeginBtnInfo>
                        <BeginBtnButton noce={noce} onClick={handleClick} />
                    </BeginBtnInfo>
                </BeginBtn>
            </SceneButton>
            <GointoBtn noce={noce} className={noce >= 1 ? 'btn_into' : ''} />
            <BannerBox noce={noce}>
                <AnimationE2center className="e2-center">
                    <AnimationBgCircleIcon color='white_black' />
                    <MapBox className="map">
                        <E4center className="e4-center map2-postion">
                            <TipBtn className="banner-e4 map2 tip" tip="idnumbernumber2" />
                        </E4center>
                        <E4center className="e4-center map3-postion">
                            <TipBtn className="banner-e4 map3 tip" tip="idnumbernumber3" />
                        </E4center>
                        <E4center className="e4-center map4-postion">
                            <TipBtn className="banner-e4 map4 tip" tip="idnumbernumber4" />
                        </E4center>
                        <E4center className="e4-center map5-postion">
                            <TipBtn className="banner-e4 map5 tip" tip="idnumbernumber5" />
                        </E4center>
                        <E4center className="e4-center map7-postion">
                            <TipBtn className="banner-e4 map7 tip" tip="idnumbernumber7" />
                        </E4center>
                        <E4center className="e4-center map1-postion">
                            <TipBtn className="banner-e4 map1 tip" tip="idnumbernumber1" />
                        </E4center>
                        <E4center className="e4-center map6-postion">
                            <TipBtn className="banner-e4 map6 tip" tip="idnumbernumber6" />
                        </E4center>
                    </MapBox>
                </AnimationE2center>
                <AnimationE3center className="e3-center">
                    <AnimationCenterCircleIcon color='white_black' />
                </AnimationE3center>


            </BannerBox>
        </HomeBannerBox>
    );
}

export default HomeBanner;