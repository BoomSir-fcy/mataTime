import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { Box, Flex, Button, Text } from 'uikit';
import { Upload } from 'components';
import { useStore, storeAction } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Api } from 'apis';
import { useProfileContract } from './hook';
import { useFetchNftList } from '../Login/hook';
import { ComponentsWrapper } from 'components/Cirde/PageContainer';
import CommonCircle from 'components/Cirde/CommonCircle';
import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';
import defaultImages from 'assets/images/default_background.png';
import { Crumbs } from 'components';
import { ConnectWalletButton } from 'components';

const Background = styled(Flex)`
  position: relative;
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
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;

const CenterImg = styled.img`
  position: absolute;
  top: 40%;
  left: 8%;
`;

const PageBox = styled(Box)`
  max-width: calc(100vw - 8px);
`;
const ConnectWalletButtonStyle = styled(ConnectWalletButton)`
  width: max-content;
`;

const Edit: React.FC = () => {
  useFetchNftList();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const form = React.useRef<any>();
  const profile: any = useStore(p => p.loginReducer.userInfo);
  const { checkNickname, updateProfileNickname } = useProfileContract();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [state, setState] = useImmer({
    value: 1,
    background: defaultImages,
  });

  const updateProfile = async () => {
    const params = form.current.getFrom();
    const myInfo = {
      nick_name: profile.nick_name,
      display_format: profile.display_format,
      introduction: profile.introduction,
      background_image: profile.background_image,
      location: profile.location,
    };

    if (
      isObjectValueEqual(params, myInfo) &&
      state.background === profile.background_image
    ) {
      // toastError('没有任何修改!');
      return;
    }

    const res = await Api.UserApi.updateUserInfo({
      ...params,
      background_image: state.background,
    });
    if (Api.isSuccess(res)) {
      dispatch(
        storeAction.changeUpdateProfile({
          ...res.data,
          nick_name: params.nick_name,
        }),
      );
      toastSuccess(t('loginUpdateProfileSuccess'));
    }
  };

  const updateUserInfo = async () => {
    const params = form.current.getFrom();
    if (profile.nick_name === params.nick_name) {
      return updateProfile();
    }
    let nick_name = params.nick_name
      .replace(/(^\s*)|(\s*$)/g, '')
      .replace(/\s+/g, ' ');
    console.log(nick_name);
    try {
      const response = await checkNickname(nick_name);
      if (!response[0] && response[1]) {
        const res = await updateProfileNickname(nick_name);
        if (Boolean(res) && res === 1) {
          dispatch(
            storeAction.changeUpdateProfile({
              ...profile,
              nick_name: nick_name,
            }),
          );
          updateProfile();
        } else {
          toastError(t('commonTransactionRejected'));
        }
      } else if (!response[0] && !response[1]) {
        toastError(t('loginSetNickNameFail'));
      } else {
        toastError(t('loginSetNickNameRepeat'));
      }
    } catch (error) {
      console.error(error);
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

  React.useEffect(() => {
    setState(p => {
      p.background = profile.background_image;
    });
  }, [profile]);

  return (
    <PageBox>
      <Crumbs title={t('commonAccountEdit')}>
        {account ? (
          <Button onClick={debounce(() => updateUserInfo(), 1000)}>
            {t('commonAccountSave')}
          </Button>
        ) : (
          <ConnectWalletButtonStyle />
        )}
      </Crumbs>
      {/* <Header>
        <Text color="white_black" fontWeight="bold" fontSize="18px">
          {t('commonAccountEdit')}
        </Text>
        <Button onClick={debounce(() => updateUserInfo(), 1000)}>
          {t('commonAccountSave')}
        </Button>
      </Header> */}
      <Background style={{ backgroundImage: `url(${state.background})` }}>
        {!profile.background_image && !state.background && (
          <Box
            style={{
              position: 'absolute',
              top: '0',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <ComponentsWrapper>
              <CommonCircle
                width='18rem'
                height='18rem'
                margin='-15rem 0 0 -9rem'
                bgWidth='48rem'
                bgHeight='19rem'
                bgMargin='-6rem 0 0 -23rem'
                isAnimation
              >
                <CenterImg
                  width='250px'
                  height='250px'
                  src={require('view/Login/images/LOGO2.svg').default}
                />
              </CommonCircle>
            </ComponentsWrapper>
          </Box>
        )}
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
    </PageBox>
  );
};

export default Edit;
