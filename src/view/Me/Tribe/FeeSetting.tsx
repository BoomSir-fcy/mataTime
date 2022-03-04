import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Button, Flex } from 'uikit';
import { TribeFee } from 'view/Tribe/Create/TribeFee';
import { useFeeTokenList } from 'store/tribe/hooks';
import { useTribe } from 'view/Tribe/Create/hooks';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';
import Dots from 'components/Loader/Dots';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';

const MeTribeFeeSetting = () => {
  useFeeTokenList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const form = React.useRef<any>();
  const parseQs = useParsedQueryString();
  const { onSetTribeFeeInfo } = useTribe();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [info, setInfo] = useState({});
  const tribeId = parseQs.i;
  const tribeInfo = useTribeInfoById(tribeId);

  useEffect(() => {
    if (tribeInfo?.baseInfo?.name) setInfo(tribeInfo?.baseInfo);
  }, [tribeInfo?.baseInfo]);
  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const params = form.current.getFeeFrom();
          try {
            setPending(true);
            await onSetTribeFeeInfo(tribeId, params);
            dispatch(fetchTribeInfoAsync(tribeId));
            setInfo(params);
            setIsEdit(false);
            setPending(false);
          } catch (error) {
            console.error(error);
            setPending(false);
          }
        }}
        action=''
      >
        <Crumbs title={t('Fee Setting')}>
          {isEdit ? (
            <Flex>
              <Button
                mr='20px'
                onClick={() => {
                  setInfo(tribeInfo?.baseInfo);
                  setIsEdit(false);
                }}
              >
                {t('TribeCancel')}
              </Button>
              <Button type='submit'>
                {pending ? <Dots>{t('TribeSave')}</Dots> : t('TribeSave')}
              </Button>
            </Flex>
          ) : (
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {t('TribeEdit')}
            </Button>
          )}
        </Crumbs>
        <TribeFee
          key={isEdit ? 1 : 0}
          ref={form}
          disabled={!isEdit}
          actionType='edit'
          info={info}
        />
      </form>
    </Box>
  );
};

export default MeTribeFeeSetting;
