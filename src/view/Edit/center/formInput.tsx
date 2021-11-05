import React, { useState } from 'react'
import styled from "styled-components";
import { Flex, Button } from 'uikit';
import { Api } from 'apis';
import { Handle } from 'src/uikit/components/Toggle/StyledToggle';

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
color:#B5B5B5;
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

const FormInput: React.FC = () => {
  const [nikeNameState, setNikeName] = useState('Baby fuck me')
  const [typeState, setTypeState] = useState('zero')
  const [txtAreaState, setTxtAreaState] = useState('')
  const [selectState, setSelectState] = useState('')

  const formState = {
    nikename: nikeNameState,
    utype: typeState,
    txtArea: txtAreaState,
    selectValue: selectState
  }

  // 设置昵称
  const handleChangeNikeName = (e) => {
    setNikeName(e.target.value)
    console.log('nikeNameState', nikeNameState);
    return {
      type: 'nikename',
      value: nikeNameState
    }
  }
  // 显示格式
  const handleChangeRadio = (e) => {
    setTypeState(e.target.value)
    console.log('typeState', typeState);
  }
  // 个人简介
  const handleChangeTxtArea = (e) => {
    setTxtAreaState(e.target.value)
    console.log('txtAreaState', txtAreaState);
  }
  // 所在国家
  const handleChangeSelect = (e) => {
    setSelectState(e.target.value)
    console.log(e.target.value);
  }
  return (
    <FormBox>
      <Rows>
        <Title>* 设置昵称</Title>
        <div>
          <InputRows>
            <input type="text" onChange={handleChangeNikeName} value={nikeNameState} />
            <Uaddres>0x259.....d59w5</Uaddres>
          </InputRows>
          <Msg>4~32个字符，支持中英文、数字</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>* 显示格式</Title>
        <RadioBox>
          <form onChange={handleChangeRadio}>
            <input type="radio" name="gs" value="domain" /> <span>0x 格式</span>
            <input type="radio" name="gs" value="zero" /> <span>域名格式</span>
          </form>
        </RadioBox>
      </Rows>
      <Rows>
        <Title>* 个人简介</Title>
        <div>
          <textarea placeholder="请填写您的个人资料简介" onChange={handleChangeTxtArea} value={txtAreaState} />
          <Msg>1~140个字符</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>* 所在国家</Title>
        <select onChange={handleChangeSelect} value={selectState}>
          <option value="China">中国（CH）</option>
          <option value="America">美国（US）</option>
        </select>
      </Rows>
    </FormBox>
  )
}

export default FormInput;