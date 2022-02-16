import { useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
// import { LinkProps } from 'uikit';

export const HoverLinkStyled = styled(Link)`
  transition: background 0.3s;
  display: block;
  &:hover,
  &:active,
  &:focus {
    background: ${({ theme }) => theme.colors.hoverList};
    outline: none;
  }
`;

export const HoverLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const [draging, setDraging] = useState(false);
  return (
    <HoverLinkStyled
      onDragStart={event => {
        // console.log('onDragStart');
        setDraging(true);
        event.preventDefault();
      }}
      // onDragOver={}
      // onDragOver={() => {
      //   console.log('onDragOver');
      //   setDraging(false);
      // }}
      {...props}
      onClick={event => {
        // console.log(draging, 'draging');
        if (draging) {
          setDraging(false);
          event.preventDefault();
        }
        if (props.onClick) {
          props.onClick(event);
        }
      }}
    >
      {children}
    </HoverLinkStyled>
  );
};
