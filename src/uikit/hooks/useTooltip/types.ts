import { Placement, Padding } from '@popperjs/core';

export interface TooltipRefs {
  targetRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  tooltip: React.ReactNode;
  tooltipVisible: boolean;
  close: (event: Event) => void;
}

export interface TooltipOptions {
  placement?: Placement;
  trigger?: TriggerType;
  arrowPadding?: Padding;
  tooltipPadding?: Padding;
  stylePadding?: string;
  background?: string;
  tooltipOffset?: [number, number];
  hideArrow?: boolean;
}

export type TriggerType = 'click' | 'hover' | 'focus';
