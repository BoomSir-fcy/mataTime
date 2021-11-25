import React from "react";
import styled from "styled-components";
import { DropdownProps, PositionProps, Position } from "./types";

const getLeft = ({ position }: PositionProps) => {
  if (position === "top-right") {
    return "100%";
  }
  if (position === "bottom-right") {
    return "-50%";
  }
  return "50%";
};

const getBottom = ({ position }: PositionProps) => {
  if (position === "top" || position === "top-right") {
    return "100%";
  }
  return "auto";
};

const DropdownContent = styled.div<{ position: Position }>`
  width: max-content;
  display: none;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, 0);
  left: ${getLeft};
  bottom: ${getBottom};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  /* box-shadow: ${({ theme }) => theme.shadows.level1}; */
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);
`;

const Container = styled.div`
  position: relative;
  &:hover ${DropdownContent}, &:focus-within ${DropdownContent} {
    display: flex;
  }
`;

const Dropdown: React.FC<DropdownProps> = ({ target, position = "bottom", children }) => {
  return (
    <Container>
      {target}
      <DropdownContent position={position}>{children}</DropdownContent>
    </Container>
  );
};
Dropdown.defaultProps = {
  position: "bottom",
};

export default Dropdown;
