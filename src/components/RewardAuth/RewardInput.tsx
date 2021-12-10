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
}> = React.memo(({ current, price, isOnApprove, onApprove }) => {
  const { t } = useTranslation();
  const { handleApprove } = OnApprove(current[0]);
  const [state, setState] = useImmer({
    number: '',
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
      console.log(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  }, [handleApprove]);

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
                ≈ $
                {state.number
                  ? new BigNumber(state.number).times(price).toFixed(6)
                  : 0}
              </Text>
            </Flex>
            <InputCell>
              <InputToken
                value={state.number}
                onChange={event =>
                  setState(p => {
                    p.number = event.target.value;
                  })
                }
              />
              <Text color="white" mr="23px">
                {current && current[2]}
              </Text>
            </InputCell>
          </Box>
          <Submit>确认</Submit>
        </Flex>
      )}
    </React.Fragment>
  );
});
