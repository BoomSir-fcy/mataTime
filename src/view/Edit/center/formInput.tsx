import React, { useEffect, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Box, Radio } from 'uikit';
import { Select } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';

const FormBox = styled.div`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 35px 40px;
  }
  margin-top: 13px;
  background: transparent;
  border-radius: 10px;
  min-height: 70vh;
  margin-bottom: 20px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 50px;
  min-width: 105px;
  margin-right: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 20px;
  }
`;

const WidthBox = styled(Flex)`
  max-width: 380px;
  width: 60vw;
  min-width: 200px;
`;

const Rows = styled(Flex)`
  justify-content: flex-start;
  margin-bottom: 26px;
  textarea {
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    width: 100%;
    height: 210px;
    color: ${({ theme }) => theme.colors.textTips};
    padding: 15px;
    border-radius: 10px;
    border: none;
    outline: none;
    resize: none;
  }
  &:last-child {
    margin-bottom: 126px;
  }
`;
const InputRows = styled(WidthBox)`
  justify-content: space-between;
  border-radius: 10px;
  padding: 13px 9px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  height: 50px;
  input {
    width: 100%;
    color: ${({ theme }) => theme.colors.textTips};
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Uaddres = styled.div`
  padding: 0 15px;
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
const RadioBox = styled(WidthBox)`
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
  const { t } = useTranslation();
  const [state, setState] = useImmer<Api.User.updateProfileParams>({
    ...profile,
  });
  const [defaultLocationId, setdefaultLocationId] = useState(profile.location);

  useEffect(() => {
    setState(p => {
      p.nick_name = profile.nick_name;
      p.display_format = profile.display_format;
      p.introduction = profile.introduction;
      p.background_image = profile.background_image;
      p.location = profile.location;
    });
  }, [profile]);

  useImperativeHandle(ref, () => ({
    getFrom() {
      return state;
    },
  }));

  console.log(country);
  return (
    <FormBox>
      <Rows>
        <Title>{t('loginInputTitleNickname')}</Title>
        <div>
          <InputRows>
            <input
              type='text'
              onChange={event =>
                setState(p => {
                  p.nick_name = event.target.value;
                })
              }
              minLength={6}
              maxLength={30}
              value={state.nick_name}
            />
            <Uaddres>{shortenAddress(profile.address)}</Uaddres>
          </InputRows>
          <Msg>{t('loginInputVerifyNickname')}</Msg>
        </div>
      </Rows>
      <Rows>
        <Title>{t('loginInputTitleDisplayFormat')}</Title>
        <RadioBox>
          <Radio
            scale='sm'
            type='radio'
            id='gs'
            checked={state.display_format === 1}
            onChange={event =>
              setState(p => {
                p.display_format = Number(event.target.value);
              })
            }
            value='1'
          />
          <label htmlFor='gs'>{t('loginInputDisplayRadio1')}</label>
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
          <span>{t('loginInputDisplayRadio2')}</span> */}
        </RadioBox>
      </Rows>
      <Rows>
        <Title>{t('loginInputTitleIntroduction')}</Title>
        <WidthBox flexDirection='column'>
          <textarea
            placeholder={t('loginInputIntroduction')}
            onChange={event =>
              setState(p => {
                p.introduction = event.target.value.substr(0, 140);
              })
            }
            value={state.introduction}
          />
          <Msg>{t('loginInputIntroductionVerif')}</Msg>
        </WidthBox>
      </Rows>
      <Rows>
        <Title>{t('loginInputTitleCountry')}</Title>
        <Select
          options={country}
          defaultId={defaultLocationId}
          childrenHeight='120px'
          onChange={(val: any) => {
            setdefaultLocationId(val.ID);
            setState(p => {
              p.location = val.ID;
            });
          }}
        />
      </Rows>
    </FormBox>
  );
});

export default FormInput;
