declare namespace Api {

  namespace Me {

    interface followParams {
      UID: number
      uid?: number
    }
    interface fansParams {
      UID: number
      uid?: number
    }
    interface praiseParams {
      UID: number
      uid?: number
    }
    interface collectParams {
      UID: number
      uid?: number
    }


    interface followCallback extends Api.Error {
      data: followParams
    }
    interface fansCallback extends Api.Error {
      data: followParams
    }
    interface praiseCallback extends Api.Error {
      data: praiseParams
    }
    interface collectCallback extends Api.Error {
      data: collectParams
    }
    interface referrerMans {
      num: number
    }

  }
}