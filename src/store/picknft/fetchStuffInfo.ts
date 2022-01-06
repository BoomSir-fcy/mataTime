import exphotoAbi from 'config/abi/exphoto.json';
import invitationAbi from 'config/abi/Invitation.json';
import multicall from 'utils/multicall';
import { getInvitationAddress } from 'utils/addressHelpers';
import stuffRes from 'config/constants/stuffImages';

export const fetchStuffAllInfo = async () => {
  const exPhotoNftAddress = getInvitationAddress();
  try {
    const calls = [];
    stuffRes.forEach((item, index) => {
      calls.push({
        address: exPhotoNftAddress,
        name: 'getLimitSize',
        params: [index],
      });
      calls.push({
        address: exPhotoNftAddress,
        name: 'getCreatedSize',
        params: [index],
      });
    });
    const [...res] = await multicall(invitationAbi, calls);
    const result = {
      limitSizes: [],
      createdSizes: [],
    };
    res.forEach((item, index) => {
      if (index % 2) {
        result.createdSizes.push(item);
      } else {
        result.limitSizes.push(item);
      }
    });
    return result;
  } catch (error) {
    console.error(error);
    return {
      limitSizes: [],
      createdSizes: [],
    };
    // return [index, [], []]
  }
};
