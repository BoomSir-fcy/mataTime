declare namespace Api {
  namespace User {
    interface userInfoParams {
      uid: number;
      address?: string;
      nick_name: string;
      display_format: number;
      introduction: string;
      location: string;
      nft_image: string;
      nft_id: string;
      background_image: string;
      email: string;
      status: number;
      color_model: number;
      msg_remind: number;
      language: number;
      translation: number;
      last_signin_time: number;
      attention_num: number;
      fans_num: number;
      add_time: string;
      update_time: string;
      is_attention: number;
      address: string;
      label_list?: string[];
      post_num?: number;
    }

    interface updateProfileParams {
      nick_name?: string;
      display_format?: number;
      introduction?: string;
      location?: string;
      background_image?: string;
      default_location?: number;
    }

    interface userInfoCallback extends Api.Error {
      data: userInfoParams;
    }
    interface referrerMans {
      num: number;
    }
  }
}
