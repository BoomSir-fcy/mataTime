declare namespace Api {

  namespace User {

    interface userInfoParams {
      UID?: number
      nick_name: string
      display_format: number
      introduction: string
      location: string
    }    

    interface userInfoCallback extends Api.Error {
      data: userInfoParams
    }

  }
}