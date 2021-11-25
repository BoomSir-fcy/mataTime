import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { Flex, Box, Card } from 'uikit';
import { useSelector } from 'react-redux';
import { useTranslation } from 'contexts/Localization'
import { Link } from 'react-router-dom';
import { ProfileMenu, Icon, Logo, Badge } from 'components';
import {toast} from 'react-toastify'
import menuData from './menuData';
import {Api} from 'apis'
const MenuBox = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 13px;
  width: 200px;
  height: calc(100vh - 40px);
  border-radius: 10px;
`;

const LogoWrapper = styled.div`
  width: 175px;
  height: 32px;
`;

const ItemLink = styled(Link)`
  margin-top: 20px;
  display: flex;
  width: 120px;
  height: 40px;
  border-radius: 18px;
  font-size: 18px;
  /* font-weight: bold; */
  color: ${({ theme }) => (theme.isDark ? '#eaeaea' : '#000000')};
  line-height: 40px;
`;

const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;

export const MenuList = (props: { menuList: any[] }) => {
  const isNotification = useStore(p => p.appReducer.systemCustom.notification)
  const { t } = useTranslation()
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { menuList } = props;
  const underdevelopmentList = [1,3,4,5]
  const itemClick = (e,index) => {
    if(underdevelopmentList.includes(index)){
      e.preventDefault();
      e.stopPropagation();
      return toast.success('coming soon')
    }
    setCurrentIndex(index);
  };
  return (
    <>
      {menuList.map((item, index) => {
        return (
          <ItemLink
            onClick={(e)=>itemClick(e, index)}
            to={item.path}
            key={index}
            style={{
              backgroundColor: currentIndex === index ? (isDark ? '#232A3D' : '#EAF2FF') : '',
              fontWeight: currentIndex === index ? 'bold' : 'normal'
            }}
          >
            <div style={{ position: 'relative' }} title={item.title}>
              {isNotification&&item.badge && <Badge count={item.count>99?'99+':item.count} />}
              <Icon name={currentIndex === index ? item.activeIcon : item.icon} margin="10px 14px" color={isDark ? '#ffffff' : '#7A83A0'}></Icon>
            </div>
            <span style={{ marginLeft: '5px' }}>{t(item.transaltion)}</span>
          </ItemLink>
        );
      })}
    </>
  );
};

export const Menu: React.FC = () => {
  const [paresMenuData ,setParesMenuData] = useState(menuData) 
    // 获取未读消息数量
    const getMsgNumRequest = async () => {
      const res = await Api.NewsApi.getUnreadMsgNum();
      if (Api.isSuccess(res)) {
        let tempMenuData:any = paresMenuData.slice()
      tempMenuData[2].count = 0
        for(let key in res.data||{}){
          tempMenuData[2].count+=res.data[key]
        }
        setParesMenuData(tempMenuData)
      }
    };
  
  useEffect(() => {
    getMsgNumRequest()
  },[])
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  return (
    <MenuBox>
      <Box>
        <LogoWrapper>
          <Logo url="/" src={require(isDark ? 'assets/images/logo.svg' : 'assets/images/light_logo.svg').default} />
        </LogoWrapper>
        <MenuList menuList={paresMenuData}></MenuList>
      </Box>
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </MenuBox>
  );
};
