import { Login, ToastCustom } from "./types";
interface ReturnType {
    onPresentConnectModal: () => void;
    onPresentAccountModal: () => void;
}
declare const useWalletModal: (login: Login, logout: () => void, toastCustom: ToastCustom, clear: () => void, account?: string) => ReturnType;
export default useWalletModal;
