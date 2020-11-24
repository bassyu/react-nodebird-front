import { Card, Avatar, Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/user';

function UserProfile() {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="fallowers">
            fallowers
            <br />
          </div>,
          <div key="fallowings">
            fallowings
            <br />
          </div>,
          <div key="twits">
            twits
            <br />
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>Y</Avatar>} title="bassyu" />
        <Button onClick={onLogout}>Logout</Button>
      </Card>
    </>
  );
}

export default UserProfile;
