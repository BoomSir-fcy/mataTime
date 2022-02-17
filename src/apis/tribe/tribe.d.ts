declare namespace Api {
  namespace Tribe {
    interface tribeListParams {
      page?: number;
      psge_size?: number;
      tab?: number;
    }
    interface tribeInfoParams {
      tribe_id: number;
    }
    interface tribePostInfoParams {
      id: number;
    }

    interface PostCreatepParams {
      content: string
      topic?: number[]
      tribe_id: number
      title: string
    }

    interface TopicInfo {
      ID: number;
      TribeID: number;
      Topic: string;
      CreateTime: number;
      Status: number
    }

    interface TopicCreateParams {
      tribe_id: number
      topics: string[]
    }

    interface TopicDelParams {
      tribe_id: number
      ids: number[]
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
