import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { ModalWrapper } from 'components';
import { Flex, Box, Input, Button, Text } from 'uikit';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';

const Rows = styled(Flex)`
  position: relative;
  align-items: center;
`;

const VerifyImg = styled.img`
  cursor: pointer;
  position: absolute;
  right: 10px;
  width: 120px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.card};
`;

export const VerifyCodeComponent = (
  props: {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { id: string; verify: string }) => void;
  },
  ref,
) => {
  const { t } = useTranslation();

  const [state, setState] = useImmer({
    code: '',
    img: '',
    verify: '',
  });

  // 获取验证码
  const getVerifyCode = async () => {
    try {
      const res = await Api.HomeApi.getVerifyCode();
      if (Api.isSuccess(res)) {
        setState(p => {
          p.code = res.data.id;
          p.img = res.data.base64;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getVerifyCode();
  }, []);

  React.useImperativeHandle(ref, () => ({
    reload() {
      return getVerifyCode();
    },
  }));

  return (
    <ModalWrapper
      title={t('verify')}
      visible={props.visible}
      setVisible={props.onClose}
    >
      <Box padding='20px' width='350px'>
        <Rows>
          <Input
            maxLength={4}
            onChange={e =>
              setState(p => {
                p.verify = e.target.value;
              })
            }
          />
          <VerifyImg onClick={getVerifyCode} src={state.img} alt='' />
        </Rows>
        <Box>
          <Text color='textTips'>{t('verifyText')}</Text>
        </Box>
        <Flex justifyContent='flex-end'>
          <Button
            mt='10px'
            onClick={() =>
              props.onSubmit({
                id: state.code,
                verify: state.verify,
              })
            }
          >
            {t('submit')}
          </Button>
        </Flex>
      </Box>
    </ModalWrapper>
  );
};

export const VerifyCode = React.forwardRef(VerifyCodeComponent);
