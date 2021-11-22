import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization'
import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import { Link } from 'react-router-dom';
import { FollowPopup, MoreOperatorEnum } from 'components';
type IProps = {
  content: string;
  callback?: Function;
};
const ContentParsingWrapper = styled.div`

`
const ExpandWrapper = styled.div`
  width: 100%;
  text-align: center;
  span{
    cursor: pointer;
    color: #7393ff;
    font-size: 12px;
  }
`
const ParagraphItem = styled.div`
word-wrap: break-word;
p{
  font-size: 18px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
}
a{
  color: #7393ff;
  cursor: pointer;
  margin: 0 5px;
}
span {
  /* color: #4168ED; */
  cursor: pointer;
}
`
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
  const { t } = useTranslation()
  const ref: any = useRef()
  const [parsingResult, setParsingResult] = useState([])
  const [expand, setExpand] = useState<boolean>(false)
  useEffect(() => {
    const { content } = props
    try {
      let arr = Array.isArray(JSON.parse(content)) ? JSON.parse(content) : [];
      setParsingResult(arr)
    } catch (err: any) {
    }
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
  }, [])

  const parseText2 = (text = '') => {
    const re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
    let s:string = text.replace(re, function (a) {
      return `<a href=${a} target='_blank'>${a}</a>`;
    });
    s=s.replace(/[#＃][^#＃]+[#＃]/g, function (word) {
      return `<a  href="/#/topicList/empty/${word.slice(1).slice(0,-1)}" onclick="event.stopPropagation()">${word}</a>`;
    })
    return s;
  }

  const serialize2 = (node, type = null) => {
    const children = node.children
    switch (node.type) {
      case 'paragraph':
        return <ParagraphItem>{children ? children.map(n => serialize2(n)) : ''}</ParagraphItem>;
      case 'topic':
        return <Link onClick={(e)=>e.stopPropagation()} to={`/topicList/empty/${children ? children.map(n => serialize2(n, 'topic')) : ''}`}>#{children ? children.map(n => serialize2(n)) : ''}#</Link>;
      case 'mention':
        return <FollowPopup uid={node?.attrs?.userid || 0}>
          <a>{node.character}</a>
        </FollowPopup>;
      default:
        return type ? parseText2(node.text || '') : <span dangerouslySetInnerHTML={{ __html: parseText2(node.text || '') }}></span>
    }
  }


  return (
    <ContentParsingWrapper>
      {
        parsingResult &&
        parsingResult.length > 0 &&
        parsingResult.map((item: any, index) => {
          if (!expand) {
            return index < 8 && serialize2(item)
          } else {
            return serialize2(item)
          }

        })
      }
      {
        parsingResult &&
          parsingResult.length > 8 ? (
          <ExpandWrapper>
            <span onClick={(e: any) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation() //阻止冒泡
              setExpand(!expand)
            }}>{expand ? t('homePutAway') : t('homeOpen')}</span>
          </ExpandWrapper>
        ) : null
      }
    </ContentParsingWrapper>
  );
};
