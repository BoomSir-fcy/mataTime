import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeFee } from 'view/Tribe/Create/TribeFee';
import { fetchGetTribeBaseInfo } from 'store/tribe';
import { useFeeTokenList, useTribeState } from 'store/tribe/hooks';
import { useTribe } from 'view/Tribe/Create/hooks';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';

const MeTribeFeeSetting = () => {
  useFeeTokenList();
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const dispatch = useDispatch();
  const { tribeBaseInfo, tribeId } = useTribeState();
  const { onSetTribeFeeInfo } = useTribe();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (tribeId) dispatch(fetchGetTribeBaseInfo({ tribeId }));
  }, [tribeId]);

  useEffect(() => {
    if (tribeBaseInfo.name) setInfo(tribeBaseInfo);
  }, [tribeBaseInfo]);
  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const params = form.current.getFeeFrom();
          console.log('表单提交：', params);
          await onSetTribeFeeInfo(tribeId, params);
          setInfo(params);
          setIsEdit(false);
        }}
        action=''
      >
        <Crumbs title={t('Fee Setting')}>
          {isEdit ? (
            <Flex>
              <Button
                mr='20px'
                onClick={() => {
                  setInfo(tribeBaseInfo);
                  setIsEdit(false);
                }}
              >
                {t('TribeCancel')}
              </Button>
              <Button type='submit'>{t('TribeSave')}</Button>
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
