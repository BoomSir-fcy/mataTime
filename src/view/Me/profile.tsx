import React from 'react';
import { Box, Card } from 'uikit';
import { Crumbs } from 'components';

const Profile = React.memo((props) => {
  console.log("我是Profile", props)

  return (
    <Box>
      <Crumbs title="个人主页" />
      <Card>我是Profile</Card>
    </Box>
  )
})

export default Profile;