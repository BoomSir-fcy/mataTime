import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Text, Button } from 'uikit';
import { Avatar } from '../Avatar';
import { Api } from 'apis'
import { toast } from 'react-toastify'
const FolloWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const Name = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;
const Desc = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`;

export const Follow: React.FC<{
  rows: {
    nft_image: string;
    nick_name: string;
    address: string;
    attention_status: number;
    uid: number
  };
  getManList: () => void
}> = ({ rows, getManList }) => {
  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        toast.success('关注成功！');
        getManList()
      } else {
        toast.warning(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FolloWarpper>
      <Flex alignItems="center">
        <Avatar scale="md" src={rows.nft_image} />
        <Flex flexDirection="column" paddingLeft="12px">
          <Flex alignItems="center">
            <Name>{rows.nick_name}</Name>
          </Flex>
          <Desc>@{rows.address}</Desc>
        </Flex>
      </Flex>
      <Button variant="secondary" onClick={() => followUser(rows.uid)} >+关注</Button>
    </FolloWarpper>
  );
};

const FollowContainer = styled.div`
  position:fixed;
  top:-400px;
  left:0;
  right: 0;
  bottom:0;
  margin:auto;
  z-index:99;
  padding: 36px;
  width: 498px;
  height: 238px;
  background: #191F2D;
  box-shadow: 0px 0px 21px 0px rgba(25, 95, 81, 0.2);
  border-radius: 20px;
  .btns{
    display:flex;
    justify-content:center;
    button{
      width:100px;
    }
    button+button{
      margin-left:80px;
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
  &>div{
    margin-left:30px;
  }
`;
type IProps = {
  userId: string | number,
  callBack: (data) => void
}
export const CancelFollow = (props: IProps) => {
  const [userInfo, setUserInfo] = useState<any>({});
  const { callBack } = props
  useEffect(() => {
    if (props.userId) {
      const { userId } = props
      Api.UserApi.getUserInfoByUID(userId).then(res => {
        if (Api.isSuccess(res)) {
          setUserInfo(res.data)
        }
      })
    }
  }, [props.userId])
  const clickBtn = (flag) => {
    const { userId } = props
    if (flag) {
      Api.MeApi.unFollowUser(userId).then(res => {
        console.log(res);
        if (Api.isSuccess(res)) {
          toast.success(res.data);
        } else {
          toast.error(res.data);
        }
        callBack(true)
      })
    } else {
      callBack(false)
    }
  }
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
        <Button style={{ backgroundColor: '#4D535F' }} onClick={() => { clickBtn(true) }}>确定</Button>
        <Button onClick={() => { clickBtn(false) }}>取消</Button>
      </div>
    </FollowContainer>
  );
};
