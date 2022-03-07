import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { Icon, Avatar, JoinInviteModal } from 'components';
import { Card, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { useTranslation } from 'contexts';

import { useTribeInfoById } from 'store/mapModule/hooks';

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
  const history = useHistory();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const tribeInfo = useTribeInfoById(props.tribe_id);
  const { detail } = tribeInfo || {};
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Card padding='16px' isRadius {...props}>
        <Flex justifyContent='space-between' alignItems='flex-end' mb='17px'>
          <Text fontSize='24px' fontWeight='bold'>
            {tribeInfo?.tribe?.name}
          </Text>
          {userInfo?.address === tribeInfo?.tribe?.owner_address && (
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
          {detail?.type === 2 && (
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
          <Avatar disableFollow scale='sm' src={detail?.nft_image} />
          <Text fontSize='18px' fontWeight='bold' ml='16px'>
            {detail?.nick_name}
          </Text>
        </Flex>
        <Desc>{detail?.summary}</Desc>
      </Card>
      {/* 邀请框 */}
      <JoinInviteModal
        tribe_id={props.tribe_id}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </React.Fragment>
  );
};

export default TribeInfo;
