import React, { useCallback, useState } from "react";
import Draggable from 'react-draggable';
import styled from "styled-components";
import { Box, Flex } from "uikit";

const WIDTH_SIZE = 105;
const GRID_SIZE = 2;
const BoxStyled = styled(Box)`
  cursor: pointer;
  width: ${WIDTH_SIZE}px;
  height: ${WIDTH_SIZE}px;
  /* background: #666; */
  padding: 1px;
  box-sizing: border-box;
  position: absolute;
`

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: auto;
  display: block; 
  -webkit-user-drag:none;
`

const DraggableImages = () => {

  const [layout, setLayout] = useState([
    { src: '', defaultX: 0, defaultY: 0, x: 0, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: WIDTH_SIZE * 1, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: WIDTH_SIZE * 2, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: WIDTH_SIZE * 3, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: WIDTH_SIZE * 4, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: WIDTH_SIZE * 5, y: 0, },
  ])

  const handleStart = useCallback(() => {

  }, [])
  const handleDrag = useCallback((ui, index) => {
    console.log(ui)
    setLayout(prev => {
      // eslint-disable-next-line
      prev[index] = {
        ...prev[index],
        x: prev[index].x + ui.deltaX,
        y: prev[index].y + ui.deltaY,
      }
      return [...prev]
    })
    // this.setState({
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   }
    // });
  }, [])
  const handleStop = useCallback((ui, index) => {
    setLayout(prev => {
      let indexNext = index
      // eslint-disable-next-line
      prev[indexNext] = {
        ...prev[indexNext],
        x: prev[indexNext].x + ui.deltaX,
        y: prev[indexNext].y + ui.deltaY,
      }
      return [...prev]
    })
  }, [])

  const [testP, setTestP] = useState({
    x: 10,
    y: 10,
  })
  // const handleStop1 = useCallback((ui, index) => {
  //   setLayout(prev => {
  //     // eslint-disable-next-line
  //     prev[index] = {
  //       ...prev[index],
  //       x: prev[index].x + ui.deltaX + 50,
  //       y: prev[index].y + ui.deltaY + 50,
  //     }
  //     return [...prev]
  //   })
  // }, [])


  return (
    <Flex margin='1px' width='100%' height='100%' background='pink' position='relative'>
      {
        layout.map((item, index) => (
          <Draggable
            handle=".handle"
            defaultPosition={{ x: item.defaultX, y: item.defaultY }}
            position={{ x: item.x, y: item.y }}
            scale={1}
            onStart={handleStart}
            onDrag={(e, ui) => handleStop(ui, index)}
            bounds="parent"
            onStop={(e, ui) => handleStop(ui, index)}>
            <BoxStyled className="handle">
              <Box overflow='hidden' width='100%' height='100%'>
                {/* <div>Drag from here</div>
                <div>x: {item.x}; y: {item.y}</div> */}
                <div>{index}</div>
                <Image src="https://static.social.qgx.io/common/84c9e02b-c59e-49e1-8126-87dc3465196a.jpg" alt="" />
              </Box>
            </BoxStyled>
          </Draggable>
        ))
      }
    </Flex >
  )
}

export default DraggableImages;
