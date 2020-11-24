import Link from "next/link";
import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoginFormBlock = styled.div`
  .form {
    padding: 1rem;
  }
  .button-wrapper {
    margin-top: 1rem;
  }
`;

function LoginForm({ setIsLogin }) {
  const [form, setForm] = useState({
    "user-id": "",
    "user-password": "",
  });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const onSubmit = useCallback(
    (e) => {
      setIsLogin(true);
    },
    [form]
  );

  return (
    <LoginFormBlock>
      <Form className="form" onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input
            name="user-id"
            value={form["user-id"]}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={form["user-password"]}
            onChange={onChange}
            required
          />
        </div>
        <div className="button-wrapper">
          <Button type="primary" htmlType="submit" loading={false}>
            Login
          </Button>
          <Link href="/register">
            <a>
              <Button>Register</Button>
            </a>
          </Link>
        </div>
      </Form>
    </LoginFormBlock>
  );
}

LoginForm.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default LoginForm;
