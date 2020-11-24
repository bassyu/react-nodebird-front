import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";
import { useCallback, useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const ErrorMessage = styled.div`
  color: red;
`;

function Signup() {
  const [id, , onChangeId] = useInput("");
  const [nickname, , onChangeNickname] = useInput("");
  const [password, , onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const [term, setTerm] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return;
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>Register - NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-id">ID</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nickname">Nickname</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
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
              onChange={onChangePassword}
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

export default Signup;
