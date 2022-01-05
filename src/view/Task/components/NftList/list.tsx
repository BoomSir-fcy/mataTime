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
import { fetchInviteCode } from 'store/task/reducer';
import { Api } from 'apis';
import { getNftGenCodeCount, useGenCodes } from 'view/Task/hooks/matter';
import { useImmer } from 'use-immer';

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

interface CodeInfo {
  id: number;
  ntf_token?: string;
  nftid?: string;
  code?: string;
  code_hash?: string;
  lock_hash?: string;
  status?: number;
  created_at?: number;
  locked_at?: string;
  used_at?: string;
  used_uid?: string;
}

const NftAvatar: React.FC<{
  NftInfo?: any;
}> = ({ NftInfo }) => {
  const { onGenCodes } = useGenCodes();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const [visible, setVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeInfo, setActiveInfo] = useState<CodeInfo>();

  // 0 未生成, 1未使用, 2提交合约, 3锁定, 4已使用
  const [codeList, setCodeList] = useState<CodeInfo[]>([
    { id: 1, status: 0 },
    { id: 2, status: 0 },
    { id: 3, status: 0 },
  ]);

  useEffect(() => {
    checkCodeStatus();
  }, []);

  const checkCodeStatus = useCallback(async () => {
    const nftId = NftInfo.properties.token_id || '';
    const codeCount = await getNftGenCodeCount(nftId);
    console.log(codeCount);
    if (codeCount) {
      const list = codeList.map((item, i) => {
        return { ...item, status: codeCount === item.id ? 2 : item.status };
      });
      setCodeList([...list]);
    }
  }, [NftInfo]);

  // 获取邀请码信息
  const getInviteCode = async (nftToken, nftId) => {
    if (codeList[0]?.code) {
      return codeList;
    }
    try {
      const res = await Api.TaskApi.getInviteCode(nftToken, nftId);
      if (Api.isSuccess(res)) {
        const list = res.data || [];
        const rsList = list.map((v, i) => {
          return { ...v, ...codeList[i] };
        });
        setCodeList(rsList);
        return rsList;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  };

  const handleGenCode = async (info: any) => {
    console.log('info=========>', info);
    setActiveInfo(info);
    setSubmitLoading(true);

    const nftToken = NftInfo.properties.token || '';
    const nftId = NftInfo.properties.token_id || '';
    // 未生成邀请码
    if (info.status === 0) {
      const tempCodeList = await getInviteCode(nftToken, nftId);
      const codeHash = tempCodeList[info.id - 1]?.code_hash;
      try {
        await onGenCodes(nftId, [getCodeHash(codeHash)]);
        setVisible(true);
        setSubmitLoading(false);
      } catch (err) {
        setSubmitLoading(false);
      }
    } else {
      // todo: 获取已生成邀请码的列表
      setTimeout(() => {
        setSubmitLoading(false);
        setVisible(true);
      }, 5000);
    }
  };

  // 获得codeHash值
  const getCodeHash = (codeHash: string) => {
    if (codeHash && codeHash.length === 16)
      return `0x${codeHash}000000000000000000000000000000000000000000000000`;
    else return `0x${codeHash}`;
  };

  // 复制链接
  const onCopyLink = useCallback(() => {
    const copyUrl = `${window.location.origin}/login?code=${activeInfo?.code}`;
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
            {NftInfo.name} #{NftInfo.properties.token_id}
          </Text>
          <ActiveImg
            className='active'
            disableFollow
            src={NftInfo.image}
            scale='ld'
          />
        </NftAvatarBox>
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
                      <Icon name={'icon-complete'} color='primary' size={25} />
                      <Text mt='16px' color='textTips' small>
                        {t('NFT has been collected')}
                      </Text>
                    </ReceivedBox>
                  ) : (
                    <>
                      <Loading visible={submitLoading} />
                      <ActiveImg
                        // className={
                        //   item.id > 1 && codeList[item.id - 1].status <= 1
                        //     ? 'disable'
                        //     : 'active'
                        // }
                        className='active'
                        disableFollow
                        src={require('assets/images/task/monkey.jpg').default}
                        scale='ld'
                        onClick={() => {
                          // if (
                          //   item.id > 1 &&
                          //   codeList[item.id - 1].status <= 1
                          // ) {
                          //   return false;
                          // }
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
