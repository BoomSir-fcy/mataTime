import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Radio } from 'uikit';
import { Select } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
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
`;
const InputRows = styled(Flex)`
  justify-content: space-between;
  border-radius: 10px;
  padding: 13px 9px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
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
  background: ${({ theme }) => theme.colors.borderColor};
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
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  label {
    cursor: pointer;
    margin-left: 10px;
  }
`;

const FormInput = React.forwardRef((props, ref) => {
  const country = useStore(p => p.appReducer.localtion);
  const profile = useStore(p => p.loginReducer.userInfo);
  const defaultId = country?.length > 0 && country[0].id;
  const { t } = useTranslation();
  const [state, setState] = useImmer<Api.User.updateProfileParams>({
    nick_name: profile.nick_name,
    display_format: profile.display_format,
    introduction: profile.introduction,
    background_image: profile.background_image,
    location: profile.location || (country.length > 0 && country[0]?.value)
  });
  const [defaultLocationId, setdefaultLocationId] = useState(
    country.find(({ value }) => value === profile.location)?.id || defaultId
  );

  useImperativeHandle(ref, () => ({
    getFrom() {
      return state;
    }
  }));
  return (
    <FormBox>
      <Rows>
        <Title>{t('loginInputTitleNickname')}</Title>
        <div>
          <InputRows>
            <input
              type="text"
              onChange={event =>
                setState(p => {
                  p.nick_name = event.target.value;
                })
              }
              minLength={6}
              maxLength={20}
              value={state.nick_name}
            />
            <Uaddres>{shortenAddress(profile.address)}</Uaddres>
          </InputRows>
          <Msg>{t('loginInputVerifyNickname')}</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>*显示格式</Title>
        <RadioBox>
          <Radio
            scale="sm"
            type="radio"
            id="gs"
            checked={state.display_format === 1}
            onChange={event =>
              setState(p => {
                p.display_format = Number(event.target.value);
              })
            }
            value="1"
          />
          <label htmlFor="gs">0x格式</label>
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
          defaultId={defaultLocationId}
          childrenHeight="120px"
          onChange={(val: any) => {
            setdefaultLocationId(val.ID);
            setState(p => {
              p.location = val.value;
            });
          }}
        />
      </Rows>
    </FormBox>
  );
});

export default FormInput;
