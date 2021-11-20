import React from 'react';
export interface SwapInterface {
    inputCurrencyId?: string;
    outputCurrencyId?: string;
    subTitleTips?: React.ReactNode;
    titlehelper?: string;
}
export default function Swap({ inputCurrencyId, outputCurrencyId, subTitleTips, titlehelper }: SwapInterface): JSX.Element;
