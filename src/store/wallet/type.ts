export interface WalletState {
  ApproveNum: {
    time: number;
    matter: number;
    dsg: number;
  };
  wallet: [
    {
      address: string;
      available_balance: string;
      freeze_balance: string;
      token_type: number;
      total_balance: string;
      uid: number;
    },
  ];
  TimeInfo: TimeInfo[];
  CurrentRound: TimeInfo;
  TimeExchangeList: ExchangeList[];
  activeToken: string;
  spendTimeInfo: {
    burnCoinTody: string;
    averageBurnTime: string;
  };
  rewardNum: number;
  TimeIncomeList: IncomeListInfo;
  TimeIncometoday: IncometodayInfo;
  MatterIncomeList: MatterIncomeListInfo;
  MatterIncometoday: IncometodayInfo;
  WithDrawSetting: {
    meta_minimum: string;
    time_minimum: string;
    bnb_minimum: string;
    withdraw_time_fee: string;
    withdraw_meta_fee: string;
    withdraw_bnb_fee: string;
  };
  TribeTickets: {
    allowance: string;
    price: string;
    max_tickets: string
  };
  WithDrawFeeType: number;
  choiceToken: number;
}
export interface TimeInfo {
  long_time: number;
  max_dsg_token: number;
  max_time_token: number;
  right_now_release: number;
  times: number;
  total_dsg: number;
}
export interface ExchangeList {
  round: number;
  endTime: number;
  latestTime: number;
  totalAmount: number;
  debtAmount: number;
  RemainingAmount: number;
  ReleaseAmount: number;
  totalPage: number;
  page: number;
  id: number;
}

export interface IncomeListInfo {
  index: number;
  record: [];
  size: number;
  total: number;
  creator_percent: number;
}
export interface MatterIncomeListInfo {
  now_page: number;
  matter_history: [];
  page_size: number;
  total_size: number;
}
export interface IncometodayInfo {
  data: [];
  today_income: string;
  total_income: string;
  loadStatus: number;
}
