import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FollowPopup, MoreOperatorEnum } from 'components';
import { storeAction } from 'store';
import { useTranslation } from 'contexts/Localization';
import { tokens } from 'config';
import {
  SQUARE_REGEXP,
  HTTP_REGEXP,
  SYMBOL_REGEXP,
} from 'config/constants/regexp';

import history from 'routerHistory';

type IProps = {
  content: string;
  callback?: Function;
  disableParseSquare?: boolean
};

const ContentParsingWrapper = styled.div``;
const ExpandWrapper = styled.div`
  width: 100%;
  text-align: center;
  span {
    cursor: pointer;
    color: #7393ff;
    font-size: 12px;
  }
`;
const ParagraphItem = styled.div`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  min-height: 1.1875em;
  line-height: 1.1875;
  p {
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
  }
  a {
    color: #7393ff;
    cursor: pointer;
    /* margin: 0 5px; */
  }
  span {
    /* color: #4168ED; */
    cursor: pointer;
  }
`;
// const parseText = (val = '') => {
//   const reg = new RegExp(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g)
//   val.replace(reg, function (e) {
//     return `<a href="${e}" target="_blank" onclick="event.stopPropagation()"> ${e} </a>`
//   })
//   val.replace(/[#＃][^#＃]+[#＃]/g, function (word) {
//     return `<a  href="/topicList/empty${word}" onclick="event.stopPropagation()">${word}</a>`;
//   });
//   return val
// }

export const ContentParsing = (props: IProps) => {
  const ref: any = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [parsingResult, setParsingResult] = useState([]);
  const [expand, setExpand] = useState<boolean>(false);
  const { callback, disableParseSquare } = props;

  useEffect(() => {
    try {
      let arr = Array.isArray(JSON.parse(props.content)) ? JSON.parse(props.content) : [];
      setParsingResult(arr);
    } catch (err: any) {}
  }, [props.content]);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        const els = ref.current.getElementsByTagName('a');
        for (let i = 0; i < els.length; i++) {
          els[i].onclick = e => {
            e.stopPropagation();
          };
        }
      }
    }, 0);
  }, []);

  const goRouter = router => {
    history.push(router);
  };

  // 解析内容
  const parseText2 = (text = '') => {
    // const re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
    let replacedText: any;
    // Match url
    replacedText = reactStringReplace(text, HTTP_REGEXP, (match, i) => (
      <a
        key={match + i}
        target="_blank"
        onClick={event => event.stopPropagation()}
        href={match}
        title={match}
        rel="noreferrer"
      >
        {match}
      </a>
    ));
    // Match token
    replacedText = reactStringReplace(
      replacedText,
      // /\$(\w+)\$/g,
      // /\$(\w{2, 20})\s/g,
      SYMBOL_REGEXP,
      (match, i) => (
        <a
          onClick={event => {
            event.preventDefault()
            event.stopPropagation();
            const coinsKey = match.toLowerCase();
            dispatch(storeAction.setTopicCoins(tokens[coinsKey]));
          }}
          title={match}
          href="/"
          key={match + i}
        >
          ${match}&nbsp;
        </a>
      )
    );
    // Match hashtags
    if (!disableParseSquare) {
      replacedText = reactStringReplace(
        replacedText,
        SQUARE_REGEXP,
        // /#(\w+|[\u4E00-\u9FA5|0-9]+)[\s|\D]{0}/g,
        (match, i) => (
          <a
            onClick={event => {
              event.stopPropagation();
              event.preventDefault()
              goRouter(`/topicList/empty/${encodeURIComponent(match.slice(1, match.length))}`);
            }}
            href={`/topicList/empty/${encodeURIComponent(match.slice(1, match.length))}`}
            key={match + i}
          >
            {match}&nbsp;
          </a>
        )
      );
    }
    return replacedText;
  };

  const serialize2 = (node, type = null, index?: number) => {
    const { children } = node;
    switch (node.type) {
      case 'paragraph':
        return (
          <ParagraphItem key={index}>
            {children?.map((n, index) => serialize2(n, null, index))}
          </ParagraphItem>
        );
      case 'topic':
        return (
          <Link
            onClick={e => e.stopPropagation()}
            to={`/topicList/empty/${children?.map((n, index) =>
              serialize2(n, 'topic', index)
            )}`}
          >
            {children?.map((n, index) => serialize2(n, null, index))}
          </Link>
        );
      case 'mention':
        return (
          <FollowPopup uid={node?.attrs?.userid || 0} key={index}>
            <a>{node.character}</a>
          </FollowPopup>
        );
      default:
        return parseText2(node.text);
    }
  };


  return (
    <ContentParsingWrapper>
      {parsingResult &&
        parsingResult.length > 0 &&
        parsingResult.map((item: any, index) => {
          if (!expand) {
            return index < 8 && serialize2(item, null, index);
          }
          return serialize2(item, null, index);
        })}
      {parsingResult && parsingResult.length > 8 ? (
        <ExpandWrapper>
          <span
            onClick={(e: any) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
              if (callback) {
                callback(MoreOperatorEnum.EXPAND);
              }
              setExpand(!expand);
            }}
          >
            {expand ? t('homePutAway') : t('homeOpen')}
          </span>
        </ExpandWrapper>
      ) : null}
    </ContentParsingWrapper>
  );
};
