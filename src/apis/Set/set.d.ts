declare namespace Api {

  namespace Set {
    interface likeSetParams {
      color_model?: number,
      msg_remind?: number,
      language?: number,
      translation?: number,
    }
    interface likeSetCallback extends Api.Error {
      data: likeSetParams
    }
    interface referrerMans {
      num: number
    }

  }
}