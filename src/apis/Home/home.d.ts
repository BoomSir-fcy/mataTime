declare namespace Api {

  namespace Home {
    interface queryListParams {
      per_page: number
      page: number
      // topic_id: number,
      attention:number
    }
    interface createArticle {
      content: string
    }
    interface articleFindById {
      id:string
    }
  }
}