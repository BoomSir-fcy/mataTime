interface RewardAuthProps {
  data: Api.Home.post;
  // 0的是帖子，1是评论
  postType: 0 | 1;
}

interface reward {
  count: number;
}
