declare namespace Api {
  namespace Account {
    interface DrawbalanceSignMessage {
      network_type: number;
      sign_time: number; // 签名时间
      withdraw_amount: string;
      withdraw_token_address: string;
      withdraw_token_type: number;
      fee_type: number;
      nonce: number; // 随机数
      encode_data: string;
    }
    interface Balance {
      uid: number;
      address: string;
      available_balance: string;
      total_balance: string;
      freeze_balance: string;
      token_type: number;
    }
    interface History {
      page?: number;
      pageSize?: number;
      coin_type?: number;
    }
    interface TimeIncomerecord {
      index?: number; //列表下标page*size
      size?: number; //每页条数
      read_type?: number; //1帖子 2评论
    }
    interface TimeIncometoday {
      days?: number;
    }
  }
}
