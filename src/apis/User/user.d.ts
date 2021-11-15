declare namespace Api {
  namespace User {
    interface userInfoParams {
      UID: number;
      uid?: number;
      nick_name?: string;
      NickName?: string;
      address?: string;
      display_format?: number;
      introduction?: string;
      location?: string;
      background_image?: string;
      fans_num?: number;
      attention_num?: number;
      email?: string;
      introduction?: string;
      Introduction?: string;
      location?: string;
      Location?: string;
      nft_image?: string;
      label_list?: string[];
    }

    interface updateProfileParams {
      nick_name?: string;
      display_format?: number;
      introduction?: string;
      location?: string;
      background_image?: string;
    }

    interface userInfoCallback extends Api.Error {
      data: userInfoParams;
    }
    interface referrerMans {
      num: number;
    }
  }
}
