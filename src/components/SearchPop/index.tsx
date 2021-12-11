import React, { useState, useEffect } from 'react';
import { Icon, Avatar } from 'components';
import { SearchPopBox } from './style';
import { Flex } from 'uikit';
import { UserTitle, UserDesc } from 'view/Home/right/recommendPeople';
import { Api } from 'apis';

type Iprops = {
  show: boolean;
  callback?: (data, type) => void;
  type: 'user' | 'topic';
};

export const SearchPop = (props: Iprops) => {
  const [nicKName, setNickName] = useState('');
  const [nicKNameTimeId, setNicKNameTimeId] = useState(null);
  const [userList, setUserList] = useState([]);
  const [topicValue, setTopicValue] = useState('');
  const [topicList, setTopicList] = useState([]);
  const [topicTimeId, setTopicTimeId] = useState(null);
  const [isInit, setIsInit] = useState(true);
  const { show, type, callback } = props;

  // todo
  useEffect(() => {
    if (isInit) return setIsInit(false);
    if (nicKNameTimeId) {
      clearTimeout(nicKNameTimeId);
    }
    setNicKNameTimeId(
      setTimeout(() => {
        Api.UserApi.searchUser(nicKName).then(res => {
          if (Api.isSuccess(res)) {
            res.data && setUserList(res.data);
          }
        });
      }, 400)
    );
  }, [nicKName]);

  useEffect(() => {
    if (isInit) return setIsInit(false);
    if (topicTimeId) {
      clearTimeout(topicTimeId);
    }
    setTopicTimeId(
      setTimeout(() => {
        Api.HomeApi.queryHotTopicList({
          page: 1,
          per_page: 50,
          topic_name: topicValue
        }).then(res => {
          if (Api.isSuccess(res)) {
            setTopicList(res.data.List || []);
          }
        });
      }, 400)
    );
  }, [topicValue]);

  useEffect(() => {
    const fn = e => callback({}, '');
    document.body.addEventListener('click', fn);
    return () => document.body.removeEventListener('click', fn);
  }, []);

  return show ? (
    <SearchPopBox onClick={e => e.nativeEvent.stopImmediatePropagation()}>
      {type === 'user' ? (
        <div className="search-box">
          <div className="title">
            <Icon
              name="icon-sousuo"
              margin="15px 0"
              size={20}
              color="white_black"
            />
            {!!nicKName ? (
              <Icon
                current={1}
                name="icon-guanbi2fill"
                margin="15px 0"
                size={20}
                color="white_black"
                onClick={() => setNickName('')}
              />
            ) : null}
            <input
              placeholder="昵称搜索"
              value={nicKName}
              onChange={e => setNickName(e.target.value)}
              type="text"
            />
          </div>
          <div className="search-res-list">
            {userList.map((item, index) => (
              <Flex
                key={item.uid}
                className="search-res-list-item"
                onClick={e => callback(item, type)}
              >
                <Avatar
                  src={item.nft_image}
                  style={{ width: '50px', height: '50px' }}
                  scale="md"
                />
                <div style={{ flex: 1 }}>
                  <Flex>
                    <UserTitle style={{ flex: 1 }} title={item.nick_name}>
                      {item.nick_name}
                    </UserTitle>
                    {/* <Icon name="icon-dunpai" margin="5px 0px 0px -10px" size={15} color="#699a4d"/> */}
                  </Flex>
                  <UserDesc title={item.address}>
                    {item.address &&
                      (item.address || '').slice(0, 3) +
                      '...' +
                      (item.address || '').slice(35)}
                  </UserDesc>
                </div>
              </Flex>
            ))}
          </div>
        </div>
      ) : null}
      {type === 'topic' ? (
        <div className="search-box">
          <div className="title">
            <Icon
              name="icon-sousuo"
              margin="15px 0"
              size={20}
              color="white_black"
            />
            {!!topicValue ? (
              <Icon
                cur={true}
                name="icon-guanbi2fill"
                margin="15px 0"
                size={20}
                color="white_black"
                onClick={() => setTopicValue('')}
              />
            ) : null}
            <input
              type="text"
              placeholder="话题搜索"
              value={topicValue}
              onChange={e => setTopicValue(e.target.value)}
            />
          </div>
          <div className="search-res-list">
            {topicList.map((item, index) => (
              <Flex
                key={item.topic_id}
                className="search-res-list-item"
                onClick={e => callback(item, type)}
              >
                <UserTitle style={{ flex: 1 }} title={item.topic_name}>
                  #{item.topic_name}#
                </UserTitle>
              </Flex>
            ))}
          </div>
        </div>
      ) : null}
    </SearchPopBox>
  ) : null;
};
