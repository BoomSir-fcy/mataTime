import React,{ useState,useEffect,useRef} from 'react';
import {ImgListBox,ImgItem,MoreImg} from './style'
type Iprops = {
  list: string[]
}
export const ImgList=(props:Iprops)=>{
  const {list=[]} = props
  const [isMore,setIsore]= useState(false)
  const clickMore = (e)=>{
    e.stopPropagation()
    setIsore(true)
  //   var myScroll = new IScroll('#wrapper', {
  //     scrollbars: true
  // });
  }
  return (
      list.length>0?
        <ImgListBox style={{overflowX:isMore?'auto': 'hidden'}} onClick={(e)=>e.stopPropagation()}>
          {
            Array(isMore?list.length:list.length>3?3:list.length).fill(null).map((item,index)=>(
              <ImgItem src={list[index]} key={index}>
              </ImgItem>
            ))
          }
          {
            !isMore&&list.length>3?
              <MoreImg onClick={clickMore}>
                +
                <br />
                3
              </MoreImg>
            :null
          }
        </ImgListBox>
      :null
  )
}
