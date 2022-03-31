import { Icon } from 'components';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { MAX_LIMIT } from '.';

const GoMsg = styled(Box)`
  position: absolute;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.gradients.buttonBg};
  padding: 4px 8px;
  min-width: 58px;
  bottom: 8px;
  right: -8px;
  cursor: pointer;
`;

const FloatBtn: React.FC<{ UnreadMsg: any; goUnread: () => void }> = ({
  UnreadMsg,
  goUnread,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {UnreadMsg.total_un_read > MAX_LIMIT || UnreadMsg.at_msg_nonce.length ? (
        <GoMsg onClick={() => goUnread()}>
          <Flex alignItems='center'>
            <Icon size={14} color='white' current={0} name='icon-jiantou' />
            {UnreadMsg.at_msg_nonce.length ? (
              <Text ml='4px' fontSize='12px'>
                {t('%num% @me', { num: UnreadMsg.at_msg_nonce.length })}
              </Text>
            ) : (
              <Text ml='4px' fontSize='12px'>
                {UnreadMsg.total_un_read}
              </Text>
            )}
          </Flex>
        </GoMsg>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatBtn;
