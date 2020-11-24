import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { login } from '../modules/user';

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
  const [id, , onChangeId] = useInput('');
  const [password, , onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      const data = { id, password };
      dispatch(login(data));
    },
    [id, password]
  );

  return (
    <LoginFormBlock>
      <Form className="form" onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
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

export default LoginForm;
