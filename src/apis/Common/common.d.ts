declare namespace Api {

  namespace Common {
    type uploadImg = {
      base64:string[]
      dir_name:string // post:发帖 common:公共 commen:评论
    }

    interface UploadFile {
      file: unknown;
      dir_name: string
      ext: string
    }

    interface WebSocketToken {
      expires: number // 过期时间
      token: string
    }
  }
}