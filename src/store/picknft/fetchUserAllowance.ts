import dsgnftAbi from 'config/abi/mysteryBox.json';
import erc20ABI from 'config/abi/erc20.json';
import exphotoAbi from 'config/abi/exphoto.json';
import invitationAbi from 'config/abi/Invitation.json';
import multicall from 'utils/multicall';
import {
  getExPhotoAddress,
  getTicketNftAddress,
  getDsgafAddress,
  getInvitationAddress,
} from 'utils/addressHelpers';
import { InviteCodes } from 'store/types';

// 查询code是否被使用
export const fetchCodeUsed = async code => {
  const InvitationAddress = getInvitationAddress();
  try {
    const calls = [
      {
        address: InvitationAddress,
        name: 'codeInfo',
        params: [code],
      },
    ];
    const [codeInfo] = await multicall(invitationAbi, calls);
    return codeInfo[0];
  } catch (error) {
    return [];
  }
};

export const fetchCodeInfo = async (codes: InviteCodes) => {
  const exPhotoNftAddress = getInvitationAddress();
  try {
    const calls = [
      {
        address: exPhotoNftAddress,
        name: 'getCodeView',
        params: [`0x${codes.code_hash}`],
      },
      {
        address: exPhotoNftAddress,
        name: 'getCodeView',
        params: [`0x${codes.lock_hash}`],
      },
    ];

    const [hashRes, Lockres] = await multicall(invitationAbi, calls);
    console.log(hashRes, Lockres, 'as', Lockres.lockedAt.toNumber() * 1000);
    return {
      generator: hashRes.generator,
      lockUser: Lockres.lockUser,
      state: hashRes.state,
      lockedAt: Lockres.lockedAt.toNumber() * 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      generator: '0x0000000000000000000000000000000000000000',
      lockUser: '0x0000000000000000000000000000000000000000',
      state: 0,
      lockedAt: 0,
    };
    // return [index, [], []]
  }
};

export const fetchNftApproval = async account => {
  const exPhotoNftAddress = getTicketNftAddress();
  const exPhotoAddress = getExPhotoAddress();
  try {
    const calls = [
      {
        address: exPhotoNftAddress,
        name: 'isApprovedForAll',
        params: [account, exPhotoAddress],
      },
    ];
    const [isApprove] = await multicall(dsgnftAbi, calls);
    return isApprove[0];
  } catch (error) {
    return [];
  }
};

export const fetchTicketAllowance = async account => {
  const exPhotoNftAddress = getDsgafAddress();
  const exPhotoAddress = getExPhotoAddress();
  try {
    const calls = [
      {
        address: exPhotoNftAddress,
        name: 'allowance',
        params: [account, exPhotoAddress],
      },
    ];
    const [allowance] = await multicall(erc20ABI, calls);
    return allowance[0].toJSON().hex;
  } catch (error) {
    return [];
  }
};

export const fetchTicketPrice = async () => {
  try {
    const calls = [
      {
        address: getExPhotoAddress(),
        name: 'm_price',
      },
      {
        address: getExPhotoAddress(),
        name: 'getView',
      },
    ];
    const [price, views] = await multicall(exphotoAbi, calls);
    return {
      ticketPrice: price[0].toJSON().hex,
      count: views.count.toJSON().hex,
      limit: views.limit.toJSON().hex,
    };
  } catch (error) {
    console.error(error);
    return {
      ticketPrice: '0',
      count: '0',
      limit: '0',
    };
  }
};
