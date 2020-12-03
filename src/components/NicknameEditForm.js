import { Form, Input } from 'antd';
import { useMemo } from 'react';

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
