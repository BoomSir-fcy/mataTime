import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Text } from 'uikit';
import { FollowPopup, MoreOperatorEnum } from 'components';
import { storeAction } from 'store';
import { useTranslation } from 'contexts/Localization';
import { ARTICLE_POST_MAX_ROW, tokens } from 'config';
import {
  SQUARE_REGEXP,
  HTTP_REGEXP,
  SYMBOL_REGEXP,
} from 'config/constants/regexp';

import history from 'routerHistory';

type IProps = {
  content: string;
  callback?: Function;
  disableParseSquare?: boolean;
};

const ContentParsingWrapper = styled.div``;
const ExpandWrapper = styled.div`
  width: 100%;
  font-family: Arial;
  text-align: center;
  span {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 12px;
  }
`;
const ParagraphItem = styled.div`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  min-height: 1.1875em;
  font-family: Arial;
  line-height: 1.1875;
  user-select: text;
  cursor: text;
  p {
    font-size: 18px;
    font-family: Arial;
    font-weight: 400;
  }
  a {
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: pointer;
    font-family: Arial;
    /* margin: 0 5px; */
  }
  span {
    /* color: #4168ED; */
    cursor: pointer;
    font-family: Arial;
  }
`;

export const ContentParsing = (props: IProps) => {
  const ref: any = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [parsingResult, setParsingResult] = useState([]);
  const [expand, setExpand] = useState<boolean>(false);
  const { callback, disableParseSquare } = props;

  useEffect(() => {
    try {
      let arr = Array.isArray(JSON.parse(props.content))
        ? JSON.parse(props.content)
        : [];
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
            e.preventDefault();
          };
        }
      }
    }, 0);
  }, []);

  const { push } = useHistory();
  const goRouter = router => {
    push(router, {});
  };

  // 解析内容
  const parseText2 = (text = '') => {
    // const re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
    let replacedText: any;
    // Match url
    replacedText = reactStringReplace(text, HTTP_REGEXP, (match, i) => (
      <a
        key={match + i}
        target='_blank'
        onClick={event => {
          event.stopPropagation();
          // event.preventDefault();
        }}
        href={match}
        title={match}
        rel='noreferrer'
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
            event.preventDefault();
            event.stopPropagation();
            const coinsKey = match.toLowerCase();
            dispatch(storeAction.setTopicCoins(tokens[coinsKey]));
          }}
          title={match}
          href='/'
          key={match + i}
        >
          ${match}&nbsp;
        </a>
      ),
    );
    // Match hashtags
    if (!disableParseSquare) {
      replacedText = reactStringReplace(
        replacedText,
        SQUARE_REGEXP,
        // /#(\w+|[\u4E00-\u9FA5|0-9]+)[\s|\D]{0}/g,
        (match, i) => (
          <Link
            onClick={event => {
              // event.preventDefault();
              event.stopPropagation();
            }}
            to={() =>
              `/topiclist/empty/${encodeURI(
                encodeURIComponent(match.slice(1, match.length)),
              )}`
            }
            key={match + i}
          >
            {match}&nbsp;
          </Link>
        ),
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
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
            to={`/topiclist/empty/${children?.map((n, index) =>
              serialize2(n, 'topic', index),
            )}`}
          >
            {children?.map((n, index) => serialize2(n, null, index))}
          </Link>
        );
      case 'mention':
        return (
          <FollowPopup uid={node?.attrs?.userid || 0} key={index}>
            <a
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              {node.character}
            </a>
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
            return (
              index < ARTICLE_POST_MAX_ROW && serialize2(item, null, index)
            );
          }
          return serialize2(item, null, index);
        })}
      {parsingResult && parsingResult.length > ARTICLE_POST_MAX_ROW ? (
        <ExpandWrapper>
          <a
            href={`javascript:void(${
              expand ? t('homePutAway') : t('homeOpen')
            })`}
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
              if (callback) {
                callback(MoreOperatorEnum.EXPAND);
              }
              setExpand(!expand);
            }}
          >
            <Text color='textPrimary' fontSize='12px'>
              {expand ? t('homePutAway') : t('homeOpen')}
            </Text>
          </a>
        </ExpandWrapper>
      ) : null}
    </ContentParsingWrapper>
  );
};
