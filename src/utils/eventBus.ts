import { ResponseCode } from "apis/type";

type eventType = 'http' | 'message' | 'httpError'

// declare namespace EventBus {
//   interface EventTarget extends EventTarget {
//     addEventListener: (event: eventType) => void
//   }
// }

class EventBus extends EventTarget {
  constructor() {
    super()
    this.init()
  }

  name = 'EventBus';

  private init() {
    this.addEventListener('http', (event) => {
      console.log((event as MessageEvent).data?.code, '=event')
      console.log((event as MessageEvent).data?.code === ResponseCode.INSUFFICIENT_BALANCE, '=event')
      // 余额不足
      if ((event as MessageEvent).data?.code === ResponseCode.INSUFFICIENT_BALANCE) {
        console.log(12222222222222222222222222222222)
        this.dispatchEvent(new Event('insufficient'))
      }
    });
    this.addEventListener('message', (event) => {
      // TOKEN 过期
      if ((event as MessageEvent).data?.status === ResponseCode.UNAUTHORIZED) {
        this.dispatchEvent(new Event('unauthorized'))
      }
      // console.log(error, 'httpError')
      // switch (error.data?.status) {
      //   case 4001:

      // }
    });
  }
}

const eventBus = new EventBus()

eventBus.addEventListener('insufficient', (res) => {
  console.log('insufficient', res)
})

export default eventBus
