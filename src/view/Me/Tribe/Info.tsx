import React, { useEffect, useMemo, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeInfo } from 'view/Tribe/Create/TribeInfo';
import { useDispatch } from 'react-redux';
import { useTribe } from 'view/Tribe/Create/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';
import Dots from 'components/Loader/Dots';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';

const MyTribeInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const form = React.useRef<any>();
  const parseQs = useParsedQueryString();
  const { onSetTribeBaseInfo } = useTribe();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [info, setInfo] = useState(null);
  const tribeId = parseQs.i;

  const tribeInfo = useTribeInfoById(tribeId);

  const baseInfo = useMemo(() => {
    return {
      name: tribeInfo?.tribe?.name,
      logo: tribeInfo?.tribe?.logo,
      introduction: tribeInfo?.detail?.summary,
    };
  }, [tribeInfo]);

  useEffect(() => {
    if (baseInfo.name && baseInfo.introduction && !info) {
      setInfo({ ...baseInfo });
    }
  }, [info, baseInfo]);

  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const params = form.current.getInfoFrom();
          try {
            setPending(true);
            await onSetTribeBaseInfo(tribeId, params);
            setInfo(params);
            // dispatch(fetchTribeInfoAsync(tribeId));
            setIsEdit(false);
            setPending(false);
          } catch (error) {
            console.error(error);
            setPending(false);
          }
        }}
        action=''
      >
        <Crumbs title={t('Basic Information')}>
          {isEdit ? (
            <Flex>
              <Button
                mr='20px'
                onClick={() => {
                  setInfo(baseInfo);
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
