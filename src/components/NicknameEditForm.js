import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

function NicknameEditForm() {
  const style = useMemo(
    () => ({ marginBottom: '1rem', border: 'solid 1px gray', padding: '1rem' }),
    [],
  );

  return (
    <Form style={style}>
      <Input.Search addonBefore="Nickname" enterButton="Edit" />
    </Form>
  );
}

export default NicknameEditForm;
