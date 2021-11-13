import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ArrowDropDownIcon, Text, SortDownIcon, SortUpIcon, Flex } from 'uikit';

export const scales = {
  LD: 'ld',
  MD: 'md',
  SM: 'sm',
  XS: 'xs'
} as const;

export type Scale = typeof scales[keyof typeof scales];

export enum SortType {
  DEFAULT = 'default',
  UP = 'up',
  DOWN = 'down'
}

export const scaleVariants = {
  [scales.LD]: {
    minWidth: '108px',
    minWidthBig: '108px'
  },
  [scales.MD]: {
    minWidth: '148px',
    minWidthBig: '168px'
  },
  [scales.SM]: {
    minWidth: '80px',
    minWidthBig: '128px'
  },
  [scales.XS]: {
    minWidth: '60px',
    minWidthBig: '100px'
  }
};

const DropDownHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 20px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`;

const DropDownListContainer = styled.div<{ scale: Scale }>`
  /* min-width: 100px; */
  min-width: ${({ scale }) => scaleVariants[scale].minWidth};
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    /* min-width: 168px; */
    min-width: ${({ scale }) => scaleVariants[scale].minWidthBig};
  }
`;

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; scale: Scale; fillWidth: boolean; height: number }>`
  cursor: pointer;
  width: ${({ width, fillWidth }) => (fillWidth ? '100%' : `${width}px`)};
  position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  height: 40px;
  /* min-width: 100px; */
  min-width: ${({ scale }) => scaleVariants[scale].minWidth};

  user-select: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    /* min-width: 168px; */
    min-width: ${({ scale }) => scaleVariants[scale].minWidthBig};
  }

  ${props =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }
    `}

  .drop-svg {
    position: absolute;
    right: 16px;
    top: 68%;
    background: ${({ theme }) => theme.colors.input};
    /* background: #f00; */
    transform: translateY(-50%);
  }
  .sort-svg {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`;

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`;

export interface SelectProps {
  options: OptionProps[];
  defaultId?: string | number;
  fillWidth?: boolean;
  activeIndex?: number;
  onChange?: (option: OptionProps) => void;
  onSortClick?: () => void;
  scale?: Scale;
  sort?: SortType;
}

export interface OptionProps {
  label: string;
  value: any;
  id?: string | number;
}

export const Select: React.FunctionComponent<SelectProps> = ({ options, defaultId, onChange, sort, scale, activeIndex, onSortClick, fillWidth, children }) => {
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  useEffect(() => {
    if (defaultId) {
      options.forEach((item, index) => {
        if (item.id === defaultId && index !== selectedOptionIndex) {
          setSelectedOptionIndex(index);
        }
      });
    }
  }, [defaultId, options, selectedOptionIndex]);

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex);
    setIsOpen(false);

    if (onChange) {
      onChange(options[selectedIndex]);
    }
  };

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight
    });

    const handleClickOutside = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <DropDownContainer scale={scale} isOpen={isOpen} fillWidth={fillWidth} ref={containerRef} {...containerSize}>
      {/* {
        sort && (
          sort === SortType.DOWN
          ?
          <SortDownIcon width={12} className="sort-svg" color="text" onClick={onSortClick} />
          :
          <SortUpIcon width={12} className="sort-svg" color="text" onClick={onSortClick} />
        )
      } */}
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text ellipsis>{options[selectedOptionIndex].label}</Text>
          {children}
        </DropDownHeader>
      )}
      <ArrowDropDownIcon className="drop-svg" color="text" onClick={toggling} />
      <DropDownListContainer scale={scale}>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  );
};

Select.defaultProps = {
  scale: scales.MD
};
