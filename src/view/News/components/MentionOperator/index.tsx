import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify'
import { Icon } from 'components';
import {
  MentionOperatorWrapper
} from './style';
import { Api } from 'apis';


type IProps = {
  itemData: any
}

const MentionOperator: React.FC<IProps> = ({ itemData }) => {
  const [isLike, setIsLike] = useState<number>(itemData.is_like)
  const changeLike = () => {
    Api.CommentApi[isLike === 0 ? 'clickLike' : 'cancelLike']({ post_id: itemData.id }).then(res => {
      if (res.code === 1 || res.code === 0) {
        setIsLike(isLike === 1 ? 0 : 1)
        toast.success(res.data)
      }
    })
  }
  useEffect(() => {
    setIsLike(itemData.is_like)
  },[itemData.is_like])
  return (
    <MentionOperatorWrapper>
      <div className="mention-operator">
        <div className="operator-item">
          <Icon name={'icon-pinglun'} color={'#B5B5B5'}></Icon>
          {itemData.comment_num || 0}
        </div>
        <div className="operator-item">
          <Icon name={'icon-retweet'} color={'#B5B5B5'}></Icon>
          {itemData.share_num || 0}
        </div>
        <div className="operator-item" onClick={changeLike}>
          {
            isLike === 1 ?
              <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon>
              : <Icon name={'icon-aixin'} color={'#B5B5B5'}></Icon>
          }

          {itemData.like_num || 0}
        </div>
      </div>
    </MentionOperatorWrapper>
  )
}

export default MentionOperator