declare namespace Api {
  namespace Tribe {
    interface tribeFileDeleteParams {
      id: number;
      tribe_id: number;
    }
    interface tribeFileListParams {
      page?: number;
      page_size?: number;
      tribe_id?: number;
    }
    interface tribeMemberListParams {
      page?: number;
      page_size?: number;
      tribe_id?: number;
      keyword?: string;
    }
    interface PostSetTopParams {
      pid: number;
    }
    interface PostMuteParams {
      uid: number;
      tribe_id: number;
    }
    interface tribeListParams {
      page?: number;
      page_size?: number;
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

    interface PaginateParams {
      page?: number;
      page_size?: number;
    }
    interface MyTribeListParams extends PaginateParams {
      name?: string;
    }
    interface MyJoinedTribeListParams extends PaginateParams {
      type?: number;
      name?: string;
    }

    interface PostCreatepParams {
      content: string;
      tribe_id: number;
      title: string;
      topic?: number[];
      remind_user?: string;
      image_urls?: string;
      id?: string;
      verify?: string;
    }

    interface TopicInfo {
      id: number;
      tribe_id: number;
      topic: string;
      create_time: number;
      status: number;
    }

    interface TopicCreateParams {
      tribe_id: number;
      topics: string[];
    }

    interface TopicSearchByNameParams {
      page: number;
      page_size: number;
      keyword: string;
    }

    interface TopicDelParams {
      tribe_id: number;
      ids: number[];
    }

    interface TopicParamsForId {
      tribe_id: number;
    }

    interface TopicSearchUserParams {
      name: string;
      tribe_id: number;
    }

    interface TopicListParams {
      tribe_id: number;
    }

    interface PostDraftInfo {
      title: string;
      topics: number[];
      content: string;
    }

    interface PostDataInfo {
      id: number;
      content: string;
      user_name: string;
      user_id: number;
      user_avator_url: string;
      user_address: string;
      comment_num: number;
      share_num: number;
      like_num: number;
      image_urls: string;
      video_url: string;
      cid: number;
      lid: number;
      aid: number;
      fid: number;
      status: number;
      is_share: number;
      top: number;
      add_time: string;
      add_time_desc: string;
      image_list: string[];
      is_comment: number;
      is_like: number;
      is_attention: number;
      is_mute: number;
      is_fav: number;
      is_top: number;
      reward_stats: null;
      total_receive_time: string;
      topics: string[];
      tribe_name: string;
      title: string;
      selected: number;
      tribe_id: number;
      tribe_top: number;
    }

    interface TribeFileCreateParams {
      tribe_id: number;
      url: string;
      file_name: string;
    }

    interface FileListParams {
      page?: number;
      page_size?: number;
      tribe_id: number;
    }

    interface FileInfo {
      id: number;
      tribe_id: number;
      file_name: string;
      url: string;
    }
  }
}
