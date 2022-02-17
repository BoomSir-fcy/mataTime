import { ethers } from 'ethers';
import abi from 'ethereumjs-abi';
import { toBuffer } from 'ethereumjs-util';
import useBiconomyWeb3React from 'hooks/useBiconomy';
import { useBiconomyInvitation } from 'hooks/useContract';

export const useBiconomyInvitationExcute = () => {
  const { library, account, chainId } = useBiconomyWeb3React();
  const contract = useBiconomyInvitation();

  const executeMetaTransaction = async (methodName: string, params: any[]) => {
    let nonce = await contract.getNonce(account); //BigNumber
    let functionSignature = contract.interface.encodeFunctionData(
      methodName,
      params,
    );
    let messageToSign = constructMetaTransactionMessage(
      nonce.toNumber(),
      chainId,
      functionSignature,
      contract.address,
    );
    const walletSigner = library.getSigner(account);
    const signature = await walletSigner.signMessage(messageToSign);
    let { r, s, v } = getSignatureParameters(signature);
    let tx = await contract.executeMetaTransaction(
      account,
      functionSignature,
      r,
      s,
      v,
    );
    const res = await tx.wait();
    return res;
  };
  return { executeMetaTransaction };
};

/**helpers**/

const getSignatureParameters = signature => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.'),
    );
  }
  let r = signature.slice(0, 66);
  let s = '0x'.concat(signature.slice(66, 130));
  let v: string | number = '0x'.concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toNumber();
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: ethers.BigNumber.from(v).toHexString(),
  };
};

const constructMetaTransactionMessage = (
  nonce,
  salt,
  functionSignature,
  contractAddress,
) => {
  return abi.soliditySHA3(
    ['uint256', 'address', 'uint256', 'bytes'],
    [nonce, contractAddress, salt, toBuffer(functionSignature)],
  );
};
