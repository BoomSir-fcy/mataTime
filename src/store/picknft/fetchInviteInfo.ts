import exphotoAbi from 'config/abi/exphoto.json';
import invitationAbi from 'config/abi/Invitation.json';
import multicall from 'utils/multicall';
import { getInvitationAddress } from 'utils/addressHelpers';
import stuffRes from 'config/constants/stuffImages';

export const fetchInviteInfo = async () => {
  const exPhotoNftAddress = getInvitationAddress();
  try {
    const calls = [
      {
        address: exPhotoNftAddress,
        name: 'getView',
      },
    ];

    const [res] = await multicall(invitationAbi, calls);
    return {
      // 基本信息
      // nft_ 可以分发邀请码的NFT地址
      // userProfile_ 用户合约地址
      // codeLockDuration_ 邀请码锁定有效时间
      // maxGendCodeCount_ 一个NFT最多可生成的NFT数量
      // toToken_ 邀请码生成的NFT合约地址
      nft_: res.nft_,
      userProfile_: res.userProfile_,
      codeLockDuration_: res.codeLockDuration_.toNumber() * 1000,
      maxGendCodeCount_: res.maxGenCodeCount_.toNumber(),
      toToken_: res.toToken_,
    };
  } catch (error) {
    return {
      nft_: '',
      userProfile_: '',
      codeLockDuration_: 0,
      maxGendCodeCount_: 0,
      toToken_: '',
    };
    // return [index, [], []]
  }
};

export const fetchMetaycInfo = async () => {
  const exPhotoNftAddress = getInvitationAddress();
  try {
    const calls = [
      {
        address: exPhotoNftAddress,
        name: 'min_nft_value',
      },
      {
        address: exPhotoNftAddress,
        name: 'switch_buy_nft',
      },
      {
        address: exPhotoNftAddress,
        name: 'getCreatedLimit',
      },
    ];

    const [value, switch_buy, createdLimit] = await multicall(invitationAbi, calls);
    return {
      // 基本信息
      enableBuy: switch_buy[0],
      price: value[0].toJSON().hex,
      count: createdLimit.buy_count.toNumber(),
      limit: createdLimit.buy_max.toNumber(),
    };
  } catch (error) {
    console.error(error)
    return {
      // 基本信息
      enableBuy: false,
      price: '0',
      count: 0,
      limit: 0,
    };
  }
};
