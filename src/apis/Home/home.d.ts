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
      image_urls: string[]
    }
    interface articleFindById {
      id:string
    }
    type queryHotTopic={
      page:number
    }
  }
}