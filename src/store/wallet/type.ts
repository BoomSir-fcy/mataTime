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
}

export interface TimeInfo {
  long_time: number,
  max_dsg_token: number,
  max_time_token: number,
  right_now_release: number,
  times: number,
  total_dsg: number
}