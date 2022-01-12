import { Http } from '../http';

export class TaskApi extends Http {
  // 领取任务奖励
  async receive(task_id: number) {
    const res = await this.post('/v1/task/receive', { task_id });
    return res;
  }
  // 签到
  async SignIn() {
    const res = await this.post('/v1/task/sign');
    return res;
  }
  // 用户任务列表
  async getTaskStatus() {
    const res = await this.get('/v1/task/status');
    return res;
  }
  // 邀请好友列表
  async getInviteList(index: number, size: number) {
    const res = await this.get('/v1/user/invite-list', { index, size });
    return res;
  }
  // 邀请详情
  async getInviteInfo() {
    const res = await this.get('/v1/wallet/inviteinfo');
    return res;
  }
  
  // 生成邀请码
  async getInviteCode(nft_token: string, nft_id: string) {
    const res = await this.get('/v1/user/invite-code', { nft_token, nft_id });
    return res;
  }

  // 已生成的邀请码列表
  async getInviteCodeList(nft_token: string, nft_id: string) {
    const res = await this.get('/v1/user/invite-detail', { nft_token, nft_id });
    return res;
  }
  
  // 邀请排行榜
  async getRankingList(page: number, pageSize: number) {
    const res = await this.get('/v1/task/invite-leaderboard', { page, pageSize });
    return res;
  }
}
