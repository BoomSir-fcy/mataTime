import React, { useCallback, useContext, useEffect } from "react";
import get from "lodash/get";
import { Context } from "./LoadingContext";
import { Handler, LoadingType, TypeHandler } from "./types";

const useModal = (
  modal?: React.ReactNode,
  closeOnOverlayClick = false,
  updateOnPropsChange = false,
  modalId = "defaultLoadingId"
): [TypeHandler, Handler, (node: React.ReactNode, d?: number) => void] => {
  const { isOpen, nodeId, loadingType, modalNode, setModalNode, onPresent, onDismiss, setCloseOnOverlayClick, onTypePresent, setLoaded } = useContext(Context);
  const onPresentCallback = useCallback((newNode: React.ReactNode, delay?: number) => {
    onPresent(newNode, modalId);
    if (delay) {
      setTimeout(() => {
        setCloseOnOverlayClick(true);
      }, delay);
    }
  }, [modalId, onPresent]);

  const onTypePresentCallback = useCallback((type: LoadingType = LoadingType.HARVEST, loaded?: boolean) => {
    onPresent(modal, modalId);
    onTypePresent(type, `${modalId}_${type}`);
    setLoaded(loaded)
  }, [modal, modalId, onPresent]);

  // Updates the "modal" component if props are changed
  // Use carefully since it might result in unnecessary rerenders
  // Typically if modal is staic there is no need for updates, use when you expect props to change
  useEffect(() => {
    // NodeId is needed in case there are 2 useModal hooks on the same page and one has updateOnPropsChange
    if (updateOnPropsChange && isOpen && nodeId === modalId) {
      const modalProps = get(modal, "props");
      const oldModalProps = get(modalNode, "props");
      // Note: I tried to use lodash isEqual to compare props but it is giving false-negatives too easily
      // For example ConfirmSwapModal in exchange has ~500 lines prop object that stringifies to same string
      // and online diff checker says both objects are identical but lodash isEqual thinks they are different
      // Do not try to replace JSON.stringify with isEqual, high risk of infinite rerenders
      // TODO: Find a good way to handle modal updates, this whole flow is just backwards-compatible workaround,
      // would be great to simplify the logic here
      if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
        setModalNode(modal);
      }
    }
  }, [updateOnPropsChange, nodeId, modalId, isOpen, modal, modalNode, setModalNode]);

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick);
  }, [closeOnOverlayClick, setCloseOnOverlayClick]);

  return [onTypePresentCallback, onDismiss, onPresentCallback];
};

export default useModal;
