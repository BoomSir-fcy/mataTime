import { ChainId } from "../wallet/config"

export default {
  test: {
    [ChainId.BSC_MAINNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
    [ChainId.BSC_TESTNET]: '0x675e77aeb7F50CAbCE65B9d7114aeB402557679f',
  },
  multiCall: {
    56: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    97: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  },
  nftSocial: {
    56: '0x9A7f63653918dc0667Fc6487715733C489808D34',
    97: '0x9A7f63653918dc0667Fc6487715733C489808D34',
  }
}
