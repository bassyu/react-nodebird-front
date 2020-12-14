import React, { useCallback, useState } from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'antd';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import useInput from '../lib/hooks/useInput';
import { registerAction } from '../modules/user';

const ErrorMessage = styled.div`
  color: red;
`;

function Register() {
  const dispatch = useDispatch();
  const [email, , handleEmail] = useInput('');
  const [nickname, , handleNickname] = useInput('');
  const [password, , handlePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
  });
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return undefined;
    }
    dispatch(registerAction({ email, password }));
    return undefined;
  }, [email, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>Register - NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">ID</label>
            <br />
            <Input
              type="email"
              name="user-email"
              value={email}
              required
              onChange={handleEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">Nickname</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={handleNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">Password</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={handlePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">Password Check</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>please check password</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              I agree to the terms and conditions.
            </Checkbox>
          </div>
          {term && !passwordError && (
            <div>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          )}
        </Form>
      </AppLayout>
    </>
  );
}

export default Register;
