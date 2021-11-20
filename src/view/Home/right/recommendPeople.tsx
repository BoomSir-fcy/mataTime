import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Text } from 'uikit';
import { Avatar, Icon } from 'components';
import { Link } from 'react-router-dom'
import { Api } from 'apis';
const RecommendPeopleBox = styled(Card)`
  // margin-top: 15px;
  padding: 20px 18px;
  width: 298px;
  border-radius: 10px;
`;
const TitleText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const MoreBtn = styled.span`
  font-size: 14px;
  color: #7393ff;
  cursor: pointer;
`;
export const UserTitle = styled.div`
  margin: 0 12px;
  margin-right:5px;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.isDark ? '#fff' : '#000'};
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const UserDesc = styled.div`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.isDark ? '#B5B5B5' : '#7A83A0'};
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const FollowBtn = styled(Button)`
  font-size: 14px;
  font-weight: bold;
`;
const UserInfo = styled(Box)``;
type Iprops = {
  // dataList:any[]
};
export const RecommendPeople: React.FC<Iprops> = props => {
  const { t } = useTranslation()
  const [list, setList] = useState([]);
  const [isInit, setIsInit] = useState(true);
  useEffect(() => {
    getManList();
  }, []);
  const getManList = () => {
    Api.UserApi.referrerMans({ num: 3 }).then(res => {
      if (Api.isSuccess(res)) {
        setIsInit(true)
        setList(res.data || []);
      }
    });
  };

  // 关注用户
  const onAttentionFocusRequest = async (focus_uid: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data)
      getManList();
    } else {
      toast.error(res.data)
    }
  }


  return (
    isInit && list.length < 1 ? null :
      <RecommendPeopleBox>
        <Flex justifyContent="space-between" alignItems="center">
          <TitleText>{t('recommendPeopleTitle')}</TitleText>
          <MoreBtn onClick={getManList}>{t('moreText')}</MoreBtn>
        </Flex>
        {list.map((item, index) => (
          <Flex key={item.uid} alignItems="center" justifyContent="space-between" style={{ marginTop: '17px' }}>
            <Flex>
              <Link to={'/me/profile/' + item.uid}>
                <Avatar src={item.nft_image} style={{ width: '50px', height: '50px' }} scale="md" />
              </Link>
              <UserInfo >
                <Flex>
                  <UserTitle title={item.nick_name}>{item.nick_name}</UserTitle>
                  {/* <Icon name="icon-dunpai" margin="5px 0px 0px -10px" size={15} color="#699a4d"></Icon> */}
                </Flex>
                <UserDesc title={item.introduction}>{item.introduction}</UserDesc>
              </UserInfo>
            </Flex>
            <FollowBtn onClick={() => {
              onAttentionFocusRequest(item.uid)
            }}>+{t('followText')}</FollowBtn>
          </Flex>
        ))}
      </RecommendPeopleBox>
  );
};
