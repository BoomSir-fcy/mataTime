import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components';
import Dots from 'components/Loader/Dots';
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
  [key: string]: any;
}> = ({ nftId, callback, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useToast();
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const { onTranferNft } = useTranferNft();

  // 转让nft
  const handleTransferNft = useCallback(async () => {
    try {
      if (!inputAddress) return false;
      setPending(true);
      await onTranferNft(inputAddress, nftId);
      toastSuccess(t('Transfer succeeded'));
      setVisible(false);
      setPending(false);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      toastError(t('Transfer failed'));
      setPending(false);
    }
  }, [inputAddress, nftId]);

  return (
    <>
      <StyledButton
        {...props}
        onClick={() => {
          setVisible(true);
        }}
      >
        {t('Transfer')}
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
            <Button
              disabled={pending}
              width='130px'
              mt='20px'
              onClick={handleTransferNft}
            >
              {pending ? <Dots>{t('confirming')}</Dots> : t('confirm')}
            </Button>
          </Flex>
        </Flex>
      </ModalWrapper>
    </>
  );
};
