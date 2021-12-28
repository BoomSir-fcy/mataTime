declare namespace Api {
  namespace Home {
    interface queryListParams {
      per_page: number;
      page: number;
      // topic_id: number,
      attention: number;
    }
    interface createArticle {
      content: string;
      image_urls: string[];
      remind_user: string;
    }
    interface articleFindById {
      id: string;
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
      add_time: '2021-12-06T03:32:03Z';
      add_time_desc: '';
      aid: 0;
      cid: 0;
      comment_num: 0;
      content: '';
      fid: 0;
      id: 0;
      image_list: [];
      image_urls: '[]';
      is_attention: 0;
      is_comment: 0;
      is_fav: 0;
      is_like: 0;
      is_share: 0;
      is_top: 0;
      lid: 0;
      like_num: 0;
      reward_stats: [];
      share_num: 0;
      status: 1;
      top: 0;
      user_address: '0x1da407adfcf72665855db1fe074778cf31a885f4';
      user_avator_url: 'https://api.dsgmetaverse.com/gphoto/gen/96348CE3.png';
      user_id: 560640573;
      user_name: '0x1da407adfcf7266585';
      video_url: '';
      send_name?: string;
      post_id?: 0;
      reward_id?: 0;
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
