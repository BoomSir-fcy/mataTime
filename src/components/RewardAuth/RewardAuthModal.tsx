import React, { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { DropDown } from 'components';
import { Flex, Box, Text, Card, Button, InputPanel, Image } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { AvatarCard } from '../Avatar/AvatarCard';
import { Avatar } from '../Avatar';
import QuestionHelper from 'components/QuestionHelper';

const RewardAuthModalStyled = styled(Box)<{ top: number; left: number }>`
  position: fixed;
  z-index: 99;
  width: 418px;
  height: 242px;
  padding: 8px 20px 16px;
  padding-bottom: 16px;
  border-radius: 10px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background: ${({ theme }) => theme.colors.tertiary};
`;
const CoinSelectStyled = styled(Button)`
  width: 100px;
  height: 35px;
  padding: 0;
`;

const JiantouStyled = styled.div<{ open: boolean }>`
  border: 6px solid transparent;
  border-top-color: #fff;
  transition: all 0.3s;
  transform: ${({ open }) =>
    open ? 'rotateZ(180deg) translateY(3px)' : 'rotateZ(0) translateY(3px)'};
  transform-origin: center;
`;

const InputPanelStyled = styled(InputPanel)`
  padding: 6px 9px;
  min-width: 100px;
  height: 50px;
  margin-bottom: 12px;
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
`;

interface RewardAuthModalProps {
  depositSymbol?: string;
  onConfirm?: (amount: string) => void;
  onDismiss?: () => void;
  userName?: string;
  address?: string;
  avatar?: string;
  offsetTop?: number;
  offsetLeft?: number;
}

const RewardAuthModal: React.FC<RewardAuthModalProps> = ({
  avatar,
  offsetLeft,
  offsetTop
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <RewardAuthModalStyled left={offsetLeft} top={offsetTop}>
      <Flex alignItems="center" justifyContent="space-between">
        <AvatarCard
          userName="支持一下曼克斯"
          avatar={avatar}
          address="0x07D4b8e2ffdE65147e18a7a192B0ed7d2133f47a"
        />
        <Flex alignItems="center">
          <Box width="100px">
            <CoinSelectStyled onClick={() => setOpen(true)}>
              <Image
                src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                width={20}
                height={20}
              />
              <Text margin="4px">BTC</Text>
              <JiantouStyled open={open} />
            </CoinSelectStyled>
            <DropDown
              fillWidth
              isOpen={open}
              scale="xs"
              setIsOpen={() => setOpen(false)}
            >
              {[1, 2, 3, 4, 5, 6].map(item => (
                <Box>{item}</Box>
              ))}
            </DropDown>
          </Box>
          <QuestionHelper
            ml="15px"
            text={
              <>
                <Text fontSize="14px">
                  链上打赏并支持作者的创作，您的支持将会鼓励作者更大的创作热情
                </Text>
                <Text fontSize="14px" color="textTips">
                  *平台将收取0.3%的交易手续费
                </Text>
              </>
            }
          />
        </Flex>
      </Flex>
      <Flex flexWrap="wrap" mt="12px" justifyContent="space-between">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <InputPanelStyled>
            <Flex>
              <Box width="20px">
                <Image
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                  width={20}
                  height={20}
                />
              </Box>
              <Flex ml="3px" flexDirection="column">
                <Text bold ml="5px" style={{ lineHeight: 'normal' }}>
                  10
                </Text>
                <Text fontSize="14px" style={{ lineHeight: 'normal' }}>
                  $10
                </Text>
              </Flex>
            </Flex>
          </InputPanelStyled>
        ))}
      </Flex>
      <Flex mt="4px" alignItems="center">
        <Flex ml="1em">
          {[1, 2, 3].map(item => (
            <Box width="24px" style={{ marginLeft: '-1em' }}>
              <Avatar scale="md" style={{ width: '24px', height: '24px' }} />
            </Box>
          ))}
        </Flex>
        <Text ml="11px" fontSize="14px" color="textTips">
          共81人已打赏这篇帖子
        </Text>
      </Flex>
    </RewardAuthModalStyled>
  );
};

export default RewardAuthModal;
