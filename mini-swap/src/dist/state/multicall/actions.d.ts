export interface Call {
    address: string;
    callData: string;
}
export declare function toCallKey(call: Call): string;
export declare function parseCallKey(callKey: string): Call;
export interface ListenerOptions {
    readonly blocksPerFetch?: number;
}
export declare const addMulticallListeners: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    chainId: number;
    calls: Call[];
    options?: ListenerOptions;
}, string>;
export declare const removeMulticallListeners: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    chainId: number;
    calls: Call[];
    options?: ListenerOptions;
}, string>;
export declare const fetchingMulticallResults: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    chainId: number;
    calls: Call[];
    fetchingBlockNumber: number;
}, string>;
export declare const errorFetchingMulticallResults: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    chainId: number;
    calls: Call[];
    fetchingBlockNumber: number;
}, string>;
export declare const updateMulticallResults: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    chainId: number;
    blockNumber: number;
    results: {
        [callKey: string]: string;
    };
}, string>;
