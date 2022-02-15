import { Crumbs, Icon, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import React, { useCallback, useState } from 'react';
import { Box, Text, Divider, Flex, Button } from 'uikit';
import SubHeader from '../components/SubHeader';
import { FormFlex, LogoIcon } from './style';
import { TribeFee } from './TribeFee';
import { TribeInfo } from './TribeInfo';
import { TribeNFT } from './TribeNft';
import { TribeCreateBtn } from './TribeCreateBtn';
import { ApproveTribeTicketsNFT, useTribe } from './hooks';
import { useToast } from 'hooks';
import Dots from 'components/Loader/Dots';
import { Timing, TribeType } from 'store/tribe/type';
import { getValidDate } from 'store/tribe/utils';
import { getMatterAddress } from 'utils/addressHelpers';
import { useFeeTokenList, useTribeState } from 'store/tribe/hooks';
import { parseInt, sum } from 'lodash';
import { useStore } from 'store';
import { useFetchNftList } from 'view/Login/hook';

const Create = () => {
  useFetchNftList();
  useFeeTokenList();
  const { t } = useTranslation();
  const { toastError } = useToast();
  const infoForm = React.useRef<any>();
  const feeForm = React.useRef<any>();
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);

  const { onCheckUniqueName, onCreateTribe, nftTokenAddress } = useTribe();
  const nftList = useStore(p => p.loginReducer.nftList);

  const isOneHundredBySum = useCallback((numArr: number[]) => {
    return sum(numArr) === 100;
  }, []);

  const PayAndCreate = async () => {
    const infoParams = infoForm.current.getInfoFrom();
    const feeParams = feeForm.current.getFeeFrom();
    try {
      const isNotUnique = await onCheckUniqueName(infoParams.name);
      if (isNotUnique) {
        toastError(t('名称已存在'));
        return false;
      }
      const { tribeType, timing, ownerPercent, authorPercent, memberPercent } =
        feeParams;
      if (
        !isOneHundredBySum([
          parseInt(ownerPercent),
          parseInt(authorPercent),
          parseInt(memberPercent),
        ])
      ) {
        toastError(t('TIME獎勵分配总和必须为100%'));
        return false;
      }

      const params = {
        name: infoParams.name,
        logo: infoParams.logo,
        feeToken:
          tribeType === TribeType.BASIC
            ? getMatterAddress()
            : feeParams.feeToken,
        feeAmount: tribeType === TribeType.BASIC ? 0 : feeParams.feeAmount,
        validDate:
          timing !== Timing.FOREVER ? getValidDate(feeParams.validDate) : 0,
        perTime: feeParams.perTime,
        ownerPercent: ownerPercent,
        authorPercent: authorPercent,
        memberPercent: memberPercent,
        nftAddress: '0x9fcaca63afd8da8fc3e00a4d0ef4a54ac0aae625',
        nftid: 1014,
      };
      // await onCreateTribe(params);
      console.log('提交参数------》', params);
    } catch (error) {}
  };

  return (
    <Box>
      <Crumbs back />
      <form
        onSubmit={e => {
          e.preventDefault();
          PayAndCreate();
          // setVisible(true);
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
        <TribeNFT nftList={nftList} nftTokenAddress={nftTokenAddress} />
        <TribeCreateBtn hasNft={nftList.length > 0} />
      </form>

      <ModalWrapper
        creactOnUse
        customizeTitle
        shouldCloseOnOverlayClick={false}
        visible={visible}
      >
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <LogoIcon>
            <Icon name='icon-LOGO3' size={80} color='white_black' />
          </LogoIcon>
          <Text mt='30px'>{t('Waiting For Confirmation')}</Text>
          <Text mt='10px' small color='textTips'>
            {t('To cancel this transaction, please reject it in your wallet')}
          </Text>
          {/* <Icon name='icon-complete' size={160} color='#2BEC93' />
          <Text mt='30px'>{t('Create Successfully')}</Text> */}
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default Create;
