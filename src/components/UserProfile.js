import { Card, Avatar, Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, logoutAction } from '../modules/user';

function UserProfile() {
  const dispatch = useDispatch();
  const { me, loading } = useSelector(({ user, loading }) => ({
    me: user.me,
    loading,
  }));

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="fallowers">
            {me.Fallowers.length}
            <br />
          </div>,
          <div key="fallowings">
            {me.Fallowings.length}
            <br />
          </div>,
          <div key="twits">
            {me.Posts.length}
            <br />
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
