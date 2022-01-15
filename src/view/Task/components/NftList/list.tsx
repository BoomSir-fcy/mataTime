import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box, Text, Flex, Button } from 'uikit';
import { Avatar, Icon, Loading } from 'components';
import { useTranslation } from 'contexts/Localization';
import { useWeb3React } from '@web3-react/core';
import { copyContent } from 'utils';
import { ContentBox } from '../Invite';
import InviteModal from '../Invite/InviteModal';
import { useToast } from 'hooks';
import { Api } from 'apis';
import {
  getNftGenCodeCount,
  useGenCodes,
  getCodeViewList,
} from 'view/Task/hooks/matter';
import useConnectWallet from 'hooks/useConnectWallet';
import { CodeInfo, InvitableNftInfo } from 'view/Task/type';

const NftFlex = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 90%;
  }
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: max-content;
  position: relative;
  cursor: pointer;
  /* &:not(:last-child) {
    ${({ theme }) => theme.mediaQueriesSize.marginr}
  } */
`;
const NftAvatarBox = styled(Flex)`
  width: 211px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const NftDrawBox = styled(Flex)`
  flex-direction: column;
  margin-top: 10px;
  min-width: 50%;
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
  &.active {
    box-shadow: ${({ theme }) =>
      theme.isDark
        ? `0px 0px 9px 5px ${theme.colors.white}`
        : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
  }
  &.disable {
    cursor: not-allowed;
  }
`;
const AvatarBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  .icon {
    position: absolute;
    bottom: 12%;
    right: 8%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;

const ReceivedBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  cursor: not-allowed;
`;

const NftAvatar: React.FC<{
  NftInfo?: InvitableNftInfo;
  defaultCodeList?: CodeInfo[];
  maxGendCodeCount?: number;
}> = ({ NftInfo, defaultCodeList, maxGendCodeCount }) => {
  const { onGenCodes } = useGenCodes();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [visible, setVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeInfo, setActiveInfo] = useState<CodeInfo>();

  const nftToken = NftInfo.token;
  const nftId = NftInfo.token_id;

  // 0 未生成, 1未使用, 2提交合约, 3锁定, 4已使用
  const [codeList, setCodeList] = useState<CodeInfo[]>(defaultCodeList);

  useEffect(() => {
    getLastReceivedStatus();
  }, [defaultCodeList[0]?.code_hash]);

  // 获取邀请码是否被使用的最新状态
  const getLastReceivedStatus = useCallback(async () => {
    try {
      if (defaultCodeList[0]?.code_hash) {
        const lastStatusList = await getCodeViewList(
          defaultCodeList.map(v => `0x${v.code_hash}`),
        );
        setCodeList(pre => {
          return pre.map((item, i) => {
            return {
              ...item,
              status: lastStatusList[i].status === 2 ? 4 : item.status,
            };
          });
        });
      }
    } catch (error) {}
  }, [defaultCodeList]);

  // 生成邀请码
  const genInviteCode = useCallback(
    async (nftToken, nftId) => {
      if (codeList[0]?.code) {
        return;
      }
      try {
        const res = await Api.TaskApi.getInviteCode(nftToken, nftId);
        if (Api.isSuccess(res)) {
          const list = res.data || [];

          // 转移nft情况，若转移前有已提交的邀请码，则转移后从数组开头填充剩余未生成的邀请码个数
          const fillLen = maxGendCodeCount - list.length;
          if (fillLen > 0) {
            for (let i = fillLen; i > 0; i--) {
              list.unshift({ id: fillLen, status: 0 });
            }
          }
          if (list.length) {
            const newList = codeList.map((v, i) => {
              if (checkTransferNft(v)) {
                return v;
              }
              return { ...v, ...list[i] };
            });
            setCodeList([...newList]);
            return newList;
          } else {
            return codeList;
          }
        }
      } catch (err) {
        return codeList;
      }
    },
    [codeList, nftToken, nftId],
  );

  // 获取邀请码提交到合约的最新状态
  const getLastSubmitStatus = useCallback(
    async nftId => {
      try {
        const codeCount = await getNftGenCodeCount(nftId);
        if (codeCount) {
          setCodeList(pre => {
            return pre.map((item, i) => {
              return {
                ...item,
                status: i < codeCount && item.status < 2 ? 2 : item.status,
              };
            });
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [setCodeList],
  );

  useEffect(() => {
    if (nftId && codeList.length) {
      getLastSubmitStatus(nftId);
    }
  }, [codeList.length, nftId, getLastSubmitStatus]);

  // 点击无聊猴画板
  const handleGenCode = useCallback(
    async (info: any, index) => {
      setActiveInfo(info);
      setSubmitLoading(true);
      let tempList = codeList;
      try {
        // 未生成邀请码
        if (info.status === 0) {
          tempList = await genInviteCode(nftToken, nftId);
        }
        // 未提交合约
        if (info.status < 2) {
          const codeHash = tempList[index]?.code_hash;
          await onGenCodes(nftId, [`0x${codeHash}`]);
        }
      } catch (err: any) {
        if (err?.data?.code === 3) {
          toastError(t('exceeds the maximum number that can be generated'));
        }
        setSubmitLoading(false);
        return false;
      }

      // 获取最新状态
      await getLastSubmitStatus(nftId);
      if (!info?.code_hash)
        setActiveInfo(tempList.filter(v => v.id === info.id)[0]);
      setVisible(true);
      setSubmitLoading(false);
    },
    [codeList, nftToken, nftId],
  );

  // 复制链接
  const onCopyLink = useCallback(() => {
    const copyUrl = `${window.location.origin}/login?c=${activeInfo?.code}&h=${activeInfo?.code_hash}&l=${activeInfo?.lock_hash}`;
    copyContent(copyUrl);
    toastSuccess(t('CopyLinkSuccess'));
    setVisible(false);
  }, [activeInfo]);

  // 剩余分享次数
  const getTimes = useMemo(() => {
    return codeList.filter(v => v.status < 2).length;
  }, [codeList]);

  const checkTransferNft = useCallback((item?: CodeInfo) => {
    return item?.code === '';
  }, []);

  return (
    <ContentBox>
      <NftFlex>
        <NftAvatarBox>
          <Text mb='10px'>
            {NftInfo.name} #{NftInfo.token_id}
          </Text>
          <ActiveImg
            className='active'
            disableFollow
            src={NftInfo.image}
            scale='ld'
          />
        </NftAvatarBox>
        {account ? (
          <NftDrawBox>
            <Flex mb='10px' justifyContent='space-between' alignItems='center'>
              <Text small>
                {t('Click NFT Sketchpad to share with friends')}
              </Text>
              <Text small>
                {t('Remaining %count% times', { count: getTimes })}
              </Text>
            </Flex>
            <Flex justifyContent='space-between'>
              {codeList.map((item, index) => (
                <Column key={item.id}>
                  <AvatarBox>
                    {item.status === 4 && !checkTransferNft(item) ? (
                      <ReceivedBox>
                        <Icon
                          name={'icon-complete'}
                          color='primary'
                          size={25}
                        />
                        <Text mt='16px' color='textTips' small>
                          {t('NFT has been collected')}
                        </Text>
                      </ReceivedBox>
                    ) : (
                      <>
                        {item?.id === activeInfo?.id && (
                          <Loading visible={submitLoading} />
                        )}
                        <Box
                          onClick={() => {
                            // 若上一个邀请码已提交合约，则可点击下一个
                            if (
                              (index >= 1 && codeList[index - 1].status < 2) ||
                              checkTransferNft(item)
                            ) {
                              return false;
                            }
                            handleGenCode(item, index);
                          }}
                        >
                          <ActiveImg
                            className={
                              (index >= 1 && codeList[index - 1].status < 2) ||
                              checkTransferNft(item)
                                ? 'disable'
                                : 'active'
                            }
                            disableFollow
                            src={
                              require('assets/images/task/monkey.jpg').default
                            }
                            scale='ld'
                          />
                          <Icon
                            className='icon'
                            name={'icon-fenxiang'}
                            color='textPrimary'
                            size={18}
                          />
                        </Box>
                      </>
                    )}
                  </AvatarBox>
                </Column>
              ))}
            </Flex>
          </NftDrawBox>
        ) : (
          <Button onClick={onConnectWallet}>{t('Connect Wallet')}</Button>
        )}
      </NftFlex>

      {/* 复制链接弹窗 */}
      <InviteModal
        type={2}
        t={t}
        visible={visible}
        setVisible={() => setVisible(false)}
        onCopyLink={onCopyLink}
      />
    </ContentBox>
  );
};

export default NftAvatar;
