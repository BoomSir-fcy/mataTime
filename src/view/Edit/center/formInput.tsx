import React from 'react'
import styled from "styled-components";
import { Flex, Button } from 'uikit';
import { Api } from 'apis';

const FormBox = styled.div`
padding:35px 27px 43px 41px;
margin-top:13px;
background:#191F2D; 
border-radius: 10px;
`
const Title = styled.div`
color:#fff;
line-height: 50px;
`
const Rows = styled(Flex)`
justify-content: space-around;
margin-bottom:26px;
textarea {
background: #292D34;
width:381px;
height:210px;
padding:15px;
border-radius: 10px;
border:none;
outline:none;
resize: none;
}
select {
width:381px;
height:50px;
padding:16px;
border-radius: 10px;
color:#fff;
border:none;
outline:none;
background: #292D34;
}
`
const InputRows = styled(Flex)`
justify-content: space-between;
border-radius: 10px;
padding:13px 9px;
background: #292D34;
width:381px;
height:50px;
input {
  color:#B5B5B5;
  padding:14px 13px 14px 26px;
  background: #292D34;
  border:none;
  outline:none;
}
`
const Uaddres = styled.div`
width: 124px;
height:26px;
line-height:26px;
color:#fff;
background:#4D535F;
border-radius: 10px;
text-align:center;
font-size:14px;
`
const Msg = styled.div`
margin-top:14px;
color:#B5B5B5;
font-size:#B5B5B5;
`
const RadioBox = styled.div`
width:381px;
height:50px;
line-height: 50px;
padding-left: 13px;
span {
  color:#fff;
  margin-right:38px;
}
`

const formInput = () => {
  return (
    <FormBox>
      <Rows>
        <Title>* 设置昵称</Title>
        <div>
          <InputRows>
            <input type="text" value="baby fuck me" />
            <Uaddres>0x259.....d59w5</Uaddres>
          </InputRows>
          <Msg>4~32个字符，支持中英文、数字</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>* 显示格式</Title>
        <RadioBox>
          <form>
            <input type="radio" /> <span>0x 格式</span>
            <input type="radio" /> <span>域名格式</span>
          </form>
        </RadioBox>
      </Rows>
      <Rows>
        <Title>* 个人简介</Title>
        <div>
          <textarea />
          <Msg>1~140个字符</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>* 所在国家</Title>
        <select>
          <option value="saab">中国（CH）</option>
          <option value="volvo">美国（US）</option>
        </select>
      </Rows>
    </FormBox>
  )
}

export default formInput;