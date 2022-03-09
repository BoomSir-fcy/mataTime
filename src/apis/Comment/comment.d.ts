declare namespace Api {
  namespace Comment {
    interface queryList {
      pid: string | number;
      prepage: number;
      page: number;
      // ,1:时间从近到远,2:时间从远到近,默认1
      sort_add_time: number;
      // 1:多到少2:少到多,默认1
      sort_like: number;
      first_comment_id?: number;
      comment_id?: string;
      tribe_id?: number
    }
    type likeParams = {
      post_id: string | number;
      tribe_id?: string | number;
    };
    type createComment = {
      comment_id?: string;
      remind_user: string;
      pid: number;
      comment: string;
      first_comment_id?: string | number;
    };
    type commentLike = {
      comment_id: string;
    };
  }
}
