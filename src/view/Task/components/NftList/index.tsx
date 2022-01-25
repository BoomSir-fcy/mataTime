import React, { useEffect, useCallback, useState } from 'react';
import { getExistCodeList } from 'view/Task/hooks/matter';
import { CodeInfo, InvitableNftInfo } from 'view/Task/type';

import NftAvatar from './list';

export const StakeNFT: React.FC<{
  nftList?: InvitableNftInfo[];
  defaultCodeList?: CodeInfo[];
  maxGendCodeCount?: number;
}> = ({ nftList, defaultCodeList, maxGendCodeCount }) => {
  const [nftCodeList, setNftCodeList] = useState([]);

  useEffect(() => {
    const getDefaultExistCodeList = async () => {
      const nftIds = nftList.map(v => v.token_id).join(',');
      const codeObjs = await getExistCodeList(nftList[0].token, nftIds);
      const newList = nftList.map(item => {
        return {
          ...item,
          defaultCodeList: defaultCodeList.map((v, index) => {
            const nftCode = codeObjs[item.token_id] || {};
            return { ...v, ...nftCode[index] };
          }),
        };
      });
      setNftCodeList(newList);
    };
    if (nftList.length) {
      getDefaultExistCodeList();
    }
  }, [nftList, defaultCodeList]);

  return (
    <>
      {nftCodeList.map((item, index) => {
        return (
          <NftAvatar
            key={item.token_id}
            NftInfo={item}
            defaultCodeList={item.defaultCodeList}
            maxGendCodeCount={maxGendCodeCount}
          />
        );
      })}
    </>
  );
};
