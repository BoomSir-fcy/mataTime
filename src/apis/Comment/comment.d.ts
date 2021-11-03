declare namespace Api {

  namespace Comment {
    interface queryList {
      per_page: number
      page: number
      // topic_id: number,
      attention:number
    }
    type likeParams = {
      post_id:string|number
    }
  }
}