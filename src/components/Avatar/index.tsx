import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

export const scales = {
  LD: "ld",
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;

export const scaleVariants = {
  [scales.LD]: {
    width: "100px",
    height: "100px",
  },
  [scales.MD]: {
    width: "60px",
    height: "60px",
  },
  [scales.SM]: {
    width: "40px",
    height: "40px",
  },
};

const Img = styled.img`
  border-radius: ${({ theme }) => theme.radii.card};
  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
`

export const Avatar: React.FC<{
  src: string
  scale?: "ld" | "md" | "sm"
}> = ((props) => {
  return (
    <Img {...props}/>
  )
})

Avatar.defaultProps = {
  scale: scales.LD,
};