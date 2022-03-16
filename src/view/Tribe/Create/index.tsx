import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Crumbs, WaitConfirmModal, SuccessfullyModal } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Divider, Flex, Button, LinkExternal } from 'uikit';
import SubHeader from '../components/SubHeader';
import { BtnFlex, FormFlex } from './style';
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
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';
import { fetchActiveNftInfo } from 'store/tribe';
import { getBLen } from 'utils';
import { isApp } from 'utils/client';

const Create = () => {
  useTicketNftList();
  useFeeTokenList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toastError } = useToast();
  const history = useHistory();
  const infoForm = React.useRef<any>();
  const feeForm = React.useRef<any>();
  const [state, setState] = useImmer({
    visible: false,
  });
  const [pending, setPending] = useState(false);

  const [step, setStep] = useState(1);
  const { createStatus, onCheckUniqueName, onCreateTribe } = useTribe();
  const { ticketNftList, activeNftInfo, tribeBaseInfo } = useTribeState();

  const gotoMaterNft = () => {
    history.push('/me/tribe');
  };

  const validBaseInfo = useCallback(async infoParams => {
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
    } catch (error) {
      toastError(t('Name already exists'));
      return false;
    }
    if (!infoParams.logo) {
      toastError(t('Please upload a picture'));
      return false;
    }
    return true;
  }, []);

  const validFeeInfo = useCallback(feeParams => {
    if (
      sum([
        parseInt(feeParams.ownerPercent),
        parseInt(feeParams.authorPercent),
        parseInt(feeParams.memberPercent),
      ]) !== 100
    ) {
      toastError(t('The sum of the TIME reward distribution must be 100%'));
      return false;
    }
    return true;
  }, []);

  const validNftInfo = useCallback(() => {
    if (!activeNftInfo.nftId) {
      toastError(t('Please select a ticket'));
      return false;
    }
    return true;
  }, [activeNftInfo]);

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

  const PayAndCreate = async () => {
    setPending(true);
    const infoParams = infoForm.current.getInfoFrom();
    const feeParams = feeForm.current.getFeeFrom();
    if (!(await validBaseInfo(infoParams))) {
      setPending(false);
      return false;
    }
    if (!validFeeInfo(feeParams)) {
      setPending(false);
      return false;
    }
    if (!validNftInfo()) {
      setPending(false);
      return false;
    }
    try {
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
        setPending(false);
        setState(p => {
          p.visible = false;
        });
        dispatch(fetchActiveNftInfo({ info: {} }));
        dispatch(storeAction.saveTribeBaseInfo(null));
        gotoMaterNft();
      }, 10000);
    } catch (error) {
      console.log(error);
      setPending(false);
      setState(p => {
        p.visible = false;
      });
    }
  };

  const payAndCreateByMobile = useCallback(async () => {
    try {
      const params = {
        ...tribeBaseInfo,
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
  }, []);
  return (
    <Box>
      <Crumbs back />
      {/* 移动端布局 */}
      {isApp() ? (
        <>
          {step === 1 && (
            <form
              onSubmit={async e => {
                e.preventDefault();
                const isNext = await validBaseInfo(
                  infoForm.current.getInfoFrom(),
                );
                if (!isNext) return false;
                setStep(2);
              }}
              onInvalid={e => {
                if (
                  (e.target as HTMLInputElement).name === 'required-input-name'
                ) {
                  (e.target as HTMLInputElement).scrollIntoView({
                    block: 'end',
                  });
                }
              }}
              action=''
            >
              <TribeInfo
                ref={infoForm}
                info={tribeBaseInfo}
                handleTempInfo={handleTempBaseInfo}
              />
              <BtnFlex>
                <Button type='submit' width='100%'>
                  {t('Next step')}
                </Button>
              </BtnFlex>
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={async e => {
                e.preventDefault();
                if (!validFeeInfo(feeForm.current.getFeeFrom())) return false;
                setStep(3);
              }}
              onInvalid={e => {
                if (
                  (e.target as HTMLInputElement).name === 'required-input-name'
                ) {
                  (e.target as HTMLInputElement).scrollIntoView({
                    block: 'end',
                  });
                }
              }}
              action=''
            >
              <TribeFee
                ref={feeForm}
                actionType='save'
                info={tribeBaseInfo}
                handleTempInfo={handleTempFeeInfo}
              />
              <BtnFlex>
                <Button
                  width='30%'
                  color='primaryDark'
                  onClick={() => setStep(1)}
                >
                  {t('Previous')}
                </Button>
                <Button width='64%' type='submit'>
                  {t('Pay for tickets')}
                </Button>
              </BtnFlex>
            </form>
          )}
          {step === 3 && (
            <form
              onSubmit={async e => {
                e.preventDefault();
                if (!validNftInfo()) return false;
                payAndCreateByMobile();
              }}
              action=''
            >
              <TribeNFT ticketNftList={ticketNftList} />
              <BtnFlex>
                <Button
                  width='30%'
                  color='primaryDark'
                  onClick={() => setStep(2)}
                >
                  {t('Previous')}
                </Button>
                <TribeCreateBtn
                  width='64%'
                  pending={pending}
                  hasNft={ticketNftList.length > 0}
                />
              </BtnFlex>
            </form>
          )}
        </>
      ) : (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            PayAndCreate();
          }}
          onInvalid={e => {
            if ((e.target as HTMLInputElement).name === 'required-input-name') {
              (e.target as HTMLInputElement).scrollIntoView({
                block: 'end',
              });
            }
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
          <Flex mr='7%' justifyContent='flex-end'>
            {/* TODO: 链接未改 */}
            <LinkExternal
              mb='20px'
              height='24px'
              color='textPrimary'
              fontSize='18px'
              href='http://www.google.com'
            >
              {t('Detail')}
            </LinkExternal>
          </Flex>
          <Divider />
          <SubHeader title={t('Pay for tickets')} />
          <TribeNFT ticketNftList={ticketNftList} />
          <Flex mb='20px' justifyContent='center'>
            <TribeCreateBtn
              pending={pending}
              hasNft={ticketNftList.length > 0}
            />
          </Flex>
        </form>
      )}

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
