import { Http } from '../http';
import qs from 'qs';

export class AttentionApi extends Http {
  // 查询用户状态
  async getFollowState(uid: string[] | number[]) {
    const params = qs.stringify({ focus_uid: uid }, { arrayFormat: 'repeat' });
    const res = await this.get(`/v1/attention/consider_focus?${params}`);
    return res;
  }

  // 关注用户
  async onAttentionFocus(focus_uid: number | string) {
    const res = await this.get('/v1/attention/focus', { focus_uid });
    return res;
  }
  // 取消关注用户
  async cancelAttentionFocus(focus_uid: number | string) {
    const res = await this.get('/v1/attention/cancel', { focus_uid });
    return res;
  }
  // 置顶推特(帖子)
  async setTopPost(pid: number) {
    const res = await this.post('/v1/post/set_top', { pid });
    return res;
  }
  // 取消置顶推特(帖子)
  async cancelTopPost(pid: number) {
    const res = await this.post('/v1/post/set_not_top', { pid });
    return res;
  }

  // 添加推特屏蔽
  async addShield(pid: number) {
    const res = await this.post('/v1/post/add_shield', { pid });
    return res;
  }
  // 取消推特屏蔽
  async cancelShield(pid: number) {
    const res = await this.post('/v1/post/cancel_shield', { pid });
    return res;
  }

  // 删除推特(帖子)
  async delPost(pid: number) {
    const res = await this.post('/v1/post/del', { pid });
    return res;
  }

  async delV2Post(pid: number) {
    const res = await this.post('/v2/post/del', { pid });
    return res;
  }

  // 快转列表
  async getForwardList(params: {
    page: number;
    page_size: number;
    pid: number;
  }) {
    const res = await this.get('/v2/forward/fast-forward-list', params);
    return res;
  }

  // 普通转发列表
  async getNormalForwardList(params: {
    page: number;
    page_size: number;
    pid: number | string;
  }) {
    const res = await this.get('/v2/forward/normal-forward-list', params);
    return res;
  }

  // 举报推特(帖子)
  async complainPost(pid: number, content: string) {
    const res = await this.post('/v1/post/add_complain', { pid, content });
    return res;
  }
}
