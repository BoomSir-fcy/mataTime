import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { Flex, Box, Text, Button } from 'uikit';
import { useToast } from 'hooks';
import { Api } from 'apis';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

import { Avatar } from '../Avatar';

const FolloWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const Name = styled(Text)`
  min-width: 0;
  font-size: 18px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Desc = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`;
const FollowContent = styled(Flex)`
  flex: 1;
  align-items: center;
`;
const FollowButton = styled(Box)`
  width: 100px;
`;

export const Follow: React.FC<{
  rows: {
    nft_image: string;
    nick_name: string;
    address: string;
    attention_status: number;
    uid: number;
  };
  getManList: () => void;
}> = ({ rows, getManList }) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();

  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        getManList();
        toastSuccess(t('commonMsgFollowSuccess') || res.data);
      } else {
        toastError(t('commonMsgUnFollowError') || res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FolloWarpper>
      <FollowContent>
        <Avatar scale="md" src={rows.nft_image} />
        <Flex flexDirection="column" paddingLeft="12px" style={{ minWidth: 0 }}>
          <Flex alignItems="center">
            <Name>{rows.nick_name}</Name>
          </Flex>
          <Desc>@{shortenAddress(rows.address)}</Desc>
        </Flex>
      </FollowContent>
      <FollowButton>
        <Button onClick={debounce(() => followUser(rows.uid), 1000)}>
          {t('meFocusOn')}
        </Button>
      </FollowButton>
    </FolloWarpper>
  );
};

const FollowContainer = styled.div`
  position: fixed;
  top: -400px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
  padding: 36px;
  width: 498px;
  height: 238px;
  background: #191f2d;
  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);
  border-radius: 20px;
  .btns {
    display: flex;
    justify-content: center;
    button {
      width: 100px;
    }
    button + button {
      margin-left: 80px;
    }
  }
`;

const FollowTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const FollowBody = styled(Flex)`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin: 25px 0 38px;
  line-height: 1.5;
  a {
    color: rgba(65, 104, 237, 1);
  }
  & > div {
    margin-left: 30px;
  }
`;
type IProps = {
  userId: string | number;
  callBack: (data) => void;
};
export const CancelFollow = (props: IProps) => {
  const [userInfo, setUserInfo] = useState<any>({});
  const { toastSuccess, toastError } = useToast();
  const { callBack } = props;
  useEffect(() => {
    if (props.userId) {
      const { userId } = props;
      Api.UserApi.getUserInfoByUID(userId).then(res => {
        if (Api.isSuccess(res)) {
          setUserInfo(res.data);
        }
      });
    }
  }, [props.userId]);
  const clickBtn = flag => {
    const { userId } = props;
    if (flag) {
      Api.MeApi.unFollowUser(userId).then(res => {
        console.log(res);
        if (Api.isSuccess(res)) {
          toastSuccess(res.data);
        } else {
          toastError(res.data);
        }
        callBack(true);
      });
    } else {
      callBack(false);
    }
  };
  return (
    <FollowContainer>
      <FollowTitle>是否取消关注Ta?</FollowTitle>
      <FollowBody>
        <Avatar src={userInfo.nft_image} scale="md" />
        <div>
          取消关注<a>@{userInfo.nick_name}</a>，将无法获取查看Ta的最新动态
        </div>
      </FollowBody>
      <div className="btns">
        <Button
          style={{ backgroundColor: '#4D535F' }}
          onClick={() => {
            clickBtn(true);
          }}
        >
          确定
        </Button>
        <Button
          onClick={() => {
            clickBtn(false);
          }}
        >
          取消
        </Button>
      </div>
    </FollowContainer>
  );
};
