import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`

export const Avatar: React.FC<{
  src: string
}> = ((props) => {
  return (
    <Img {...props}/>
  )
})