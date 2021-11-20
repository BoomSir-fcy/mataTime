import React,{useEffect,useState,useRef} from 'react';
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
const parseText = (val = '') => {
  const reg = new RegExp(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g)
  return val.replace(reg,function (e){
    return `<a href="${e}" target="_blank" onclick="event.stopPropagation()"> ${e} </a>`
  })
}
export const ContentParsing = (props:IProps)=>{
  const ref:any = useRef()
  const [parsingResult,setParsingResult]= useState([])
  useEffect(()=>{
  const {content} = props
  try{
    setParsingResult(Array.isArray(JSON.parse(content))?JSON.parse(content):[])
  } catch (err: any) {
  }
  },[props.content])
  useEffect(()=>{
    setTimeout(() => {
      if(ref.current){
        const els = ref.current.getElementsByTagName('a')
        for(let i = 0;i<els.length;i++){
          els[i].onclick = (e) =>{
            e.stopPropagation()
          } 
        }
      }
    },0);
  },[])
return (
  <>
  {
    parsingResult &&
    parsingResult.length > 0 &&
    parsingResult.map((item: any,index) => {
      return (
        <ParagraphItem ref={ref} key={index}>
          {item.children.map((child: any) => {
            return (
                child.type === 'mention' ? (
                  <p>
                    <FollowPopup uid={child?.attrs?.userid || 0}>
                      <a>{child.character}</a>
                    </FollowPopup>
                  </p>
                ) : child.type === 'topic' ? (
                  <p>
                    {(child.children || []).map((topic: any) => {
                      if (topic.text) {
                        return <Link to={ `/topicList/empty/${topic.text}`}>#{topic.text}#</Link>;
                      }
                    })}
                  </p>
                ) : (
                  <p
                  dangerouslySetInnerHTML= {{
                    __html: parseText(child.text)
                  }}></p>
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
