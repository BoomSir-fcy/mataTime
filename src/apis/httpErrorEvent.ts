import { ResponseCode } from './type';
import eventBus from '../utils/eventBus';

const dispatchHttpErrorEvent = (data: Api.Error) => {
  // 余额不足
  if (data?.code === ResponseCode.INSUFFICIENT_BALANCE) {
    eventBus.dispatchEvent(
      new MessageEvent('insufficient', {
        data,
      }),
    );
    return;
  }
  // 余额不足
  if (data?.code === ResponseCode.USER_INSUFFICIENT_BALANCE) {
    eventBus.dispatchEvent(
      new MessageEvent('insufficient', {
        data,
      }),
    );
    return;
  }
  // 任务签到
  if (data?.code === ResponseCode.TASK_SIGN_IN) return;
  // 弹出验证码
  if (data?.code === ResponseCode.ADD_POST_VERIFY) return;
  if (data?.code === ResponseCode.ADD_POST_VERIFY_ERROR) return;
  // 注册查询
  if (data?.code === ResponseCode.SIGININVERIFY) return;
  if (data?.code !== 1) {
    eventBus.dispatchEvent(
      new MessageEvent('httpError', {
        data,
      }),
    );
  }
};

export default dispatchHttpErrorEvent;
