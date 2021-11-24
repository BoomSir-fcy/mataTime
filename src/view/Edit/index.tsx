import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { Box, Flex, Button, Text } from 'uikit';
import { Upload } from 'components';
import { useStore, storeAction } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

import { Api } from 'apis';
import { useProfileContract } from './hook';
import { useFetchNftList } from '../Login/hook';

import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';
import defaultImages from 'assets/images/default_background.png';

const Background = styled(Flex)`
  width: 100%;
  height: 280px;
  background-size: 100%;
  padding: 190px 0 0;
  justify-content: center;
`;

export const Header = styled(Flex)`
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;

const Edit: React.FC = () => {
  useFetchNftList();

  const dispatch = useDispatch();
  const form = React.useRef<any>();
  const profile: any = useStore(p => p.loginReducer.userInfo);
  const { checkNickname, updateProfileNickname } = useProfileContract();
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    value: 1,
    background: profile.background_image || defaultImages
  });

  const updateProfile = async () => {
    const params = form.current.getFrom();
    const myInfo = {
      nick_name: profile.nick_name,
      display_format: profile.display_format,
      introduction: profile.introduction,
      background_image: profile.background_image,
      location: profile.location
    };

    if (
      isObjectValueEqual(params, myInfo) &&
      state.background === profile.background_image
    ) {
      // toast.error('没有任何修改!');
      return;
    }
    const res = await Api.UserApi.updateUserInfo({
      ...params,
      background_image: state.background
    });
    if (Api.isSuccess(res)) {
      dispatch(storeAction.changeUpdateProfile({ ...res.data }));
      toast.success(t('loginUpdateProfileSuccess'));
    } else {
      toast.error(t('loginUpdateProfileFail'));
    }
  };

  const updateUserInfo = async () => {
    const params = form.current.getFrom();

    try {
      const response = await checkNickname(params.nick_name);
      console.log(response);
      if (!response[0] && response[1]) {
        const res = await updateProfileNickname(params.nick_name);
        if (Boolean(res)) {
          updateProfile();
        } else {
          toast.error(t('loginSetNickNameFail'));
        }
      } else if (!response[0] && !response[1]) {
        toast.error(t('loginSetNickNameFail'));
      } else {
        toast.error(t('loginSetNickNameRepeat'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isObjectValueEqual = (a, b) => {
    //取对象a和b的属性名
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    //判断属性名的length是否一致
    if (aProps.length != bProps.length) {
      return false;
    }
    //循环取出属性名，再判断属性值是否一致
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  };

  return (
    <Box>
      <Header>
        <Text color="white_black" fontWeight="bold" fontSize="18px">
          {t('commonAccountEdit')}
        </Text>
        <Button onClick={debounce(() => updateUserInfo(), 1000)}>
          {t('commonAccountSave')}
        </Button>
      </Header>
      <Background style={{ backgroundImage: `url(${state.background})` }}>
        <Upload
          multiple
          uploadSuccess={(imgSrc: string) =>
            setState(p => {
              p.background = imgSrc;
            })
          }
        />
      </Background>
      <NftAvatar />
      <FormInput ref={form} />
    </Box>
  );
};

export default Edit;
