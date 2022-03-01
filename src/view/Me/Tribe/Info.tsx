import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeInfo } from 'view/Tribe/Create/TribeInfo';
import { useTribeState } from 'store/tribe/hooks';
import { useDispatch } from 'react-redux';
import { fetchGetTribeBaseInfo } from 'store/tribe';
import { useTribe } from 'view/Tribe/Create/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';

const MyTribeInfo = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const { tribeBaseInfo } = useTribeState();
  const { onSetTribeBaseInfo } = useTribe();
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
          await onSetTribeBaseInfo(parseQs.i, params);
          setInfo(params);
          setIsEdit(false);
        }}
        action=''
      >
        <Crumbs title={t('Basic Information')}>
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
        <TribeInfo
          key={isEdit ? 1 : 0}
          ref={form}
          actionType='edit'
          disabled={!isEdit}
          info={info}
        />
      </form>
    </Box>
  );
};

export default MyTribeInfo;
