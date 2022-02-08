// Extra Dependencies
import { ethers } from 'ethers'
import abi from "ethereumjs-abi";
import {toBuffer} from "ethereumjs-util";
import { useCallback } from 'react';
import { useInvitation, useBiconomyInvitation } from 'hooks/useContract';
import {
  exchangeToPhtot,
  lockInviteCode,
  exchangeAndBuyToPhtot,
} from 'utils/myCalls';
import isZero from 'utils/isZero';
import useBiconomyWeb3React from 'hooks/useBiconomy';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import InvitationAbi from 'config/abi/Invitation.json';
import { signMessage } from 'utils/web3React';

let walletProvider, walletSigner;


export const useTestHandle = () => {
  const { library, account, chainId } = useBiconomyWeb3React();
  const contract = useBiconomyInvitation();
  const handle = async (code: string) => {
    let contractInterface = new ethers.utils.Interface(InvitationAbi);
    /*
      This provider is linked to your wallet.
      If needed, substitute your wallet solution in place of window.ethereum 
    */
    // walletProvider = new ethers.providers.Web3Provider(window.ethereum);
    walletSigner = library.getSigner(account);
  
    let nonce = await contract.getNonce(account); //BigNumber
    console.log(nonce, contractInterface.encodeFunctionData, code)
    let functionSignature = contractInterface.encodeFunctionData("lockCode", [`0x${code}`]);
    console.log(nonce.toNumber(), chainId, functionSignature, contract.address, account, 'functionSignature')
  
    let messageToSign = constructMetaTransactionMessage(nonce.toNumber(), chainId, functionSignature, contract.address);             
    const signature = await walletSigner.signMessage(messageToSign);
    // const signature = await signMessage(library, account, messageToSign);
    let { r, s, v } = getSignatureParameters(signature);
    // sendTransaction(library, contract, account, functionSignature, r, s, v);    
    let tx = await contract.executeMetaTransaction(account,
      functionSignature, r, s, v);
    
      console.log(tx)
    await tx.wait();
  }
  return { handle }
}

export const useTestHandleEip721 = () => {
  const { library, account, chainId } = useBiconomyWeb3React();

  const userAddress = account?.toLowerCase();

  const contract = useBiconomyInvitation();
  let contractInterface = new ethers.utils.Interface(InvitationAbi);
  
  // Initialize Constants
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];
  const metaTransactionType = [
    { name: "nonce", type: "uint256" },
    { name: "from", type: "address" },
    { name: "functionSignature", type: "bytes" }
  ];
  let domainData = {
    name: "TestContract",
    version: "1",
    verifyingContract: contract.address,
    salt: ethers.utils.hexZeroPad((ethers.BigNumber.from(chainId)).toHexString(), 32)
  };

  const handle = async (code: string) => {
    /*
      This provider is linked to your wallet.
      If needed, substitute your wallet solution in place of window.ethereum 
    */
    // walletProvider = new ethers.providers.Web3Provider(window.ethereum);
    walletSigner = library.getSigner(userAddress);
  
    let nonce = await contract.getNonce(userAddress); //BigNumber
    console.log(nonce, contractInterface.encodeFunctionData, code)
    let functionSignature = contractInterface.encodeFunctionData("lockCode", [`0x${code}`]);
    // let functionSignature = contract.lockCode(`0x${code}`).encodeABI();

    let message = {
      nonce: parseInt(nonce),
      from: userAddress,
      functionSignature
    };

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });

    let signature = await library.send("eth_signTypedData_v3", [userAddress, dataToSign])

    // let messageToSign = constructMetaTransactionMessage(nonce.toNumber(), chainId, functionSignature, contract.address);             
    // const signature = await walletSigner.signMessage(messageToSign);
    // const signature = await signMessage(library, userAddress, messageToSign);
    let { r, s, v } = getSignatureParameters(signature);
    sendTransaction(library, contract, userAddress, functionSignature, r, s, v);    
    let tx = await contract.executeMetaTransaction(userAddress,
      functionSignature, r, s, v);
    
    //   console.log(tx)
    await tx.wait(1);
  }
  return { handle }
}


//////////
/**helpers**/

const getSignatureParameters = signature => {
        if (!ethers.utils.isHexString(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.')
            );
        }
        let r = signature.slice(0, 66);
        let s = "0x".concat(signature.slice(66, 130));
        let v: string|number = "0x".concat(signature.slice(130, 132));
        v = ethers.BigNumber.from(v).toNumber();
        console.log(v, '=')
        if (![27, 28].includes(v)) v += 27;
        return {
            r: r,
            s: s,
            v: ethers.BigNumber.from(v).toHexString()
        };
    };             
    
const constructMetaTransactionMessage = (nonce, salt, functionSignature, contractAddress) => {
        return abi.soliditySHA3(
            ["uint256","address","uint256","bytes"],
            [nonce, contractAddress, salt, toBuffer(functionSignature)]
        );
      }

const sendTransaction = async (ethersProvider, contract, userAddress, functionData, r, s, v) => {
        if (ethersProvider && contract) {
            try {
                fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
                    method: "POST",
                    headers: {
                      "x-api-key" : 'WNdB8aO10.433bd892-b501-46d1-a678-fd5e7f7acb99',
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                      "to": contract.address,
                      "apiId": '7459fdd0-2847-4b14-9884-2853ea231a2b',
                      "params": [functionData, r, s, v],
                      "from": userAddress
                    })
                  })
                  .then(response=>response.json())
                  .then(async function(result) {
                    console.log(result);
                    // showInfoMessage(`Transaction sent by relayer with hash ${result.txHash}`);
                    let receipt = await ethersProvider.waitForTransaction(
                        result.txHash
                      );
                      console.log(receipt);
                    // setTransactionHash(receipt.transactionHash);
                    // showSuccessMessage("Transaction confirmed on chain");
                    // getQuoteFromNetwork();
                  }).catch(function(error) {
                      console.log(error)
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };



