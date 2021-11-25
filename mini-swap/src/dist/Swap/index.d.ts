/// <reference types="react" />
export interface SwapInterface {
    inputCurrencyId?: string;
    outputCurrencyId?: string;
}
export default function Swap({ inputCurrencyId, outputCurrencyId }: SwapInterface): JSX.Element;
