import React, { useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Button } from 'uikit';
import { Select } from 'components';
import { useStore } from 'store';
import { Api } from 'apis';

const FormBox = styled.div`
  padding: 35px 27px 43px 41px;
  margin-top: 13px;
  background: #191f2d;
  border-radius: 10px;
`;
const Title = styled.div`
  color: #fff;
  line-height: 50px;
`;
const Rows = styled(Flex)`
  justify-content: space-around;
  margin-bottom: 26px;
  textarea {
    background: #292d34;
    width: 381px;
    height: 210px;
    color: #b5b5b5;
    padding: 15px;
    border-radius: 10px;
    border: none;
    outline: none;
    resize: none;
  }
  select {
    width: 381px;
    height: 50px;
    padding: 16px;
    border-radius: 10px;
    color: #fff;
    border: none;
    outline: none;
    background: #292d34;
  }
`;
const InputRows = styled(Flex)`
  justify-content: space-between;
  border-radius: 10px;
  padding: 13px 9px;
  background: #292d34;
  width: 381px;
  height: 50px;
  input {
    color: #b5b5b5;
    padding: 14px 13px 14px 26px;
    background: #292d34;
    border: none;
    outline: none;
  }
`;
const Uaddres = styled.div`
  width: 124px;
  height: 26px;
  line-height: 26px;
  color: #fff;
  background: #4d535f;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
`;
const Msg = styled.div`
  margin-top: 14px;
  color: #b5b5b5;
  font-size: #b5b5b5;
`;
const RadioBox = styled.div`
  width: 381px;
  height: 50px;
  line-height: 50px;
  padding-left: 13px;
  span {
    color: #fff;
    margin-right: 38px;
  }
`;

const FormInput: React.FC = () => {
  const [typeState, setTypeState] = useState('zero');
  const [txtAreaState, setTxtAreaState] = useState('');
  const [selectState, setSelectState] = useState('');
  const country = useStore(p => p.appReducer.localtion);
  const [state, setState] = useImmer({
    nick_name: '',
    display_format: 0,
    introduction: '',
    background_image: '',
    location: 0
  });

  // 显示格式
  const handleChangeRadio = e => {
    setTypeState(e.target.value);
    console.log('typeState', typeState);
  };
  // 个人简介
  const handleChangeTxtArea = e => {
    setTxtAreaState(e.target.value);
    console.log('txtAreaState', txtAreaState);
  };
  // 所在国家
  const handleChangeSelect = e => {
    setSelectState(e.target.value);
    console.log(e.target.value);
  };

  return (
    <FormBox>
      <Rows>
        <Title>* 设置昵称</Title>
        <div>
          <InputRows>
            <input
              type="text"
              onChange={event =>
                setState(p => {
                  p.nick_name = event.target.value;
                })
              }
              value={state.nick_name}
            />
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
        <Select options={country} defaultId={1} onChange={(val: any) => console.log(val)} />
      </Rows>
    </FormBox>
  );
};

export default FormInput;
