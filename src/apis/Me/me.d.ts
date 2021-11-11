declare namespace Api {

  namespace Me {

    // interface followParams {
    //   uid: number,
    //   data: array,
    //   res: object,
    //   nick_name: string,
    // }
    // interface collectParams {
    //   UID: number
    //   uid?: number
    // }
    interface addContentDetail {
      pid: number,
      comment: number,
      comment_id?: number
    }

    // interface followCallback extends Api.Error {
    //   data: followParams
    // }
    // interface fansCallback extends Api.Error {
    //   data: followParams
    // }
    interface praiseCallback extends Api.Error {
      data: praiseParams
    }
    // interface collectCallback extends Api.Error {
    //   data: collectParams
    // }
    interface followUserCallback extends Api.Error {
      data: followUserParams
    }
    interface addContentCallback extends Api.Error {
      data: addContentDetail
    }
    interface referrerMans {
      num: number
    }

  }
}