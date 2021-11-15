declare namespace Api {
  namespace SignIn {
    enum LoginNetwork {
      BSC = 1,
      MATIC = 2
    }

    enum OperationType {
      REGISTER = 1,
      LOGIN = 2
    }

    interface LoginSignMessage {
      network: LoginNetwork;
      sign_time: number; // 签名时间
      operation_type: OperationType;
      nonce: number; // 随机数
      encode_data: string;
    }
    interface nftInfoParams {
      token: string;
      token_id: string;
      image: string;
    }
    interface nftList {
      data: nftInfoParams[]
    }
    interface nftParams {
      nftID: number;
      nftUrl: string;
    }

    interface nftCallback extends Api.Error {
      data: nftParams;
    }
  }
}
