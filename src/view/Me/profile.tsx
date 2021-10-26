import React from 'react';
import { Card } from 'uikit';

const Profile = React.memo((props) => {
  console.log("我是Profile", props)

  return (
    <Card>我是Profile</Card>
  )
})

export default Profile;
