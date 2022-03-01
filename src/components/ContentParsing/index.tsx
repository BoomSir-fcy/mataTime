import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Text, Box } from 'uikit';
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
import { Descendant, Node } from 'slate';
import {
  ContentTextStyled,
  Leaf,
} from 'components/Editor/RichTextEditor/RenderElement';
import {
  ImageStyledRender,
  BoxStyled,
} from 'components/Editor/RichTextEditor/RenderElement/Image';
import {
  Ul,
  Ol,
  Blockquote,
  PARAGRAPH_MT,
} from 'components/Editor/RichTextEditor/RenderElement/styleds';

type IProps = {
  content: string;
  value?: Descendant[];
  paragraphMt?: string;
  callback?: Function;
  rows?: number; // 显示
  disableParseSquare?: boolean; // 评论不生成话题
  mode?: 'preview' | 'detail';
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
const ParagraphItem = styled(Box)`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  min-height: 1.1875em;
  font-family: Arial;
  line-height: 1.1875;
  user-select: text;
  cursor: pointer;
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

export const ContentParsing = React.memo(
  (props: IProps) => {
    const ref: any = useRef();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [parsingResult, setParsingResult] = useState([]);
    const [expand, setExpand] = useState<boolean>(false);
    const {
      callback,
      disableParseSquare,
      paragraphMt = '0',
      mode = 'detail',
      rows
    } = props;

    useEffect(() => {
      try {
        let arr = Array.isArray(JSON.parse(props.content))
          ? JSON.parse(props.content)
          : [];
        setParsingResult(arr);
      } catch (err: any) { }
    }, [props.content]);

    const preValue = useMemo(() => {
      if (mode === 'preview') {
        return parsingResult.map(n => Node.string(n)).join(' ');
      }
    }, [mode, parsingResult]);

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
    const parseText2 = ({ text = '', bold, del, underline, code, italic }) => {
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
      return (
        <Leaf
          leaf={{ bold, del, underline, code, italic }}
          attributes={undefined}
        >
          {replacedText}
        </Leaf>
      );
    };

    const serialize2 = (node, type = null, index?: number) => {
      const { children } = node;
      // switch (element.type) {
      // case 'block-quote':
      //   return <blockquote {...attributes}>{children}</blockquote>;
      // case 'bulleted-list':
      //   return <Ul {...attributes}>{children}</Ul>;
      // case 'heading-one':
      //   return <h1 {...attributes}>{children}</h1>;
      // case 'heading-two':
      //   return <h2 {...attributes}>{children}</h2>;
      // case 'list-item':
      //   return <li {...attributes}>{children}</li>;
      // case 'numbered-list':
      //   return <Ol {...attributes}>{children}</Ol>;
      // case 'image':
      //   return <Image {...props} />;
      // case 'mention':
      //   return <Mention {...props} />;
      // default:
      //   return <DefaultElement {...attributes}>{children}</DefaultElement>;
      switch (node.type) {
        case 'image':
          return (
            <Box mt={paragraphMt}>
              <ImageStyledRender full={!node.full} src={node.url} />
            </Box>
          );
        case 'numbered-list':
          return (
            <Ol>{children?.map((n, index) => serialize2(n, null, index))}</Ol>
          );
        case 'list-item':
          return (
            <li>{children?.map((n, index) => serialize2(n, null, index))}</li>
          );
        case 'bulleted-list':
          return (
            <Ul>{children?.map((n, index) => serialize2(n, null, index))}</Ul>
          );
        case 'block-quote':
          return (
            <Blockquote>
              {children?.map((n, index) => serialize2(n, null, index))}
            </Blockquote>
          );
        case 'paragraph':
          return (
            <ParagraphItem mt={paragraphMt} key={index}>
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
        case 'link':
          return (
            <a
              target='_blank'
              onClick={event => {
                event.stopPropagation();
                // event.preventDefault();
              }}
              href={node?.url}
              title={node?.url}
              rel='noreferrer'
            >
              {node?.character}
            </a>
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
          return parseText2(node);
      }
    };

    return (
      <ContentParsingWrapper>
        {mode === 'preview' ? (
          <ContentTextStyled display='-webkit-box' color='textTips' ellipsis maxLine={2}>
            {preValue}
          </ContentTextStyled>
        ) : (
          <>
            {parsingResult &&
              parsingResult.length > 0 &&
              parsingResult.map((item: any, index) => {
                if (!expand) {
                  return (
                    index < (rows || ARTICLE_POST_MAX_ROW) &&
                    serialize2(item, null, index)
                  );
                }
                return serialize2(item, null, index);
              })}
            {parsingResult && parsingResult.length > (rows || ARTICLE_POST_MAX_ROW) ? (
              <ExpandWrapper>
                <a
                  href={`javascript:void(${expand ? t('homePutAway') : t('homeOpen')
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
          </>
        )}
      </ContentParsingWrapper>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.content === nextProps.content;
  },
);
