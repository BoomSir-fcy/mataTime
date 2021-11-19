import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex } from 'uikit';
import { Select } from 'components';
import { shortenAddress } from 'utils/contract';
import { useStore } from 'store';

const FormBox = styled.div`
  padding: 35px 40px;
  margin-top: 13px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 10px;
  min-height: 70vh;
  margin-bottom: 20px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 50px;
  min-width: 80px;
  margin-right: 40px;
`;
const Rows = styled(Flex)`
  justify-content: flex-start;
  margin-bottom: 26px;
  textarea {
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    width: 381px;
    height: 210px;
    color: ${({ theme }) => theme.colors.textTips};
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
    color: ${({ theme }) => theme.colors.text};
    border: none;
    outline: none;
    background: ${({ theme }) => theme.colors.inputSelect};
  }
`;
const InputRows = styled(Flex)`
  justify-content: space-between;
  border-radius: 10px;
  padding: 13px 9px;
  background: ${({ theme }) => theme.colors.input};
  width: 381px;
  height: 50px;
  input {
    color: ${({ theme }) => theme.colors.textTips};
    padding: 14px 13px 14px 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Uaddres = styled.div`
  width: 124px;
  height: 26px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
`;
const Msg = styled.div`
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
`;
const RadioBox = styled.div`
  width: 381px;
  height: 50px;
  line-height: 50px;
  span {
    color: ${({ theme }) => theme.colors.text};
    margin-right: 38px;
  }
`;

const FormInput = React.forwardRef((props, ref) => {
  const country = useStore(p => p.appReducer.localtion);
  const profile = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer<Api.User.updateProfileParams>({
    nick_name: profile.nick_name,
    display_format: profile.display_format,
    introduction: profile.introduction,
    background_image: profile.background_image,
    location: profile.location || (country.length > 0 && country[0]?.value),
    default_location:
      country.find(({ value }) => value === profile.location)?.id || 1
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
                  p.nick_name = event.target.value.substr(0, 20);
                })
              }
              minLength={1}
              maxLength={20}
              value={state.nick_name}
            />
            <Uaddres>{shortenAddress(profile.address)}</Uaddres>
          </InputRows>
          <Msg>1~20个字符</Msg>
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
          {/* <input
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
          <span>域名格式</span> */}
        </RadioBox>
      </Rows>
      <Rows>
        <Title>*个人简介</Title>
        <div>
          <textarea
            placeholder="请填写您的个人资料简介"
            onChange={event =>
              setState(p => {
                p.introduction = event.target.value.substr(0, 140);
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
          defaultId={state.default_location}
          onChange={(val: any) =>
            setState(p => {
              p.default_location = val.ID;
              p.location = val.value;
            })
          }
        />
      </Rows>
    </FormBox>
  );
});

export default FormInput;
