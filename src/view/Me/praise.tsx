import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Icon, } from 'components';
import { Link } from 'react-router-dom';
import moreIcon from 'assets/images/social/more.png';
import { Box, Button, Flex } from 'uikit';
import { Api } from 'apis';
import { toast } from 'react-toastify';

const Title = styled(Box)`
color:#fff;
font-weight:bold;
`
const ArticleListBox = styled.div`
color:#fff;
`
const Content = styled(Flex)`
width:100%;
padding:29px 18px 31px 29px;
background:#191F2D;
border-radius: 10px;
margin-top:14px;
overflow:hidden;
justify-content: space-between;
`
const Header = styled(Flex)`
justify-content: space-between;
height:60px;
line-height: 60px;
padding:0 16px;
background:#191F2D;
border-radius:10px;
`
const More = styled(Box)`
width: 25px;
cursor: pointer;
`
const Msg = styled(Flex)`
height:50px;
justify-content: space-between;
flex-direction: column;
margin-right:27px;
float: left;
`
const Time = styled(Box)`
font-size:14px;
color:#B5B5B5;
`
const Name = styled(Box)`
color:#fff;
font-weight:bold;
font-size:18px;
`
const Center = styled(Box)`
width: 80%;
`
const Detail = styled(Box)`
width:100%;
margin:22px 0 28px 0;
`
const IconFont = styled(Box)`
float:left;
margin-right:60px;
span {
  margin-left:12px;
  display: inline-block;
  font-size:16px;
  color:#B5B5B5;
}
`
const Praise = React.memo((props) => {
  const [listData, setListData] = useState([])
  console.log('点赞列表', listData);
  // 获取点赞列表
  const getPraiseList = async () => {
    try {
      const res = await Api.MeApi.praiseList()

      setListData(res.data.list)
    } catch (error) {
      console.log(error);
    }
  }
  // 点赞列表组件
  const PraiseList = () => {
    return (
      <div>
        {
          listData.map((item, index) => {
            return (
              <Content key={index}>
                <Avatar src={item.nft_image} scale="md" style={{ float: 'left', marginRight: "23px" }} />
                <Center>
                  <div>
                    <Msg>
                      <Name>{item.nick_name}</Name>
                      <Time>{item.post_time_desc}</Time>
                    </Msg>
                    <Button variant="secondary" style={{ marginTop: '10px' }}>#老表的吃货天堂</Button>
                  </div>
                  <Link to={'/articleDetils/' + item.id}>
                    <Detail>
                      <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </Detail>
                  </Link>
                  <IconFont>
                    <Icon className="iconfont" name={'icon-pinglun'} color={'#B5B5B5'}></Icon>
                    <span>{item.comment_num || 0}</span>
                  </IconFont>
                  <IconFont>
                    <Icon className="iconfont" name={'icon-retweet'} color={'#B5B5B5'}></Icon>
                    <span>{item.share_num || 0}</span>
                  </IconFont>
                  {
                    item.like_status === 0 ? (
                      <IconFont>
                        <Icon onClick={() => praiseUser(item.id)} className="iconfont" name={'icon-aixin'} color={'#B5B5B5'}></Icon>
                        <span>{item.like_num || 0}</span>
                      </IconFont>
                    ) : (
                      <IconFont>
                        <Icon onClick={() => unPraiseUser(item.id)} className="iconfont" name={'icon-aixin1'} color={'#EC612B'}></Icon>
                        <span>{item.like_num || 0}</span>
                      </IconFont>
                    )
                  }
                </Center>

                {/* <More style={{ float: 'right' }}><img src={moreIcon} alt="more" /> */}
              </Content>
            )
          })
        }
      </div >
    )
  }
  // 点赞用户
  const praiseUser = async (post_id: number) => {
    try {
      const res = await Api.MeApi.praiseUser(post_id)
      if (res.code === 1) {
        getPraiseList()
        toast.success(res.data)
      } else {
        toast.warning(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 取消点赞
  const unPraiseUser = async (post_id: number) => {
    try {
      const res = await Api.MeApi.unPraiseUser(post_id)
      console.log('取消点赞', res)
      if (res.code === 1) {
        getPraiseList()
        toast.success(res.data)
      } else {
        toast.warning(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 帖子详情
  const getContentDetail = async (id: number) => {
    try {
      const res = await Api.MeApi.getContentDetail(1)
      console.log('帖子详情', res);
    } catch (error) {
      console.log(error);
    }
  }

  // 添加评论
  const addContentDetail = async (params: Api.Me.addContentDetail) => {
    try {
      const res = await Api.MeApi.addContentDetail({
        pid: 1,
        comment: 123123,
        comment_id: 11
      })
      console.log('添加评论', res)
    } catch (error) {
      console.log(error)
    }
  }

  // 删除评论
  const removeContentDetail = async (id: number) => {
    try {
      const res = await Api.MeApi.removeContentDetail(id)
      console.log('删除评论', res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPraiseList()
    getContentDetail(1)
  }, [])
  return (
    <ArticleListBox>
      <Header>
        <Title>个人主页</Title>
        <div>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </div>
      </Header>
      {PraiseList()}
    </ArticleListBox>
  )
})

export default Praise;