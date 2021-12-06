import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { TokenImage } from 'components';
import { Flex, Box, Text, Button, InputPanel } from 'uikit';

import { OnApprove, RewardAuthorList } from './hook';
import { useTranslation } from 'contexts/Localization';

import Dots from 'components/Loader/Dots';

const Rows = styled(Flex)`
  align-items: center;
`;

const InputPanelStyled = styled(InputPanel)`
  width: 33%;
  cursor: pointer;
  padding: 6px 9px;
  min-width: 100px;
  height: 50px;
  margin-bottom: 12px;
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
`;

export const CoinItem: React.FC<{
  token: string[];
}> = React.memo(({ token }) => {
  return (
    <Rows>
      <TokenImage tokenAddress={token[1]} width={20} height={20} />
      <Text ml="5px">{token[2]}</Text>
    </Rows>
  );
});

export const Reward: React.FC<{
  current: any;
  price: string;
  isOnApprove: boolean;
  onCallBack: (event: number) => void;
  onApprove: () => void;
}> = React.memo(({ current, price, isOnApprove, onCallBack, onApprove }) => {
  const { handleApprove } = OnApprove(current[0]);
  const { toastSuccess, toastError } = useToast();
  const { t } = useTranslation();

  const [state, setState] = useImmer({
    loading: false
  });

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
              <Dots>授权 {current[2]}</Dots>
            ) : (
              ` 授权 ${current[2]}`
            )}
          </Button>
        </Flex>
      ) : (
        <Flex flexWrap="wrap" justifyContent="space-between">
          {RewardAuthorList.map(item => (
            <InputPanelStyled onClick={() => onCallBack(item)}>
              <Flex>
                <Box width="20px">
                  <TokenImage
                    width={20}
                    height={20}
                    tokenAddress={current[1]}
                  />
                </Box>
                <Flex ml="3px" flexDirection="column" style={{ flex: 1 }}>
                  <Text bold ml="5px" style={{ lineHeight: 'normal' }}>
                    {item}
                  </Text>
                  <Text fontSize="14px" style={{ lineHeight: 'normal' }}>
                    ${new BigNumber(price).times(item).toString()}
                  </Text>
                </Flex>
              </Flex>
            </InputPanelStyled>
          ))}
        </Flex>
      )}
    </React.Fragment>
  );
});
