export interface WalletState {
  ApproveNum: {
    time: number
    matter: number
    dsg: number
  }
  wallet: [{
    address: string,
    available_balance: string,
    freeze_balance: string,
    token_type: number,
    total_balance: string
    uid: number,
  }]
  TimeInfo: TimeInfo[]
  CurrentRound: TimeInfo
  TimeExchangeList: ExchangeList[]
  activeToken: string
  spendTimeInfo: {
    burnCoinTody: number,
    averageBurnTime: number,
  }
  rewardNum: number,
  TimeIncomeList: IncomeListInfo,
  TimeIncometoday: IncometodayInfo
}
export interface TimeInfo {
  long_time: number,
  max_dsg_token: number,
  max_time_token: number,
  right_now_release: number,
  times: number,
  total_dsg: number
}
export interface ExchangeList {
  round: number,
  endTime: number,
  latestTime: number,
  totalAmount: number,
  debtAmount: number,
  RemainingAmount: number,
  ReleaseAmount: number,
  totalPage: number,
  page: number
  id: number
}

export interface IncomeListInfo {
  index: number
  record: []
  size: number
  total: number
}

export interface IncometodayInfo {
  data: []
  today_income: string
  total_income: string
}