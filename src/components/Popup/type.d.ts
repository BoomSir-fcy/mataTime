type PopupActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

type Popupprops = {
  arrowStyle: React.CSSProperties;
  trigger: JSX.Element;
  children?: any;
  closeFunc?: () => void;
};
