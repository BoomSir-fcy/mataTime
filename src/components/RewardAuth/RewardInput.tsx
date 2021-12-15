import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { useImmer } from 'use-immer';
import { Flex, Box, Button, Text, Input } from 'uikit';
import { useToast } from 'hooks';
import { OnApprove } from './hook';

import { useTranslation } from 'contexts/Localization';

import Dots from 'components/Loader/Dots';

const InputCell = styled(Flex)`
  position: relative;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #343434;
  border-radius: ${({ theme }) => theme.radii.card};
`;
const InputToken = styled(Input)`
  max-width: 100%;
  background-color: transparent;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.textTips};
`;
const Submit = styled(Button)`
  width: 100px;
  height: 50px;
`;

export const RewardInput: React.FC<{
  current;
  price: string;
  isOnApprove: boolean;
  onApprove: () => void;
  onCallBack: (event: string) => void;
}> = React.memo(({ current, price, isOnApprove, onApprove, onCallBack }) => {
  const { t } = useTranslation();
  const { handleApprove } = OnApprove(current[0]);
  const [amount, setAmount] = React.useState('');
  const [state, setState] = useImmer({
    loading: false
  });
  const { toastError } = useToast();

  const ChangeApprove = React.useCallback(async () => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await handleApprove();
      if (Boolean(res)) {
        onApprove();
      } else {
        toastError(t('setNftAuthorizationFail'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  }, [handleApprove]);

  const handleChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setAmount(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    []
  );

  return (
    <React.Fragment>
      {isOnApprove ? (
        <Flex
          width="100%"
          minHeight="120px"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={() => ChangeApprove()}>
            {state.loading ? (
              <Dots>
                {t('Account Approve')} {current[2]}
              </Dots>
            ) : (
              `${t('Account Approve')} ${current[2]}`
            )}
          </Button>
        </Flex>
      ) : (
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Box mr="15px">
            <Flex mb="15px" justifyContent="space-between">
              <Text color="white">打赏数量</Text>
              <Text
                color="textTips"
                style={{ minWidth: 0, maxWidth: 150 }}
                ellipsis
              >
                ≈ ${amount ? new BigNumber(amount).times(price).toFixed(6) : 0}
              </Text>
            </Flex>
            <InputCell>
              <InputToken
                inputMode="decimal"
                value={amount}
                pattern={`^[0-9]*[.,]?[0-9]{0,${(current && current[3]) || 6
                  }}$`}
                onChange={handleChange}
              />
              <Text color="white" mr="23px">
                {current && current[2]}
              </Text>
            </InputCell>
          </Box>
          <Submit
            onClick={evnet => {
              evnet.stopPropagation();
              onCallBack(amount);
            }}
          >
            确认
          </Submit>
        </Flex>
      )}
    </React.Fragment>
  );
});
