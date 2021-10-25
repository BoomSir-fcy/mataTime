import atIcn from 'assets/images/social/at.png';
import commentIcn from 'assets/images/social/comment.png';
import likesIcn from 'assets/images/social/likes.png';
import noticeIcn from 'assets/images/user/notice.png';

export type MenuProps = {
  icon: string;
  name: string;
  link?: string;
}

export const NewsMenuData: MenuProps[] = [
  {
    icon: atIcn,
    name: '提到我的',
    link: '/news/me'
  },
  {
    icon: commentIcn,
    name: '评论',
    link: '/news/comment'
  },
  {
    icon: likesIcn,
    name: '点赞',
    link: '/news/praise'
  },
  {
    icon: atIcn,
    name: '私信',
    link: '/news/chat'
  },
  {
    icon: noticeIcn,
    name: '通知',
    link: '/news/notice'
  }
]


export default {
  '/news': NewsMenuData
}