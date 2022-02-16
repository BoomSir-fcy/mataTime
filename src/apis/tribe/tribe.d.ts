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
  }
}
