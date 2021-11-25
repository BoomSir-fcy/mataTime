import React from "react";
import { Login, ToastCustom } from "./types";
interface Props {
    login: Login;
    toastCustom: ToastCustom;
    onDismiss?: () => void;
    displayCount?: number;
}
declare const ConnectModal: React.FC<Props>;
export default ConnectModal;
