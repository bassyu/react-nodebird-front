import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../lib/hooks/useInput';
import { LOGIN, loginAction } from '../modules/user';

const LoginFormBlock = styled.div`
  .form {
    padding: 1rem;
  }
  .button-wrapper {
    margin-top: 1rem;
  }
`;

function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => (state));
  const [email, , handleEmail] = useInput('');
  const [password, , handlePassword] = useInput('');

  const onSubmit = useCallback(
    () => {
      dispatch(loginAction({ email, password }));
    },
    [email, password],
  );

  return (
    <LoginFormBlock>
      <Form className="form" onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">ID</label>
          <br />
          <Input
            type="email"
            name="user-email"
            value={email}
            onChange={handleEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>
        <div className="button-wrapper">
          <Button type="primary" htmlType="submit" loading={loading[LOGIN]}>
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

export default LoginForm;
