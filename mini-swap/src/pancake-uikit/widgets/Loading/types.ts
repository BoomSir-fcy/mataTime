import { BoxProps } from "../../components/Box";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
  onDismiss?: Handler;
}

export interface ModalProps extends InjectedProps, BoxProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
  minWidth?: string;
}

export enum LoadingType {
  HARVEST,
  MEAT_MYSTERY,
  EGG_MYSTERY,
}

export type TypeHandler = (type?: LoadingType, loaded?: boolean) => void;
