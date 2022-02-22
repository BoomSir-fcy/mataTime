import React, { useCallback, useState } from "react";
import Draggable from 'react-draggable';
import styled from "styled-components";
import { Box } from "uikit";

const WIDTH_SIZE = 105;
const GRID_SIZE = 2;
const BoxStyled = styled(Box)`
  cursor: pointer;
  width: ${WIDTH_SIZE}px;
  height: ${WIDTH_SIZE}px;
  background: #666;
`


const DraggableImages = () => {

  const [layout, setLayout] = useState([
    { src: '', defaultX: 0, defaultY: 0, x: 0, y: 0, },
    { src: '', defaultX: 0, defaultY: 0, x: 105, y: -105, },
    { src: '', defaultX: 0, defaultY: 0, x: 210, y: -210, },
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
      // eslint-disable-next-line
      prev[index] = {
        ...prev[index],
        x: prev[index].x + ui.deltaX + 50,
        y: prev[index].y + ui.deltaY + 50,
      }
      return [...prev]
    })
  }, [])

  return (
    <Box margin='1px' width='100%' height='100%' background='pink' position='relative'>
      {
        layout.map((item, index) => (
          <Draggable
            handle=".handle"
            defaultPosition={{ x: item.defaultX, y: item.defaultY }}
            position={{ x: item.x, y: item.y }}
            scale={1}
            onStart={handleStart}
            onDrag={(e, ui) => handleDrag(ui, index)}
            bounds="parent"
            onStop={(e, ui) => handleStop(ui, index)}>
            <BoxStyled className="handle">
              <div>Drag from here</div>
              <div>x: {item.x}; y: {item.y}</div>
            </BoxStyled>
          </Draggable>
        ))
      }
    </Box>
  )
}

export default DraggableImages;
