export class IM {
  connection: WebSocket;
  conectInterval: any;
  interval: any;
  url: string;
  token: string;

  constructor(prop) {
    this.url = prop.url;
    this.token = prop.token;
  }

  async init() {
    console.log('soket init coming');
    await this.initWebSocket();
  }

  // 关闭socket
  close() {
    if (this.connection) {
      this.connection.close();
    }
  }

  // 初始化socket
  private async initWebSocket() {
    const start = async () => {
      this.connection = new WebSocket(`${this.url}?token=${this.token}`);
      this.connection.onopen = () => {
        console.log('onOpen');
      };

      this.connection.onmessage = (event: MessageEvent) => {
        console.log(event.data);
      };

      // 发送心跳包，如果断开了，重连
      this.interval = setInterval(() => {
        const { readyState } = this.connection;
        console.log(readyState);
        if (readyState === 1) {
          this.connection.send('heart');
        }
        if (!this.connection || readyState === 3 || readyState === 2) {
          console.log('发送心跳包失败，重新连接中');
        }
      }, 30 * 1000);
    };

    start();

    this.connection.onerror = () => {
      this.conectInterval = setInterval(() => {
        console.log('onerror，重新连接中');
        start();
      }, 5 * 1000);
    };

    this.connection.onclose = () => {
      console.log('onClose，重新连接中');
    };
  }
}
