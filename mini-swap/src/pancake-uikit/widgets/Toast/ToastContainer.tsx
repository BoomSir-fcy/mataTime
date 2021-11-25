import React from "react";
import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import Toast from "./Toast";
import { ToastContainerProps } from "./types";

const ZINDEX = 1000;
const TOP_POSITION = 80; // Initial position from the top

const StyledToastContainer = styled.div`
  .enter,
  .appear {
    opacity: 0.01;
    transform: translateX(100%);
  }

  .enter.enter-active,
  .appear.appear-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .exit {
    opacity: 1;
  }

  .exit.exit-active {
    opacity: 0.01;
    transition: opacity 250ms ease-out;
  }
`;

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const { length } = toasts;
  return (
    <StyledToastContainer>
      <TransitionGroup>
        {toasts.map((toast, index) => {
          const zIndex = (ZINDEX - index).toString();
          const top = TOP_POSITION + (length - index - 1) * (toast.stackSpacing || 64);

          return (
            <Toast
              key={toast.id}
              toast={toast}
              onRemove={onRemove}
              ttl={typeof toast.ttl === 'number' ? toast.ttl : 6000}
              style={{ top: `${top}px`, width: toast.width, zIndex }}
              />
          );
        })}
      </TransitionGroup>
    </StyledToastContainer>
  );
};

export default ToastContainer;
