import React from 'react';
import { Api } from 'apis';

export function useTag() {
  const getUserTag = React.useCallback(async () => {
    try {
      const res = await Api.HomeApi.getUserTag();
      if (Api.isSuccess(res)) {
        let firstArr = [];
        let lastArr = [];
        const tag = (res?.data ?? []).reduce(
          (tags, current) => {
            current.type === 1
              ? (firstArr = [...firstArr, current])
              : (lastArr = [...lastArr, current]);

            return [firstArr, lastArr];
          },
          [[], []],
        );
        return tag;
      }
      return [];
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  return { getUserTag };
}
