import React, { useState, useCallback, useEffect } from 'react';
import { Box, Flex } from 'uikit';
import Circle from '../Circle';
import {
  HomeBannerBox,
  SceneButton,
  BeginBtn,
  BeginBtnInfo,
  BeginBtnButton,
  GointoBtn,
  E4center,
  TipBtn,
} from './styledBanner';

const HomeBanner: React.FC = () => {
  const [isClick, setIsClick] = useState(false);
  const [noce, setNoce] = useState(4);

  const handleClick = useCallback(() => {
    setNoce(prep => prep + 1); // 1
    setTimeout(() => {
      setNoce(prep => prep + 1); // 2
    }, 200);

    setTimeout(() => {
      setNoce(prep => prep + 1); // 4
    }, 2000);
  }, [setNoce]);

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
      <Flex height='100%' alignItems='center' justifyContent='center'>
        <Circle isShow={noce > 2} cursor='pointer' color='white'>
          <E4center className='e4-center map2-postion'>
            <TipBtn className='banner-e4 map2' tip='' />
          </E4center>
          <E4center className='e4-center map3-postion'>
            <TipBtn className='banner-e4 map3' tip='' />
          </E4center>
          <E4center className='e4-center map4-postion'>
            <TipBtn className='banner-e4 map4' tip='' />
          </E4center>
          <E4center className='e4-center map5-postion'>
            <TipBtn className='banner-e4 map5' tip='' />
          </E4center>
          <E4center className='e4-center map7-postion'>
            <TipBtn className='banner-e4 map7' tip='' />
          </E4center>
          <E4center className='e4-center map1-postion'>
            <TipBtn className='banner-e4 map1' tip='' />
          </E4center>
          <E4center className='e4-center map6-postion'>
            <TipBtn className='banner-e4 map6' tip='' />
          </E4center>
        </Circle>
      </Flex>
    </HomeBannerBox>
  );
};

export default HomeBanner;
