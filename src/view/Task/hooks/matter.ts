import { useEffect, useRef, useState, useCallback } from 'react'
import { Api } from 'apis';
import BigNumber from 'bignumber.js';
import { taskContents } from './config';
import { fetchTaskListAsync } from 'store/task/reducer';
import { Group } from '../type';
import { useWeb3React } from '@web3-react/core';
import { useImmer } from 'use-immer';
import { useInvitation } from 'hooks/useContract';
import invitationAbi from 'config/abi/Invitation.json';
import { getInvitationAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { getBalanceNumber } from 'utils/formatBalance';

// 注册生成的邀请码
export const useGenCodes = () => {
  const inviteContract = useInvitation();
  const handleGenCodes = useCallback(async (nftId: number | string, codeHashs: string[]) => {
    const tx = await inviteContract.genCodes(nftId, codeHashs)
    const receipt = await tx.wait()
    return receipt.status
  }, [inviteContract])

  return { onGenCodes: handleGenCodes }
}

// 获取邀请的nft基本信息
export const useNftBaseView = () => {
  const [state, setState] = useImmer({
    tokenAddress: [],
    defaultCodeList: []
  });

  useEffect(() => {
    getNftView();
  }, [])

  const getNftView = useCallback(
    async () => {
      const nftInfo = await getView();
      const codeList = [];
      for (let i = 0; i < nftInfo.maxGendCodeCount; i++) {
        codeList.push({ id: i + 1, status: 0 });
      }
      setState(p => {
        p.tokenAddress = nftInfo.nftAddress;
        p.defaultCodeList = codeList;
      })
    },
    [],
  )
  return { tokenAddress: state.tokenAddress, defaultCodeList: state.defaultCodeList };
}

// 提交到合约的个数
export const getNftGenCodeCount = async (nftId: number | string) => {
  const inviteAddress = getInvitationAddress();
  const calls = [
    {
      address: inviteAddress,
      name: 'nftGenCodeCount',
      params: [nftId],
    },
  ];
  try {
    const res = await multicall(invitationAbi, calls);
    return getBalanceNumber(new BigNumber(res[0][0].toJSON().hex), 0);
  } catch (error) {
    throw error;
  }
}

// 提交到合约的个数
// export const getNftsGenCodeCount = async (nftIds: number[] | string[]) => {
//   const inviteAddress = getInvitationAddress();
//   const calls = nftIds.map(nftId => {
//     return {
//       address: inviteAddress,
//       name: 'nftGenCodeCount',
//       params: [nftId],
//     }
//   })
//   try {
//     const [res] = await multicall(invitationAbi, calls);
//     return res[0].toNumber()
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }


// 查询可邀请的nft_token地址
export const getInvitedNftTokenAddress = async () => {
  const inviteAddress = getInvitationAddress();
  const calls = [
    {
      address: inviteAddress,
      name: 'nft',
      params: [],
    },
  ];
  try {
    const tokenAddress = await multicall(invitationAbi, calls);
    return tokenAddress.map(v => v.toString());
  } catch (error) {
    return [];
  }
}

/**
 * 基本信息
 * @returns {
 *  nft_ 可以分发邀请码的NFT地址
 *  userProfile_ 用户合约地址
 *  codeLockDuration_ 邀请码锁定有效时间
 *  maxGendCodeCount_ 一个NFT最多可生成的NFT数量
 *  toToken_ 邀请码生成的NFT合约地址
 * }
 */
export const getView = async () => {
  const inviteAddress = getInvitationAddress();
  const calls = [
    {
      address: inviteAddress,
      name: 'getView',
      params: [],
    },
  ];
  try {
    const info = await multicall(invitationAbi, calls);

    const nftInfo = {
      nftAddress: info[0].nft_?.toLowerCase(),
      userAddress: info[0].userProfile_,
      codeLockDuration: new BigNumber(info[0].codeLockDuration_.toJSON().hex).toNumber(),
      maxGendCodeCount: new BigNumber(info[0].maxGenCodeCount_.toJSON().hex).toNumber(),
      toToken: info[0].toToken_
    };
    return nftInfo;
  } catch (error) {
    throw error;
  }
}

/**
 * 邀请码信息
 * @returns {
 *  lockUser  锁定的用户(如果被锁定的话)
 *  lockedAt  锁定时间, 如果锁定时间 + 邀请码锁定有效时间 > 当前时间 并且邀请码没有被使用的话，其它用户则可以锁定
 *  generator  生成邀请码的用户
 *  state  邀请码现在的状态 1.未使用 2.已使用
 * }
 */
