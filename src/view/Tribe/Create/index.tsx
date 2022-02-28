import { Crumbs, Icon, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import React, { useCallback, useState } from 'react';
import { Box, Text, Divider, Flex } from 'uikit';
import SubHeader from '../components/SubHeader';
import { FormFlex, LogoIcon } from './style';
import { TribeFee } from './TribeFee';
import { TribeInfo } from './TribeInfo';
import { TribeNFT } from './TribeNft';
import { TribeCreateBtn } from './TribeCreateBtn';
import { useTribe } from './hooks';
import { useToast } from 'hooks';
import {
  useFeeTokenList,
  useTicketNftList,
  useTribeState,
} from 'store/tribe/hooks';
import { parseInt, sum } from 'lodash';
import { useImmer } from 'use-immer';
import { useHistory } from 'react-router';

const Create = () => {
  useTicketNftList();
  useFeeTokenList();
  const { t } = useTranslation();
  const { toastError } = useToast();
  const history = useHistory();
  const infoForm = React.useRef<any>();
  const feeForm = React.useRef<any>();
  const [state, setState] = useImmer({
    visible: false,
  });

  const { createStatus, onCheckUniqueName, onCreateTribe } = useTribe();
  const { ticketNftList, activeNftInfo } = useTribeState();

  const isOneHundredBySum = useCallback((numArr: number[]) => {
    return sum(numArr) === 100;
  }, []);

  const gotoMaterNft = () => {
    history.push('/me/tribe/master-nft');
  };

  const PayAndCreate = async () => {
    const infoParams = infoForm.current.getInfoFrom();
    const feeParams = feeForm.current.getFeeFrom();
    try {
      const isNotUnique = await onCheckUniqueName(infoParams.name);
      if (isNotUnique) {
        toastError(t('名称已存在'));
        return false;
      }
      if (
        !isOneHundredBySum([
          parseInt(feeParams.ownerPercent),
          parseInt(feeParams.authorPercent),
          parseInt(feeParams.memberPercent),
        ])
      ) {
        toastError(t('TIME獎勵分配总和必须为100%'));
        return false;
      }

      const params = {
        ...infoParams,
        ...feeParams,
        nftAddress: activeNftInfo.nftToken,
        nftid: activeNftInfo.nftId,
      };
      setState(p => {
        p.visible = true;
      });
      await onCreateTribe(params);
      gotoMaterNft();
    } catch (error) {
      console.log(error);

      setState(p => {
        p.visible = false;
      });
    }
  };

  return (
    <Box>
      <Crumbs back />
      <form
        onSubmit={e => {
          e.preventDefault();
          PayAndCreate();
        }}
        action=''
      >
        <SubHeader title={t('Basic Information')} />
        <TribeInfo ref={infoForm} />
        <Divider />
        <SubHeader title={t('Type settings')} />
        <TribeFee ref={feeForm} actionType='save' />
        <FormFlex>
          <Text mb='20px' color='textTips' small>
            {t(
              '这是部落类型介绍/计费规则介绍Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus',
            )}
          </Text>
        </FormFlex>
        <Divider />
        <SubHeader title={t('Pay for tickets')} />
        <TribeNFT ticketNftList={ticketNftList} />
        <Flex mb='20px' justifyContent='center'>
          <TribeCreateBtn
            hasNft={ticketNftList.length > 0}
            activeNftInfo={activeNftInfo}
          />
        </Flex>
      </form>

      <ModalWrapper
        creactOnUse
        customizeTitle
        shouldCloseOnOverlayClick={false}
        visible={state.visible}
      >
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          {createStatus === 'success' ? (
            <>
              <Icon name='icon-complete' size={160} color='#2BEC93' />
              <Text mt='30px'>{t('Create Successfully')}</Text>
            </>
          ) : (
            <>
              <LogoIcon>
                <Icon name='icon-LOGO3' size={80} color='white_black' />
              </LogoIcon>
              <Text mt='30px'>{t('Waiting For Confirmation')}</Text>
              <Text mt='10px' small color='textTips'>
                {t(
                  'To cancel this transaction, please reject it in your wallet',
                )}
              </Text>
            </>
          )}
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default Create;
