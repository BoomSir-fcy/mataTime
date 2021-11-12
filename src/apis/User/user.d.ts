declare namespace Api {
  namespace User {
    interface userInfoParams {
      UID: number;
      uid?: number;
      nick_name: string;
      display_format?: number;
      introduction?: string;
      location?: string;
      background_image?: string;
      fans_num?: number;
      attention_num?: number;
      email?: string;
      Introduction?: string;
      location?: string;
      NftImage?: string;
    }

    interface userInfoCallback extends Api.Error {
      data: userInfoParams;
    }
    interface referrerMans {
      num: number;
    }
  }
}
