import React, { useState } from 'react';
import { useStore } from 'store';
import { NftInfo } from 'store/tribe/type';
import styled from 'styled-components';
import { Box, Flex, Spinner } from 'uikit';
import NftAvatar from './list';

const NftBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const GetAuthorizeBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  margin: 20px 0;
  border-radius: 10px;
  background: ${({ theme }) =>
    theme.isDark
      ? theme.colors.backgroundDisabled
      : theme.colors.backgroundThemeCard};
`;

const GetAuthorize = styled(Flex)`
  flex-wrap: wrap;
  padding-top: 10px;
  /* overflow-x: auto; */
  /* Scrollbar */
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.white_black};
  }
`;
export const TribeNFT: React.FC<{
  ticketNftList?: any[];
}> = React.memo(({ ticketNftList }) => {
  const loading = useStore(p => p.tribe.loading);

  return (
    <NftBox>
      <GetAuthorizeBox>
        <GetAuthorize>
          {loading ? (
            <Flex width='100%' justifyContent='center' alignItems='center'>
              <Spinner />
            </Flex>
          ) : (
            <>
              {ticketNftList.length > 0 ? (
                ticketNftList.map((item, index) => {
                  return (
                    <NftAvatar key={index} nftInfo={item} Nodata={false} />
                  );
                })
              ) : (
                <NftAvatar Nodata={true} />
              )}
            </>
          )}
        </GetAuthorize>
      </GetAuthorizeBox>
    </NftBox>
  );
});
