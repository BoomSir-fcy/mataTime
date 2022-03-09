import { ChainId } from '../wallet/config';

const contracts = {
  test: {
    [ChainId.BSC_MAINNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
    [ChainId.BSC_TESTNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
  },
  liquidityPool: {
    [ChainId.BSC_MAINNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
    [ChainId.BSC_TESTNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
  },
  MutiRewardPool: {
    [ChainId.BSC_MAINNET]: '0xB88bb1D757E95EC360D2E48689fB82B89d2D3091',
    [ChainId.BSC_TESTNET]: '0x704BAdFD204f3652e1268598a5f2C71c8351472C',
  },
  multiCall: {
    56: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    97: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
  oracle: {
    56: '0xAa8F3F169c3841CDfB70D5687cA5bc6feB7C4560',
    97: '0x6639fdbf6fac3a2814b20632e4496a3941238729',
  },
  nftSocial: {
    56: '0xc4FFAF4a6Fd74BDBB8671060Ef554e715E29a2A6',
    97: '0xB3682775e51094f7EE04A7843F3c40150a235c21',
  },
  TimeShop: {
    56: '0x89690BbC6553c407608D75dCA7C623A5373D3D79',
    97: '0xD381c10DE700B087649C67B92d68b2A647b51f28',
  },
  TimeToken: {
    56: '0xc7184a87D9443A52F6E578E3C0A611468536487f',
    97: '0xd3a03c02e3DFf87a1C42eb33705440471E4F0d63',
  },
  MatterToken: {
    56: '0x6Da59176FBc92f227853E17202B62D79B82f6a40',
    97: '0xAd47428ed49926D5769DaCCdA27C03F1A47cEf91',
  },
  DsgToken: {
    56: '0x9A78649501BbAAC285Ea4187299471B7ad4ABD35',
    97: '0x1cd884c01376F795017ba16b15193D82a1cb4BeD',
  },
  CashierDesk: {
    56: '0xF0058e6d6879Ad183643633BE1d1FfD64f2990E4',
    97: '0x45bd7515B11F1B86F463C2B01b8409e3974D95bC',
  },
  RewardAuthor: {
    56: '0xA6D3C43681b9De5d73bc796611ddE36901F7e71C',
    97: '0x9D42016e60Bb8698aBd54984e0801b42a35F1e3B',
  },
  Wbnb: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    97: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
  },
  Invitation: {
    42: '0xE8A93dbaC1F08cd2fb8A8ef14460149c53Ea1544',
    56: '0xA04E157251042C56D260228267C4f3a721F46033',
    97: '0xB21be63855EdD60b72Fc90D11aCda0429799Cc2C',
  },
  ticketsPhotoNft: {
    56: '0xc791C37bbbb6C4787a85651a3C6DB3967592bA6a',
    97: '0x95B3eF7446Cbe0F2837Bb4Bdcc3A201119fb4A4A',
  },
  ExPhotoNft: {
    56: '0xE5fdBF8Db71eaFbc81a841c0C4A3f74206d10cfD',
    97: '0x4c73eBc280DF709914D444d5A877ACB78f4EA200',
  },
  ExPhoto: {
    56: '0xa7e77ed285d0E59Db7B722b311Bd47feE04c3d01',
    97: '0xd107ceD1a36a3276FB3832231e00BF306762931a',
  },
  dsgaf: {
    56: '0xE3D5FDFBb8DafA41E0222F508a0470d21c115404',
    97: '0x43338D14CbcBa94605d738a6ba5A2AAD253A5E35',
  },
  tribe: {
    56: '',
    97: '0x0c7212e96100ef4B19c57881dFcb7F932C4A13d0',
  },
  tribeNFT: {
    56: '',
    97: '0x5d04f5aefA1CcB442e0cce51d52E2a869a20efBC',
  },
  tribeTicketsNFT: {
    56: '',
    97: '0xA6D6322A0D5c19A16e211cA03B978aCe6D5b70F3',
  },
  facuet: {
    56: '0xa0788548595EBea676499CDd19e9Cca9a9b8F49a',
    97: '0xa0788548595EBea676499CDd19e9Cca9a9b8F49a',
  },
  TribeTickets: {
    56: '',
    97: '0x04813A847B8eF1465145566f9E0e3F48ACaA32E5',
  },
};
export default contracts;
