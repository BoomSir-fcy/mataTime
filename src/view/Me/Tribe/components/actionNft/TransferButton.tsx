import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'store';
import styled from 'styled-components';
import { Flex, Input, Text, Button } from 'uikit';
import { useTranferNft, useTribeNft } from '../../hooks';
import { StyledButton } from '../../styled';

const InputStyled = styled(Input)`
  width: 100%;
  border-radius: 10px;
  padding: 4px 20px;
`;

export const TransferButton: React.FC<{
  nftId: number;
  callback?: () => void;
}> = ({ nftId, callback }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toastSuccess } = useToast();
  const [visible, setVisible] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const { onTranferNft } = useTranferNft();

  // 转让nft
  const handleTransferNft = useCallback(async () => {
    try {
      if (!inputAddress) return false;
      await onTranferNft(inputAddress, nftId);
      toastSuccess(t('转让nft成功！'));
      setVisible(false);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      toastSuccess(t('转让nft失败！'));
    }
  }, [inputAddress, nftId]);

  return (
    <>
      <StyledButton
        onClick={() => {
          setVisible(true);
        }}
      >
        {t('转让')}
      </StyledButton>

      <ModalWrapper
        creactOnUse
        fillBody
        title={t('Transfer the Tribe Host NFT')}
        visible={visible}
        setVisible={setVisible}
      >
        <Flex flexDirection='column' padding='0 20px'>
          <Text mb='10px' small>
            {t('Transfer to')}
          </Text>
          <InputStyled
            scale='lg'
            placeholder={t('Please enter wallet address')}
            onChange={(e: any) => {
              setInputAddress(e.target.value);
            }}
          />
          <Text mt='10px' small>
            {t(
              '*Whoever gets the Tribe Host NFT will become the tribe host and has the tribe host rights.',
            )}
          </Text>
          <Flex justifyContent='center'>
            <Button width='125px' mt='20px' onClick={handleTransferNft}>
              {t('confirm')}
            </Button>
          </Flex>
        </Flex>
      </ModalWrapper>
    </>
  );
};
