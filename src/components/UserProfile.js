import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";

function UserProfile({ setIsLogin }) {
  const onLogout = useCallback(() => {
    setIsLogin(false);
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="twits">
            twits
            <br />
          </div>,
          <div key="fallowings">
            fallowings
            <br />
          </div>,
          <div key="fallowers">
            fallowers
            <br />
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>Y</Avatar>} title="bassyu" />
        <Button onClick={onLogout}>로그아웃</Button>
      </Card>
    </>
  );
}

export default UserProfile;
