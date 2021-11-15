import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { Icon } from 'components';
import {
  MentionOperatorWrapper
} from './style';
import { Api } from 'apis';

enum MentionObjEnum {
  Article,
  Comment
}

type IProps = {
  itemData: any,
  hasLike?: boolean,
  type?: MentionObjEnum,
  callback?: Function,
  location?:any,
  history?:any
}

const MentionOperator: React.FC<IProps> = ({ location, history,itemData, type = 'Article', hasLike = true, callback }) => {
  const goDetils = () => {
    if(!location||!history)return
    if (location.pathname === '/articleDetils') return
    history.push('/articleDetils/'+itemData.id)
  }
  const [isLike, setIsLike] = useState<number>(itemData.is_like)
  const changeLike = () => {
    if(type==='Article'){
      Api.CommentApi[isLike === 0 ? 'clickLike' : 'cancelLike']({ post_id: itemData.post_id }).then(res => {
        if (Api.isSuccess(res)) {
          callback({
            ...itemData,
            post: {
              ...itemData.post,
              like_num: isLike === 1 ? itemData.post.like_num - 1 : itemData.post.like_num + 1,
              is_like: isLike === 1 ? 0 : 1
            }
          })
          setIsLike(isLike === 1 ? 0 : 1)
          toast.success(res.data)
        }
      })
    }
  }
  useEffect(() => {
    setIsLike(itemData.is_like)
  }, [itemData.is_like])
  return (
    <MentionOperatorWrapper>
      <div className="mention-operator">
        <div className="operator-item">
          <Icon name={'icon-pinglun'} onClick={goDetils} color={'#B5B5B5'}></Icon>
          {itemData.comment_num || 0}
        </div>
        <div className="operator-item">
          <Icon name={'icon-retweet'} color={'#B5B5B5'}></Icon>
          {itemData.share_num || 0}
        </div>
        {
          hasLike ? (
            <div className="operator-item" onClick={changeLike}>
              {
                isLike === 1 ?
                  <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon>
                  : <Icon name={'icon-aixin'} color={'#B5B5B5'}></Icon>
              }

              {itemData.like_num || 0}
            </div>
          ) : null
        }

      </div>
    </MentionOperatorWrapper>
  )
}

export default MentionOperator