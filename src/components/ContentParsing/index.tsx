import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { FollowPopup, MoreOperatorEnum } from 'components';
type IProps = {
  content: string;
  callback?: Function;
}
const ParagraphItem = styled.div`
display: flex;
flex-wrap: wrap;
p{
  font-size: 18px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
}
a{
  color: #4168ED;
  cursor: pointer;
  margin: 0 10px;
}
span {
  color: #4168ED;
  cursor: pointer;
}
`
export const ContentParsing = (props: IProps) => {
  const { content, callback = () => { } } = props
  const [parsingResult, setParsingResult] = useState([])
  useEffect(() => {
    try {
      setParsingResult(Array.isArray(JSON.parse(content)) ? JSON.parse(content) : [])
    } catch (err: any) {
    }
  }, [props.content])
  return (
    <>
      {
        parsingResult &&
        parsingResult.length > 0 &&
        parsingResult.map((item: any, index) => {
          return (
            <ParagraphItem key={index}>
              {item.children.map((child: any) => {
                return (
                  child.type === 'mention' ? (
                    <p>
                      <FollowPopup
                        uid={child?.attrs?.userid || 0}
                        callback={(type: MoreOperatorEnum) => {
                          callback(type)
                        }}
                      >
                        <a>{child.character}</a>
                      </FollowPopup>
                    </p>
                  ) : child.type === 'topic' ? (
                    <p>
                      {(child.children || []).map((topic: any) => {
                        if (topic.text) {
                          return <Link to={`/topicList/0/${topic.text}`}>#{topic.text}#</Link>;
                        }
                      })}
                    </p>
                  ) : (
                    <p>{child.text || ''}</p>
                  )
                )
              })}
            </ParagraphItem>
          );
        })
      }
    </>
  )
}
