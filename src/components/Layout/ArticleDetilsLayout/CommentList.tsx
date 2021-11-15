import React,{ useState,useEffect,useRef} from 'react';
import { Avatar, Icon } from 'components';
import { Flex, Button, Box } from 'uikit'
import { relativeTime } from 'utils'
import { SortIcon } from './SortIcon'
import MentionOperator from 'view/News/components/MentionOperator';
import { FollowPopup, MorePopup,List } from 'components'
import {Api} from 'apis'
import {
  CommentListBox,
  CommentTitle,
  CommentItem,
  CommentHeader,
  CommentContent,
  // CommentFooter,
  CommentListFooter
} from './style'
type Iprops = {
  itemData:any
}

export const CommentList: React.FC<Iprops> = (props:Iprops) => {
  const {itemData} = props
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)
  const [sortTime, setSortTime] = useState(1)
  const [sortLike, setSortLike] = useState(1)
  const [refresh, setRefresh] = useState(false)
  let listRef:any = useRef()
  useEffect(()=>{
    listRef.current.loadList()
  },[refresh])
  const initList=()=>{
    setListData([])
    setPage(1)
    setTotalPage(2)
    setRefresh(!refresh)
  }
  const changeSortTime=()=>{
    setSortTime(sortTime===1?0:1)  
    initList()
  }
  const changeSortLike=()=>{
    setSortLike(sortLike===1?0:1)
    initList()
  }
  const getList = ()=>{
    if(!itemData.id)return
    console.log(page,sortTime);
    
    Api.CommentApi.getCommentList({
      pid:itemData.id,
      prepage:20,
      page:page,
      sort_add_time:sortTime,
      sort_like:sortLike
    }).then(res => {
      setLoading(false)
      console.log(res);
      if (res.code === 1) {
        setPage(page + 1)
        setListData([...listData, ...res.data.list])
        // setListData([...listData, ...(res.data.list.map(item=>({...item,post:item,post_id:item.pid})))])
        console.log(listData,res.data.list);
        
        setTotalPage(res.data.total_page)
      }
    })
  }
  return (
    <CommentListBox>
      <CommentTitle justifyContent="space-between" alignItems="center">
        <span>评论</span>
        <div className="sort-box">
          <div>
            热度 <SortIcon changeSort={changeSortLike} flag={sortLike===0}></SortIcon>
          </div>
          <div>
            时间 <SortIcon changeSort={changeSortTime} flag={sortTime===0}></SortIcon>
          </div>
        </div>
      </CommentTitle>
      <List  ref={listRef} marginTop={410} renderList={() => {
        if(!itemData.id)return
        if (loading || page > totalPage) return false
        setLoading(true)
        getList()
      }}>
      {listData.map((item,index) => (
        <CommentItem key={item.uid}>
          <Flex>
            <Avatar src={item.user_avator_url} style={{ width: '50px', height: '50px' }} scale="md" />
            <div style={{ flex: 1, marginLeft: '22px' }}>
              <CommentHeader justifyContent="space-between">
                <Flex>
                  <div>
                    <div>{item.user_name}</div>
                    <div className="relative-time">{relativeTime(item.add_time)}</div>
                  </div>
                  {item.comment_user_name&&( <div className="reply">
                    回复 和 
                    <FollowPopup>
                      <span>{item.comment_user_name}</span>
                    </FollowPopup>
                  </div>)}
                </Flex>
                <Flex>
                {/* <MorePopup data={new Object()}> */}
                  <Icon name="icon-gengduo" margin="8px 15px 0 0" color="#7E7E7E"></Icon>
              {/* </MorePopup> */}
                </Flex>
              </CommentHeader>
              {/* <CommentContent  dangerouslySetInnerHTML={{ __html: item.comment }}>
              </CommentContent> */}
              <CommentContent  dangerouslySetInnerHTML={{ __html: item.comment }}>
              </CommentContent>
            </div>
          </Flex>
          <MentionOperator type={Response['Comment']}  itemData={item} ></MentionOperator>
          {/* <CommentFooter>
            <div> <Icon name="icon-retweet" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-pinglun" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-aixin" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
          </CommentFooter> */}
        </CommentItem>
      ))}
      </List>
      <CommentListFooter>没有更多内容了</CommentListFooter>
    </CommentListBox>
  )
}