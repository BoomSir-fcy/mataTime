import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import {
  PopupWrapper,
  PopupContentWrapper
} from './style';

import {
  FollowBtn
} from 'view/News/components/MentionItem/style';

type Iprops = {
  children: React.ReactElement;
}

export const FollowPopup = React.memo((props: Iprops) => {
  const { children } = props
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    addEventListener()
  }, [])

  const addEventListener = () => {
    document.addEventListener('click', (e) => {
      setVisible(false)
    })
  }

  return (
    <PopupWrapper onClick={(e: any) => {
      e.nativeEvent.stopImmediatePropagation() //阻止冒泡
      setVisible(true)
    }}>
      {children}
      {
        visible ? (
          <PopupContentWrapper>
            <div className="content">
              <div className="left-box">
                <div className="img-box"></div>
              </div>
              <div className="right-box">
                <div className="name">Others</div>
                <div className="des"><Icon name={'icon-dunpai'} color={'#85C558'}></Icon> @0x32...9239</div>
                <div className="number">
                  <p>粉丝 <strong>299</strong></p>
                  <p>关注 <strong>29</strong></p>
                </div>
              </div>
            </div>
            <div className="btn">
              <FollowBtn>+关注</FollowBtn>
            </div>
          </PopupContentWrapper>
        ) : null
      }

    </PopupWrapper>
  )
});