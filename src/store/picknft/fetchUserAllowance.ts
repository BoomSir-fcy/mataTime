import dsgnftAbi from 'config/abi/mysteryBox.json';
import erc20ABI from 'config/abi/erc20.json';
import exphotoAbi from 'config/abi/exphoto.json';
import multicall from 'utils/multicall';
import {
  getExPhotoAddress,
  getTicketNftAddress,
  getDsgafAddress,
} from 'utils/addressHelpers';

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
