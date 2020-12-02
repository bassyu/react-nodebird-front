import { Button, Form, Input } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../lib/hooks/useInput';
import { addPost } from '../modules/post';

function PostForm() {
  const dispatch = useDispatch();
  const refUpload = useRef();
  const imagePaths = useSelector(({ post }) => post.imagePaths);
  const [text, setText, onChangeText] = useInput('');

  const onClickUpload = useCallback(() => {
    refUpload.current.click;
  }, [refUpload.current]);
  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText('');
  }, []);

  return (
    <Form
      style={{ marign: '1rem 0 1.5rem' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={9 * 16}
        placeholder="How are you?"
      />
      <div>
        <input type="file" multiple hidden ref={refUpload} />
        <Button onClick={onClickUpload}>Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          Submit
        </Button>
      </div>
      <div>
        {imagePaths.map((imagePath) => (
          <div key={imagePath} style={{ display: 'inline-block' }}>
            <img src={imagePath} style={{ width: '13rem' }} alt={imagePath} />
            <div>
              <Button>remove</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
