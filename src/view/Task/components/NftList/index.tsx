import React from 'react';
import { CodeInfo, InvitableNftInfo } from 'view/Task/type';

import NftAvatar from './list';

export const StakeNFT: React.FC<{
  nftList?: InvitableNftInfo[];
  defaultCodeList?: CodeInfo[];
}> = ({ nftList = [], defaultCodeList }) => {
  return (
    <>
      {nftList.map((item, index) => {
        return (
          <NftAvatar
            key={item.token_id}
            NftInfo={item}
            defaultCodeList={defaultCodeList}
          />
        );
      })}
    </>
  );
};
