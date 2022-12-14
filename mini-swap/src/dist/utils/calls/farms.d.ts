export declare const stakeFarm: (masterChefContract: any, pid: any, amount: any) => Promise<any>;
export declare const stakeErc20Farm: (masterChefContract: any, pid: any) => Promise<any>;
export declare const stakeNftsFarm: (masterChefContract: any, nftIds: any) => Promise<any>;
export declare const stakeNftFarm: (masterChefContract: any, nftsId: any) => Promise<any>;
export declare const stakeNftSlotFarm: (masterChefContract: any, index: any, nftsId: any) => Promise<any>;
export declare const replaceNftSlotFarm: (masterChefContract: any, index: any, nftsId: any) => Promise<any>;
export declare const additionalNftFarm: (masterChefContract: any, pid: any, nftId: any) => Promise<any>;
export declare const depositFarm: (masterChefContract: any, pid: any, amount: any) => Promise<any>;
export declare const unstakeFarm: (masterChefContract: any, pid: any, amount: any) => Promise<any>;
export declare const unstakeErc20Farm: (masterChefContract: any, pid: any, sid: any) => Promise<any>;
export declare const unstakeNftFarm: (masterChefContract: any, tokenId: any) => Promise<any>;
export declare const unstakeAllNftFarm: (masterChefContract: any) => Promise<any>;
export declare const unstakeSlotNftFarm: (masterChefContract: any, slot: string) => Promise<any>;
export declare const harvestFarm: (masterChefContract: any, pid: any) => Promise<any>;
export declare const harvestFarmTx: (masterChefContract: any, pid: any) => Promise<any>;
export declare const harvestAll: (masterChefContract: any) => Promise<any>;
export declare const harvestAirDrop: (masterChefContract: any) => Promise<any>;
export declare const harvestAllTx: (masterChefContract: any) => Promise<any>;
export declare const harvestAllFarm: (masterChefContract: any) => Promise<any>;
export declare const harvestErc20: (masterChefContract: any, pid: any, sid: any) => Promise<any>;
export declare const harvestNft: (masterChefContract: any) => Promise<any>;
