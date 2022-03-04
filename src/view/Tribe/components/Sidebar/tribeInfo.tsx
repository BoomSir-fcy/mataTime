import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Icon, Avatar, JoinInviteModal } from 'components';
import { Card, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { useTranslation } from 'contexts';

const Desc = styled(Text)`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`;

const TribeInfo: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const history = useHistory();
  const tribeInfo = useStore(p => p.tribe.tribeInfo);
  const tribeDetails = useStore(p => p.tribe.tribeDetails);
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Card padding='16px' isRadius {...props}>
        <Flex justifyContent='space-between' alignItems='flex-end' mb='17px'>
          <Text fontSize='24px' fontWeight='bold'>
            {tribeInfo?.tribe?.name}
          </Text>
          {account?.toLowerCase() === tribeInfo?.tribe?.owner_address && (
            <Text
              color='textPrimary'
              onClick={() => history.push(`/me/tribe/info?i=${props.tribe_id}`)}
              style={{
                cursor: 'pointer',
              }}
            >
              {t('tribeInfoManager')}
            </Text>
          )}
        </Flex>
        <Flex alignItems='center' mb='13px'>
          <Text color='textTips'>{t('tribeInfoCreate')}</Text>
          <Text margin='0 13px'>
            {t('ValidityDaysUnit', {
              value: dayjs().diff(
                dayjs(tribeInfo?.tribe?.create_time * 1000),
                'days',
              ),
            })}
          </Text>
          {tribeDetails?.type === 2 && (
            <Icon
              name='icon-fenxiang'
              color='textPrimary'
              size={18}
              current
              onClick={() => setVisible(true)}
            />
          )}
        </Flex>
        <Flex alignItems='center' mb='19px'>
          <Avatar scale='sm' src={tribeDetails?.nft_image} />
          <Text fontSize='18px' fontWeight='bold' ml='16px'>
            {tribeDetails?.nick_name}
          </Text>
        </Flex>
        <Desc>{tribeDetails?.summary}</Desc>
      </Card>
      {/* 邀请框 */}
      <JoinInviteModal visible={visible} onClose={() => setVisible(false)} />
    </React.Fragment>
  );
};

export default TribeInfo;
