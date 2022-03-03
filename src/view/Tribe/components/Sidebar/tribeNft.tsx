import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useImmer } from 'use-immer';
import { Box, Card, Flex, Image, Text, Button, LinkExternal } from 'uikit';
import { JoinTribeModal } from 'components';
import { useTranslation } from 'contexts';
import { BASE_IMAGE_URL } from 'config';
import { useStore } from 'store';
import {
  fetchTribeJoinBasicServiceAsync,
  fetchTribeInfoAsync,
} from 'store/tribe';

const AvatarNft = styled(Image)`
  width: 65px;
  height: 65px;
  border-radius: 10px;
  overflow: hidden;
`;

const RowsEllipsis = styled(Flex)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TribeNft = ({ ...props }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tribeId = useStore(p => p.tribe.tribeId);
  const tribeBaseInfo = useStore(p => p.tribe.tribeBaseInfo);
  const tribeInfo = useStore(p => p.tribe.tribeInfo);
  const tribeDetails = useStore(p => p.tribe.tribeDetails);

  const [state, setState] = useImmer({
    visible: false,
  });

  return (
    <React.Fragment>
      <Card padding='16px' isRadius {...props}>
        <Flex mb='20px' justifyContent='flex-start'>
          <Box width='65px' height='65px' mr='16px'>
            <AvatarNft
              width={65}
              height={65}
              src={BASE_IMAGE_URL + tribeBaseInfo?.memberNFTImage}
            />
          </Box>
          <Box style={{ width: 'calc(100% - 80px)' }}>
            <RowsEllipsis>
              <Text fontWeight='bold' ellipsis>
                {tribeBaseInfo.memberNFTName}
              </Text>
              <Text ml='6px' color='textTips' ellipsis>
                -Tribe Host NFT
              </Text>
            </RowsEllipsis>
            <Text maxLine={2} color='textTips' style={{ lineHeight: 1.4 }}>
              {tribeBaseInfo?.memberNFTIntroduction}
            </Text>
          </Box>
        </Flex>
        {tribeInfo?.status === 0 && (
          <Flex mb='12px' justifyContent='center'>
            <Button
              onClick={() => {
                if (tribeDetails.type === 1) {
                  dispatch(fetchTribeJoinBasicServiceAsync());
                }
                setState(p => {
                  p.visible = true;
                });
              }}
            >
              {t('tribeJoin')}
            </Button>
          </Flex>
        )}
        {tribeInfo?.status !== 0 && (
          <React.Fragment>
            <Flex mb='12px'>
              <Text color='textTips'>#00001</Text>
              <Text ml='30px' color='textTips'>
                Brithday:{' '}
                {dayjs(tribeDetails.create_time * 1000).format('YYYY-MM-DD')}
              </Text>
            </Flex>
            <LinkExternal color='textPrimary' height='24px' href='#'>
              View on BSCscan
            </LinkExternal>
          </React.Fragment>
        )}
      </Card>
      <JoinTribeModal
        visible={state.visible}
        tribeInfo={tribeInfo}
        tribeBaseInfo={tribeBaseInfo}
        onClose={event => {
          setState(p => {
            p.visible = false;
          });
          if (event) {
            dispatch(fetchTribeInfoAsync({ tribe_id: tribeId }));
          }
        }}
      />
    </React.Fragment>
  );
};

export default TribeNft;
