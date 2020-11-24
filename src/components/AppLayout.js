import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Input, Menu, Row } from "antd";
import { useState } from "react";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const AppLayoutBlock = styled.div`
  .search {
    vertical-align: "middle";
  }
`;

function AppLayout({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppLayoutBlock>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>NodeBird</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search className="search" enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/register">
            <a>register</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLogin ? (
            <UserProfile setIsLogin={setIsLogin} />
          ) : (
            <LoginForm setIsLogin={setIsLogin} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/bassyu"
            target="_blank"
            rel="noreferrer noopnner"
          >
            Made by bassyu
          </a>
        </Col>
      </Row>
    </AppLayoutBlock>
  );
}

AppLayout.propTypes = {
  // 여기서 node 는 react 에서의 렌더링(return) 가능한 그것을 의미함
  children: PropTypes.node.isRequired,
};

export default AppLayout;
