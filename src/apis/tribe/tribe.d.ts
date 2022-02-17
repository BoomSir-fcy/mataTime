declare namespace Api {
  namespace Tribe {
    interface TribePost {
      id: 0;
      content: '';
      add_time: '2021-12-06T03:32:03Z';
      add_time_desc: '';
      aid: 0;
      cid: 0;
      comment_num: 0;
      fid: 0;
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
      total_receive_time?: '';
      topics: [];
      tribe_name?: '';
      title?: '';
      selected?: 0;
    }
    interface tribeListParams {
      page?: number;
      psge_size?: number;
      tab?: number;
    }
    interface tribeInfoParams {
      tribe_id: number;
    }
    interface tribePostListParams {
      newest_sort?: number;
      hot_sort?: number;
      page?: number;
      per_page?: number;
      top?: number;
      tribe_id?: number;
      selected?: number;
      topic_id?: number;
    }
    interface tribePostInfoParams {
      id: number;
    }

    interface PostCreatepParams {
      content: string;
      topic?: number[];
      tribe_id: number;
      title: string;
    }

    interface TopicInfo {
      ID: number;
      TribeID: number;
      Topic: string;
      CreateTime: number;
      Status: number;
    }

    interface TopicCreateParams {
      tribe_id: number;
      topics: string[];
    }

    interface TopicDelParams {
      tribe_id: number;
      topics: string[];
    }

    interface TopicListParams {
      tribe_id: number;
    }

    interface TopicParamsForId {
      tribe_id: number
    }


    interface PostDraftInfo {
      title: string;
      topics: number[];
      content: string;
    }
  }
}
