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
import { getNftGenCodeCount, useGenCodes } from 'view/Task/hooks/matter';
import { useImmer } from 'use-immer';
import { debounce } from 'lodash';
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
  &:not(:last-child) {
    ${({ theme }) => theme.mediaQueriesSize.marginr}
  }
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
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
  &.active {
    box-shadow: 0px 0px 5px 2px ${({ theme }) => theme.colors.white};
  }
  &.disable {
    cursor: not-allowed;
  }
`;
const AvatarBox = styled.div`
  position: relative;
  width: 102px;
  height: 104px;
  border-radius: 10px;
  .icon {
    position: absolute;
    bottom: 8%;
    right: 5%;
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
`;

const NftAvatar: React.FC<{
  NftInfo?: InvitableNftInfo;
  defaultCodeList?: CodeInfo[];
}> = ({ NftInfo, defaultCodeList }) => {
  const { onGenCodes } = useGenCodes();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const [visible, setVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeInfo, setActiveInfo] = useState<CodeInfo>();

  const nftToken = NftInfo.token;
  const nftId = NftInfo.token_id;

  // 0 未生成, 1未使用, 2提交合约, 3锁定, 4已使用
  const [codeList, setCodeList] = useState<CodeInfo[]>(defaultCodeList);

  useEffect(() => {
    checkCodeStatus();
  }, []);

  const checkCodeStatus = useCallback(async () => {
    const codeCount = await getNftGenCodeCount(nftId);
    console.log(nftId, '------', codeCount);
    setCodeList(prep => {
      return prep.map((item, i) => {
        return {
          ...item,
          status: item.status <= 2 && item.id <= codeCount ? 2 : item.status,
        };
      });
    });
  }, [nftId]);

  // 获取邀请码信息
  const getInviteCode = useCallback(
    async (nftToken, nftId) => {
      if (codeList[0]?.code) {
        return;
      }
      try {
        const res = await Api.TaskApi.getInviteCode(nftToken, nftId);
        if (Api.isSuccess(res)) {
          const list = res.data || [];
          setCodeList(pre => {
            return pre.map((v, i) => {
              return { ...list[i], ...v };
            });
          });
        }
      } catch (err) {}
    },
    [nftToken, nftId],
  );

  // 获取已生成邀请码的列表
  // const getCodeList = useCallback(async () => {
  //   try {
  //     const res = await Api.TaskApi.getCodeList(nftToken, nftId);
  //     if (Api.isSuccess(res)) {
  //       const list = res.data || [];
  //       if (list.length) {
  //         setCodeList(pre => {
  //           return pre.map((v, i) => {
  //             return { ...v, ...list[i] };
  //           });
  //         });
  //       }
  //     }
  //   } catch (err) {}
  // }, [nftToken, nftId]);

  const handleGenCode = useCallback(
    async (info: any) => {
      console.log('info=========>', info);
      setSubmitLoading(true);
      try {
        // 未生成邀请码
        if (info.status === 0) {
          await getInviteCode(nftToken, nftId);
        }
        // 未提交合约
        if (info.status < 2) {
          const codeHash = codeList[info.id - 1]?.code_hash;
          await onGenCodes(nftId, [getCodeHash(codeHash)]);
        }
      } catch (err) {
        setSubmitLoading(false);
        return false;
      }
      // 获取更新状态
      setActiveInfo(codeList.filter(v => v.id === info.id)[0]);
      setTimeout(() => {
        setVisible(true);
        setSubmitLoading(false);
      }, 5000);
    },
    [nftToken, nftId, codeList],
  );

  // 获得codeHash值
  const getCodeHash = useCallback((codeHash: string) => {
    if (codeHash && codeHash.length === 16)
      return `0x${codeHash}000000000000000000000000000000000000000000000000`;
    else return `0x${codeHash}`;
  }, []);

  // 复制链接
  const onCopyLink = useCallback(() => {
    const copyUrl = `${window.location.origin}/login?c=${activeInfo?.code}&h=${activeInfo?.code_hash}&l=${activeInfo?.lock_hash}`;
    copyContent(copyUrl);
    toastSuccess(t('CopyLinkSuccess'));
    setVisible(false);
  }, []);

  // 剩余分享次数
  const getTimes = useMemo(() => {
    return codeList.filter(v => v.status !== 4).length;
  }, [codeList]);

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
              <Text small>点击NFT画板分享给好友</Text>
              <Text small>剩余{getTimes}次</Text>
            </Flex>
            <Flex>
              {codeList.map((item, index) => (
                <Column key={item.id}>
                  <AvatarBox>
                    {item.id === 4 ? (
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
                        {item.id === activeInfo?.id && (
                          <Loading visible={submitLoading} />
                        )}
                        <ActiveImg
                          className={
                            item.id > 1 && codeList[index - 1].status <= 1
                              ? 'disable'
                              : 'active'
                          }
                          // className='active'
                          disableFollow
                          src={require('assets/images/task/monkey.jpg').default}
                          scale='ld'
                          onClick={() => {
                            if (
                              item.id > 1 &&
                              codeList[index - 1].status <= 1
                            ) {
                              return false;
                            }
                            handleGenCode(item);
                          }}
                        />
                        <Icon
                          className='icon'
                          name={'icon-fenxiang'}
                          color='textPrimary'
                          size={18}
                        />
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
