import { ReactNode } from "react";

export const types = {
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info",
  CUSTOM: "custom",
};

export type Types = typeof types[keyof typeof types];

export interface Toast {
  custom?: boolean;
  hideRemove?: boolean;
  customIcon?: ReactNode;
  id: string;
  type: Types;
  title: string;
  ttl?: number; // 0为不自动关闭
  stackSpacing?: number;
  width?: string;
  description?: ReactNode;
}

export interface ToastContainerProps {
  toasts: Toast[];
  stackSpacing?: number;
  ttl?: number;
  onRemove: (id: string) => void;
}

export interface ToastProps {
  toast: Toast;
  onRemove: ToastContainerProps["onRemove"];
  ttl: number; // 0为不自动关闭
  style: Partial<CSSStyleDeclaration>;
}
