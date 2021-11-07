import React,{useState,useEffect} from 'react'
import {Icon } from 'components'
import styled from 'styled-components';
type imgListType = {
  imgList:any[],
  delImgItem:(index)=>void
}
const ImgListBox = styled.div`
padding-bottom:10px;
overflow-x: auto;
display: flex;
background: ${({ theme }) => theme.colors.backgroundTextArea};
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;
}
&>div{
  position:relative;
  margin-left:15px;
  img{
    width: 53px;
    height: 53px;
    border-radius:5px;
  }
  i{
    padding:5px;
    position:absolute;
    top:-10px;
    right:-10px;
    transition:all 0.3s ;
  }
}
`
export const ImgList=(props:imgListType)=>{
  const [imgList,setImgList] = useState([])
  useEffect(()=>{
    setImgList(props.imgList)
  },[props.imgList])
  const delImgItem =(index)=>{
    const temp = [...imgList]
    temp.splice(index,1)
    setImgList(temp)
    props.delImgItem(temp)
  }
  return (
    <ImgListBox>
        {
          imgList.map((item,index)=>(
            <div key={index}>
              <Icon cur size={17} name="icon-jian" color="#ec612b" onClick={delImgItem.bind(this, index)}></Icon>
              <img  src={item} alt="" />
            </div>
          ))
        }
    </ImgListBox>
  )
}