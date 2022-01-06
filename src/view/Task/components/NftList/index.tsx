import React, { useEffect, useCallback, useState } from 'react';
import { getExistCodeList } from 'view/Task/hooks/matter';
import { CodeInfo, InvitableNftInfo } from 'view/Task/type';

import NftAvatar from './list';

export const StakeNFT: React.FC<{
  nftList?: InvitableNftInfo[];
  defaultCodeList?: CodeInfo[];
}> = ({ nftList, defaultCodeList }) => {
  const [nftCodeList, setNftCodeList] = useState([]);

  useEffect(() => {
    if (nftList.length) {
      getDefaultExistCodeList();
    }
  }, []);

  const getDefaultExistCodeList = useCallback(async () => {
    const nftIds = nftList.map(v => v.token_id).join(',');
    const codeObjs = await getExistCodeList(nftList[0].token, nftIds);
    const newList = nftList.map(item => {
      return {
        ...item,
        defaultCodeList: codeObjs[item.token_id] || defaultCodeList,
      };
    });
    setNftCodeList(newList);
  }, [nftList]);

  return (
    <>
      {nftCodeList.map((item, index) => {
        return (
          <NftAvatar
            key={item.token_id}
            NftInfo={item}
            defaultCodeList={item.defaultCodeList}
          />
        );
      })}
    </>
  );
};
