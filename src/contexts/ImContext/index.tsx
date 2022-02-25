import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from 'store';
import { IM } from 'utils';
import { ReadType } from 'hooks/imHooks/types';



export interface ArticlePosition {
  offsetTop: number;
  offsetBottom: number;
  articleId: number;
  readType: ReadType;
  forwardType?: number;
  forwardReadInfo?: ForwardStrcut;
}
export interface ArticlePositions {
  // [number, number] =  [top, bottom], 当前文章边界
  [articleId_readType: string]: ArticlePosition;
}

interface ForwardStrcut {
  post_id?: number;
  forward_id?: number;
  forward_type?: number;
}

interface ArticleIds {
  [readType: string]: number[];
}
interface ProviderState {
  im: IM;
  articleIds: {
    [readType: string]: number[];
  };
  setArticleIds: React.Dispatch<React.SetStateAction<ArticleIds>>;
  articlePositions: ArticlePositions;
  setArticlePositions: React.Dispatch<React.SetStateAction<ArticlePositions>>;
  rendered: boolean;
  setRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImContext = React.createContext({} as ProviderState);

const ImContextProvider = ({ children }) => {
  const [im, setWs] = useState<IM>(null);
  const [articleIds, setArticleIds] = useState<ArticleIds>({});
  const [articlePositions, setArticlePositions] = useState<ArticlePositions>(
    {},
  );
  const [rendered, setRendered] = useState(false); // 是否渲染元素, 做初始化处理
  const token = useStore(p => p.loginReducer.token);

  const initSocket = userToken => {
    const instantMessageing = new IM(userToken);
    setWs(instantMessageing);
  };

  React.useEffect(() => {
    if (im && im.userToken !== token && token) {
      im.init();
    } else if (!im && token) {
      initSocket(token);
    }
  }, [im, token]);

  return (
    <ImContext.Provider
      value={{
        im,
        articleIds,
        setArticleIds,
        articlePositions,
        setArticlePositions,
        rendered,
        setRendered,
      }}
    >
      {children}
    </ImContext.Provider>
  );
};

export { ImContext, ImContextProvider };
