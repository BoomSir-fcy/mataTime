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
  const handleGenCodes = useCallback(async (nftId: number|string, codeHashs: string[]) => {
    console.log(inviteContract, 'inviteContract')
    const tx = await inviteContract.genCodes(nftId, codeHashs)
    const receipt = await tx.wait()
    console.log(receipt);
    
    return receipt.status
  }, [inviteContract])

  return { onGenCodes: handleGenCodes }
}


// 生成邀请码的个数
export const getNftGenCodeCount = async (nftId: number) => {
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
