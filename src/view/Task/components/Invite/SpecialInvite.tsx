import React, { useState } from 'react';
import { Icon } from 'components';
import styled from 'styled-components';
import { Text, Flex, Box } from 'uikit';
import { Step } from './step';
import { useTranslation } from 'contexts/Localization'


const ImgBox = styled(Box)`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 10px;
  transition: all 0.3s;
  :hover{
    box-shadow: 0px 0px 9px 5px white;
  }
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
const ReceivedBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
`
const SpecialInvite: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column">
      <Text>谁获得了你的特别邀请，就意味着获得了一个免费的绘画板NFT，可以创造一个无聊猴头像，自由地登录Metatime。恭喜！只有创世恐龙
        头像的用户才拥有这个特别邀请权利。</Text>
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <Step />
        <Flex>
          <ImgBox>
            <img src="https://api.dsgmetaverse.com/gphoto/gen/19C052044.png" alt="" />
            <Icon className="icon" name={'icon-fenxiang'} color="textPrimary" size={18} />
          </ImgBox>
          <ImgBox>
            <img src="https://api.dsgmetaverse.com/gphoto/gen/19C052044.png" alt="" />
            <Icon className="icon" name={'icon-fenxiang'} color="textPrimary" size={18} />
          </ImgBox>
          <ReceivedBox>
            <Icon name={'icon-complete'} color="primary" size={25} />
            <Text mt="16px" color="textTips" small>{t('NFT已被领取')}</Text>
          </ReceivedBox>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SpecialInvite;