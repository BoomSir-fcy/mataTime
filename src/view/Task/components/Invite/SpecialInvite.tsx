import { Avatar, Icon } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Box, Image } from 'uikit';
import { Step } from './step';


const ImgBox = styled(Box)`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  img{
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
  .icon{
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
`
const SpecialInvite = () => {
  return (
    <Flex flexDirection="column">
      <Text>谁获得了你的特别邀请，就意味着获得了一个免费的绘画板NFT，可以创造一个无聊猴头像，自由地登录Metatime。恭喜！只有创世恐龙
        头像的用户才拥有这个特别邀请权利。</Text>
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <Step />
        <Flex>
          <ImgBox>
            <img src="https://api.dsgmetaverse.com/gphoto/gen/19C052044.png" />
            <Icon className="icon" name={'icon-fenxiang'} color="textPrimary" size={18} />
          </ImgBox>
          <ImgBox>
            <Image src="https://api.dsgmetaverse.com/gphoto/gen/19C052044.png" width={100} height={100} />
            <Icon className="icon" name={'icon-fenxiang'} color="textPrimary" size={18} />
          </ImgBox>
          <ImgBox>
            <Image src="https://api.dsgmetaverse.com/gphoto/gen/19C052044.png" width={100} height={100} />
            <Icon className="icon" name={'icon-fenxiang'} color="textPrimary" size={18} />
          </ImgBox>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SpecialInvite;