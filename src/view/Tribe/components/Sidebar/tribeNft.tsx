import React from 'react';
import styled from 'styled-components';
import { Box, Card, Flex, Image, Text, LinkExternal } from 'uikit';

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
  return (
    <Card padding='16px' isRadius {...props}>
      <Flex mb='20px' justifyContent='flex-start'>
        <Box width='65px' height='65px' mr='16px'>
          <AvatarNft
            width={65}
            height={65}
            src='https://picsum.photos/200/200'
          />
        </Box>
        <Box style={{ width: 'calc(100% - 80px)' }}>
          <RowsEllipsis>
            <Text fontWeight='bold' ellipsis>
              213213213熊熊之火
            </Text>
            <Text ml='6px' color='textTips' ellipsis>
              -Tribe Host NFT
            </Text>
          </RowsEllipsis>
          <Text maxLine={2} color='textTips' style={{ lineHeight: 1.4 }}>
            成员NFT的描述成员NFT的描 NFT的描述成员NFT的描述
          </Text>
        </Box>
      </Flex>
      <Flex mb='12px'>
        <Text color='textTips'>#00001</Text>
        <Text ml='30px' color='textTips'>
          Brithday:2022-01-12
        </Text>
      </Flex>
      <LinkExternal color='textPrimary' height='24px' href='#'>
        View on BSCscan
      </LinkExternal>
    </Card>
  );
};

export default TribeNft;
