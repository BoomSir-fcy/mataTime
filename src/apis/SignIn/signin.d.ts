declare namespace Api {

  namespace SignIn {

    enum LoginNetwork {
      BSC = 1,
      MATIC = 2,
    }
    
    enum OperationType {
      LOGIN = 1,
      REGISTER = 2,
    }

    interface LoginSignMessage {
      network: LoginNetwork,
      sign_time: number, // 签名时间
      operation_type: OperationType,
      nonce: number, // 随机数
      encode_data: string
    }    

  }
}