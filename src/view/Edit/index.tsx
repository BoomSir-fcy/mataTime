import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { useLocation } from 'hooks';
import { Box, Flex, Button, Text } from 'uikit';
import { Upload } from 'components';
import { useStore, storeAction } from 'store';
import { useDispatch } from 'react-redux';
import { Api } from 'apis';
import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';
import defaultImages from 'assets/images/default_me_background.jpg';
import { useFetchNftList } from '../Login/hook';

const Background = styled(Flex)`
  width: 100%;
  height: 280px;
  background-size: 100%;
  border-radius: 10px;
  padding: 190px 0 0;
  justify-content: center;
`;

export const Header = styled(Flex)`
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 10px;
  margin-bottom: 12px;
`;

const Edit: React.FC = () => {
  useFetchNftList();
  const dispatch = useDispatch();
  const form = React.useRef<any>();
  const profile: any = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer({
    value: 1,
    background: profile.background_image || defaultImages
  });
  const updateUserInfo = async () => {
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
    try {
      const res = await Api.UserApi.updateUserInfo({
        ...params,
        background_image: state.background
      });
      if (Api.isSuccess(res)) {
        dispatch(storeAction.changeUpdateProfile({ ...res.data }));
        toast.success(res.msg);
      } else {
        if (res.code === 20106) {
          toast.error('昵称已存在!');
        } else {
          toast.error('修改失败');
        }
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
          账号资料编辑
        </Text>
        <Button onClick={() => updateUserInfo()}>保存最新修改</Button>
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