export const getCodeViewList = async (codeHashs: string[]) => {
  const inviteAddress = getInvitationAddress();
  const calls = codeHashs.map(item => {
    return {
      address: inviteAddress,
      name: 'getCodeView',
      params: [item],
    }
  })

  try {
    const infoList = await multicall(invitationAbi, calls);
    console.log(codeHashs, '----------infoList----------', infoList);

    const codeViewList = infoList.map(item => {
      return {
        lockUser: item.lockUser,
        lockedAt: new BigNumber(item.lockedAt.toJSON().hex).toNumber(),
        generator: item.generator,
        status: item.state, // 1-未使用  2-已使用
      }
    })
    return codeViewList;
  } catch (error) {
    throw error;
  }
}

// 获取已生成邀请码的列表
export const getExistCodeList = async (nftToken: string, nftIds: string) => {
  try {
    const res = await Api.TaskApi.getInviteCodeList(nftToken, nftIds);
    if (Api.isSuccess(res)) {
      return res.data || {};
    }
  } catch (err) {
    return {};
  }
};

// 邀请统计
export const useInviteCount = () => {
  const [inviteInfo, setInviteInfo] = useImmer({
    invite_num: 0,
    proportion: '0',
    total_meta: '0',
    total_rebate: '0'
  });

  useEffect(() => {
    getInviteCount();
  }, [])

  const getInviteCount = async () => {
    try {
      const res = await Api.TaskApi.getInviteInfo();
      if (Api.isSuccess(res)) {
        setInviteInfo(p => {
          p.invite_num = res.data?.invite_num || 0;
          p.proportion = `${res.data?.proportion}` || '0';
          p.total_meta = res.data?.total_meta || '0';
          p.total_rebate = res.data?.total_rebate || '0';
        });
      }
    } catch (error) {
      throw new Error('SignIn Error');
    }
  }

  return { inviteInfo };
}

// 获取邀请好友列表
export const useFetchInviteFriendsList = () => {
  const { account } = useWeb3React()
  const [list, setList] = useState([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [total, setTotal] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getList()
  }, [pageNum])
  const getList = () => {
    setLoading(true);
    Api.TaskApi.getInviteList(pageNum, pageSize).then((res: any) => {
      if (Api.isSuccess(res)) {
        const temp = res.data;
        setList(temp?.Users);
        setTotal(temp?.total_size || 1);
        setPageNum(temp?.now_page || 1);
        setPageSize(temp?.page_size || 20);
      }
    }).catch(() => {
      setList([]);
    }).finally(() => {
      setLoading(false);
    })
  }

  return { list, pageNum, pageSize, total, setPageNum, loading }
}


// 领取任务
export const receive = async (dispatch: any, taskId: number) => {
  try {
    const res = await Api.TaskApi.receive(taskId);
    if (res.code === 1) await dispatch(fetchTaskListAsync({ isSignIn: false }))
    return res;
  } catch (error) {
    throw new Error('Receive Error');
  }
}

//倒计时
export const useCountdownTime = (endTime: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(null)
  useEffect(() => {
    const startCountdown = async () => {
      const nowTime = Math.floor(new Date().getTime() / 1000)
      setSecondsRemaining(endTime - nowTime)

      if (endTime > nowTime) {
        if (timer.current) {
          clearInterval(timer.current)
        }
        timer.current = setInterval(() => {
          setSecondsRemaining(endTime - Math.floor(new Date().getTime() / 1000))
        }, 1000)
      }
    }

    startCountdown()

    return () => {
      clearInterval(timer.current)
    }
  }, [setSecondsRemaining, endTime, timer])

  return secondsRemaining
}

// 获取任务名称和任务描述
export const GetTaskName = (taskNameId: number) => {
  return taskContents.filter(v => v.id === taskNameId)[0] || { name: 'Mystery quests', describe: 'Mystery quests', count: 0 };
}


// 获取任务类型
export const GetTaskTag = (taskGroupId: number) => {
  if (taskGroupId === Group.ACTIVITY) return 'activity';
  if (taskGroupId === Group.CREATE) return 'create';
  if (taskGroupId === Group.INVITE) return 'invite';
  if (taskGroupId === Group.REPORT) return 'report';
  return 'activity';
}
