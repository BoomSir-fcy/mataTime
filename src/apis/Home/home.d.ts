declare namespace Api {
  namespace Home {
    interface queryListParams {
      per_page: number;
      page: number;
      // topic_id: number,
      user_tags1: any;
      user_tags2: any;
      attention: number;
    }
    interface createArticle {
      content: string;
      image_urls: string[];
      remind_user: string;
      id?: string;
      verify?: string;
    }
    interface articleFindById {
      id: string;
    }

    interface PostTranslateParams {
      pids: number[];
      target: string;
      source?: string;
    }
    type queryHotTopic = {
      page: number;
    };

    type queryHotTopicList = {
      page: number;
      topic_name: string;
      per_page: number;
    };

    type findByHotTopicIdList = {
      page: number;
      topic_id?: string | number;
      topic_name?: string | number;
      per_page: number;
    };

    interface post {
      add_time: string;
      add_time_desc: string;
      aid: number;
      cid: number;
      comment_num: number;
      content: string;
      fid: number;
      id: number;
      image_list: [];
      image_urls: string;
      is_attention: number;
      is_comment: number;
      is_fav: number;
      is_like: number;
      is_share: number;
      is_top: number;
      lid: number;
      like_num: number;
      reward_stats: [];
      share_num: number;
      status: 1;
      top: number;
      user_address: string;
      user_avator_url: string;
      user_id: number;
      user_name: string;
      video_url: string;
      send_name?: string;
      post_id?: number;
      reward_id?: number;
      is_forward?: false;
      forward_type: number;
      forward?: forward;
      forward_id?: number;
      forwardUser?: string;
      forwardUid?: number;
    }

    interface forward {
      content?: string;
      post_id?: number;
      user_address?: string;
      user_avator_url?: string;
      user_id?: number;
      user_name?: string;
      add_time?: string;
      is_forward_del?: number;
    }

    interface postData extends Api.Error {
      data: {
        List: post[];
        total_num: number;
        total_page: number;
      };
    }
  }
}
