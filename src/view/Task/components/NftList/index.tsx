import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useFetchSupportNFT } from 'view/Login/hook';

import NftAvatar from './list';

export const StakeNFT: React.FC<{
  nftList?: any;
}> = ({ nftList = [] }) => {
  return (
    <>
      {nftList.map((item, index) => {
        return <NftAvatar key={index} NftInfo={item} />;
      })}
    </>
  );
};
