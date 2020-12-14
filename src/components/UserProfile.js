import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, logoutAction } from '../modules/user';

function UserProfile() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const { me } = useSelector(({ user }) => ({
    me: user.me,
  }));

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            twit
            <br />
            {me.Posts.length}
          </div>,
          <div key="follower">
            follower
            <br />
            {me.Followers.length}
          </div>,
          <div key="following">
            following
            <br />
            {me.Followings.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogout} loading={loading[LOGOUT]}>
          Logout
        </Button>
      </Card>
    </>
  );
}

export default UserProfile;
