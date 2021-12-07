import { cloneDeep, throttle } from "lodash";
import { Api } from "apis";

enum MessageProtocol {
  // 报错
  WSProtocol_ERROR = 0,
  // 时间消耗
  WSProtocol_Spend_Time = 1,
  // 系统通知
  WSProtocol_SYSTEM_NOTIFY,
  // 未读通知
  WSProtocol_UNREAD_NOTIFY,
  // 心跳检测
  WSProtocol_HEART_Jump_Jump = 97,
}

enum WSReadyState {
  CONNECTING = 0,
  OPEN,
  CLOSING,
  CLOSED,
}

interface SendMessageData {
  ptl: MessageProtocol,
  nonce: number,
  data?: unknown
}

interface ResponseMessageData {
  code: number
  data: unknown
  msg: string
  nonce: number
}

type EventType = 'message' | 'close' | 'error' | 'open'

type Handle<T> = (event: T) => void
interface HandleEvent<T> {
  handle: Handle<T>
  event: EventType
}

export class IM extends EventTarget {
  connection: WebSocket;
  interval: any;
  url: string = `ws://192.168.101.122:8888/v1/ws`;
  // url: string = `${process.env.React_APP_WS_URL}/v1/ws`;
  token: string;
  userToken: string;

  expires: number;
  pingIntervalSeconds = 10_000; // 心跳连接时间
  loading = false;

  waitMessageList: SendMessageData[] = [];
  handleEvents: HandleEvent<unknown>[] = [];
  endConnect: boolean = false; // 是否结束链接
  nonce = 0; // Nonce, 类似消息ID

  private suspendTpl: MessageProtocol[] = []; // 暂停的交互(不向后端发送此tpl的消息)

  addSuspendTpl(...arg: MessageProtocol[]) {
    this.suspendTpl = this.suspendTpl.concat(arg)
  }
  removeSuspendTpl(...arg: MessageProtocol[]) {
    this.suspendTpl = this.suspendTpl.filter(item => !arg.includes(item))
  }

  // 消息协议
  static MessageProtocol = MessageProtocol
  messageProtocol = MessageProtocol // 方便在子组件调用

  constructor(userToken: string) {
    super();
    // this.url = prop.url;
    this.userToken = userToken;
    this.init()
  }

  async init() {
    this.endConnect = false;
    this.loading = true
    await this.initWebSocket();
  }

  // 关闭socket
  close(endConnect?: boolean) {
    if (this.connection) {
      this.connection.close();
      this.endConnect = endConnect;
    }
  }

  /**
   * 
   * @param ptl 发送协议
   * @param data 发送数据
   * @param needWait 是否需要在重连后重新发送
   */
  send(ptl: MessageProtocol, data?: unknown, needWait?: boolean) {
    if (this.suspendTpl.includes(ptl)) return;
    const { readyState } = this.connection || {};
    this.nonce += 1
    const sendData = {
      ptl,
      data,
      nonce: this.nonce,
    }
    if (readyState === WSReadyState.OPEN) {
      this.connection.send(JSON.stringify(sendData))
      return
    }
    // 添加到等待发送队列
    if (needWait) {
      this.waitMessageList.push(cloneDeep(sendData))
    }
  }

  sendHeart() {
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      const { readyState } = this.connection;
      if (readyState === WSReadyState.OPEN) {
        this.send(IM.MessageProtocol.WSProtocol_HEART_Jump_Jump)
      }
    }, this.pingIntervalSeconds);
  }

  async getToken() {
    const { token, expires } = await Api.CommonApi.getWsUrl()
    this.token = token
    this.expires = expires
    return token
  }

  /**
   * @dev 绑定事件
   * @deprecated 废弃 建议直接使用 addEventListener
   * @param event 事件名
   * @param handle 事件句柄
   */
  on(event: EventType, handle: Handle<unknown>) {
    this.addEventListener(event, handle)
    this.handleEvents.push({
      event,
      handle,
    })
  }

  /**
   * @dev 移除事件绑定
   * @deprecated 废弃 建议直接使用 removeEventListener
   * @param event 事件名
   * @param handle 事件句柄
   */
  remove(event: EventType, handle: Handle<unknown>) {
    this.removeEventListener(event, handle)
    this.handleEvents.push({
      event,
      handle,
    })
  }

  // 重新绑定事件
  // reBindEvents() {
  //   this.handleEvents.forEach(({ event, handle }) => {
  //     this.addEventListener(event, handle)
  //   })
  // }

  private onopenHandle(event: Event) {
    this.loading = false
    this.dispatchEvent(new Event('open', event))
    this.waitMessageList.forEach(item => {
      this.send(item.ptl, item.data, true)
    })
  }

  // TODO: 
  private parseMessage(event: MessageEvent) {
    const data = JSON.parse(event.data)
    switch (data.code) {
      case IM.MessageProtocol.WSProtocol_SYSTEM_NOTIFY:
        this.dispatchEvent(new MessageEvent('systemMsg', {
          data,
        }))
        break;
      case IM.MessageProtocol.WSProtocol_Spend_Time:
        this.dispatchEvent(new MessageEvent('spendTime', {
          data
        }))
        break;
      case IM.MessageProtocol.WSProtocol_UNREAD_NOTIFY:
        this.dispatchEvent(new MessageEvent('unreadNotify', {
          data
        }))
        break;
      case IM.MessageProtocol.WSProtocol_HEART_Jump_Jump:
        // 心跳检测 不做处理
        break;
      case IM.MessageProtocol.WSProtocol_UNREAD_NOTIFY:
        // TODO: Error
        // this.addSuspendTpl()
        break;
      default:
        console.debug('unread ws code: ', data)
        break
    }
  }

  private onmessageHandle(event: MessageEvent) {
    this.dispatchEvent(new MessageEvent('message', {
      data: event.data,
      origin: event.origin,
      lastEventId: event.lastEventId,
      source: event.source,
    }))
    this.waitMessageList = this.waitMessageList.filter(item => item.nonce !== event.data.nonce)
    this.parseMessage(event)

  }

  private onerrorHandle(event: Event) {
    this.dispatchEvent(new Event('error', event))
  }

  private oncloseHandle(event: CloseEvent) {
    if ((event.target as IM)?.connection !== this.connection) return
    this.dispatchEvent(new CloseEvent('close', event))

    // this.connection.removeEventListener('open', this.onopenHandleBind);

    // this.connection.removeEventListener('message', this.onmessageHandle);

    // this.connection.removeEventListener('error', this.onerrorHandle);

    // this.connection.removeEventListener('close', this.oncloseHandleBind);

    if (this.endConnect || this.loading) return
    this.init()
  }

  private oncloseHandleBind = this.oncloseHandle.bind(this)

  // 初始化socket
  private async initWebSocket() {
    const start = async () => {
      const token = await this.getToken()
      if (this.connection) {
        delete this.connection
      }
      this.connection = new WebSocket(`${this.url}/${token}`);

      this.connection.addEventListener('open', this.onopenHandle.bind(this));

      this.connection.addEventListener('message', this.onmessageHandle.bind(this));

      this.connection.addEventListener('error', this.onerrorHandle.bind(this));

      this.connection.addEventListener('close', this.oncloseHandleBind.bind(this));

      // 发送心跳包，如果断开了，重连
      this.sendHeart()
    };

    start();
  }
}
