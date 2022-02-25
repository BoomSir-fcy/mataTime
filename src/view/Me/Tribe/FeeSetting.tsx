import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeFee } from 'view/Tribe/Create/TribeFee';
import { fetchGetTribeBaseInfo } from 'store/tribe';
import { useTribeState } from 'store/tribe/hooks';
import { useTribe } from 'view/Tribe/Create/hooks';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';

const MeTribeFeeSetting = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const { tribeId, tribeBaseInfo } = useTribeState();
  const { onSetTribeFeeInfo } = useTribe();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (parseQs.i) dispatch(fetchGetTribeBaseInfo({ tribeId: parseQs.i }));
  }, [parseQs]);

  useEffect(() => {
    if (tribeBaseInfo.name) setInfo(tribeBaseInfo);
  }, [tribeBaseInfo]);
  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const params = form.current.getInfoFrom();
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
