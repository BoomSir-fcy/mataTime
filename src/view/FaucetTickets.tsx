import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Box, Card, Flex, Input } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Crumbs } from 'components';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { toast } from 'react-toastify';
import { useFaucetContract } from 'hooks/useContract';

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 64px); */
  justify-content: center;
`;

const useGetTribeTickets = () => {
  const faucetContract = useFaucetContract();

  const onGetTribeTickets = useCallback(async () => {
    try {
      const tx = await faucetContract.getTribeTicketNFT();
      const receipt = await tx.wait();
      return receipt.status;
    } catch (error) {
      throw error;
    }
  }, [faucetContract]);

  return { handleGetTribeTickets: onGetTribeTickets };
};

const FaucetTickets = () => {
  const { t } = useTranslation();
  const [inputVal, setInputVal] = useState<string>('');

  const { handleGetTribeTickets } = useGetTribeTickets();

  const handleRecharge = async () => {
    try {
      await handleGetTribeTickets();
      toast.success('领取成功！');
    } catch (error) {
      console.error(error);
      toast.error('领取失败！');
    }
  };

  return (
    <StyledNotFound>
      <Crumbs title={t('Dinosaur Sofi Faucet')} />
      <Box mt='38.2%'>
        <Flex>
          {/* <Input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='输入地址'
          /> */}
          <Button ml='20px' onClick={() => handleRecharge()}>
            点击领取部落门票
          </Button>
        </Flex>
      </Box>
    </StyledNotFound>
  );
};

export default FaucetTickets;
