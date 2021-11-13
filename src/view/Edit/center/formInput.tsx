import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex } from 'uikit';
import { Select } from 'components';
import { useStore } from 'store';

const FormBox = styled.div`
  padding: 35px 40px;
  margin-top: 13px;
  background: #191f2d;
  border-radius: 10px;
`;
const Title = styled.div`
  color: #fff;
  line-height: 50px;
  min-width: 80px;
  margin-right: 40px;
`;
const Rows = styled(Flex)`
  justify-content: flex-start;
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
    padding: 14px 13px 14px 0;
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
  span {
    color: #fff;
    margin-right: 38px;
  }
`;

interface profile {
  finishSubmit?: (event: Api.User.updateProfileParams) => void;
}

const FormInput = React.forwardRef((props, ref) => {
  const country = useStore(p => p.appReducer.localtion);
  const profile: any = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer<Api.User.updateProfileParams>({
    nick_name: profile.NickName,
    display_format: profile.DisplayFormat,
    introduction: profile.Introduction,
    background_image: profile.BackgroundImage,
    location: profile.Location
  });

  useImperativeHandle(ref, () => ({
    getFrom() {
      return state;
    }
  }));

  return (
    <FormBox>
      <Rows>
        <Title>*设置昵称</Title>
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
        <Title>*显示格式</Title>
        <RadioBox>
          <input
            type="radio"
            name="gs"
            checked={state.display_format === 1}
            onChange={event =>
              setState(p => {
                p.display_format = Number(event.target.value);
              })
            }
            value="1"
          />
          <span>0x格式</span>
          <input
            type="radio"
            name="gs"
            checked={state.display_format === 2}
            onChange={event =>
              setState(p => {
                p.display_format = Number(event.target.value);
              })
            }
            value="2"
          />
          <span>域名格式</span>
        </RadioBox>
      </Rows>
      <Rows>
        <Title>*个人简介</Title>
        <div>
          <textarea
            placeholder="请填写您的个人资料简介"
            onChange={event =>
              setState(p => {
                p.introduction = event.target.value;
              })
            }
            value={state.introduction}
          />
          <Msg>1~140个字符</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>*所在国家</Title>
        <Select
          options={country}
          defaultId={1}
          onChange={(val: any) =>
            setState(p => {
              p.location = val.value;
            })
          }
        />
      </Rows>
    </FormBox>
  );
});

export default FormInput;
