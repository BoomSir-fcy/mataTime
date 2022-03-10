import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Crumbs, WaitConfirmModal, SuccessfullyModal } from 'components';
import { useTranslation } from 'contexts';
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
import useMenuNav from 'hooks/useMenuNav';
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';
import { fetchActiveNftInfo } from 'store/tribe';
import { getBLen } from 'utils';

const Create = () => {
  useTicketNftList();
  useFeeTokenList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile } = useMenuNav();
  const { toastError } = useToast();
  const history = useHistory();
  const infoForm = React.useRef<any>();
  const feeForm = React.useRef<any>();
  const [state, setState] = useImmer({
    visible: false,
  });

  const { createStatus, onCheckUniqueName, onCreateTribe } = useTribe();
  const { ticketNftList, activeNftInfo, tribeBaseInfo } = useTribeState();

  const isOneHundredBySum = useCallback((numArr: number[]) => {
    return sum(numArr) === 100;
  }, []);

  const gotoMaterNft = () => {
    history.push('/me/tribe');
  };

  const PayAndCreate = async () => {
    const infoParams = infoForm.current.getInfoFrom();
    const feeParams = feeForm.current.getFeeFrom();
    const len = getBLen(infoParams.name);
    if (len < 6 || len > 30) {
      toastError(
        `${t('Tribe name')} ${t(
          '6~30 characters (Support English, Chinese, numbers)',
        )}`,
      );
      return false;
    }
    try {
      const isNotUnique = await onCheckUniqueName(infoParams.name);
      if (isNotUnique) {
        toastError(t('Name already exists'));
        return false;
      }
      if (!infoParams.logo) {
        toastError(t('Please upload a picture'));
        return false;
      }
      if (
        !isOneHundredBySum([
          parseInt(feeParams.ownerPercent),
          parseInt(feeParams.authorPercent),
          parseInt(feeParams.memberPercent),
        ])
      ) {
        toastError(t('The sum of the TIME reward distribution must be 100%'));
        return false;
      }
      if (!activeNftInfo.nftId) {
        toastError(t('Please select a ticket'));
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
      console.log('表单提交：', params);

      await onCreateTribe(params);
      // 10秒后自动跳转
      setTimeout(() => {
        setState(p => {
          p.visible = false;
        });
        dispatch(fetchActiveNftInfo({ info: {} }));
        dispatch(storeAction.saveTribeBaseInfo(null));
        gotoMaterNft();
      }, 10000);
    } catch (error) {
      console.log(error);

      setState(p => {
        p.visible = false;
      });
    }
  };

  const handleTempBaseInfo = useCallback(info => {
    dispatch(
      storeAction.saveTribeBaseInfo({
        name: info?.name,
        logo: info?.logo,
        introduction: info?.introduction,
      }),
    );
  }, []);

  const handleTempFeeInfo = useCallback(info => {
    dispatch(storeAction.saveTribeBaseInfo(info));
  }, []);

  return (
    <Box>
      <Crumbs back />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          PayAndCreate();
        }}
        action=''
      >
        <SubHeader title={t('Basic Information')} />
        <TribeInfo
          ref={infoForm}
          info={tribeBaseInfo}
          handleTempInfo={handleTempBaseInfo}
        />
        <Divider />
        <SubHeader title={t('Type settings')} />
        <TribeFee
          ref={feeForm}
          actionType='save'
          info={tribeBaseInfo}
          handleTempInfo={handleTempFeeInfo}
        />
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
          <TribeCreateBtn hasNft={ticketNftList.length > 0} />
        </Flex>
      </form>

      {(createStatus === 'start' || createStatus === 'waiting') && (
        <WaitConfirmModal visible={state.visible} />
      )}
      {createStatus === 'success' && (
        <SuccessfullyModal
          visible={state.visible}
          text={t('Create Successfully')}
        />
      )}
    </Box>
  );
};

export default Create;
