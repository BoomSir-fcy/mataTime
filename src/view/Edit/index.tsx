import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useLocation } from 'hooks';
import { Box, Flex, Button, Text } from 'uikit';
import { Upload } from 'components';
import { useStore } from 'store';

import { Api } from 'apis';

// import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';

import defaultImages from 'assets/images/default_me_background.jpg';
import { toast } from 'react-toastify';

const Background = styled(Flex)`
  width: 100%;
  background-size: 100%;
  border-radius: 10px;
  padding: 190px 0 55px;
  justify-content: center;
`;

export const Header = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 22px 16px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 10px;
  margin-bottom: 12px;
`;

const Edit: React.FC = () => {
  useLocation();
  const form = React.useRef<any>();
  const profile: any = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer({
    value: 1,
    background: profile.BackgroundImage || defaultImages
  });

  const updateUserInfo = async () => {
    const params = form.current.getFrom();
    try {
      const res = await Api.UserApi.updateUserInfo({ ...params, background_image: state.background });
      if (Api.isSuccess(res)) {
        toast.success('修改成功');
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
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
      <FormInput ref={form} />
    </Box>
  );
};

export default Edit;